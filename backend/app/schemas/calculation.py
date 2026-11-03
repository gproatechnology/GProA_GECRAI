from pydantic import BaseModel


class CalculationBase(BaseModel):
    hp: float
    voltaje: float
    fases: int
    fp: float
    longitud: float
    temperaturaAmbiente: float
    temperaturaCable: float = 75.0
    factorUtilizacion: float = 1.25
    tipoConductor: str = "MULTI"
    hilosPorFase: int = 1
    canalizacion: str = "CHAROLA"
    cantidadConductores: int = 3
    porcentajeVcDeseado: float = 3.0
    eficiencia: float = 0.9
    r: float = 2.56
    xl: float = 0.171


class CalculationResponse(BaseModel):
    ipc: float
    im: float
    factorConductores: float
    factorTemperatura: float
    id: float
    calibreAmpacidad: str
    caidaV: float
    porcentaje: float
    calibreCaida: str
    interruptor: dict
    calibreInterruptor: str
    calibreSugerido: str
    calibreTierra: str
    aprobado: bool
