import { useEffect, useState } from 'react'
import siteLogo from '@/assets/site-logo.png'

interface LoadingScreenProps {
  message?: string
}

const LoadingScreen = ({ message = "Loading..." }: LoadingScreenProps) => {
  const [dots, setDots] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === '...') return ''
        return prev + '.'
      })
    }, 800)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="mb-8">
          <div className="relative inline-block">
            <img 
              src={siteLogo} 
              alt="Talevest" 
              className="h-24 w-24 mx-auto animate-pulse drop-shadow-2xl"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-primary/30 animate-ping"></div>
            <div className="absolute inset-0 rounded-full bg-white/10 animate-pulse delay-75"></div>
          </div>
        </div>
        
        {/* Loading Text */}
        <div className="text-white text-xl font-semibold animate-fade-in">
          {message}{dots}
        </div>
        
        {/* Progress Indicator */}
        <div className="mt-6 w-64 h-2 bg-white/10 rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-gradient-primary rounded-full animate-pulse w-full"></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen