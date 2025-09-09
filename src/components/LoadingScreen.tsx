import { useEffect, useState } from 'react'
import talevestLogo from '@/assets/talevest-logo.png'

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
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="mb-8">
          <div className="relative">
            <img 
              src={talevestLogo} 
              alt="Talevest" 
              className="h-16 w-16 mx-auto animate-bounce"
            />
            <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse"></div>
          </div>
        </div>
        
        {/* Loading Text */}
        <div className="text-white text-xl font-semibold">
          {message}{dots}
        </div>
        
        {/* Progress Indicator */}
        <div className="mt-6 w-48 h-1 bg-white/20 rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-white rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen