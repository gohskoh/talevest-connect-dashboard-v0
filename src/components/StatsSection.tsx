import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const StatsSection = () => {
  const stats = [
    {
      number: "$60B+",
      label: "Global Sports Market",
      description: "Total addressable market size for sports investments globally",
      trend: "+12% YoY"
    },
    {
      number: "21M",
      label: "TVST Token Supply",
      description: "Fixed maximum supply of Talevest governance tokens",
      trend: "Fixed Cap"
    },
    {
      number: "10K",
      label: "Max NFTs per ITO",
      description: "Maximum number of investment NFTs per talent offering",
      trend: "Per Talent"
    },
    {
      number: "35%",
      label: "NFT Investment CAGR",
      description: "Projected compound annual growth rate for talent NFT investments",
      trend: "5-Year Forecast"
    }
  ]

  const milestones = [
    { phase: "Q1-Q2 2026", title: "MVP Development", status: "upcoming" },
    { phase: "Q3 2026", title: "Pilot ITO Launches", status: "upcoming" },
    { phase: "Q4 2026", title: "Mainnet Deployment", status: "upcoming" },
    { phase: "2027", title: "Multi-Vertical Expansion", status: "planned" }
  ]

  return (
    <section className="py-24 bg-gradient-hero">
      <div className="container mx-auto px-6">
        {/* Market Statistics */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-white/10 text-white border-white/20">📊 Market Analysis</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Market Opportunity
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Capturing the massive global talent investment market with blockchain innovation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 text-center hover:border-white/40 transition-all duration-300 hover:scale-105 group">
              <CardHeader className="pb-4">
                <CardTitle className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">
                  {stat.number}
                </CardTitle>
                <h3 className="text-lg font-semibold mb-2 text-white">
                  {stat.label}
                </h3>
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-white/10 text-white text-xs rounded-full">
                  {stat.trend}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-white/70 text-sm leading-relaxed">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Roadmap Section */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Development Roadmap</h3>
            <p className="text-white/70">Our strategic plan to revolutionize human capital investment</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative">
                <div className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                  milestone.status === 'upcoming' 
                    ? 'border-white/40 bg-white/5 hover:bg-white/10' 
                    : 'border-white/20 bg-white/5 hover:bg-white/10'
                }`}>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                    milestone.status === 'upcoming' 
                      ? 'bg-white text-primary' 
                      : 'bg-white/20 text-white/70'
                  }`}>
                    {milestone.phase}
                  </div>
                  <h4 className="font-semibold text-white mb-2">{milestone.title}</h4>
                  <div className={`text-xs capitalize ${
                    milestone.status === 'upcoming' ? 'text-white' : 'text-white/70'
                  }`}>
                    {milestone.status}
                  </div>
                </div>
                {index < milestones.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-white/30 transform -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default StatsSection