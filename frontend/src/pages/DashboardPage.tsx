export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gpc-bg text-gpc-text p-6">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gpc-primary">Dashboard GECRAI</h1>
          <p className="text-sm opacity-80">Sistema Inteligente para Memorias de Cálculo v1.1 Pro</p>
        </div>
        <div className="text-right">
          <p className="text-sm">Usuario: <span className="font-semibold">admin</span></p>
          <p className="text-xs opacity-70">Rol: Administrador</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="gpc-card">
          <h3 className="text-gpc-primary text-sm font-semibold mb-1">Proyectos Activos</h3>
          <p className="text-2xl font-bold">12</p>
          <p className="text-xs opacity-60 mt-1">En progreso</p>
        </div>
        <div className="gpc-card">
          <h3 className="text-gpc-primary text-sm font-semibold mb-1">Análisis Completados</h3>
          <p className="text-2xl font-bold">45</p>
          <p className="text-xs opacity-60 mt-1">Este mes</p>
        </div>
        <div className="gpc-card">
          <h3 className="text-gpc-primary text-sm font-semibold mb-1">Memorias Generadas</h3>
          <p className="text-2xl font-bold">28</p>
          <p className="text-xs opacity-60 mt-1">Documentos técnicos</p>
        </div>
        <div className="gpc-card">
          <h3 className="text-gpc-primary text-sm font-semibold mb-1">Usuarios Registrados</h3>
          <p className="text-2xl font-bold">8</p>
          <p className="text-xs opacity-60 mt-1">En el sistema</p>
        </div>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="gpc-card">
          <h2 className="text-xl font-bold text-gpc-primary mb-4">Actividad Reciente</h2>
          <div className="space-y-3">
            <div className="p-3 border border-gpc-border rounded bg-[#1a1a1a]">
              <p className="text-sm font-semibold">Análisis NOM-001 completado</p>
              <p className="text-xs opacity-70">Proyecto: Planta Industrial</p>
              <p className="text-xs opacity-60">Hace 2 horas • Estado: Cumple normativa</p>
            </div>
            <div className="p-3 border border-gpc-border rounded bg-[#1a1a1a]">
              <p className="text-sm font-semibold">Memoria de cálculo generada</p>
              <p className="text-xs opacity-70">Proyecto: Centro Comercial</p>
              <p className="text-xs opacity-60">Hace 1 día • 15 páginas técnicas</p>
            </div>
            <div className="p-3 border border-gpc-border rounded bg-[#1a1a1a]">
              <p className="text-sm font-semibold">Nuevo proyecto creado</p>
              <p className="text-xs opacity-70">Sistema de Alumbrado</p>
              <p className="text-xs opacity-60">Hace 3 días • Estado: En progreso</p>
            </div>
          </div>
        </div>

        <div className="gpc-card">
          <h2 className="text-xl font-bold text-gpc-primary mb-4">Proyectos Recientes</h2>
          <div className="space-y-3">
            <div className="p-3 border border-gpc-border rounded cursor-pointer hover:border-gpc-primary transition-colors" onClick={() => {}}>
              <h4 className="text-gpc-primary font-semibold">Planta Industrial - Análisis Completo</h4>
              <p className="text-xs opacity-70">Análisis NOM-001 y memoria de cálculo generada</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs">2025-03-10</span>
                <span className="text-xs text-green-400">Completado</span>
              </div>
            </div>
            <div className="p-3 border border-gpc-border rounded cursor-pointer hover:border-gpc-primary transition-colors" onClick={() => {}}>
              <h4 className="text-gpc-primary font-semibold">Centro Comercial - Memoria de Cálculo</h4>
              <p className="text-xs opacity-70">Documentación técnica para sistema eléctrico</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs">2025-03-08</span>
                <span className="text-xs text-yellow-400">Revisión</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <nav className="mt-8">
        <ul className="space-y-2">
          <li>
            <a
              href="/gecrai"
              className="gpc-btn inline-block w-auto"
              onClick={(e) => {
                e.preventDefault()
                // Navegación programada se maneja por el href del router
              }}
            >
              Asistente GECRAI
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
