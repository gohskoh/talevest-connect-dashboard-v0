const StatsSection = () => {
  const stats = [
    {
      value: "$60B+",
      label: "Global Sports Market",
      description: "Total addressable market size"
    },
    {
      value: "21M",
      label: "TVST Token Supply",
      description: "Maximum token circulation"
    },
    {
      value: "10K",
      label: "Max NFTs per ITO",
      description: "Limited edition investments"
    },
    {
      value: "35%",
      label: "NFT Investment CAGR",
      description: "Historical performance"
    }
  ]

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="mb-4 p-6 bg-gradient-card rounded-2xl border border-border/50 group-hover:border-primary/50 transition-all duration-300">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-foreground mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection