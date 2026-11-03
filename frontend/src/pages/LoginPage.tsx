import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!username || !password) {
      setError('Por favor ingresa usuario y contraseña')
      return
    }

    if (username === 'admin' && password === '1234') {
      localStorage.setItem('gecraiToken', 'demo-token')
      localStorage.setItem(
        'gecraiUser',
        JSON.stringify({ username, role: 'admin', loginTime: new Date().toISOString() })
      )
      navigate('/dashboard')
    } else {
      setError('Credenciales incorrectas. Usuario: admin, Contraseña: 1234')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gpc-bg text-gpc-text">
      <div className="gpc-card w-full max-w-md">
        <h2 className="text-2xl font-bold text-gpc-primary mb-2">Iniciar Sesión</h2>
        <p className="mb-6 text-sm opacity-80">Accede a tu cuenta GECRAI</p>

        {error && (
          <div className="mb-4 p-2 bg-red-900/20 border border-red-500 rounded text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Usuario</label>
            <input
              className="gpc-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Contraseña</label>
            <input
              className="gpc-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="gpc-btn w-full">
            Iniciar Sesión
          </button>
        </form>

        <a
          href="https://gproatechnology.com"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center text-sm mt-4 text-gpc-secondary hover:underline"
        >
          Salir a GProA Technology
        </a>
      </div>
    </div>
  )
}
