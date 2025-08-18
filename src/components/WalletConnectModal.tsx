import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletName } from '@solana/wallet-adapter-base'
import { Smartphone, Monitor, QrCode } from 'lucide-react'

interface WalletConnectModalProps {
  open: boolean
  onClose: () => void
}

export const WalletConnectModal = ({ open, onClose }: WalletConnectModalProps) => {
  const { wallets, select, connect, connecting } = useWallet()
  const [selectedWallet, setSelectedWallet] = useState<WalletName | null>(null)
  const [showQRCode, setShowQRCode] = useState(false)

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

  const handleQRConnect = () => {
    setShowQRCode(true)
    // In a real implementation, you would generate a connection QR code here
    alert('QR Code connection coming soon! For now, please use the wallet extension.')
  }

  // Popular Solana wallets
  const popularWallets = [
    { name: 'Phantom', icon: '👻', description: 'Most popular Solana wallet' },
    { name: 'Solflare', icon: '🔥', description: 'Feature-rich Solana wallet' },
    { name: 'Backpack', icon: '🎒', description: 'Modern web3 wallet' }
  ]

  // Filter installed wallets
  const installedWallets = wallets.filter(wallet => 
    wallet.readyState === 'Installed'
  )

  // Filter loadable wallets (not installed but available)
  const availableWallets = wallets.filter(wallet => 
    wallet.readyState === 'Loadable'
  )

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white/10 backdrop-blur-sm border border-white/20">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <span>Connect Wallet</span>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Devnet</Badge>
          </DialogTitle>
          <DialogDescription className="text-white/70">
            Choose how you'd like to connect your Solana wallet
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="installed" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/10">
            <TabsTrigger value="installed" className="text-white data-[state=active]:bg-white/20">
              <Monitor className="w-4 h-4 mr-2" />
              Desktop
            </TabsTrigger>
            <TabsTrigger value="mobile" className="text-white data-[state=active]:bg-white/20">
              <Smartphone className="w-4 h-4 mr-2" />
              Mobile
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="installed" className="space-y-3">
            {installedWallets.length > 0 ? (
              <div className="space-y-2">
                <p className="text-sm text-white/70 mb-3">Detected wallets:</p>
                {installedWallets.map((wallet) => (
                  <Card key={wallet.adapter.name} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                    <CardContent className="p-3">
                      <Button
                        variant="ghost"
                        className="w-full flex items-center justify-start gap-3 h-auto p-0 text-white hover:bg-transparent"
                        onClick={() => handleWalletSelect(wallet.adapter.name)}
                        disabled={connecting && selectedWallet === wallet.adapter.name}
                      >
                        <img
                          src={wallet.adapter.icon}
                          alt={wallet.adapter.name}
                          className="w-8 h-8 rounded-lg"
                        />
                        <div className="flex-1 text-left">
                          <div className="font-medium">{wallet.adapter.name}</div>
                          <div className="text-sm text-white/60">Ready to connect</div>
                        </div>
                        {connecting && selectedWallet === wallet.adapter.name && (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        )}
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Installed</Badge>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-white/70 mb-3">Popular Solana wallets:</p>
                {popularWallets.map((wallet) => (
                  <Card key={wallet.name} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                    <CardContent className="p-3">
                      <Button
                        variant="ghost"
                        className="w-full flex items-center justify-start gap-3 h-auto p-0 text-white hover:bg-transparent"
                        onClick={() => window.open(`https://${wallet.name.toLowerCase()}.app`, '_blank')}
                      >
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-lg">
                          {wallet.icon}
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-medium">{wallet.name}</div>
                          <div className="text-sm text-white/60">{wallet.description}</div>
                        </div>
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Install</Badge>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="mobile" className="space-y-3">
            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all cursor-pointer">
              <CardContent className="p-4 text-center">
                <Button
                  variant="ghost"
                  className="w-full text-white hover:bg-transparent"
                  onClick={handleQRConnect}
                >
                  <div className="space-y-2">
                    <QrCode className="w-12 h-12 mx-auto text-white/70" />
                    <div>
                      <div className="font-medium">Scan QR Code</div>
                      <div className="text-sm text-white/60">Connect with mobile wallet</div>
                    </div>
                  </div>
                </Button>
              </CardContent>
            </Card>
            
            <div className="space-y-2">
              <p className="text-sm text-white/70">Or install mobile wallet:</p>
              {['Phantom', 'Solflare'].map((walletName) => (
                <Card key={walletName} className="bg-white/5 border-white/10">
                  <CardContent className="p-3">
                    <Button
                      variant="ghost"
                      className="w-full flex items-center justify-between text-white hover:bg-transparent"
                      onClick={() => window.open(`https://${walletName.toLowerCase()}.app`, '_blank')}
                    >
                      <span>{walletName}</span>
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Get App</Badge>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}