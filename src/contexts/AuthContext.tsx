import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/integrations/supabase/client'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const startTime = Date.now()
    const MINIMUM_LOADING_TIME = 1500 // Minimum 1.5 seconds

    const finishLoading = (session: Session | null) => {
      const elapsedTime = Date.now() - startTime
      const remainingTime = Math.max(0, MINIMUM_LOADING_TIME - elapsedTime)
      
      setTimeout(() => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      }, remainingTime)
    }

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        finishLoading(session)
      }
    )

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      finishLoading(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const value = {
    user,
    session,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}