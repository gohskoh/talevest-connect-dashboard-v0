import { useState, useEffect } from "react"
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { modal } from '../lib/wallet-config'
import Header from "../components/Header"
import HeroSection from "../components/HeroSection"
import EcosystemSection from "../components/EcosystemSection"
import HowItWorksSection from "../components/HowItWorksSection"
import StatsSection from "../components/StatsSection"

const Index = () => {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  const handleConnectWallet = () => {
    if (isConnected) {
      disconnect()
    } else {
      modal.open()
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
