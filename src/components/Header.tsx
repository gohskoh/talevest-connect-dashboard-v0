import { Button } from "@/components/ui/button"
import { useState } from "react"

interface HeaderProps {
  onConnectWallet: () => void
  isConnected: boolean
  address?: string
}

const Header = ({ onConnectWallet, isConnected, address }: HeaderProps) => {
  const [activeNav, setActiveNav] = useState<string>("")

  const navItems = [
    { name: "F.Y.T.S.", href: "/fyts" },
    { name: "The Floor", href: "/floor" },
    { name: "TVST Token", href: "/token" }
  ]

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-xl font-bold text-foreground">Talevest</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeNav === item.name ? "text-primary" : "text-muted-foreground"
                }`}
                onMouseEnter={() => setActiveNav(item.name)}
                onMouseLeave={() => setActiveNav("")}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Connect Wallet Button */}
          <Button
            onClick={onConnectWallet}
            variant={isConnected ? "outline" : "gradient"}
            size="default"
          >
            {isConnected ? formatAddress(address || "") : "Connect Wallet"}
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header