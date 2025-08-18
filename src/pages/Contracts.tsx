import Header from "../components/Header"
import { useState } from "react"

const Contracts = () => {
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
    <div className="min-h-screen bg-gradient-hero">
      <Header 
        onConnectWallet={handleConnectWallet}
        isConnected={isConnected}
        address={address}
      />
      
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Legal NFTs
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Immutable proof of investment contracts on Ethereum. View and manage your legal investment documentation stored securely on the blockchain.
          </p>
          <div className="text-center text-white/70">
            Coming Soon - Legal Contract System
          </div>
        </div>
      </main>
    </div>
  )
}

export default Contracts