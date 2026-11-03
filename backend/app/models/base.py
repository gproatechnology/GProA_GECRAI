from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=True)
    hashed_password = Column(String(255), nullable=False)
    role = Column(String(20), default="user")
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relaciones
    projects = relationship("Project", back_populates="owner")
    memories = relationship("Memory", back_populates="owner")


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    status = Column(String(20), default="active")
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relaciones
    owner = relationship("User", back_populates="projects")
    memories = relationship("Memory", back_populates="project")


class Memory(Base):
    __tablename__ = "memories"

    id = Column(Integer, primary_key=True, index=True)
    normativa = Column(String(50), default="NOM-001-SEDE-2012")
    voltaje = Column(Integer, nullable=False)
    corriente = Column(Float, nullable=False)
    potencia = Column(Float, nullable=False)
    proyecto = Column(String(100), nullable=True)
    tag = Column(String(50), nullable=True)
    fecha = Column(DateTime(timezone=True), server_default=func.now())
    resultado = Column(Text, nullable=True)  # JSON string con el resultado completo del cálculo
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=True)

    # Relaciones
    owner = relationship("User", back_populates="memories")
    project = relationship("Project", back_populates="memories")
