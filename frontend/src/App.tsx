import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SplashPage from './pages/SplashPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import GecraiPage from './pages/GecraiPage'
import InicioPage from './pages/InicioPage'
import ErrorPage from './pages/ErrorPage'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Layout } from './components/Layout'

function App() {
  const [user, setUser] = useState<{ username: string; role: string } | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('gecraiUser')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        setUser(null)
      }
    }
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout user={user}>
              <SplashPage />
            </Layout>
          }
        />
        <Route
          path="/splash"
          element={
            <Layout user={user}>
              <SplashPage />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout user={user}>
              <LoginPage />
            </Layout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout user={user}>
                <DashboardPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/gecrai"
          element={
            <ProtectedRoute>
              <Layout user={user}>
                <GecraiPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/inicio"
          element={
            <ProtectedRoute>
              <Layout user={user}>
                <InicioPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <Layout user={user}>
              <ErrorPage />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
