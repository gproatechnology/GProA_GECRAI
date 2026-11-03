/**
 * Servicios de documentos para GECRAI.
 * Permite generar y descargar memorias de cálculo en PDF y Excel desde el backend.
 */

const API_BASE_URL = 'http://localhost:8000'

export interface MemoriaRequest {
  proyecto: string
  tag?: string
  normativa?: string
  voltaje: number
  corriente: number
  potencia: number
  fp: number
  longitud: number
  temperaturaAmbiente?: number
  temperaturaCable?: number
  tipoConductor?: string
  hilosPorFase?: number
  canalizacion?: string
  cantidadConductores?: number
  porcentajeVcDeseado?: number
  eficiencia?: number
  r?: number
  xl?: number
  resultado?: Record<string, any>
  owner_id?: number
  project_id?: number
}

export interface MemoriaResponse {
  nombre_archivo: string
  ruta_archivo: string
  mensaje: string
}

export interface MemoriaListItem {
  nombre_archivo: string
  ruta: string
  fecha_creacion: string
  tamaño_bytes: number
}

/**
 * Genera una memoria de cálculo en formato PDF.
 */
export async function generarMemoriaPDF(datos: MemoriaRequest): Promise<MemoriaResponse> {
  const response = await fetch(`${API_BASE_URL}/api/documentos/generar/pdf`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datos),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'Error desconocido' }))
    throw new Error(errorData.detail || 'Error al generar memoria PDF')
  }

  return response.json()
}

/**
 * Genera una memoria de cálculo en formato Excel.
 */
export async function generarMemoriaExcel(datos: MemoriaRequest): Promise<MemoriaResponse> {
  const response = await fetch(`${API_BASE_URL}/api/documentos/generar/excel`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datos),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'Error desconocido' }))
    throw new Error(errorData.detail || 'Error al generar memoria Excel')
  }

  return response.json()
}

/**
 * Descarga un documento de memoria de cálculo.
 */
export async function descargarMemoria(nombreArchivo: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/documentos/${nombreArchivo}`, {
    method: 'GET',
  })

  if (!response.ok) {
    throw new Error(`Error al descargar documento: ${response.status}`)
  }

  const blob = await response.blob()
  const url = window.URL.createObjectURL(blob)
  const enlace = document.createElement('a')
  enlace.href = url
  enlace.download = nombreArchivo
  document.body.appendChild(enlace)
  enlace.click()
  document.body.removeChild(enlace)
  window.URL.revokeObjectURL(url)
}

/**
 * Lista todas las memorias de cálculo generadas.
 */
export async function listarMemorias(): Promise<MemoriaListItem[]> {
  const response = await fetch(`${API_BASE_URL}/api/documentos/`, {
    method: 'GET',
  })

  if (!response.ok) {
    throw new Error('Error al listar memorias')
  }

  return response.json()
}

/**
 * Elimina una memoria de cálculo generada.
 */
export async function eliminarMemoria(nombreArchivo: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/documentos/${nombreArchivo}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error(`Error al eliminar memoria: ${response.status}`)
  }
}

/**
 * Construye los datos de una memoria de cálculo a partir de los parámetros del formulario.
 */
export function construirDatosMemoria(
  params: {
    proyecto?: string
    tag?: string
    voltaje: number
    corriente: number
    potencia: number
    fp: number
    longitud: number
    temperaturaAmbiente?: number
    temperaturaCable?: number
    tipoConductor?: string
    hilosPorFase?: number
    canalizacion?: string
    cantidadConductores?: number
    porcentajeVcDeseado?: number
    eficiencia?: number
    r?: number
    xl?: number
    resultado?: Record<string, any>
    owner_id?: number
    project_id?: number
  }
): MemoriaRequest {
  return {
    proyecto: params.proyecto || 'Proyecto sin nombre',
    tag: params.tag,
    voltaje: params.voltaje,
    corriente: params.corriente,
    potencia: params.potencia,
    fp: params.fp,
    longitud: params.longitud,
    temperaturaAmbiente: params.temperaturaAmbiente,
    temperaturaCable: params.temperaturaCable,
    tipoConductor: params.tipoConductor,
    hilosPorFase: params.hilosPorFase,
    canalizacion: params.canalizacion,
    cantidadConductores: params.cantidadConductores,
    porcentajeVcDeseado: params.porcentajeVcDeseado,
    eficiencia: params.eficiencia,
    r: params.r,
    xl: params.xl,
    resultado: params.resultado,
    owner_id: params.owner_id,
    project_id: params.project_id,
  }
}
