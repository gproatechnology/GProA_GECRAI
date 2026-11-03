import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Logo } from '../components/Logo'

const STEPS = [
  { text: 'Inicializando componentes...', progress: 10 },
  { text: 'Cargando módulos del sistema...', progress: 25 },
  { text: 'Verificando base de datos...', progress: 40 },
  { text: 'Preparando interfaz de usuario...', progress: 55 },
  { text: 'Validando licencias...', progress: 70 },
  { text: 'Cargando asistente inteligente...', progress: 85 },
  { text: 'Sistema listo. Bienvenido a GECRAI.', progress: 100 },
]

export default function SplashPage() {
  const [stepIndex, setStepIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState(STEPS[0].text)
  const [animate, setAnimate] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setInterval(() => {
      if (stepIndex < STEPS.length) {
        setStatus(STEPS[stepIndex].text)
        setProgress(STEPS[stepIndex].progress)
        setAnimate(false)
        setTimeout(() => setAnimate(true), 50)
        setStepIndex((prev) => prev + 1)
      } else {
        clearInterval(timer)
        setTimeout(() => navigate('/login'), 800)
      }
    }, 700)

    return () => clearInterval(timer)
  }, [stepIndex, navigate])

  return (
    <div className="gpc-splash">
      <div className="gpc-splash-container">
        <div className="gpc-splash-logo">
          <div className={`gpc-splash-logo-glow ${animate ? 'active' : ''}`}></div>
          <Logo />
          <div className="gpc-splash-title">GECRAI</div>
          <div className="gpc-splash-subtitle">Sistema Inteligente para Memorias de Cálculo</div>
          <div className="gpc-splash-version">v1.1 Pro &bull; GProA Technology</div>
        </div>

        <div className="gpc-splash-progress">
          <div className="gpc-splash-progress-track">
            <div
              className="gpc-splash-progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="gpc-splash-progress-text">{status}</div>
          <div className="gpc-splash-progress-percent">{progress}%</div>
        </div>

        <div className="gpc-splash-steps">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className={`gpc-splash-step ${
                i < stepIndex ? 'completed' : i === stepIndex ? 'active' : 'pending'
              }`}
            >
              <div className="gpc-splash-step-dot">{i === stepIndex ? '⋯' : i < stepIndex ? '✓' : '○'}</div>
              <span className="gpc-splash-step-text">{step.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
