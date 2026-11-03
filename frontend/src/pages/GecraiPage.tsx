import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { LayoutCard } from '../components/LayoutCard'
import { ButtonGecrai } from '../components/ButtonGecrai'
import { InputGecrai } from '../components/InputGecrai'
import {
  esCombinacionValida,
  obtenerMensajeErrorCombinacion,
  obtenerVoltajesValidos,
  esPotenciaValida,
  obtenerMensajeErrorPotencia,
  esLongitudValida,
  obtenerMensajeErrorLongitud,
  esFactorPotenciaValido,
  obtenerMensajeErrorFactorPotencia,
} from '../utils/nom001-validation'

interface ChatMessage {
  id: string
  text: string
  sender: 'user' | 'assistant'
  timestamp: string
}

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
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Estado para los parámetros de cálculo NOM-001
  const [voltaje, setVoltaje] = useState<number>(230)
  const [fases, setFases] = useState<number>(3)
  const [hp, setHp] = useState<number>(20)
  const [fp, setFp] = useState<number>(0.85)
  const [longitud, setLongitud] = useState<number>(0.07)
  const [validacionError, setValidacionError] = useState<string | null>(null)

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Validar cuando cambien voltaje o fases
  useEffect(() => {
    const mensaje = obtenerMensajeErrorCombinacion(fases, voltaje)
    setValidacionError(mensaje)
  }, [fases, voltaje])

  const addUserMessage = (text: string) => {
    const message: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, message])
  }

  const addAssistantMessage = (text: string) => {
    const message: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: 'assistant',
      timestamp: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, message])
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return

    const userText = inputValue.trim()
    setInputValue('')
    setError(null)
    addUserMessage(userText)
    setIsLoading(true)

    try {
      const response = await fetch('http://localhost:8000/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userText,
          conversation_id: 'demo-conversation',
        }),
      })

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      addAssistantMessage(data.response)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Error al conectar con el asistente. Asegúrate de que el backend esté corriendo en http://localhost:8000'
      )
      addAssistantMessage(
        'Lo siento, no puedo responder en este momento. Asegúrate de que el servidor backend esté corriendo.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage(e)
    }
  }

  const handleSelectAnalysis = (value: string) => {
    setSelectedAnalysis(value)
  }

  const handleStartAnalysis = () => {
    if (!selectedAnalysis) {
      return
    }

    // Validar parámetros antes de iniciar el análisis
    const errores: string[] = []

    const mensajeCombinacion = obtenerMensajeErrorCombinacion(fases, voltaje)
    if (mensajeCombinacion) {
      errores.push(mensajeCombinacion)
    }

    const mensajePotencia = obtenerMensajeErrorPotencia(hp)
    if (mensajePotencia) {
      errores.push(mensajePotencia)
    }

    const mensajeLongitud = obtenerMensajeErrorLongitud(longitud)
    if (mensajeLongitud) {
      errores.push(mensajeLongitud)
    }

    const mensajeFp = obtenerMensajeErrorFactorPotencia(fp)
    if (mensajeFp) {
      errores.push(mensajeFp)
    }

    if (errores.length > 0) {
      setValidacionError(errores.join(' '))
      return
    }

    setValidacionError(null)
    navigate('/dashboard')
  }

  const handleVoltajeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = parseFloat(e.target.value)
    if (!isNaN(valor)) {
      setVoltaje(valor)
    }
  }

  const handleFasesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const valor = parseInt(e.target.value, 10)
    if (!isNaN(valor)) {
      setFases(valor)
    }
  }

  const handleHpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = parseFloat(e.target.value)
    if (!isNaN(valor)) {
      setHp(valor)
    }
  }

  const handleFpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = parseFloat(e.target.value)
    if (!isNaN(valor)) {
      setFp(valor)
    }
  }

  const handleLongitudChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = parseFloat(e.target.value)
    if (!isNaN(valor)) {
      setLongitud(valor)
    }
  }

  // Voltajes disponibles según las fases seleccionadas
  const voltajesDisponibles = obtenerVoltajesValidos(fases)

  // Si el voltaje actual ya no es válido para las fases seleccionadas, resetearlo
  useEffect(() => {
    if (!esCombinacionValida(fases, voltaje) && voltajesDisponibles.length > 0) {
      setVoltaje(voltajesDisponibles[0])
    }
  }, [fases, voltajesDisponibles, voltaje])

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

            <LayoutCard title="Parámetros de Cálculo (NOM-001)">
              <div className="gpc-form-params">
                <div className="gpc-form-group">
                  <InputGecrai
                    id="voltaje"
                    label="Voltaje (V)"
                    type="number"
                    value={voltaje}
                    onChange={handleVoltajeChange}
                    required
                  />
                </div>

                <div className="gpc-form-group">
                  <label className="gpc-input-label">Fases</label>
                  <select
                    className="gpc-input"
                    value={fases}
                    onChange={handleFasesChange}
                  >
                    {[1, 2, 3].map((f) => (
                      <option key={f} value={f}>
                        {f} fase{f > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="gpc-form-group">
                  <InputGecrai
                    id="hp"
                    label="Potencia (HP)"
                    type="number"
                    value={hp}
                    onChange={handleHpChange}
                    required
                  />
                </div>

                <div className="gpc-form-group">
                  <InputGecrai
                    id="fp"
                    label="Factor de Potencia (FP)"
                    type="number"
                    value={fp}
                    step="0.01"
                    onChange={handleFpChange}
                    required
                  />
                </div>

                <div className="gpc-form-group">
                  <InputGecrai
                    id="longitud"
                    label="Longitud (km)"
                    type="number"
                    value={longitud}
                    step="0.001"
                    onChange={handleLongitudChange}
                    required
                  />
                </div>
              </div>

              {validacionError && (
                <div className="gpc-validation-error">
                  ⚠ {validacionError}
                </div>
              )}
            </LayoutCard>
          </div>

          <div className="gpc-gecrai-chat">
            <LayoutCard title="Asistente Inteligente GECRAI">
              <div className="gpc-chat-messages">
                {messages.length === 0 && (
                  <div className="gpc-chat-empty">
                    <span className="gpc-chat-empty-text">
                      No hay mensajes aún. Escribe tu primera consulta.
                    </span>
                  </div>
                )}
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`gpc-chat-message gpc-chat-message-${msg.sender}`}
                  >
                    <div className="gpc-chat-message-content">{msg.text}</div>
                  </div>
                ))}
                {isLoading && (
                  <div className="gpc-chat-message gpc-chat-message-assistant">
                    <div className="gpc-chat-message-content gpc-chat-typing">
                      GECRAI está escribiendo<span className="gpc-chat-typing-dots">...</span>
                    </div>
                  </div>
                )}
                {error && (
                  <div className="gpc-chat-message gpc-chat-message-assistant">
                    <div className="gpc-chat-message-content gpc-chat-message-error">
                      {error}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <form onSubmit={sendMessage} className="gpc-chat-form">
                <div className="gpc-chat-input-wrapper">
                  <InputGecrai
                    id="chat-input"
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Escribe tu consulta sobre análisis eléctrico..."
                    onKeyPress={(e) => handleKeyPress(e)}
                    disabled={isLoading}
                  />
                  <ButtonGecrai
                    type="submit"
                    variant="primary"
                    disabled={isLoading || !inputValue.trim()}
                    className="gpc-chat-send-btn"
                  >
                    {isLoading ? 'Enviando...' : 'Enviar'}
                  </ButtonGecrai>
                </div>
              </form>
            </LayoutCard>
          </div>
        </div>
      </div>
    </Layout>
  )
}
