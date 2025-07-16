import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, TrendingUp, Coins, Shield } from "lucide-react"

const EcosystemSection = () => {
  const ecosystemItems = [
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "F.Y.T.S.",
      description: "Find Your Talent Section - Social platform for talent discovery and onboarding",
      cta: "Explore Talents",
      href: "/fyts"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
      title: "The Floor",
      description: "NFT-powered trading marketplace for talent investments",
      cta: "Start Trading",
      href: "/floor"
    },
    {
      icon: <Coins className="w-8 h-8 text-primary" />,
      title: "TVST Token",
      description: "Governance and utility token with exclusive benefits",
      cta: "Learn More",
      href: "/token"
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Legal NFTs",
      description: "Immutable proof of investment contracts on Ethereum",
      cta: "View Contracts",
      href: "/contracts"
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
              className="bg-gradient-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 group"
            >
              <CardHeader className="pb-4">
                <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit group-hover:bg-primary/20 transition-colors">
                  {item.icon}
                </div>
                <CardTitle className="text-xl font-bold">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {item.description}
                </CardDescription>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between hover:bg-primary/10 text-primary"
                  asChild
                >
                  <a href={item.href}>
                    {item.cta}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
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