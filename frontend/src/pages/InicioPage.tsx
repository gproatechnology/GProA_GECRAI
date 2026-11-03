import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { LayoutCard } from '../components/LayoutCard'
import { ButtonGecrai } from '../components/ButtonGecrai'

interface QuickActionProps {
  title: string
  description: string
  icon: string
  onClick: () => void
}

export default function InicioPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState<{ username: string; role: string } | null>(null)

  const quickActions: QuickActionProps[] = [
    {
      title: 'Análisis NOM-001',
      description: 'Verificación normativa eléctrica según NOM-001-SEDE-2012',
      icon: '📋',
      onClick: () => navigate('/gecrai'),
    },
    {
      title: 'Cálculo de Potencia',
      description: 'Cálculo de potencia eléctrica para instalaciones',
      icon: '⚡',
      onClick: () => navigate('/gecrai'),
    },
    {
      title: 'Análisis de Corriente',
      description: 'Análisis de corrientes y protecciones eléctricas',
      icon: '🔌',
      onClick: () => navigate('/gecrai'),
    },
    {
      title: 'Generar Memoria de Cálculo',
      description: 'Crear memoria técnica de cálculo eléctrico',
      icon: '📄',
      onClick: () => navigate('/gecrai'),
    },
  ]

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
    <Layout user={user}>
      <div className="gpc-inicio">
        <header className="gpc-inicio-header">
          <div className="gpc-inicio-brand">
            <div className="gpc-inicio-logo">
              <svg
                width="48"
                height="48"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="32" height="32" rx="8" fill="#00ff00" />
                <path
                  d="M8 8L24 24M24 8L8 24"
                  stroke="#121212"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <h1 className="gpc-inicio-title">Bienvenido a GECRAI</h1>
              <p className="gpc-inicio-subtitle">
                Sistema Inteligente para Memorias de Cálculo Eléctrico v1.1 Pro
              </p>
            </div>
          </div>
          <div className="gpc-inicio-user">
            <span className="gpc-inicio-user-role">{user?.role || 'Usuario'}</span>
            <span className="gpc-inicio-user-name">{user?.username || 'Invitado'}</span>
          </div>
        </header>

        <div className="gpc-inicio-welcome">
          <h2 className="gpc-inicio-welcome-title">¿Qué deseas hacer hoy?</h2>
          <p className="gpc-inicio-welcome-subtitle">
            Selecciona una opción para comenzar a trabajar en tus proyectos eléctricos.
          </p>
        </div>

        <div className="gpc-inicio-actions">
          <div className="gpc-actions-grid">
            {quickActions.map((action, i) => (
              <ButtonGecrai
                key={i}
                onClick={action.onClick}
                variant="primary"
                className="gpc-action-card"
              >
                <div className="gpc-action-icon">{action.icon}</div>
                <div className="gpc-action-text">
                  <div className="gpc-action-title">{action.title}</div>
                  <div className="gpc-action-description">{action.description}</div>
                </div>
              </ButtonGecrai>
            ))}
          </div>
        </div>

        <div className="gpc-inicio-info">
          <LayoutCard title="Información del Sistema">
            <div className="gpc-info-grid">
              <div className="gpc-info-item">
                <span className="gpc-info-label">Versión</span>
                <span className="gpc-info-value">GECRAI v1.1 Pro</span>
              </div>
              <div className="gpc-info-item">
                <span className="gpc-info-label">Desarrollado por</span>
                <span className="gpc-info-value">GProA Technology</span>
              </div>
              <div className="gpc-info-item">
                <span className="gpc-info-label">Licencia</span>
                <span className="gpc-info-value">Professional</span>
              </div>
              <div className="gpc-info-item">
                <span className="gpc-info-label">Usuario actual</span>
                <span className="gpc-info-value">{user?.username || 'Invitado'}</span>
              </div>
              <div className="gpc-info-item">
                <span className="gpc-info-label">Rol</span>
                <span className="gpc-info-value">{user?.role || 'Usuario'}</span>
              </div>
              <div className="gpc-info-item">
                <span className="gpc-info-label">Fecha de sesión</span>
                <span className="gpc-info-value">{new Date().toLocaleDateString('es-MX')}</span>
              </div>
            </div>
          </LayoutCard>
        </div>
      </div>
    </Layout>
  )
}
