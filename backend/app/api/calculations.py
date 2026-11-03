"""
Endpoints de cálculos eléctricos NOM-001.
"""

from fastapi import APIRouter, HTTPException, status
from app.services.nom001_selection import calcular_memoria_completa
from app.schemas.calculation import CalculationBase, CalculationResponse

router = APIRouter(prefix="/api/calcular", tags=["Cálculos Eléctricos"])


@router.post("/nom-001", response_model=CalculationResponse)
async def calcular_nom_001(
    params: CalculationBase,
):
    """
    Calcula una memoria de cálculo eléctrica según NOM-001-SEDE-2012.
    
    Recibe parámetros de entrada (HP, voltaje, fases, FP, longitud, etc.)
    y devuelve el resultado completo del cálculo:
    - IPC, Im, Id
    - Calibre por ampacidad, caída de tensión, sugerido
    - Interruptor termomagnético
    - Calibre de tierra
    - Estado de aprobación
    """
    try:
        resultado = calcular_memoria_completa(params.model_dump())
        return resultado
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error en el cálculo: {str(e)}",
        )
