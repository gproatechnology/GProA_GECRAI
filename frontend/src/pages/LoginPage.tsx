import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ButtonGecrai } from '../components/ButtonGecrai'
import { InputGecrai } from '../components/InputGecrai'
import { LayoutCard } from '../components/LayoutCard'
import { Logo } from '../components/Logo'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!username || !password) {
      setError('Por favor ingresa usuario y contraseña')
      return
    }

    setIsLoading(true)
    setError('')

    // Simular autenticación (en Fase 3 se conecta al backend real)
    setTimeout(() => {
      if (username === 'admin' && password === '1234') {
        localStorage.setItem('gecraiToken', 'demo-token')
        localStorage.setItem(
          'gecraiUser',
          JSON.stringify({ username, role: 'admin', loginTime: new Date().toISOString() })
        )
        navigate('/dashboard')
      } else {
        setError('Credenciales incorrectas. Usuario: admin, Contraseña: 1234')
        setIsLoading(false)
      }
    }, 1000)
  }

  return (
    <div className="gpc-login">
      <div className="gpc-login-container">
        <div className="gpc-login-brand">
          <Logo />
          <h1 className="gpc-login-title">GECRAI</h1>
          <p className="gpc-login-subtitle">Sistema Inteligente para Memorias de Cálculo</p>
        </div>

        <LayoutCard title="Iniciar Sesión">
          {error && (
            <div className="gpc-login-error">
              ⚠ {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="gpc-login-form">
            <InputGecrai
              id="username"
              label="Usuario"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu usuario"
              required
            />
            <InputGecrai
              id="password"
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
            />
            <ButtonGecrai
              type="submit"
              variant="primary"
              disabled={isLoading}
              className="gpc-login-btn"
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </ButtonGecrai>
          </form>
        </LayoutCard>

        <div className="gpc-login-footer">
          <p className="gpc-login-footer-text">
            Credenciales de prueba:<br />
            Usuario: <strong>admin</strong><br />
            Contraseña: <strong>1234</strong>
          </p>
          <a
            href="https://gproatechnology.com"
            target="_blank"
            rel="noopener noreferrer"
            className="gpc-login-footer-link"
          >
            Salir a GProA Technology
          </a>
        </div>
      </div>
    </div>
  )
}
