const StatsSection = () => {
  const stats = [
    {
      value: "$60B+",
      label: "Global Sports Market"
    },
    {
      value: "21M",
      label: "TVST Token Supply"
    },
    {
      value: "10K",
      label: "Max NFTs per ITO"
    },
    {
      value: "35%",
      label: "NFT Investment CAGR"
    }
  ]

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="mb-4 p-8 bg-gradient-card rounded-2xl border border-border/50 group-hover:border-primary/50 transition-all duration-300">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-foreground">
                  {stat.label}
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