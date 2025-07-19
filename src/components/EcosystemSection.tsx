import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, BarChart3, Coins, Shield } from "lucide-react"
import { Link } from "react-router-dom"

const EcosystemSection = () => {
  const ecosystemItems = [
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "F.Y.T.S.",
      subtitle: "Find Your Talent Section",
      description: "Social platform for talent discovery and onboarding. Where future stars are born and verified.",
      features: ["Talent vetting", "Background verification", "Parent consent for minors"],
      link: "/fyts",
      linkText: "Explore Talents →"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-accent" />,
      title: "The Floor",
      subtitle: "Trading Marketplace",
      description: "NFT-powered trading marketplace for talent investments with real-time price discovery.",
      features: ["Initial Talent Offerings (ITOs)", "Secondary trading", "Price discovery"],
      link: "/floor",
      linkText: "Start Trading →"
    },
    {
      icon: <Coins className="w-8 h-8 text-primary" />,
      title: "TVST Token",
      subtitle: "Governance & Utility",
      description: "ERC-20 governance token with 21M supply providing exclusive access and voting rights.",
      features: ["Early ITO access", "Governance voting", "Exclusive rewards"],
      link: "/token",
      linkText: "Learn More →"
    },
    {
      icon: <Shield className="w-8 h-8 text-accent" />,
      title: "Legal NFTs",
      subtitle: "Proof of Investment",
      description: "Immutable legal contracts on Ethereum guaranteeing 10% of talent's professional earnings.",
      features: ["Ethereum-based", "Legally binding", "Audited contracts"],
      link: "/contracts",
      linkText: "View Contracts →"
    }
  ]

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">🏗️ Complete Ecosystem</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            The Talevest Ecosystem
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Four interconnected components revolutionizing human capital investment through blockchain technology
          </p>
        </div>

        {/* Ecosystem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {ecosystemItems.map((item, index) => (
            <Card key={index} className="bg-gradient-card border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 group">
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl font-bold text-card-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </CardTitle>
                    <p className="text-primary font-medium text-sm mt-1">{item.subtitle}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground mb-4 leading-relaxed text-base">
                  {item.description}
                </CardDescription>
                <ul className="space-y-2 mb-6">
                  {item.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="ghost" className="text-primary hover:text-primary-hover hover:bg-primary/10 w-full justify-between group" asChild>
                  <Link to={item.link}>
                    {item.linkText}
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Process Flow */}
        <div className="bg-gradient-card border border-border rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-center mb-8 text-card-foreground">How It All Works Together</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold mx-auto mb-3">1</div>
              <h4 className="font-semibold text-card-foreground mb-2">Talent Application</h4>
              <p className="text-sm text-muted-foreground">Apply through F.Y.T.S. with verification</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold mx-auto mb-3">2</div>
              <h4 className="font-semibold text-card-foreground mb-2">Legal Contract</h4>
              <p className="text-sm text-muted-foreground">Sign binding NFT contract on Ethereum</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold mx-auto mb-3">3</div>
              <h4 className="font-semibold text-card-foreground mb-2">ITO Launch</h4>
              <p className="text-sm text-muted-foreground">Initial Talent Offering on The Floor</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold mx-auto mb-3">4</div>
              <h4 className="font-semibold text-card-foreground mb-2">Earn Dividends</h4>
              <p className="text-sm text-muted-foreground">Receive 10% of professional earnings</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EcosystemSection