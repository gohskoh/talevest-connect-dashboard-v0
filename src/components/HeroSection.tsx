import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpIiAvPgo8L3N2Zz4K')] opacity-40"></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Badge */}
        <Badge variant="outline" className="mb-8 bg-primary/10 border-primary/30 text-primary">
          World's First Human Talent Exchange
        </Badge>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Invest in the Future of{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Talent
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
          Crowdfund talented individuals through cryptocurrency and blockchain. Own NFTs as{" "}
          <span className="text-foreground font-medium">Proof of Investment</span> and earn dividends from their future success.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button size="lg" variant="gradient">
            Discover Talents
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Button>
          <Button size="lg" variant="outline">
            Start Trading
          </Button>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary/10 rounded-full blur-lg animate-pulse delay-500"></div>
    </section>
  )
}

export default HeroSection