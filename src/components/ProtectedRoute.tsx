import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import LoadingScreen from './LoadingScreen'

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingScreen message="Authenticating" />
  }

  if (!user) {
    return <Navigate to="/landing" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute