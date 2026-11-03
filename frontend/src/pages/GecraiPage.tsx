export default function GecraiPage() {
  return (
    <div className="min-h-screen bg-gpc-bg text-gpc-text p-6">
      <h1 className="text-3xl font-bold text-gpc-primary mb-6">Asistente GECRAI</h1>
      <p className="mb-8">Sistema Inteligente para Análisis Eléctricos y Memorias de Cálculo</p>

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

        <div className="gpc-card lg:col-span-2">
          <h2 className="text-xl font-bold text-gpc-primary mb-4">Asistente Inteligente GECRAI</h2>
          <div className="h-80 border border-gpc-border rounded bg-[#1a1a1a] p-4 flex flex-col justify-center items-center">
            <p className="text-center opacity-60 text-sm">
              El asistente con conexión a Ollama se habilitará en una próxima fase.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
