import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, BarChart3, Coins, Shield } from "lucide-react"
import { Link } from "react-router-dom"

const EcosystemSection = () => {
  const ecosystemItems = [
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: "F.Y.T.S.",
      description: "Find Your Talent Section - Social platform for talent discovery and onboarding",
      link: "/fyts",
      linkText: "Explore Talents →"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
      title: "The Floor",
      description: "NFT-powered trading marketplace for talent investments",
      link: "/floor",
      linkText: "Start Trading →"
    },
    {
      icon: <Coins className="w-8 h-8 text-yellow-600" />,
      title: "TVST Token",
      description: "Governance and utility token with exclusive benefits",
      link: "/token",
      linkText: "Learn More →"
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Legal NFTs",
      description: "Immutable proof of investment contracts on Ethereum",
      link: "/contracts",
      linkText: "View Contracts →"
    }
  ]

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            The Talevest Ecosystem
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Four interconnected components revolutionizing human capital investment
          </p>
        </div>

        {/* Ecosystem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ecosystemItems.map((item, index) => (
            <Card key={index} className="bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                  {item.icon}
                </div>
                <CardTitle className="text-2xl font-bold mb-2 text-gray-900">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 mb-6 leading-relaxed">
                  {item.description}
                </CardDescription>
                <Button variant="ghost" className="text-gray-600 hover:text-gray-800" asChild>
                  <Link to={item.link}>
                    {item.linkText}
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