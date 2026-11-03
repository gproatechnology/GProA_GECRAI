import { Navigate, useLocation } from 'react-router-dom'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem('gecraiToken')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
