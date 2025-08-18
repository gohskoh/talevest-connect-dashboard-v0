import Header from "../components/Header"
import { useAccount, useDisconnect } from 'wagmi'
import { modal } from '../lib/wallet-config'

const Contracts = () => {
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