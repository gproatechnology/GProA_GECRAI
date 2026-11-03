from pydantic import BaseModel
from typing import Optional, Any
from datetime import datetime


class MemoryBase(BaseModel):
    normativa: Optional[str] = "NOM-001-SEDE-2012"
    voltaje: int
    corriente: float
    potencia: float
    proyecto: Optional[str] = None
    tag: Optional[str] = None
    resultado: Optional[Any] = None


class MemoryCreate(MemoryBase):
    project_id: Optional[int] = None


class MemoryUpdate(BaseModel):
    normativa: Optional[str] = None
    voltaje: Optional[int] = None
    corriente: Optional[float] = None
    potencia: Optional[float] = None
    proyecto: Optional[str] = None
    tag: Optional[str] = None
    resultado: Optional[Any] = None


class MemoryResponse(MemoryBase):
    id: int
    owner_id: int
    project_id: Optional[int] = None
    fecha: datetime

    class Config:
        from_attributes = True
