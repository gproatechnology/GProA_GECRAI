"""
Funciones de cálculo base para GECRAI (NOM-001-SEDE-2012).
Adaptado de calculo.js (demo enterprise de GProA Technology).
"""

from app.services.nom001_tables import (
    TABLA_IPC_POR_FASES,
    VOLTAJES_POR_FASES,
)


def columna_tension_430_250(voltaje: float) -> int:
    """Mapea una tensión de sistema a la columna nominal de la Tabla 430-250 (trifásico)."""
    v = float(voltaje) or 0
    if v <= 120:
        return 115
    if v <= 200:
        return 200
    if v <= 208:
        return 208
    if v <= 240:
        return 230
    if v <= 480:
        return 460
    if v <= 600:
        return 575
    return 2300


def columna_tension_430_248(voltaje: float) -> int:
    """Mapea una tensión de sistema a la columna nominal de la Tabla 430-248 (monofásico)."""
    v = float(voltaje) or 0
    if v <= 120:
        return 115
    if v <= 200:
        return 200
    if v <= 208:
        return 208
    if v <= 240:
        return 230
    return None


def columna_tension_430_249(voltaje: float) -> int:
    """Mapea una tensión de sistema a la columna nominal de la Tabla 430-249 (bifásico)."""
    v = float(voltaje) or 0
    if v <= 120:
        return 115
    if v <= 240:
        return 230
    if v <= 480:
        return 460
    if v <= 600:
        return 575
    return 2300


def obtener_ipc_tabla(hp: float, voltaje: float, fases: int) -> float | None:
    """
    Devuelve la corriente a plena carga tabulada (A) para un motor según
    número de fases, HP y tensión, o None si no está en la tabla.
    """
    num_fases = int(fases) or 3
    tabla = TABLA_IPC_POR_FASES.get(num_fases)
    if not tabla:
        return None

    fila = tabla.get(float(hp))
    if not fila:
        return None

    if num_fases == 1:
        col = columna_tension_430_248(voltaje)
    elif num_fases == 2:
        col = columna_tension_430_249(voltaje)
    else:
        col = columna_tension_430_250(voltaje)

    valor = fila.get(col)
    return valor if (valor is not None and valor is not False) else None


def calcular_ipc(
    hp: float,
    voltaje: float,
    fases: int,
    fp: float,
    eficiencia: float = 0.9,
) -> float:
    """
    Calcula la corriente a plena carga (IPC).
    1) Prefiere el valor tabulado de las Tablas NOM-001.
    2) Fallback por fórmula si no hay valor tabulado.
    """
    num_fases = int(fases) or 3
    hp_num = float(hp) or 0
    v = float(voltaje) or 0
    fp_num = float(fp) or 0
    eff = float(eficiencia) or 0.9

    # 1) Valor tabulado
    ipc_tabla = obtener_ipc_tabla(hp_num, v, num_fases)
    if ipc_tabla is not None:
        return float(ipc_tabla)

    # 2) Fallback por fórmula
    if not hp_num or not v or not fp_num:
        return 0.0

    potencia = hp_num * 746

    if num_fases == 3:
        ipc = potencia / (1.732 * v * fp_num * eff)
    else:
        # Monofásico / dos fases (4 hilos): corriente por fase
        ipc = potencia / (v * fp_num * eff)

    return round(ipc, 2)


def calcular_im(ipc: float) -> float:
    """
    Calcula la corriente de utilización (Im = IPC × 1.25).
    """
    corriente = float(ipc) or 0
    return round(corriente * 1.25, 2)


def calcular_id(
    im: float,
    factor_conductores: float,
    factor_temperatura: float,
) -> float:
    """
    Calcula la corriente de diseño (Id = Im / (factor_conductores × factor_temperatura)).
    """
    corriente_im = float(im) or 0
    fc = float(factor_conductores) or 1
    ft = float(factor_temperatura) or 1

    if fc <= 0 or ft <= 0:
        return corriente_im

    return round(corriente_im / (fc * ft), 2)


def calcular_caida_tension(
    longitud: float,
    corriente: float,
    voltaje: float,
    fp: float,
    resistencia: float,
    reactancia: float,
    fases: int,
) -> dict:
    """
    Calcula la caída de tensión en volts y porcentaje.
    """
    l = float(longitud) or 0
    i = float(corriente) or 0
    v = float(voltaje) or 0
    fp_num = float(fp) or 0.95
    r = float(resistencia) or 0
    xl = float(reactancia) or 0
    f = int(fases) or 3

    if not l or not i or not v:
        return {"caidaV": 0.0, "porcentaje": 0.0}

    sin_phi = (1 - fp_num * fp_num) ** 0.5
    z = r * fp_num + xl * sin_phi

    if f == 3:
        caida_v = 1.732 * l * z * i
    else:
        caida_v = 2 * l * z * i

    porcentaje = round((caida_v / v) * 100, 2) if v > 0 else 0.0

    return {
        "caidaV": round(caida_v, 2),
        "porcentaje": porcentaje,
    }
