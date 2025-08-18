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
      id: "RON",
      name: "Marcus Rodriguez",
      age: 19,
      category: "Sports",
      subcategory: "Football",
      description: "Rising football star with exceptional speed and precision. Youngest player to score 15 goals in amateur league.",
      rating: 4.8,
      followers: "124K",
      progress: "8,500/10,000",
      price: "0.025 ETH",
      verified: true,
      contract_signed: true,
      earnings_potential: "$2.5M annually",
      achievements: ["Regional Champion 2024", "Best Young Player Award", "15 Goals in Season"],
      location: "São Paulo, Brazil",
      background_check: "✅ Verified",
      parent_consent: "✅ Approved",
      avatar: "MR"
    },
    {
      id: "SCH",
      name: "Sophia Chen",
      age: 17,
      category: "Entertainment",
      subcategory: "Social Media",
      description: "Multi-talented performer with viral social media presence. 50M+ total views across platforms.",
      rating: 4.9,
      followers: "89K",
      progress: "7,200/10,000",
      price: "0.019 ETH",
      verified: true,
      contract_signed: true,
      earnings_potential: "$1.8M annually",
      achievements: ["Viral Video Creator", "Brand Ambassador", "2M Followers Growth"],
      location: "Los Angeles, USA",
      background_check: "✅ Verified",
      parent_consent: "✅ Approved",
      avatar: "SC"
    },
    {
      id: "DTH",
      name: "David Thompson",
      age: 20,
      category: "Sports",
      subcategory: "Basketball",
      description: "Basketball prodigy with incredible court vision. Top prospect for professional draft.",
      rating: 4.7,
      followers: "156K",
      progress: "9,100/10,000",
      price: "0.032 ETH",
      verified: true,
      contract_signed: true,
      earnings_potential: "$5.2M annually",
      achievements: ["College All-Star", "Triple-Double Record", "MVP 2024"],
      location: "Chicago, USA",
      background_check: "✅ Verified",
      parent_consent: "N/A (18+)",
      avatar: "DT"
    },
    {
      id: "EWA",
      name: "Emma Walsh",
      age: 18,
      category: "Art",
      subcategory: "Digital Art",
      description: "Digital artist creating revolutionary NFT collections. Featured in major galleries.",
      rating: 4.6,
      followers: "67K",
      progress: "6,800/10,000",
      price: "0.017 ETH",
      verified: true,
      contract_signed: true,
      earnings_potential: "$1.2M annually",
      achievements: ["Gallery Exhibition", "NFT Collection Sold Out", "Art Innovation Award"],
      location: "London, UK",
      background_check: "✅ Verified",
      parent_consent: "✅ Approved",
      avatar: "EW"
    },
    {
      id: "CAR",
      name: "Carlos Martinez",
      age: 21,
      category: "Entertainment",
      subcategory: "Music",
      description: "Musician and producer with chart-topping potential. Multi-platinum songwriter.",
      rating: 4.8,
      followers: "203K",
      progress: "9,400/10,000",
      price: "0.041 ETH",
      verified: true,
      contract_signed: true,
      earnings_potential: "$6.8M annually",
      achievements: ["Platinum Single", "Producer of the Year", "Grammy Nomination"],
      location: "Nashville, USA",
      background_check: "✅ Verified",
      parent_consent: "N/A (18+)",
      avatar: "CM"
    },
    {
      id: "AIP",
      name: "Aisha Patel",
      age: 16,
      category: "Sports",
      subcategory: "Tennis",
      description: "Tennis champion with Olympic aspirations. Youngest to reach national finals.",
      rating: 4.9,
      followers: "98K",
      progress: "7,800/10,000",
      price: "0.028 ETH",
      verified: true,
      contract_signed: true,
      earnings_potential: "$3.4M annually",
      achievements: ["National Finalist", "Youth Champion", "Olympic Training Squad"],
      location: "Mumbai, India",
      background_check: "✅ Verified",
      parent_consent: "✅ Approved",
      avatar: "AP"
    }
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
          {/* Hero Section */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-white/10 text-white border-white/20">🔍 F.Y.T.S.</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Find Your Talent Section
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
              Discover and invest in the next generation of talent across sports, entertainment, and art. 
              Each talent undergoes rigorous verification and signs binding legal contracts.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">100+</div>
                <div className="text-sm text-white/70">Verified Talents</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">$2.5M+</div>
                <div className="text-sm text-white/70">Invested</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">16+</div>
                <div className="text-sm text-white/70">Age Requirement</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">10%</div>
                <div className="text-sm text-white/70">Annual Returns</div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex justify-center mb-8">
            <div className="flex gap-2 p-1 bg-white/10 backdrop-blur-sm rounded-xl">
              <Button size="sm" className="bg-white text-primary shadow-sm">All Categories</Button>
              <Button size="sm" variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">Sports</Button>
              <Button size="sm" variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">Entertainment</Button>
              <Button size="sm" variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">Art</Button>
            </div>
          </div>

          {/* Talent Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {talents.map((talent, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-500 hover:shadow-xl group">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-white font-bold text-lg">
                      {talent.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-white text-lg">{talent.name}</h3>
                        <Badge className="bg-white/10 text-white border-white/20">✅ Verified</Badge>
                        <Badge variant="outline" className="text-xs text-white/70 border-white/30">${talent.id}</Badge>
                      </div>
                      <p className="text-sm text-white/70 mb-1">
                        Age {talent.age} • {talent.subcategory} • {talent.location}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400 text-sm">★</span>
                          <span className="font-semibold text-sm text-white">{talent.rating}</span>
                        </div>
                        <div className="text-sm text-white/70">{talent.followers} followers</div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-white/80 leading-relaxed">{talent.description}</p>
                  
                  {/* Achievements */}
                  <div>
                    <h4 className="font-semibold text-white mb-2 text-sm">Recent Achievements</h4>
                    <div className="flex flex-wrap gap-1">
                      {talent.achievements.slice(0, 3).map((achievement, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs bg-white/10 text-white/80 border-white/20">
                          {achievement}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Investment Details */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white/70">ITO Progress</span>
                      <span className="text-sm font-medium text-white">{talent.progress}</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div 
                        className="bg-white/60 h-2 rounded-full transition-all duration-500" 
                        style={{width: `${parseInt(talent.progress.split('/')[0]) / parseInt(talent.progress.split('/')[1]) * 100}%`}}
                      ></div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div>
                        <div className="text-xs text-white/70">Price per NFT</div>
                        <div className="font-bold text-white">{talent.price}</div>
                      </div>
                      <div>
                        <div className="text-xs text-white/70">Earnings Potential</div>
                        <div className="font-bold text-white/90">{talent.earnings_potential}</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent border-white/30 text-white hover:bg-white/10">
                      📋 View Details
                    </Button>
                    <Button size="sm" className="flex-1 bg-white text-primary hover:bg-white/90">
                      💰 Invest Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Apply Section */}
          <Card className="bg-white/10 backdrop-blur-sm border border-white/20 max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <Badge className="mb-4 bg-white/10 text-white border-white/20 mx-auto">🎯 Join the Platform</Badge>
              <h2 className="text-3xl font-bold text-white mb-4">Are You a Talent?</h2>
              <p className="text-lg text-white/80 mb-8">
                Join the world's first human talent exchange. Get funded by investors who believe in your potential 
                and share 10% of your professional earnings annually.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">1</div>
                  <h4 className="font-bold text-white mb-2">Submit Application</h4>
                  <p className="text-sm text-white/70">Provide biodata, audio-visual showcases, and parent consent (if under 18)</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">2</div>
                  <h4 className="font-bold text-white mb-2">Verification Process</h4>
                  <p className="text-sm text-white/70">Undergo vetting, doxxing, and background verification by our expert panel</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">3</div>
                  <h4 className="font-bold text-white mb-2">Launch ITO</h4>
                  <p className="text-sm text-white/70">Sign binding legal contracts and launch your Initial Talent Offering</p>
                </div>
              </div>
              
              {/* Requirements */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 mb-8">
                <h4 className="font-semibold text-white mb-4">Requirements</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                    <span className="text-sm text-white/70">Minimum age: 16 years</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                    <span className="text-sm text-white/70">Parent consent (if under 18)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                    <span className="text-sm text-white/70">Background verification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white/50 rounded-full"></div>
                    <span className="text-sm text-white/70">Demonstrated talent</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button className="bg-white text-primary hover:bg-white/90 shadow-lg" asChild>
                  <Link to="/apply">🚀 Apply to List Your Talent</Link>
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