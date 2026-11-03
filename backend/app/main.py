from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import engine, Base
from app.core.seed import seed_demo_user
from app.models import User, Project, Memory
from app.api import auth_router
from app.api.calculations import router as calculations_router
from app.api.memories import router as memories_router
from app.api.metrics import router as metrics_router

app = FastAPI(
    title="GECRAI API",
    description="Sistema Inteligente para Memorias de Cálculo Eléctrico - Backend",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS para permitir conexiones desde el frontend (Vite en puerto 5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def init_db():
    """Crear tablas y usuario demo al iniciar la aplicación."""
    Base.metadata.create_all(bind=engine)
    seed_demo_user()


# Incluir routers
app.include_router(auth_router)
app.include_router(calculations_router)
app.include_router(memories_router)
app.include_router(metrics_router)


@app.get("/", tags=["Health"])
async def root():
    return {
        "service": "GECRAI API",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs",
    }


@app.get("/health", tags=["Health"])
async def health():
    return {"status": "healthy"}
