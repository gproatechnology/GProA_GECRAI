import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const STEPS = [
  { text: 'Cargando componentes del sistema...', progress: 10 },
  { text: 'Iniciando módulo de autenticación...', progress: 30 },
  { text: 'Configurando base de datos...', progress: 45 },
  { text: 'Preparando interfaz de usuario...', progress: 60 },
  { text: 'Verificando licencias...', progress: 75 },
  { text: 'Cargando asistente inteligente...', progress: 85 },
  { text: '¡Todo listo! Redirigiendo...', progress: 100 },
]

export default function SplashPage() {
  const [stepIndex, setStepIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState(STEPS[0].text)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setInterval(() => {
      if (stepIndex < STEPS.length) {
        setStatus(STEPS[stepIndex].text)
        setProgress(STEPS[stepIndex].progress)
        setStepIndex((prev) => prev + 1)
      } else {
        clearInterval(timer)
        setTimeout(() => navigate('/login'), 1000)
      }
    }, 800)

    return () => clearInterval(timer)
  }, [stepIndex, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gpc-bg text-gpc-text overflow-hidden">
      <div className="splash-container text-center p-8 max-w-md w-full">
        <div className="logo text-4xl font-bold text-gpc-primary mb-2">⚡ GECRAI</div>
        <div className="title text-3xl font-bold mb-2">Sistema Inteligente</div>
        <div className="subtitle text-lg mb-8 opacity-80">Iniciando GECRAI v1.1 Pro...</div>

        <div className="progress-container mb-4">
          <div className="progress-bar w-full h-1.5 bg-[#333] rounded-full overflow-hidden">
            <div
              className="progress-fill h-full bg-gpc-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="status mt-2 text-sm min-h-[24px]">{status}</div>
        </div>

        <div className="loading-spinner mt-6 text-2xl">🔄</div>

        <div className="footer mt-8 text-xs opacity-70">
          <p>Desarrollado por GProA Technology</p>
          <p>Versión 1.1 Pro</p>
        </div>
      </div>
    </div>
  )
}
