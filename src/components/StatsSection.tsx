import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const StatsSection = () => {
  const stats = [
    {
      number: "$60B+",
      label: "Global Sports Market",
      description: ""
    },
    {
      number: "21M",
      label: "TVST Token Supply",
      description: ""
    },
    {
      number: "10K",
      label: "Max NFTs per ITO",
      description: ""
    },
    {
      number: "35%",
      label: "NFT Investment CAGR",
      description: ""
    }
  ]

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white border border-gray-200 text-center">
              <CardHeader className="pb-2">
                <CardTitle className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </CardTitle>
                <h3 className="text-xl font-semibold mb-2 text-gray-700">
                  {stat.label}
                </h3>
              </CardHeader>
              {stat.description && (
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    {stat.description}
                  </p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection