import Header from "../components/Header"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const Floor = () => {
  // Stub wallet functionality for non-voting pages
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | undefined>(undefined)

  const handleConnectWallet = () => {
    if (isConnected) {
      setIsConnected(false)
      setAddress(undefined)
    } else {
      // Redirect to voting page for actual wallet functionality
      window.location.href = '/vote'
    }
  }

  const marketData = [
    {
      symbol: "MAR",
      name: "Marcus Rodriguez",
      price: "0.067 ETH",
      change: "+12.5%",
      volume: "45.2 ETH",
      marketCap: "670 ETH",
      holders: "1250"
    },
    {
      symbol: "SOF", 
      name: "Sophia Chen",
      price: "0.041 ETH",
      change: "+3.2%",
      volume: "28.7 ETH",
      marketCap: "410 ETH",
      holders: "890"
    },
    {
      symbol: "ALX",
      name: "Alex Thompson", 
      price: "0.095 ETH",
      change: "+8.7%",
      volume: "67.3 ETH",
      marketCap: "950 ETH",
      holders: "1680"
    }
  ]

  const recentTrades = [
    { type: "BUY", symbol: "MAR", amount: "150 @ 0.067", time: "2 min ago" },
    { type: "SELL", symbol: "ALX", amount: "75 @ 0.094", time: "5 min ago" },
    { type: "BUY", symbol: "SOF", amount: "200 @ 0.041", time: "8 min ago" },
    { type: "BUY", symbol: "MAR", amount: "300 @ 0.066", time: "12 min ago" },
    { type: "SELL", symbol: "ALX", amount: "100 @ 0.095", time: "15 min ago" }
  ]

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header 
        onConnectWallet={handleConnectWallet}
        isConnected={isConnected}
        address={address}
      />
      
      <main className="pt-32 pb-16 relative">
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-xl px-6 py-3 shadow-2xl">
            Coming Soon
          </div>
        </div>
        <div className="container mx-auto px-6 blur-sm pointer-events-none">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              The Floor
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
              Trade talent NFTs on the world's first human capital marketplace
            </p>
          </div>

          {/* Market Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-white">$2.1M</div>
                <div className="text-sm text-white/70">Total Volume</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-white">3,820</div>
                <div className="text-sm text-white/70">Active Traders</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-white">156</div>
                <div className="text-sm text-white/70">Listed Talents</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400">+24.5%</div>
                <div className="text-sm text-white/70">24h Change</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Market Overview */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-white mb-4">Market Overview</h2>
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
                <CardContent className="p-0">
                  <div className="space-y-0">
                    {marketData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border-b border-white/20 last:border-b-0">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold text-white">
                            {item.symbol}
                          </div>
                          <div>
                            <div className="font-medium text-white">{item.symbol}</div>
                            <div className="text-sm text-white/70">{item.name}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-white">{item.price}</div>
                          <div className={`text-sm ${item.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                            {item.change}
                          </div>
                        </div>
                        <div className="text-right text-sm text-white/70">
                          <div>{item.volume}</div>
                          <div>Volume</div>
                        </div>
                        <div className="text-right text-sm text-white/70">
                          <div>{item.marketCap}</div>
                          <div>Market Cap</div>
                        </div>
                        <div className="text-right text-sm text-white/70">
                          <div>{item.holders}</div>
                          <div>Holders</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Trading Panel */}
            <div>
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold text-white">
                      MAR
                    </div>
                    <div>
                      <div className="font-bold text-white">MAR</div>
                      <div className="text-sm text-white/70">Marcus Rodriguez</div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-sm text-white/70">Current Price</div>
                    <div className="text-lg font-bold text-white">0.067 ETH</div>
                    <div className="text-sm text-green-400">24h Change +12.5%</div>
                    <div className="text-sm text-white/70 mt-2">Market Cap 670 ETH</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-bold text-white mb-4">Trade MAR</h3>
                  <div className="flex gap-2 mb-4">
                    <Button className="flex-1 bg-green-600 hover:bg-green-700">Buy</Button>
                    <Button variant="outline" className="flex-1 bg-transparent border-white/30 text-white hover:bg-white/10">Sell</Button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-white/70">Amount (NFTs)</label>
                      <input className="w-full mt-1 px-3 py-2 bg-white/10 border border-white/30 rounded-md text-white placeholder-white/50" placeholder="0" />
                    </div>
                    <div>
                      <label className="text-sm text-white/70">Price per NFT (ETH)</label>
                      <input className="w-full mt-1 px-3 py-2 bg-white/10 border border-white/30 rounded-md text-white placeholder-white/50" placeholder="0.067" />
                    </div>
                    <div className="text-sm text-white/70">
                      Total Cost <span className="font-medium text-white">0.00 ETH</span>
                    </div>
                    <Button className="w-full bg-white text-primary hover:bg-white/90">Place Buy Order</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Trades */}
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
                <CardHeader>
                  <h3 className="font-bold text-white">Recent Trades</h3>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-0">
                    {recentTrades.map((trade, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border-b border-white/20 last:border-b-0">
                        <div className="flex items-center gap-2">
                          <Badge variant={trade.type === 'BUY' ? 'default' : 'secondary'} className={trade.type === 'BUY' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}>
                            {trade.type}
                          </Badge>
                          <span className="font-medium text-white">{trade.symbol}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-white">{trade.amount}</div>
                          <div className="text-xs text-white/70">{trade.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Floor