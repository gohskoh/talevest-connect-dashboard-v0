import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { Shield, Users, Zap, TrendingUp } from "lucide-react"
import { useEffect } from "react"
import talevestLogo from '@/assets/talevest-logo.png'

const Landing = () => {
  const navigate = useNavigate()

  useEffect(() => {
    document.title = "Talevest - Invest in Talent, Own the Future"
    const desc = "Revolutionary talent investment platform using blockchain technology. Discover emerging talents, invest early, and earn dividends from their success."
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    meta.content = desc
  }, [])

  const features = [
    {
      icon: TrendingUp,
      title: "Invest Early",
      description: "Get in on the ground floor with emerging talents before they hit it big"
    },
    {
      icon: Shield,
      title: "Secure NFTs", 
      description: "Own unique digital certificates that represent your talent investments"
    },
    {
      icon: Zap,
      title: "Earn Dividends",
      description: "Receive returns as your invested talents grow and succeed in their careers"
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Join a community of forward-thinking investors backing the next generation"
    }
  ]

  const stats = [
    { value: "$2.4B", label: "Market Size" },
    { value: "10M", label: "Token Supply" }, 
    { value: "156%", label: "Growth Rate" }
  ]

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src={talevestLogo} alt="Talevest" className="h-8 w-8" />
            <span className="text-xl font-bold text-white">Talevest</span>
          </div>
          <Button 
            onClick={() => navigate('/auth')}
            className="bg-white text-primary hover:bg-white/90"
          >
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium">
              🚀 Revolutionary Talent Investment Platform
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Invest in Talent,
            <br />
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Own the Future
            </span>
          </h1>
          
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover and invest in emerging talents through our blockchain-powered platform. 
            Get early access to the next generation of innovators and earn dividends from their success.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              onClick={() => navigate('/auth')}
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg font-semibold"
            >
              Get Started Now
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
            >
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose Talevest?
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Our platform combines cutting-edge blockchain technology with innovative talent investment strategies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/70">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <Card className="bg-white/10 backdrop-blur-sm border border-white/20 max-w-2xl mx-auto">
            <CardContent className="p-12">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Start Investing?
              </h3>
              <p className="text-white/80 text-lg mb-8">
                Join thousands of investors already discovering and backing the next generation of talent
              </p>
              <Button 
                onClick={() => navigate('/auth')}
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg font-semibold"
              >
                Create Your Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/20">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img src={talevestLogo} alt="Talevest" className="h-6 w-6" />
            <span className="text-lg font-bold text-white">Talevest</span>
          </div>
          <p className="text-white/60">
            © 2024 Talevest. All rights reserved. Invest in talent, own the future.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Landing