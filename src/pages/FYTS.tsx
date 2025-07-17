import Header from "../components/Header"
import { useAccount, useDisconnect } from 'wagmi'
import { modal } from '../lib/wallet-config'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Link } from "react-router-dom"

const FYTS = () => {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  const handleConnectWallet = () => {
    if (isConnected) {
      disconnect()
    } else {
      modal.open()
    }
  }

  const talents = [
    {
      initials: "MR",
      name: "Marcus Rodriguez",
      age: 19,
      category: "Football",
      token: "$MAR",
      description: "Rising star quarterback with exceptional arm strength and field vision",
      rating: 4.8,
      followers: "12,500",
      progress: "7,500/10,000",
      price: "0.05 ETH"
    },
    {
      initials: "SC",
      name: "Sophia Chen",
      age: 17,
      category: "Tennis",
      token: "$SOF",
      description: "Junior tennis champion with powerful baseline game and mental toughness",
      rating: 4.9,
      followers: "8,900",
      progress: "5,200/10,000",
      price: "0.03 ETH"
    },
    {
      initials: "AT",
      name: "Alex Thompson",
      age: 22,
      category: "Music",
      token: "$ALX",
      description: "Singer-songwriter with viral social media presence and record label interest",
      rating: 4.7,
      followers: "45,000",
      progress: "9,100/10,000",
      price: "0.08 ETH"
    }
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
              Find Your Talent Section
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Discover and invest in the next generation of talent across sports, entertainment, and beyond
            </p>
          </div>

          {/* Filters */}
          <div className="flex justify-center mb-8">
            <div className="flex gap-2">
              <Button variant="default" className="bg-blue-600 hover:bg-blue-700">All</Button>
              <Button variant="outline">Sports</Button>
              <Button variant="outline">Entertainment</Button>
              <Button variant="outline">Art</Button>
            </div>
          </div>

          {/* Talent Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {talents.map((talent, index) => (
              <Card key={index} className="bg-white border border-gray-200">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 font-bold">
                      {talent.initials}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-900">{talent.name}</h3>
                        <Badge variant="secondary" className="text-xs">Verified</Badge>
                      </div>
                      <p className="text-sm text-gray-600">Age {talent.age} • {talent.category}</p>
                      <p className="text-sm font-medium text-blue-600">{talent.token}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 mb-4">{talent.description}</p>
                  
                  <div className="flex justify-between text-sm mb-4">
                    <div>
                      <span className="font-bold text-yellow-500">{talent.rating}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">{talent.followers}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">ITO Progress</span>
                      <span className="text-gray-900">{talent.progress}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: `${parseInt(talent.progress.split('/')[0]) / parseInt(talent.progress.split('/')[1]) * 100}%`}}></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900">{talent.price} per NFT</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Preview</Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Invest Now</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Apply Section */}
          <Card className="bg-gray-50 border border-gray-200 max-w-4xl mx-auto">
            <CardHeader>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Are You a Talent?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Join the world's first human talent exchange and get funded by investors who believe in your potential
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">1</div>
                  <h4 className="font-bold text-gray-900 mb-2">Submit Application</h4>
                  <p className="text-sm text-gray-600">Provide biodata, showcases, and required documentation</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">2</div>
                  <h4 className="font-bold text-gray-900 mb-2">Verification Process</h4>
                  <p className="text-sm text-gray-600">Undergo vetting, doxxing, and background verification</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">3</div>
                  <h4 className="font-bold text-gray-900 mb-2">Launch ITO</h4>
                  <p className="text-sm text-gray-600">Sign contracts and launch your Initial Talent Offering</p>
                </div>
              </div>
              <div className="text-center">
                <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                  <Link to="/apply">Apply to List Your Talent</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default FYTS