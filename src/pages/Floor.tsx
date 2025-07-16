import Header from "../components/Header"
import { useAccount, useDisconnect } from 'wagmi'
import { modal } from '../lib/wallet-config'

const Floor = () => {
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
      
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            The Floor
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            NFT-powered trading marketplace for talent investments. Trade talent NFTs and track your portfolio performance.
          </p>
          <div className="text-center text-muted-foreground">
            Coming Soon - Trading Marketplace
          </div>
        </div>
      </main>
    </div>
  )
}

export default Floor