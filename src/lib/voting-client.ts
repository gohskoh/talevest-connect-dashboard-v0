import { AnchorProvider, Program, web3, BN } from '@coral-xyz/anchor';
import { Connection, PublicKey, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import type { WalletContextState } from '@solana/wallet-adapter-react';
import idl from './idl/tvst_solana_voting_devnet.json';

// Environment variables
const TVST_MINT = new PublicKey('A4utwDL9JExUyrD85St47RKi77gVN5wKwfbqo3h6pcpv');
const VOTING_PROGRAM_ID = new PublicKey('E9Kqxrhgr3ummcG27wowAZsCBMQtLYn7LaywV3iwzjVv');
const CURRENT_VOTING_ID = 1755420687;
const VOTE_BANK_PDA = new PublicKey('EGDpVPp16FcE9thNNbx9qndGfFnJLsbhZqph7Ex2bXNB');
const RPC_URL = 'https://api.devnet.solana.com';
const CANDIDATE_A_MINT = new PublicKey('EmeZtZ8ZdxqK8F1wqLayUCYnYWvQThAxR17zpZaexE6Q');
const CANDIDATE_B_MINT = new PublicKey('5MKszBmKGrN7c6QNQQUp1rvWhZy1gxPn24KJjPTgtfGQ');

// Types
export interface VoteBank {
  candidateAMint: PublicKey;
  candidateBMint: PublicKey;
  candidateAVotes: number;
  candidateBVotes: number;
  votingId: number;
  tokenWeighted: boolean;
  tvstMint: PublicKey;
  bump: number;
}

export interface VoterRecord {
  voter: PublicKey;
  votingId: number;
  hasVoted: boolean;
  candidateVoted: number;
  votingPowerUsed: number;
  bump: number;
}

export interface VotingResults {
  candidateAVotes: number;
  candidateBVotes: number;
  totalVotes: number;
}

export class VotingClient {
  private connection: Connection;
  private program?: Program;

  constructor() {
    this.connection = new Connection(RPC_URL, 'confirmed');
  }

  async initializeProgram(wallet: WalletContextState) {
    if (!wallet.publicKey || !wallet.signTransaction) {
      throw new Error('Wallet not connected');
    }

    const provider = new AnchorProvider(
      this.connection,
      wallet as any,
      { commitment: 'confirmed' }
    );

    // Use imported IDL
    this.program = new Program(idl, provider);
  }

  async getTvstBalance(wallet: PublicKey): Promise<number> {
    try {
      const tokenAccount = await getAssociatedTokenAddress(TVST_MINT, wallet);
      const accountInfo = await this.connection.getTokenAccountBalance(tokenAccount);
      return accountInfo.value.uiAmount || 0;
    } catch (error) {
      console.error('Error getting TVST balance:', error);
      return 0;
    }
  }

  async hasVoted(wallet: PublicKey): Promise<boolean> {
    try {
      const [voterRecordPda] = PublicKey.findProgramAddressSync(
        [
          Buffer.from('voter_record'),
          wallet.toBuffer(),
          new BN(CURRENT_VOTING_ID).toArrayLike(Buffer, 'le', 8)
        ],
        VOTING_PROGRAM_ID
      );

      const voterRecord = await this.program.account['voterRecord'].fetch(voterRecordPda);
      return voterRecord?.hasVoted || false;
    } catch (error) {
      // If account doesn't exist, user hasn't voted
      return false;
    }
  }

  async getVotingResults(): Promise<VotingResults> {
    try {
      if (!this.program) {
        throw new Error('Program not initialized');
      }

      const voteBank = await this.program.account['voteBank'].fetch(VOTE_BANK_PDA);
      
      return {
        candidateAVotes: voteBank.candidateAVotes.toNumber(),
        candidateBVotes: voteBank.candidateBVotes.toNumber(),
        totalVotes: voteBank.candidateAVotes.toNumber() + voteBank.candidateBVotes.toNumber()
      };
    } catch (error) {
      console.error('Error getting voting results:', error);
      return { candidateAVotes: 0, candidateBVotes: 0, totalVotes: 0 };
    }
  }

  async vote(wallet: WalletContextState, candidate: 0 | 1): Promise<string> {
    if (!wallet.publicKey || !this.program) {
      throw new Error('Wallet or program not initialized');
    }

    // Check if user has TVST tokens
    const balance = await this.getTvstBalance(wallet.publicKey);
    if (balance === 0) {
      throw new Error('You need TVST tokens to vote');
    }

    // Check if user already voted
    const alreadyVoted = await this.hasVoted(wallet.publicKey);
    if (alreadyVoted) {
      throw new Error('You have already voted in this session');
    }

    // Get voter's token account
    const voterTokenAccount = await getAssociatedTokenAddress(TVST_MINT, wallet.publicKey);

    // Get voter record PDA
    const [voterRecordPda] = PublicKey.findProgramAddressSync(
      [
        Buffer.from('voter_record'),
        wallet.publicKey.toBuffer(),
        new BN(CURRENT_VOTING_ID).toArrayLike(Buffer, 'le', 8)
      ],
      VOTING_PROGRAM_ID
    );

    try {
      // Get fresh blockhash to avoid stale blockhash errors
      const { blockhash, lastValidBlockHeight } = await this.connection.getLatestBlockhash('finalized');
      
      const tx = await this.program.methods
        .vote(candidate)
        .accounts({
          voteBank: VOTE_BANK_PDA,
          voterRecord: voterRecordPda,
          voterTokenAccount: voterTokenAccount,
          voter: wallet.publicKey,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .rpc({
          commitment: 'finalized',
          skipPreflight: false,
          preflightCommitment: 'finalized'
        });

      return tx;
    } catch (error) {
      console.error('Voting error:', error);
      if (error.message.includes('AlreadyVoted')) {
        throw new Error('You have already voted in this session');
      } else if (error.message.includes('NoTvstTokens')) {
        throw new Error('You need TVST tokens to vote');
      } else if (error.message.includes('InvalidCandidate')) {
        throw new Error('Invalid candidate selection');
      } else if (error.message.includes('Blockhash not found')) {
        throw new Error('Network congestion. Please try again in a moment.');
      }
      throw new Error('Failed to submit vote. Please try again.');
    }
  }

  async getSolBalance(wallet: PublicKey): Promise<number> {
    try {
      const balance = await this.connection.getBalance(wallet);
      return balance / LAMPORTS_PER_SOL;
    } catch (error) {
      console.error('Error getting SOL balance:', error);
      return 0;
    }
  }
}