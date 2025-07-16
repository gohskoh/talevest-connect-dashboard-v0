import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, TrendingUp, Coins, Shield } from "lucide-react"
import { Link } from "react-router-dom"

const EcosystemSection = () => {
  const ecosystemItems = [
    {
      icon: <Users className="w-6 h-6 text-muted-foreground" />,
      title: "F.Y.T.S.",
      description: "Find Your Talent Section - Social platform for talent discovery and onboarding",
      cta: "Explore Talents",
      href: "/fyts",
      ctaColor: "text-muted-foreground"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-blue-400" />,
      title: "The Floor",
      description: "NFT-powered trading marketplace for talent investments",
      cta: "Start Trading",
      href: "/floor",
      ctaColor: "text-blue-400"
    },
    {
      icon: <Coins className="w-6 h-6 text-yellow-400" />,
      title: "TVST Token",
      description: "Governance and utility token with exclusive benefits",
      cta: "Learn More",
      href: "/token",
      ctaColor: "text-yellow-400"
    },
    {
      icon: <Shield className="w-6 h-6 text-green-400" />,
      title: "Legal NFTs",
      description: "Immutable proof of investment contracts on Ethereum",
      cta: "View Contracts",
      href: "/contracts",
      ctaColor: "text-green-400"
    }
  ]

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            The Talevest Ecosystem
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Four interconnected components revolutionizing human capital investment
          </p>
        </div>

        {/* Ecosystem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ecosystemItems.map((item, index) => (
            <Card 
              key={index} 
              className="bg-gradient-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 group p-6"
            >
              <CardHeader className="pb-4 p-0">
                <div className="mb-4">
                  {item.icon}
                </div>
                <CardTitle className="text-xl font-bold mb-2">
                  {item.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed text-sm mb-4">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Button 
                  variant="ghost" 
                  className={`w-full justify-between hover:bg-transparent p-0 h-auto ${item.ctaColor}`}
                  asChild
                >
                  <Link to={item.href}>
                    {item.cta}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EcosystemSection