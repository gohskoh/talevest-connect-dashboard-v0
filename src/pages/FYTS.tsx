import Header from "../components/Header"
import { useAccount, useDisconnect } from 'wagmi'
import { modal } from '../lib/wallet-config'

const FYTS = () => {
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
            Find Your Talent Section
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Social platform for talent discovery and onboarding. Connect with verified talents and explore their potential.
          </p>
          <div className="text-center text-muted-foreground">
            Coming Soon - F.Y.T.S. Platform
          </div>
        </div>
      </main>
    </div>
  )
}

export default FYTS