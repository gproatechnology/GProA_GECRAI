import { useState, useEffect, useRef } from 'react'

interface ChatMessage {
  id: string
  text: string
  sender: 'user' | 'assistant'
  timestamp: string
}

export default function GecraiPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Mensaje de bienvenida inicial
  useEffect(() => {
    addAssistantMessage(
      "¡Hola! Soy GECRAI, tu asistente inteligente para análisis eléctricos. ¿En qué puedo ayudarte hoy? Puedo ayudarte con cálculos NOM-001, potencia, corriente y generación de memorias de cálculo."
    )
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

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
        "Lo siento, no puedo responder en este momento. Asegúrate de que el servidor backend esté corriendo en http://localhost:8000"
      )
    } finally {
      setIsLoading(false)
      scrollToBottom()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage(e)
    }
  }

  return (
    <div className="min-h-screen bg-gpc-bg text-gpc-text p-6">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gpc-primary">Asistente GECRAI</h1>
          <p className="text-sm opacity-80">Sistema Inteligente para Análisis Eléctricos y Memorias de Cálculo</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gpc-secondary">Modo: Demo (simulado)</p>
          <p className="text-xs opacity-60">Backend: http://localhost:8000</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="gpc-card lg:col-span-1">
          <h2 className="text-xl font-bold text-gpc-primary mb-4">Panel de Control</h2>
          <div className="space-y-3">
            <button className="gpc-btn w-full">Iniciar Análisis</button>
            <button className="gpc-btn w-full">Cargar Proyecto</button>
            <button className="gpc-btn w-full">Generar Reporte</button>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-semibold mb-2 text-gpc-primary">Opciones de Análisis</h3>
            <select className="gpc-input">
              <option value="nom001">NOM-001 (verificación normativa)</option>
              <option value="potencia">Cálculo de Potencia</option>
              <option value="corriente">Análisis de Corriente</option>
              <option value="memoria">Generar Memoria de Cálculo</option>
            </select>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-semibold mb-2 text-gpc-primary">Información del Sistema</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Versión:</span>
                <span className="text-gpc-primary">GECRAI v1.1 Pro</span>
              </div>
              <div className="flex justify-between">
                <span>Desarrollado por:</span>
                <span>GProA Technology</span>
              </div>
              <div className="flex justify-between">
                <span>Licencia:</span>
                <span>Professional</span>
              </div>
            </div>
          </div>
        </div>

        <div className="gpc-card lg:col-span-2 flex flex-col h-[600px]">
          <div className="flex-1 overflow-y-auto p-4 bg-[#1a1a1a] rounded border border-gpc-border">
            <div className="flex flex-col gap-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.sender === 'user'
                        ? 'bg-gpc-primary text-black text-sm font-medium'
                        : 'bg-[#2a2a2a] text-gpc-text text-sm border border-gpc-border'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#2a2a2a] text-gpc-text text-sm p-3 rounded-lg border border-gpc-border animate-pulse">
                    GECRAI está escribiendo...
                  </div>
                </div>
              )}
              {error && (
                <div className="flex justify-start">
                  <div className="bg-red-900/20 border border-red-500 rounded p-3 text-red-400 text-sm">
                    {error}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <form onSubmit={sendMessage} className="p-4 border-t border-gpc-border bg-[#1a1a1a] rounded-b">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Escribe tu consulta sobre análisis eléctrico..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="flex-1 gpc-input"
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="gpc-btn"
              >
                {isLoading ? 'Enviando...' : 'Enviar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
