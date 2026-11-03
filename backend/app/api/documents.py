"""
Endpoints para generación y descarga de memorias de cálculo GECRAI.
"""

from fastapi import APIRouter, HTTPException, status
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field
from typing import Optional, Dict, Any, List
from app.services.document_service import (
    generar_memoria_pdf,
    generar_memoria_excel,
    obtener_ruta_documento,
    eliminar_documento,
)

router = APIRouter(prefix="/api/documentos", tags=["Memorias de Cálculo"])


class MemoriaRequest(BaseModel):
    """Esquema de solicitud para generar una memoria de cálculo."""
    proyecto: str = Field(..., description="Nombre del proyecto")
    tag: Optional[str] = Field(None, description="Etiqueta del proyecto")
    normativa: str = Field("NOM-001-SEDE-2012", description="Normativa aplicable")
    voltaje: float = Field(..., gt=0, description="Voltaje del sistema en voltios")
    corriente: float = Field(..., gt=0, description="Corriente en amperios")
    potencia: float = Field(..., gt=0, description="Potencia en HP")
    fp: float = Field(..., gt=0, le=1, description="Factor de potencia")
    longitud: float = Field(..., gt=0, le=100, description="Longitud en kilómetros")
    temperaturaAmbiente: float = Field(default=30, description="Temperatura ambiente en °C")
    temperaturaCable: float = Field(default=75, description="Temperatura del cable en °C")
    tipoConductor: str = Field("MULTI", description="Tipo de conductor")
    hilosPorFase: int = Field(default=1, gt=0, description="Hilos por fase")
    canalizacion: str = Field("CHAROLA", description="Tipo de canalización")
    cantidadConductores: int = Field(default=3, gt=0, description="Cantidad de conductores")
    porcentajeVcDeseado: float = Field(default=3, gt=0, le=10, description="Porcentaje de caída deseada")
    eficiencia: float = Field(default=0.9, gt=0, le=1, description="Eficiencia del motor")
    r: float = Field(default=2.56, gt=0, description="Resistencia del conductor")
    xl: float = Field(default=0.171, gt=0, description="Reactancia del conductor")
    resultado: Optional[Dict[str, Any]] = Field(default=None, description="Resultado del cálculo eléctrico")
    owner_id: int = Field(default=1, gt=0, description="ID del usuario propietario")
    project_id: Optional[int] = Field(None, gt=0, description="ID del proyecto asociado")


class MemoriaResponse(BaseModel):
    """Respuesta de generación de memoria."""
    nombre_archivo: str
    ruta_archivo: str
    mensaje: str


class MemoriaListItem(BaseModel):
    """Elemento de lista de memorias."""
    nombre_archivo: str
    ruta: str
    fecha_creacion: str
    tamaño_bytes: int


@router.post("/generar/pdf", response_model=MemoriaResponse, status_code=status.HTTP_201_CREATED)
async def generar_memoria_pdf_endpoint(datos: MemoriaRequest):
    """
    Genera una memoria de cálculo en formato PDF.

    Recibe los parámetros del cálculo eléctrico y devuelve un archivo PDF
    con la memoria completa generada.
    """
    try:
        datos_dict = datos.model_dump()
        nombre_archivo, ruta_archivo = generar_memoria_pdf(datos_dict)

        return MemoriaResponse(
            nombre_archivo=nombre_archivo,
            ruta_archivo=ruta_archivo,
            mensaje="Memoria de cálculo PDF generada exitosamente",
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error generando memoria PDF: {str(e)}",
        )


@router.post("/generar/excel", response_model=MemoriaResponse, status_code=status.HTTP_201_CREATED)
async def generar_memoria_excel_endpoint(datos: MemoriaRequest):
    """
    Genera una memoria de cálculo en formato Excel.

    Recibe los parámetros del cálculo eléctrico y devuelve un archivo Excel
    con la memoria completa generada.
    """
    try:
        datos_dict = datos.model_dump()
        nombre_archivo, ruta_archivo = generar_memoria_excel(datos_dict)

        return MemoriaResponse(
            nombre_archivo=nombre_archivo,
            ruta_archivo=ruta_archivo,
            mensaje="Memoria de cálculo Excel generada exitosamente",
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error generando memoria Excel: {str(e)}",
        )


@router.get("/{nombre_archivo}")
async def descargar_memoria(nombre_archivo: str):
    """
    Descarga un documento de memoria de cálculo previamente generado.

    Retorna el archivo PDF o Excel correspondiente al nombre proporcionado.
    """
    ruta_archivo = obtener_ruta_documento(nombre_archivo)

    if not ruta_archivo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Documento '{nombre_archivo}' no encontrado",
        )

    return FileResponse(
        path=ruta_archivo,
        filename=nombre_archivo,
        media_type="application/octet-stream",
    )


@router.get("/", response_model=List[MemoriaListItem])
async def listar_memorias():
    """
    Lista todas las memorias de cálculo generadas y disponibles para descarga.
    """
    import os
    from datetime import datetime

    directorio = obtener_ruta_documento.__globals__["DOCUMENTS_DIR"]

    if not os.path.exists(directorio):
        return []

    memorias = []
    for nombre_archivo in os.listdir(directorio):
        ruta_completa = os.path.join(directorio, nombre_archivo)
        if os.path.isfile(ruta_completa):
            stat = os.stat(ruta_completa)
            memorias.append(
                MemoriaListItem(
                    nombre_archivo=nombre_archivo,
                    ruta=ruta_completa,
                    fecha_creacion=datetime.fromtimestamp(stat.st_ctime).strftime(
                        "%Y-%m-%d %H:%M:%S"
                    ),
                    tamaño_bytes=stat.st_size,
                )
            )

    # Ordenar por fecha de creación descendente (más reciente primero)
    memorias.sort(key=lambda m: m.fecha_creacion, reverse=True)

    return memorias


@router.delete("/{nombre_archivo}", status_code=status.HTTP_204_NO_CONTENT)
async def eliminar_memoria(nombre_archivo: str):
    """
    Elimina un documento de memoria de cálculo previamente generado.
    """
    if not obtener_ruta_documento(nombre_archivo):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Documento '{nombre_archivo}' no encontrado",
        )

    eliminado = eliminar_documento(nombre_archivo)
    if not eliminado:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error eliminando documento '{nombre_archivo}'",
        )

    return None
