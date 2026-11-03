import { useNavigate } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { LayoutCard } from '../components/LayoutCard'
import { ButtonGecrai } from '../components/ButtonGecrai'
import { Logo } from '../components/Logo'

export default function ErrorPage() {
  const navigate = useNavigate()

  return (
    <Layout>
      <div className="gpc-error">
        <div className="gpc-error-container">
          <div className="gpc-error-brand">
            <Logo />
            <h1 className="gpc-error-title">GECRAI</h1>
          </div>

          <div className="gpc-error-content">
            <div className="gpc-error-code">404</div>
            <h2 className="gpc-error-heading">Página no encontrada</h2>
            <p className="gpc-error-description">
              La página que buscas no existe o ha sido movida. Volver al inicio para continuar.
            </p>
          </div>

          <div className="gpc-error-actions">
            <ButtonGecrai
              onClick={() => navigate('/')}
              variant="primary"
              className="gpc-error-btn-home"
            >
              Volver al Inicio
            </ButtonGecrai>
            <ButtonGecrai
              onClick={() => navigate('/login')}
              variant="outline"
              className="gpc-error-btn-login"
            >
              Ir al Login
            </ButtonGecrai>
          </div>
        </div>
      </div>
    </Layout>
  )
}
