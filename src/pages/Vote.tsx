import Header from "../components/Header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useMemo } from "react"
import { useWallet } from '@solana/wallet-adapter-react'
import { useVoting } from '../hooks/useVoting'

// Talent Voting Page
const Vote = () => {
  const solanaWallet = useWallet()
  const voting = useVoting()

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

  const initialTalents: Talent[] = useMemo(() => ([]), [])

  // Use blockchain data for vote counts
  const candidateAVotes = voting.votingResults.candidateAVotes
  const candidateBVotes = voting.votingResults.candidateBVotes
  const totalVotes = voting.votingResults.totalVotes

  const castVote = async (talent: Talent) => {
    await voting.castVote(talent.candidate, talent.name, talent.id)
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />

      <main className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-white/10 text-white border-white/20">🗳️ Community Voting</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">Talent Voting</h1>
            <p className="text-white/80 max-w-3xl mx-auto mb-6">
              Help the community decide which verified talent should launch their Initial Talent Offering (ITO) next.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <Button 
                onClick={() => window.location.href = '/talent-application'} 
                className="bg-white/10 text-white border border-white/20 hover:bg-white/20"
              >
                Apply to list your own talent
              </Button>
            </div>
            {solanaWallet.connected && (
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 mb-6 max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-6 text-sm">
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">{voting.tvstBalance.toFixed(2)}</div>
                    <div className="text-white/70">TVST Balance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">{voting.solBalance.toFixed(3)}</div>
                    <div className="text-white/70">SOL Balance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-white">{voting.votingPower}</div>
                    <div className="text-white/70">Voting Power</div>
                  </div>
                  {voting.hasVoted && (
                    <div className="text-center">
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">✓ Already Voted</Badge>
                    </div>
                  )}
                </div>
                {!voting.canVote && solanaWallet.connected && !voting.hasVoted && (
                  <div className="mt-3 text-center">
                    {voting.tvstBalance === 0 && (
                      <p className="text-orange-300 text-sm">⚠️ You need TVST tokens to vote</p>
                    )}
                    {voting.solBalance < 0.01 && (
                      <p className="text-orange-300 text-sm">⚠️ You need at least 0.01 SOL for transaction fees</p>
                    )}
                  </div>
                )}
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
          <div className="text-center py-12">
            <div className="text-8xl mb-6">🎭</div>
            <h2 className="text-3xl font-bold text-white mb-4">No Talents Available</h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              We're currently reviewing talent applications. Check back soon to see verified talents ready for voting!
            </p>
            <Button 
              onClick={() => window.location.href = '/talent-application'} 
              className="bg-white text-primary hover:bg-white/90"
            >
              Apply to Be Listed
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Vote
