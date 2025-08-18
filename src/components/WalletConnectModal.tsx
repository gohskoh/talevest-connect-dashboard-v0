import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletName } from '@solana/wallet-adapter-base'

interface WalletConnectModalProps {
  open: boolean
  onClose: () => void
}

export const WalletConnectModal = ({ open, onClose }: WalletConnectModalProps) => {
  const { wallets, select, connect, connecting } = useWallet()
  const [selectedWallet, setSelectedWallet] = useState<WalletName | null>(null)

  const handleWalletSelect = async (walletName: WalletName) => {
    setSelectedWallet(walletName)
    try {
      select(walletName)
      await connect()
      onClose()
    } catch (error) {
      console.error('Failed to connect wallet:', error)
      setSelectedWallet(null)
    }
  }

  // Filter to show only Solana wallets
  const solanaWallets = wallets.filter(wallet => 
    wallet.readyState === 'Installed' || wallet.readyState === 'Loadable'
  )

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Connect a Wallet</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Choose a Solana wallet to connect. Make sure you're on <strong>Devnet</strong>.
          </p>
          <div className="space-y-2">
            {solanaWallets.map((wallet) => (
              <Button
                key={wallet.adapter.name}
                variant="outline"
                className="w-full flex items-center justify-start gap-3 h-12"
                onClick={() => handleWalletSelect(wallet.adapter.name)}
                disabled={connecting && selectedWallet === wallet.adapter.name}
              >
                <img
                  src={wallet.adapter.icon}
                  alt={wallet.adapter.name}
                  className="w-6 h-6"
                />
                <span className="font-medium">{wallet.adapter.name}</span>
                {connecting && selectedWallet === wallet.adapter.name && (
                  <span className="ml-auto text-sm text-muted-foreground">Connecting...</span>
                )}
              </Button>
            ))}
          </div>
          {solanaWallets.length === 0 && (
            <div className="text-center py-6">
              <p className="text-sm text-muted-foreground mb-4">
                No Solana wallets detected. Please install a Solana wallet like Phantom.
              </p>
              <Button
                variant="outline"
                onClick={() => window.open('https://phantom.app', '_blank')}
              >
                Install Phantom Wallet
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}