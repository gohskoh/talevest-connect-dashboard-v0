import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, DollarSign, TrendingUp } from "lucide-react"

const HowItWorksSection = () => {
  const steps = [
    {
      number: "1",
      icon: <Search className="w-6 h-6 text-muted-foreground" />,
      title: "Discover Talents",
      description: "Browse verified talents on F.Y.T.S. and review their profiles, showcases, and potential"
    },
    {
      number: "2", 
      icon: <DollarSign className="w-6 h-6 text-muted-foreground" />,
      title: "Invest via ITO",
      description: "Participate in Initial Talent Offerings and acquire NFTs representing your investment stake"
    },
    {
      number: "3",
      icon: <TrendingUp className="w-6 h-6 text-muted-foreground" />,
      title: "Earn & Trade",
      description: "Receive dividends from talent earnings and trade NFTs on The Floor marketplace"
    }
  ]

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            How Talevest Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple steps to invest in human talent
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="bg-gradient-card border-border/50 hover:border-primary/50 transition-all duration-300 h-full p-6">
                <CardHeader className="text-center pb-4 p-0">
                  <div className="mx-auto mb-4 w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-lg font-bold text-white">
                    {step.number}
                  </div>
                  <div className="mx-auto mb-4">
                    {step.icon}
                  </div>
                  <CardTitle className="text-xl font-bold">
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center p-0">
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {step.description}
                  </p>
                </CardContent>
              </Card>

              {/* Connecting Arrow (except for last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection