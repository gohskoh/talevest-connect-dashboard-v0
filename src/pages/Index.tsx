import { useState, useEffect } from "react"
import Header from "../components/Header"
import HeroSection from "../components/HeroSection"
import EcosystemSection from "../components/EcosystemSection"
import HowItWorksSection from "../components/HowItWorksSection"
import StatsSection from "../components/StatsSection"

const Index = () => {
  // Stub wallet functionality for non-voting pages
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | undefined>(undefined)

  const handleConnectWallet = () => {
    if (isConnected) {
      setIsConnected(false)
      setAddress(undefined)
    } else {
      // Redirect to voting page for actual wallet functionality
      window.location.href = '/vote'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onConnectWallet={handleConnectWallet}
        isConnected={isConnected}
        address={address}
      />
      
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
