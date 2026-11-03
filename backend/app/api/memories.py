"""
Endpoints de memorias de cálculo GECRAI.
"""

import json
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models import Memory, User, Project
from app.schemas.memory import MemoryCreate, MemoryUpdate, MemoryResponse

router = APIRouter(prefix="/api/memorias", tags=["Memorias de Cálculo"])


@router.post("/", response_model=MemoryResponse, status_code=status.HTTP_201_CREATED)
def create_memory(
    memory_in: MemoryCreate,
    db: Session = Depends(get_db),
):
    """
    Crea una nueva memoria de cálculo.
    """
    # Verificar que el usuario existe
    user = db.query(User).filter(User.id == memory_in.owner_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado",
        )

    # Verificar que el proyecto existe (si se proporciona)
    if memory_in.project_id:
        project = db.query(Project).filter(Project.id == memory_in.project_id).first()
        if not project:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Proyecto no encontrado",
            )

    # Serializar resultado a JSON string para almacenamiento en SQLite
    resultado_json = json.dumps(memory_in.resultado) if memory_in.resultado is not None else None

    new_memory = Memory(
        normativa=memory_in.normativa,
        voltaje=memory_in.voltaje,
        corriente=memory_in.corriente,
        potencia=memory_in.potencia,
        proyecto=memory_in.proyecto,
        tag=memory_in.tag,
        resultado=resultado_json,
        owner_id=memory_in.owner_id,
        project_id=memory_in.project_id,
    )
    db.add(new_memory)
    db.commit()
    db.refresh(new_memory)
    return new_memory


@router.get("/", response_model=List[MemoryResponse])
def list_memories(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
):
    """
    Lista memorias de cálculo ordenadas por fecha descendente.
    """
    memories = (
        db.query(Memory)
        .order_by(Memory.fecha.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )
    return memories


@router.get("/{memory_id}", response_model=MemoryResponse)
def get_memory(
    memory_id: int,
    db: Session = Depends(get_db),
):
    """
    Obtiene una memoria de cálculo por su ID.
    """
    memory = db.query(Memory).filter(Memory.id == memory_id).first()
    if not memory:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Memoria no encontrada",
        )
    return memory
