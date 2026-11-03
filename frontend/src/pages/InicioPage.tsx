export default function InicioPage() {
  return (
    <div className="min-h-screen bg-gpc-bg text-gpc-text p-6">
      <h1 className="text-3xl font-bold text-gpc-primary mb-6">Inicio</h1>
      <p className="mb-8">Panel de inicio del sistema GECRAI v1.1 Pro</p>

      <div className="gpc-card">
        <h2 className="text-xl font-bold text-gpc-primary mb-4">Bienvenido a GECRAI</h2>
        <p className="mb-4">
          Sistema Inteligente para Memorias de Cálculo Eléctrico. Selecciona una opción del menú para comenzar.
        </p>
        <ul className="space-y-2 text-sm opacity-90">
          <li>• Análisis NOM-001 (verificación normativa eléctrica)</li>
          <li>• Cálculo de Potencia y Corriente</li>
          <li>• Generación de Memorias de Cálculo</li>
          <li>• Gestión de Proyectos Eléctricos</li>
        </ul>
      </div>
    </div>
  )
}
