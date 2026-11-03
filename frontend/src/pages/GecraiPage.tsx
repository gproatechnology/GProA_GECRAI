import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { LayoutCard } from '../components/LayoutCard'
import { ButtonGecrai } from '../components/ButtonGecrai'
import { InputGecrai } from '../components/InputGecrai'

interface AnalysisOption {
  value: string
  label: string
  description: string
  icon: string
}

export default function GecraiPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState<{ username: string; role: string } | null>(null)
  const [selectedAnalysis, setSelectedAnalysis] = useState<string>('')

  const analysisOptions: AnalysisOption[] = [
    {
      value: 'nom001',
      label: 'NOM-001 (Verificación Normativa)',
      description: 'Verificación de cumplimiento según NOM-001-SEDE-2012',
      icon: '📋',
    },
    {
      value: 'potencia',
      label: 'Cálculo de Potencia',
      description: 'Cálculo de potencia eléctrica para instalaciones',
      icon: '⚡',
    },
    {
      value: 'corriente',
      label: 'Análisis de Corriente',
      description: 'Análisis de corrientes y protecciones eléctricas',
      icon: '🔌',
    },
    {
      value: 'memoria',
      label: 'Generar Memoria de Cálculo',
      description: 'Crear memoria técnica de cálculo eléctrico',
      icon: '📄',
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

  const handleSelectAnalysis = (value: string) => {
    setSelectedAnalysis(value)
  }

  const handleStartAnalysis = () => {
    if (!selectedAnalysis) {
      return
    }
    navigate('/dashboard')
  }

  return (
    <Layout user={user}>
      <div className="gpc-gecrai">
        <header className="gpc-gecrai-header">
          <div className="gpc-gecrai-header-info">
            <h1 className="gpc-gecrai-title">Asistente GECRAI</h1>
            <p className="gpc-gecrai-subtitle">
              Sistema Inteligente para Análisis Eléctricos y Memorias de Cálculo
            </p>
          </div>
          <div className="gpc-gecrai-user-info">
            <span className="gpc-gecrai-user-role">{user?.role || 'Usuario'}</span>
            <span className="gpc-gecrai-user-name">{user?.username || 'Invitado'}</span>
          </div>
        </header>

        <div className="gpc-gecrai-content">
          <div className="gpc-gecrai-panel">
            <LayoutCard title="Panel de Control">
              <div className="gpc-panel-actions">
                <ButtonGecrai
                  onClick={() => navigate('/gecrai')}
                  variant="primary"
                  className="gpc-panel-btn"
                >
                  Iniciar Análisis
                </ButtonGecrai>
                <ButtonGecrai
                  onClick={() => navigate('/dashboard')}
                  variant="outline"
                  className="gpc-panel-btn"
                >
                  Cargar Proyecto
                </ButtonGecrai>
                <ButtonGecrai
                  onClick={() => {
                    if (selectedAnalysis) {
                      navigate('/dashboard')
                    }
                  }}
                  variant="outline"
                  className="gpc-panel-btn"
                  disabled={!selectedAnalysis}
                >
                  Generar Reporte
                </ButtonGecrai>
              </div>

              <div className="gpc-analysis-options">
                <h3 className="gpc-options-title">Opciones de Análisis</h3>
                <div className="gpc-options-grid">
                  {analysisOptions.map((option) => (
                    <div
                      key={option.value}
                      className={`gpc-option-card ${
                        selectedAnalysis === option.value
                          ? 'gpc-option-selected'
                          : ''
                      }`}
                      onClick={() => handleSelectAnalysis(option.value)}
                    >
                      <div className="gpc-option-icon">{option.icon}</div>
                      <div className="gpc-option-info">
                        <div className="gpc-option-title">{option.label}</div>
                        <div className="gpc-option-description">{option.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </LayoutCard>

            <LayoutCard title="Información del Sistema">
              <div className="gpc-system-info">
                <div className="gpc-info-row">
                  <span className="gpc-info-label">Versión</span>
                  <span className="gpc-info-value">GECRAI v1.1 Pro</span>
                </div>
                <div className="gpc-info-row">
                  <span className="gpc-info-label">Desarrollado por</span>
                  <span className="gpc-info-value">GProA Technology</span>
                </div>
                <div className="gpc-info-row">
                  <span className="gpc-info-label">Licencia</span>
                  <span className="gpc-info-value">Professional</span>
                </div>
                <div className="gpc-info-row">
                  <span className="gpc-info-label">Normativa</span>
                  <span className="gpc-info-value">NOM-001-SEDE-2012</span>
                </div>
              </div>
            </LayoutCard>
          </div>

          <div className="gpc-gecrai-chat">
            <LayoutCard title="Asistente Inteligente GECRAI">
              <div className="gpc-chat-messages">
                <div className="gpc-chat-message gpc-chat-message-assistant">
                  <div className="gpc-chat-message-content">
                    ¡Hola! Soy GECRAI, tu asistente inteligente para análisis eléctricos. ¿En qué puedo ayudarte hoy?
                  </div>
                </div>
                <div className="gpc-chat-message gpc-chat-message-assistant">
                  <div className="gpc-chat-message-content">
                    Puedo ayudarte con cálculos NOM-001, análisis de potencia y corriente, y generación de memorias de cálculo. Selecciona una opción del panel de control para comenzar.
                  </div>
                </div>
              </div>
              <div className="gpc-chat-input">
                <InputGecrai
                  id="chat-input"
                  type="text"
                  placeholder="Escribe tu consulta sobre análisis eléctrico..."
                  onChange={() => {}}
                />
                <ButtonGecrai
                  onClick={() => {}}
                  variant="primary"
                  className="gpc-chat-send-btn"
                >
                  Enviar
                </ButtonGecrai>
              </div>
            </LayoutCard>
          </div>
        </div>
      </div>
    </Layout>
  )
}
