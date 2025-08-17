import Header from "../components/Header"
import { useAccount, useDisconnect } from 'wagmi'
import { modal } from '../lib/wallet-config'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useMemo, useState } from "react"
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useVoting } from '../hooks/useVoting'

// Talent Voting Page
const Vote = () => {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const solanaWallet = useWallet()
  const voting = useVoting()

  const handleConnectWallet = () => {
    if (isConnected) disconnect()
    else modal.open()
  }

  // SEO
  useEffect(() => {
    document.title = "Talent Voting | Talevest"
    const desc = "Vote for upcoming talents on Talevest and help decide who launches next."
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    meta.content = desc

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = window.location.href
  }, [])

  type Talent = { id: string; name: string; category: string; blurb: string; avatar: string; candidate: 0 | 1 }

  const initialTalents: Talent[] = useMemo(() => ([
    { id: 'MAR', name: 'Marcus Rodriguez', category: 'Sports • Football', blurb: 'Lightning-fast striker and youth champion.', avatar: 'MR', candidate: 0 },
    { id: 'SCH', name: 'Sophia Chen', category: 'Entertainment • Creator', blurb: 'Viral creator with explosive growth.', avatar: 'SC', candidate: 1 },
    { id: 'EWA', name: 'Emma Walsh', category: 'Art • Digital', blurb: 'NFT-native artist with sold-out drops.', avatar: 'EW', candidate: 0 },
    { id: 'AIP', name: 'Aisha Patel', category: 'Sports • Tennis', blurb: 'National finalist with Olympic ambitions.', avatar: 'AP', candidate: 1 },
  ]), [])

  // Use blockchain data for vote counts
  const candidateAVotes = voting.votingResults.candidateAVotes
  const candidateBVotes = voting.votingResults.candidateBVotes
  const totalVotes = voting.votingResults.totalVotes

  const castVote = async (talent: Talent) => {
    await voting.castVote(talent.candidate, talent.name)
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header onConnectWallet={handleConnectWallet} isConnected={isConnected} address={address} />

      <main className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-white/10 text-white border-white/20">🗳️ Community Voting</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">Talent Voting</h1>
            <p className="text-white/80 max-w-3xl mx-auto mb-6">
              Help the community decide which verified talent should launch their Initial Talent Offering (ITO) next.
            </p>
            {/* Devnet Network Notice */}
            <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-4 mb-6 max-w-2xl mx-auto">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-orange-400">⚠️</span>
                <h3 className="text-orange-300 font-semibold">Important: Switch to Devnet</h3>
              </div>
              <p className="text-orange-200 text-sm">
                This voting system runs on <strong>Solana Devnet</strong>. Please:
              </p>
              <ol className="text-orange-200 text-sm mt-2 ml-4 list-decimal">
                <li>Open your Phantom wallet settings</li>
                <li>Change network from "Mainnet" to <strong>"Devnet"</strong></li>
                <li>Get free devnet SOL from <a href="https://faucet.solana.com" target="_blank" rel="noopener noreferrer" className="text-orange-300 underline hover:text-orange-100">faucet.solana.com</a> for transaction fees</li>
              </ol>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <WalletMultiButton className="!bg-white !text-primary hover:!bg-white/90 !border-0 !rounded-lg !font-semibold !px-6 !py-3" />
              <Button 
                onClick={() => window.location.href = '/talent-application'} 
                className="bg-white/10 text-white border border-white/20 hover:bg-white/20"
              >
                Apply to list your own talent
              </Button>
            </div>
            {solanaWallet.connected && (
              <div className="flex items-center justify-center gap-6 text-sm text-white/70">
                <span>TVST Balance: {voting.tvstBalance.toFixed(2)}</span>
                <span>SOL Balance: {voting.solBalance.toFixed(3)}</span>
                {voting.hasVoted && <Badge className="bg-green-500/20 text-green-400 border-green-500/30">✓ Voted</Badge>}
              </div>
            )}
          </div>

          {/* Voting Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-white">{totalVotes}</div>
                <div className="text-sm text-white/70">Total Votes</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20 col-span-1 md:col-span-3">
              <CardContent className="p-4">
                <div className="text-sm text-white/70 mb-2">Live Support</div>
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-2 bg-white/60 rounded-full transition-all"
                    style={{ width: `${Math.min(100, totalVotes)}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Talent Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {initialTalents.map((t) => {
              // Get votes for this candidate from blockchain
              const v = t.candidate === 0 ? candidateAVotes : candidateBVotes
              const share = totalVotes > 0 ? Math.round((v / totalVotes) * 100) : 0
              const isDisabled = !voting.canVote || voting.isVoting || voting.hasVoted
              
              return (
                <Card key={t.id} className="bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-white font-bold">
                        {t.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-white font-bold text-lg">{t.name}</h3>
                          <Badge className="bg-white/10 text-white border-white/20">Verified</Badge>
                        </div>
                        <p className="text-white/70 text-sm">{t.category}</p>
                        <p className="text-white/80 text-sm mt-1">{t.blurb}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm text-white/70">Votes</span>
                      <span className="text-sm font-semibold text-white">{v} ({share}%)</span>
                    </div>
                    <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden mb-4">
                      <div className="h-2 bg-white/60 rounded-full transition-all" style={{ width: `${share}%` }} />
                    </div>
                    <Button 
                      onClick={() => castVote(t)} 
                      disabled={isDisabled}
                      className="w-full bg-white text-primary hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {voting.isVoting ? 'Voting...' : voting.hasVoted ? 'Already Voted' : `Vote for ${t.name.split(' ')[0]}`}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Vote
