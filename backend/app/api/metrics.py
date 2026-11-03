"""
Endpoints de métricas del dashboard GECRAI.
"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models import User, Project, Memory
from sqlalchemy import func

router = APIRouter(prefix="/api/metrics", tags=["Métricas del Dashboard"])


@router.get("/dashboard")
def get_dashboard_metrics(db: Session = Depends(get_db)):
    """
    Obtiene métricas del dashboard:
    - Proyectos activos
    - Análisis completados (memorias generadas)
    - Memorias generadas
    - Usuarios registrados
    """
    proyectos_activos = (
        db.query(Project)
        .filter(Project.status == "active")
        .count()
    )

    analisis_completados = (
        db.query(Memory)
        .count()
    )

    memorias_generadas = (
        db.query(Memory)
        .count()
    )

    usuarios_registrados = (
        db.query(User)
        .filter(User.is_active == True)  # noqa: E712
        .count()
    )

    return {
        "proyectosActivos": proyectos_activos,
        "analisisCompletados": analisis_completados,
        "memoriasGeneradas": memorias_generadas,
        "usuariosRegistrados": usuarios_registrados,
    }
