import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, arbitrum, polygon } from '@reown/appkit/networks'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Your Reown Project ID - replace with your actual project ID
const projectId = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6'

// Set up the Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks: [mainnet, arbitrum, polygon],
  projectId
})

// Set up metadata
const metadata = {
  name: 'Talevest',
  description: 'World\'s First Human Talent Exchange',
  url: 'https://talevest.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Create the modal
export const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [mainnet, arbitrum, polygon],
  metadata,
  features: {
    analytics: true
  },
  allWallets: 'SHOW',
  includeWalletIds: [
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', // MetaMask
    '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0', // Trust Wallet
    '163d2cf19babf05eb8962e9748f9ebe613ed52ebf9c8107c9a0f104bfcf161b3', // Phantom
    '8a0ee50d1f22f6651afcae7eb4253e52a3310b90af5daef78a8c4929a9bb99d4'  // Binance Web3 Wallet
  ]
})

export const wagmiConfig = wagmiAdapter.wagmiConfig