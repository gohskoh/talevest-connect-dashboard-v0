import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpIiAvPgo8L3N2Zz4K')] opacity-30"></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Badge */}
        <Badge variant="outline" className="mb-8 bg-white/10 border-white/30 text-white text-sm backdrop-blur-sm">
          🌟 World's First Human Talent Exchange
        </Badge>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
          Invest in the Future of{" "}
          <span className="text-white/90">
            Talent
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed">
          Crowdfund talented individuals through cryptocurrency and blockchain. Own NFTs as{" "}
          <span className="text-white font-semibold">Proof of Investment</span> and earn dividends from their future success.
        </p>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
            <div className="text-2xl mb-2">🎯</div>
            <h3 className="font-semibold text-white mb-2">Invest Early</h3>
            <p className="text-sm text-white/70">Get in early on the next sports superstar or entertainment icon</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
            <div className="text-2xl mb-2">💰</div>
            <h3 className="font-semibold text-white mb-2">Earn Dividends</h3>
            <p className="text-sm text-white/70">Receive 10% of talent's professional earnings annually</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
            <div className="text-2xl mb-2">🔒</div>
            <h3 className="font-semibold text-white mb-2">Secure NFTs</h3>
            <p className="text-sm text-white/70">Immutable proof of investment on Ethereum blockchain</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg" asChild>
            <Link to="/fyts">
              🔍 Discover Talents
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 shadow-lg" asChild>
            <Link to="/floor">
              📈 Start Trading
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">$60B+</div>
            <div className="text-sm text-white/70">Sports Market</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">21M</div>
            <div className="text-sm text-white/70">TVST Supply</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">10K</div>
            <div className="text-sm text-white/70">Max NFTs/ITO</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">35%</div>
            <div className="text-sm text-white/70">Investment CAGR</div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg animate-pulse delay-500"></div>
    </section>
  )
}

export default HeroSection