import Header from "../components/Header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"

const Token = () => {

  const tokenomics = [
    { label: "Public Sale", percentage: "40%", amount: "8.4M TVST", color: "bg-blue-500" },
    { label: "Team & Advisors", percentage: "20%", amount: "4.2M TVST", color: "bg-green-500" },
    { label: "Development", percentage: "15%", amount: "3.15M TVST", color: "bg-purple-500" },
    { label: "Marketing", percentage: "10%", amount: "2.1M TVST", color: "bg-yellow-500" },
    { label: "Liquidity", percentage: "10%", amount: "2.1M TVST", color: "bg-red-500" },
    { label: "Reserve", percentage: "5%", amount: "1.05M TVST", color: "bg-gray-500" }
  ]

  const utilities = [
    {
      title: "Early ITO Access",
      description: "Get priority access to Initial Talent Offerings before public launch",
      requirement: "Hold 100+ TVST",
      unlocked: true
    },
    {
      title: "Exclusive Rewards", 
      description: "Receive special airdrops, NFT bonuses, and platform rewards",
      requirement: "Hold 500+ TVST",
      unlocked: true
    },
    {
      title: "Governance Rights",
      description: "Vote on platform decisions, new features, and talent categories", 
      requirement: "Hold 1,000+ TVST",
      unlocked: true
    },
    {
      title: "Premium Features",
      description: "Access advanced analytics, priority support, and exclusive content",
      requirement: "Hold 2,500+ TVST", 
      unlocked: false
    }
  ]

  const proposals = [
    {
      id: "TIP-001",
      title: "Add Music Category",
      description: "Proposal to add music talents to the platform",
      status: "Active",
      forVotes: "65%",
      againstVotes: "35%",
      timeLeft: "3 days"
    },
    {
      id: "TIP-002", 
      title: "Reduce Platform Fees",
      description: "Proposal to reduce trading fees from 2.5% to 2%",
      status: "Active",
      forVotes: "78%",
      againstVotes: "22%", 
      timeLeft: "5 days"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              TVST Token
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
              The governance and utility token powering the Talevest ecosystem
            </p>
          </div>

          {/* Token Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-white">21M</div>
                <div className="text-sm text-white/70">Total Supply</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-white">$0.45</div>
                <div className="text-sm text-white/70">Current Price</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-white">8.4M</div>
                <div className="text-sm text-white/70">Circulating</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-white">$9.45M</div>
                <div className="text-sm text-white/70">Market Cap</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Your Balance */}
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
              <CardHeader>
                <h3 className="text-xl font-bold text-white">Your TVST Balance</h3>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-white">1,250 TVST</div>
                  <div className="text-white/70">≈ $562.50 USD</div>
                  <Badge className="mt-2 bg-green-600 text-white">Governance Eligible</Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 bg-transparent border-white/30 text-white hover:bg-white/10">Stake TVST</Button>
                  <Button className="flex-1 bg-white text-primary hover:bg-white/90">Buy More</Button>
                </div>
              </CardContent>
            </Card>

            {/* Token Utilities */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-white mb-4">Token Utilities</h2>
              <p className="text-white/70 mb-6">Unlock exclusive benefits by holding TVST tokens</p>
              <div className="space-y-4">
                {utilities.map((utility, index) => (
                  <Card key={index} className="bg-white/10 backdrop-blur-sm border border-white/20">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${utility.unlocked ? 'bg-green-600' : 'bg-white/20'}`}>
                          {utility.unlocked && <CheckCircle className="w-4 h-4 text-white" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-white">{utility.title}</h4>
                            {utility.unlocked && <Badge className="bg-green-600 text-white">Unlocked</Badge>}
                          </div>
                          <p className="text-sm text-white/70 mb-2">{utility.description}</p>
                          <p className="text-xs text-white/50">{utility.requirement}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Tokenomics */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Tokenomics</h2>
              <p className="text-white/70 mb-6">Distribution of 21 million TVST tokens</p>
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
                <CardContent className="p-0">
                  <div className="space-y-0">
                    {tokenomics.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border-b border-white/20 last:border-b-0">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded ${item.color}`}></div>
                          <span className="font-medium text-white">{item.label}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-white">{item.percentage}</div>
                          <div className="text-sm text-white/70">{item.amount}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Governance */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Governance</h2>
              <p className="text-white/70 mb-6">Participate in platform governance and shape the future of Talevest</p>
              
              <div className="flex gap-2 mb-4">
                <Button className="bg-white text-primary hover:bg-white/90">Active Proposals</Button>
                <Button variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10">Passed</Button>
                <Button variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10">Create Proposal</Button>
              </div>

              <div className="space-y-4">
                {proposals.map((proposal, index) => (
                  <Card key={index} className="bg-white/10 backdrop-blur-sm border border-white/20">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-white">{proposal.id}: {proposal.title}</h4>
                        <Badge className="bg-white text-primary">{proposal.status}</Badge>
                      </div>
                      <p className="text-sm text-white/70 mb-3">{proposal.description}</p>
                      <div className="flex justify-between items-center mb-3">
                        <div className="text-sm">
                          <span className="text-green-400">For: {proposal.forVotes}</span>
                          <span className="text-red-400 ml-4">Against: {proposal.againstVotes}</span>
                        </div>
                        <div className="text-sm text-white/70">Ends in {proposal.timeLeft}</div>
                      </div>
                      <Button size="sm" className="bg-white text-primary hover:bg-white/90">Vote Now</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-6">
                <h3 className="text-xl font-bold text-white mb-4">Get TVST Tokens</h3>
                <p className="text-white/70 mb-4">Purchase TVST tokens to unlock exclusive features and participate in governance</p>
                <div className="flex gap-2">
                  <Button className="bg-white text-primary hover:bg-white/90">Buy on Uniswap</Button>
                  <Button variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10">View on CoinGecko</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Token