import { useState, useEffect, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { VotingClient, VotingResults } from '../lib/voting-client';
import { toast } from '@/hooks/use-toast';

export const useVoting = () => {
  const wallet = useWallet();
  const [votingClient] = useState(() => new VotingClient());
  const [tvstBalance, setTvstBalance] = useState<number>(0);
  const [solBalance, setSolBalance] = useState<number>(0);
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [votingResults, setVotingResults] = useState<VotingResults>({ candidateAVotes: 0, candidateBVotes: 0, totalVotes: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVoting, setIsVoting] = useState<boolean>(false);
  const [votingForTalent, setVotingForTalent] = useState<string | null>(null);

  // Initialize voting client when wallet connects
  useEffect(() => {
    if (wallet.connected && wallet.publicKey) {
      initializeVoting();
    } else {
      // Reset state when wallet disconnects
      setTvstBalance(0);
      setSolBalance(0);
      setHasVoted(false);
      setVotingResults({ candidateAVotes: 0, candidateBVotes: 0, totalVotes: 0 });
    }
  }, [wallet.connected, wallet.publicKey]);

  const initializeVoting = async () => {
    if (!wallet.publicKey) return;

    setIsLoading(true);
    try {
      // Initialize program
      await votingClient.initializeProgram(wallet);
      
      // Load user data
      await Promise.all([
        loadTvstBalance(),
        loadSolBalance(),
        checkVotingStatus(),
        loadVotingResults()
      ]);
    } catch (error) {
      console.error('Error initializing voting:', error);
      toast({
        title: "Connection Error",
        description: "Failed to connect to voting system",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadTvstBalance = async () => {
    if (!wallet.publicKey) return;
    
    try {
      const balance = await votingClient.getTvstBalance(wallet.publicKey);
      setTvstBalance(balance);
    } catch (error) {
      console.error('Error loading TVST balance:', error);
    }
  };

  const loadSolBalance = async () => {
    if (!wallet.publicKey) return;
    
    try {
      const balance = await votingClient.getSolBalance(wallet.publicKey);
      setSolBalance(balance);
    } catch (error) {
      console.error('Error loading SOL balance:', error);
    }
  };

  const checkVotingStatus = async () => {
    if (!wallet.publicKey) return;
    
    try {
      const voted = await votingClient.hasVoted(wallet.publicKey);
      setHasVoted(voted);
    } catch (error) {
      console.error('Error checking voting status:', error);
    }
  };

  const loadVotingResults = async () => {
    try {
      const results = await votingClient.getVotingResults();
      setVotingResults(results);
    } catch (error) {
      console.error('Error loading voting results:', error);
    }
  };

  const castVote = useCallback(async (candidate: 0 | 1, candidateName: string, talentId: string) => {
    if (!wallet.connected || !wallet.publicKey) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to vote",
        variant: "destructive"
      });
      return false;
    }

    if (tvstBalance === 0) {
      toast({
        title: "No TVST Tokens",
        description: "You need TVST tokens to participate in voting",
        variant: "destructive"
      });
      return false;
    }

    if (hasVoted) {
      toast({
        title: "Already Voted",
        description: "You have already voted in this session",
        variant: "destructive"
      });
      return false;
    }

    if (solBalance < 0.01) {
      toast({
        title: "Insufficient SOL",
        description: "You need at least 0.01 SOL for transaction fees",
        variant: "destructive"
      });
      return false;
    }

    setIsVoting(true);
    setVotingForTalent(talentId);
    try {
      const txSignature = await votingClient.vote(wallet, candidate);
      
      toast({
        title: "Vote Submitted!",
        description: `Successfully voted for ${candidateName}. Transaction: ${txSignature.slice(0, 8)}...`,
        variant: "default"
      });

      // Refresh data after successful vote
      await Promise.all([
        checkVotingStatus(),
        loadVotingResults(),
        loadSolBalance()
      ]);

      return true;
    } catch (error) {
      console.error('Voting error:', error);
      toast({
        title: "Vote Failed",
        description: error.message || "Failed to submit vote. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsVoting(false);
      setVotingForTalent(null);
    }
  }, [wallet, votingClient, tvstBalance, hasVoted, solBalance]);

  const refreshData = useCallback(async () => {
    if (wallet.connected && wallet.publicKey) {
      await Promise.all([
        loadTvstBalance(),
        loadSolBalance(),
        checkVotingStatus(),
        loadVotingResults()
      ]);
    }
  }, [wallet.connected, wallet.publicKey]);

  return {
    // State
    tvstBalance,
    solBalance,
    hasVoted,
    votingResults,
    isLoading,
    isVoting,
    votingForTalent,
    isConnected: wallet.connected,
    publicKey: wallet.publicKey,

    // Actions
    castVote,
    refreshData,
    
    // Wallet actions
    connect: wallet.connect,
    disconnect: wallet.disconnect,
    
    // Computed values
    canVote: wallet.connected && tvstBalance > 0 && !hasVoted && solBalance >= 0.01,
    votingPower: tvstBalance,
  };
};