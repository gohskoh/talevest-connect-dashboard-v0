import siteLogo from '@/assets/site-logo.png'

const LoadingScreen = () => {

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo with Circular Loading */}
        <div className="relative inline-block">
          {/* Circular Loading Spinner */}
          <div className="absolute inset-0 w-32 h-32 -m-4">
            <svg className="w-full h-full animate-spin" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="2"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="70 200"
                className="animate-[spin_2s_linear_infinite]"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          {/* Logo */}
          <img 
            src={siteLogo} 
            alt="Talevest" 
            className="h-24 w-24 mx-auto drop-shadow-2xl relative z-10"
          />
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen