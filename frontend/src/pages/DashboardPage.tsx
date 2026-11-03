import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { LayoutCard } from '../components/LayoutCard'
import { ButtonGecrai } from '../components/ButtonGecrai'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: string
}

interface RecentProjectProps {
  name: string
  status: string
  date: string
  type: string
}

interface RecentActivityProps {
  title: string
  description: string
  time: string
  status: string
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState<{ username: string; role: string } | null>(null)

  // Datos simulados (en Fase 3 se conectan al backend real)
  const stats = [
    { title: 'Proyectos Activos', value: '12', subtitle: 'En progreso', icon: '📊' },
    { title: 'Análisis Completados', value: '45', subtitle: 'Este mes', icon: '🔍' },
    { title: 'Memorias Generadas', value: '28', subtitle: 'Documentos técnicos', icon: '📄' },
    { title: 'Usuarios Registrados', value: '8', subtitle: 'En el sistema', icon: '👥' },
  ]

  const recentProjects = [
    { name: 'Planta Industrial', status: 'Completado', date: '2025-03-10', type: 'Análisis NOM-001' },
    { name: 'Centro Comercial', status: 'Revisión', date: '2025-03-08', type: 'Memoria de Cálculo' },
    { name: 'Sistema de Alumbrado', status: 'En Progreso', date: '2025-03-05', type: 'Análisis de Corriente' },
    { name: 'Edificio Oficina', status: 'Pendiente', date: '2025-03-01', type: 'Generación de Memoria' },
  ]

  const recentActivity = [
    { title: 'Análisis NOM-001 completado', description: 'Proyecto: Planta Industrial', time: 'Hace 2 horas', status: 'Cumple normativa' },
    { title: 'Memoria de cálculo generada', description: 'Proyecto: Centro Comercial', time: 'Hace 1 día', status: '15 páginas técnicas' },
    { title: 'Nuevo proyecto creado', description: 'Sistema de Alumbrado', time: 'Hace 3 días', status: 'Estado: En progreso' },
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
      <div className="gpc-dashboard">
        <header className="gpc-dashboard-header">
          <div className="gpc-dashboard-header-info">
            <h1 className="gpc-dashboard-title">Dashboard GECRAI</h1>
            <p className="gpc-dashboard-subtitle">
              Sistema Inteligente para Memorias de Cálculo v1.1 Pro
            </p>
          </div>
          <div className="gpc-dashboard-user-info">
            <div className="gpc-dashboard-user-badge">
              <span className="gpc-dashboard-user-role">{user?.role || 'Usuario'}</span>
              <span className="gpc-dashboard-user-name">{user?.username || 'Invitado'}</span>
            </div>
          </div>
        </header>

        <div className="gpc-dashboard-stats">
          {stats.map((stat, i) => (
            <LayoutCard key={i} title={stat.title}>
              <div className="gpc-stat-content">
                <span className="gpc-stat-icon">{stat.icon}</span>
                <div className="gpc-stat-values">
                  <div className="gpc-stat-value">{stat.value}</div>
                  <div className="gpc-stat-subtitle">{stat.subtitle}</div>
                </div>
              </div>
            </LayoutCard>
          ))}
        </div>

        <div className="gpc-dashboard-content">
          <div className="gpc-dashboard-projects">
            <LayoutCard title="Proyectos Recientes">
              <div className="gpc-projects-list">
                {recentProjects.map((project, i) => (
                  <div key={i} className="gpc-project-item">
                    <div className="gpc-project-info">
                      <div className="gpc-project-name">{project.name}</div>
                      <div className="gpc-project-meta">
                        <span className="gpc-project-date">{project.date}</span>
                        <span className="gpc-project-type">{project.type}</span>
                      </div>
                    </div>
                    <div className="gpc-project-status">
                      <span
                        className={`gpc-project-status-badge ${
                          project.status.toLowerCase()
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </LayoutCard>
          </div>

          <div className="gpc-dashboard-activity">
            <LayoutCard title="Actividad Reciente">
              <div className="gpc-activity-list">
                {recentActivity.map((activity, i) => (
                  <div key={i} className="gpc-activity-item">
                    <div className="gpc-activity-info">
                      <div className="gpc-activity-title">{activity.title}</div>
                      <div className="gpc-activity-description">{activity.description}</div>
                      <div className="gpc-activity-time">{activity.time}</div>
                    </div>
                    <div className="gpc-activity-status">
                      <span className="gpc-activity-badge">{activity.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </LayoutCard>
          </div>
        </div>

        <div className="gpc-dashboard-actions">
          <LayoutCard title="Acciones Rápidas">
            <div className="gpc-actions-grid">
              <ButtonGecrai
                onClick={() => navigate('/gecrai')}
                variant="primary"
                className="gpc-action-btn"
              >
                Asistente GECRAI
              </ButtonGecrai>
              <ButtonGecrai
                variant="outline"
                onClick={() => navigate('/dashboard')}
                className="gpc-action-btn"
              >
                Nuevo Proyecto
              </ButtonGecrai>
              <ButtonGecrai
                variant="outline"
                onClick={() => navigate('/dashboard')}
                className="gpc-action-btn"
              >
                Ver Memorias
              </ButtonGecrai>
            </div>
          </LayoutCard>
        </div>
      </div>
    </Layout>
  )
}
