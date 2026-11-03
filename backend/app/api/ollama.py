"""
Endpoints del asistente inteligente GECRAI (versión demo sin Ollama).
"""

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import Optional, List, Dict
import random
import time

router = APIRouter(prefix="/api/ai", tags=["Asistente IA"])


class ChatMessage(BaseModel):
    message: str
    conversation_id: Optional[str] = None


class ChatResponse(BaseModel):
    response: str
    conversation_id: str
    timestamp: str


# Respuestas simuladas del asistente GECRAI
GECRAI_RESPONSES = [
    "¡Hola! Soy GECRAI, tu asistente inteligente para análisis eléctricos. ¿En qué puedo ayudarte hoy?",
    "Puedo ayudarte con cálculos NOM-001, análisis de potencia y corriente, y generación de memorias de cálculo.",
    "Para iniciar un análisis, selecciona una opción del panel de control y completa los datos del proyecto.",
    "Las memorias de cálculo se generan automáticamente una vez completado el análisis eléctrico.",
    "El sistema soporta cálculos trifásicos, monofásicos y bifásicos según NOM-001-SEDE-2012.",
    "Puedes comparar diferentes calibres de conductor y verificar la caída de tensión.",
    "Los interruptores se dimensionan automáticamente según la corriente de utilización (Im).",
    "¿Necesitas ayuda con algún cálculo específico de tu proyecto eléctrico?",
    "La memoria de cálculo incluye todos los parámetros técnicos y está lista para exportar.",
    "Si tienes dudas sobre normativa eléctrica, estoy aquí para ayudarte.",
]


def get_simulated_response(user_message: str) -> str:
    """
    Devuelve una respuesta simulada del asistente GECRAI basada en palabras clave.
    """
    message_lower = user_message.lower()

    if any(word in message_lower for word in ["hola", "buenos", "buenas", "hello"]):
        return "¡Hola! Soy GECRAI, tu asistente inteligente para análisis eléctricos. ¿En qué puedo ayudarte hoy?"

    if any(word in message_lower for word in ["nom-001", "normativa", "norma", "reglamento"]):
        return "El sistema cumple con NOM-001-SEDE-2012 para verificaciones de instalaciones eléctricas. Puedo ayudarte con cálculos de conductores, interruptores y protecciones."

    if any(word in message_lower for word in ["potencia", "cálculo", "calculo", "corriente"]):
        return "Puedo calcular potencia, corriente y caída de tensión. Solo selecciona 'Cálculo de Potencia' o 'Análisis de Corriente' en el panel de control."

    if any(word in message_lower for word in ["memoria", "reporte", "exportar", "documento"]):
        return "Las memorias de cálculo se generan automáticamente con todos los pará técnicos. Están listas para exportar en formato PDF."

    if any(word in message_lower for word in ["ayuda", "help", "soporte"]):
        return "Estoy aquí para ayudarte. Puedo asistirte con: cálculos eléctricos, NOM-001, memorias de cálculo, selección de calibres y más."

    if any(word in message_lower for word in ["gracias", "thanks"]):
        return "¡De nada! Si necesitas algo más, estaré aquí para ayudarte con tu proyecto eléctrico."

    if any(word in message_lower for word in ["adiós", "bye", "hasta luego"]):
        return "¡Hasta luego! Que tengas un excelente día trabajando en tus proyectos eléctricos."

    # Respuesta genérica aleatoria para otros casos
    return random.choice(GECRAI_RESPONSES)


@router.post("/chat", response_model=ChatResponse)
async def chat_with_gecrai(message: ChatMessage):
    """
    Endpoint del asistente inteligente GECRAI (versión demo).
    En una fase futura se conectará a Ollama para respuestas de IA real.
    """
    import datetime

    # Simular tiempo de procesamiento
    time.sleep(0.5)

    response_text = get_simulated_response(message.message)

    return ChatResponse(
        response=response_text,
        conversation_id=message.conversation_id or "demo-conversation",
        timestamp=datetime.datetime.now().isoformat(),
    )
