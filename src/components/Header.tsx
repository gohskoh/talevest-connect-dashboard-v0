import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X } from "lucide-react"


interface HeaderProps {
  onConnectWallet: () => void
  isConnected: boolean
  address?: string
}

const Header = ({ onConnectWallet, isConnected, address }: HeaderProps) => {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { name: "F.Y.T.S.", href: "/fyts" },
    { name: "The Floor", href: "/floor" },
    { name: "TVST Token", href: "/token" },
    { name: "Talent Voting", href: "/vote" }
  ]

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-hero border-b border-white/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src="/lovable-uploads/fe0566bd-7ad0-4860-b641-05fb5f359d97.png" alt="Talevest logo - talent investing platform" className="w-8 h-8 rounded-lg" loading="eager" />
            <span className="text-lg font-semibold text-white">Talevest</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-white ${
                  location.pathname === item.href ? "text-white" : "text-white/70"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Connect Wallet Button */}
          <div className="hidden md:block">
            <Button
              onClick={onConnectWallet}
              variant="outline"
              size="default"
              className="text-sm bg-transparent border-white/40 text-white hover:bg-white/10 hover:border-white/60 shadow-lg backdrop-blur-sm"
            >
              {isConnected ? formatAddress(address || "") : "Connect Wallet"}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-white/10"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/20">
            <nav className="flex flex-col space-y-4 mt-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors hover:text-white ${
                    location.pathname === item.href ? "text-white" : "text-white/70"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button
                onClick={() => {
                  onConnectWallet()
                  setIsMobileMenuOpen(false)
                }}
                variant="outline"
                size="default"
                className="text-sm w-full mt-4 bg-transparent border-white/40 text-white hover:bg-white/10 hover:border-white/60 shadow-lg backdrop-blur-sm"
              >
                {isConnected ? formatAddress(address || "") : "Connect Wallet"}
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header