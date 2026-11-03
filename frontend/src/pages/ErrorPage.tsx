import { Link } from 'react-router-dom'

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gpc-bg text-gpc-text">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gpc-primary">404</h1>
        <p className="mt-4 text-lg">Página no encontrada</p>
        <p className="mt-2 text-sm opacity-70">La ruta que buscas no existe en el sistema GECRAI.</p>
        <Link to="/" className="gpc-btn inline-block mt-6">
          Volver al Inicio
        </Link>
      </div>
    </div>
  )
}
