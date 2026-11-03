import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SplashPage from './pages/SplashPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import GecraiPage from './pages/GecraiPage'
import InicioPage from './pages/InicioPage'
import ErrorPage from './pages/ErrorPage'
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/splash" element={<SplashPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/gecrai" element={
          <ProtectedRoute>
            <GecraiPage />
          </ProtectedRoute>
        } />
        <Route path="/inicio" element={
          <ProtectedRoute>
            <InicioPage />
          </ProtectedRoute>
        } />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
