import Header from "../components/Header"
import { useAccount, useDisconnect } from 'wagmi'
import { modal } from '../lib/wallet-config'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const Floor = () => {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  const handleConnectWallet = () => {
    if (isConnected) {
      disconnect()
    } else {
      modal.open()
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
    <div className="min-h-screen bg-white">
      <Header 
        onConnectWallet={handleConnectWallet}
        isConnected={isConnected}
        address={address}
      />
      
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
              The Floor
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Trade talent NFTs on the world's first human capital marketplace
            </p>
          </div>

          {/* Market Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">$2.1M</div>
                <div className="text-sm text-gray-600">Total Volume</div>
              </CardContent>
            </Card>
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">3,820</div>
                <div className="text-sm text-gray-600">Active Traders</div>
              </CardContent>
            </Card>
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">156</div>
                <div className="text-sm text-gray-600">Listed Talents</div>
              </CardContent>
            </Card>
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">+24.5%</div>
                <div className="text-sm text-gray-600">24h Change</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Market Overview */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Market Overview</h2>
              <Card className="bg-white border border-gray-200">
                <CardContent className="p-0">
                  <div className="space-y-0">
                    {marketData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-sm font-bold text-gray-700">
                            {item.symbol}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{item.symbol}</div>
                            <div className="text-sm text-gray-600">{item.name}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-gray-900">{item.price}</div>
                          <div className={`text-sm ${item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                            {item.change}
                          </div>
                        </div>
                        <div className="text-right text-sm text-gray-600">
                          <div>{item.volume}</div>
                          <div>Volume</div>
                        </div>
                        <div className="text-right text-sm text-gray-600">
                          <div>{item.marketCap}</div>
                          <div>Market Cap</div>
                        </div>
                        <div className="text-right text-sm text-gray-600">
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
              <Card className="bg-white border border-gray-200 mb-6">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-sm font-bold text-gray-700">
                      MAR
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">MAR</div>
                      <div className="text-sm text-gray-600">Marcus Rodriguez</div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-sm text-gray-600">Current Price</div>
                    <div className="text-lg font-bold text-gray-900">0.067 ETH</div>
                    <div className="text-sm text-green-600">24h Change +12.5%</div>
                    <div className="text-sm text-gray-600 mt-2">Market Cap 670 ETH</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-bold text-gray-900 mb-4">Trade MAR</h3>
                  <div className="flex gap-2 mb-4">
                    <Button className="flex-1 bg-green-600 hover:bg-green-700">Buy</Button>
                    <Button variant="outline" className="flex-1">Sell</Button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-600">Amount (NFTs)</label>
                      <input className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md" placeholder="0" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Price per NFT (ETH)</label>
                      <input className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md" placeholder="0.067" />
                    </div>
                    <div className="text-sm text-gray-600">
                      Total Cost <span className="font-medium">0.00 ETH</span>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Place Buy Order</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Trades */}
              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <h3 className="font-bold text-gray-900">Recent Trades</h3>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-0">
                    {recentTrades.map((trade, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border-b border-gray-200 last:border-b-0">
                        <div className="flex items-center gap-2">
                          <Badge variant={trade.type === 'BUY' ? 'default' : 'secondary'} className={trade.type === 'BUY' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {trade.type}
                          </Badge>
                          <span className="font-medium text-gray-900">{trade.symbol}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-900">{trade.amount}</div>
                          <div className="text-xs text-gray-600">{trade.time}</div>
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