import Header from "../components/Header"
import HeroSection from "../components/HeroSection"
import EcosystemSection from "../components/EcosystemSection"
import HowItWorksSection from "../components/HowItWorksSection"
import StatsSection from "../components/StatsSection"

const Index = () => {

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <HeroSection />
        <EcosystemSection />
        <HowItWorksSection />
        <StatsSection />
      </main>
    </div>
  );
};

export default Index;
