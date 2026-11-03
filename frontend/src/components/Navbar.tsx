import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Logo } from './Logo'

export interface NavbarProps {
  user?: { username: string; role: string }
}

export function Navbar({ user }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('gecraiToken')
    localStorage.removeItem('gecraiUser')
    navigate('/login')
  }

  return (
    <nav className="gpc-navbar">
      <div className="gpc-navbar-content">
        <div className="gpc-navbar-brand">
          <Logo />
          <span className="gpc-navbar-title">GECRAI</span>
        </div>

        <div className="gpc-navbar-links">
          <button
            className="gpc-navbar-link"
            onClick={() => navigate('/inicio')}
          >
            Inicio
          </button>
          <button
            className="gpc-navbar-link"
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </button>
          <button
            className="gpc-navbar-link"
            onClick={() => navigate('/gecrai')}
          >
            Asistente
          </button>
        </div>

        <div className="gpc-navbar-user">
          {user ? (
            <>
              <div className="gpc-user-info">
                <span className="gpc-user-name">{user.username}</span>
                <span className="gpc-user-role">{user.role}</span>
              </div>
              <button
                className="gpc-btn gpc-btn-logout"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <button
              className="gpc-btn gpc-btn-primary"
              onClick={() => navigate('/login')}
            >
              Iniciar Sesión
            </button>
          )}
        </div>

        <button
          className="gpc-navbar-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menú"
        >
          ≡
        </button>
      </div>
    </nav>
  )
}
