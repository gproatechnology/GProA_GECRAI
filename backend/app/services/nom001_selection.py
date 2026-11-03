"""
Funciones de selección de materiales para GECRAI (NOM-001-SEDE-2012).
Adaptado de calculo.js (demo enterprise de GProA Technology).
"""

from app.services.nom001_tables import TABLA_AMPACIDAD


def obtener_factor_ajuste_conductores(cantidad_conductores: float) -> float:
    """
    Factor de ajuste por cantidad de conductores en canalización.
    """
    n = float(cantidad_conductores) or 1
    if n <= 3:
        return 1.0
    if n <= 6:
        return 0.8
    if n <= 9:
        return 0.7
    return 0.7


def obtener_factor_temperatura(
    temperatura_ambiente: float,
    temperatura_cable: float = 75,
) -> float:
    """
    Factor de corrección por temperatura ambiente según NOM-001.
    """
    ta = float(temperatura_ambiente) or 30
    tc = float(temperatura_cable) or 75

    if ta <= 30:
        return 1.0

    valores = {
        35: 0.94,
        40: 0.88,
        45: 0.82,
        50: 0.75,
        55: 0.67,
        60: 0.58,
        65: 0.47,
        70: 0.33,
        75: 0.25,
    }

    # Encontrar el factor para la temperatura más cercana >= ta
    claves_ordenadas = sorted(valores.keys())
    for clave in claves_ordenadas:
        if ta <= clave:
            return valores[clave]

    # Si ta > 75, retornar el factor más bajo
    return valores[max(claves_ordenadas)]


def seleccionar_calibre_por_ampacidad(
    id_corriente: float,
    tabla_ampacidad: dict | None = None,
) -> str:
    """
    Selecciona el calibre mínimo cuya ampacidad sea >= Id.
    """
    tabla = tabla_ampacidad or TABLA_AMPACIDAD
    id_val = float(id_corriente) or 0

    # Ordenar calibres por ampacidad ascendente
    for calibre in sorted(tabla.keys(), key=lambda c: tabla[c]):
        if tabla[calibre] >= id_val:
            return calibre

    return 'No encontrado'


def seleccionar_interruptor(
    ipc: float,
    factor_utilizacion: float = 1.25,
    fases: int = 3,
) -> dict:
    """
    Selecciona el interruptor termomagnético comercial estándar.
    Dimensionado sobre el 125% de la corriente a plena carga (Im).
    """
    i = float(ipc) or 0
    fu = float(factor_utilizacion) or 1
    it = i * fu

    # Valores comerciales estándar de interruptores termomagnéticos
    estandares = [
        15, 20, 30, 40, 50, 60, 70, 80, 100, 125,
        150, 175, 200, 225, 250, 300, 350, 400,
    ]

    num_fases = int(fases) or 3
    descripcion_polos = (
        '1F (2P)' if num_fases == 1
        else '2F (2P)' if num_fases == 2
        else '3F (3P)'
    )

    for cal in estandares:
        if cal >= it:
            return {
                'amperaje': cal,
                'polos': f'{descripcion_polos} - {cal} A',
            }

    max_cal = estandares[-1]
    return {
        'amperaje': max_cal,
        'polos': f'{descripcion_polos} - {max_cal} A',
    }


def seleccionar_calibre_tierra(amperaje_interruptor: float) -> str:
    """
    Selecciona el calibre del conductor de tierra según el amperaje del interruptor.
    """
    it = float(amperaje_interruptor) or 0

    if it <= 20:
        return '12 AWG'
    if it <= 60:
        return '10 AWG'
    if it <= 100:
        return '8 AWG'
    if it <= 200:
        return '6 AWG'
    return '4 AWG'


def ORDEN_CALIBRES():
    """Orden de calibres de menor a mayor ampacidad."""
    return [
        '14 AWG', '12 AWG', '10 AWG', '8 AWG', '6 AWG', '4 AWG',
        '2 AWG', '1/0 AWG', '2/0 AWG', '3/0 AWG', '4/0 AWG',
    ]


def seleccionar_calibre_sugerido(
    calibre_ampacidad: str,
    calibre_caida: str,
    calibre_interruptor: str,
) -> str:
    """
    Selecciona el calibre sugerido como el mayor de los tres criterios:
    ampacidad, caída de tensión e interruptor.
    """
    orden = ORDEN_CALIBRES()
    calibres = [calibre_ampacidad, calibre_caida, calibre_interruptor]

    max_idx = -1
    resultado = calibre_ampacidad

    for calibre in calibres:
        try:
            idx = orden.index(calibre)
            if idx > max_idx:
                max_idx = idx
                resultado = calibre
        except ValueError:
            continue

    return resultado


def comparar_calibres(
    params: dict,
    calibre_a: str,
    calibre_b: str,
) -> dict:
    """
    Compara dos calibres mostrando su ampacidad, caída de tensión y aprobación.
    """
    from app.services.nom001_calculations import (
        calcular_caida_tension,
    )

    tabla_ampacidad = TABLA_AMPACIDAD

    def get_ampacidad(calibre: str) -> float:
        return float(tabla_ampacidad.get(calibre, 0))

    resultado_base = calcular_memoria_completa(params)

    def build_comparacion(calibre: str) -> dict:
        amp = get_ampacidad(calibre)
        caida = calcular_caida_tension(
            longitud=params.get('longitud', 0),
            corriente=resultado_base.get('ipc', 0),
            voltaje=params.get('voltaje', 0),
            fp=params.get('fp', 0.95),
            resistencia=params.get('r', 2.56),
            reactancia=params.get('xl', 0.171),
            fases=params.get('fases', 3),
        )
        porcentaje_vc_deseado = params.get('porcentajeVcDeseado', 3)
        aprobado = caida['porcentaje'] <= porcentaje_vc_deseado
        return {
            'calibre': calibre,
            'ampacidad': amp,
            'caidaV': caida['caidaV'],
            'porcentaje': caida['porcentaje'],
            'aprobado': aprobado,
        }

    return {
        'base': resultado_base,
        'a': build_comparacion(calibre_a),
        'b': build_comparacion(calibre_b),
    }


def calcular_memoria_completa(params: dict) -> dict:
    """
    Función maestra que ejecuta todo el flujo de cálculo de memoria eléctrica.
    
    Parámetros esperados:
        hp, voltaje, fases, fp, longitud, temperaturaAmbiente,
        temperaturaCable, factorUtilizacion, tipoConductor, hilosPorFase,
        canalizacion, cantidadConductores, porcentajeVcDeseado, eficiencia,
        r, xl
    """
    from app.services.nom001_calculations import (
        calcular_ipc,
        calcular_im,
        calcular_id,
        calcular_caida_tension,
    )

    # Extraer parámetros con valores por defecto
    hp = params.get('hp', 0)
    voltaje = params.get('voltaje', 0)
    fases = params.get('fases', 3)
    fp = params.get('fp', 0.95)
    longitud = params.get('longitud', 0)
    temperatura_ambiente = params.get('temperaturaAmbiente', 30)
    temperatura_cable = params.get('temperaturaCable', 75)
    factor_utilizacion = params.get('factorUtilizacion', 1.25)
    cantidad_conductores = params.get('cantidadConductores', 3)
    porcentaje_vc_deseado = params.get('porcentajeVcDeseado', 3)
    eficiencia = params.get('eficiencia', 0.9)
    r = params.get('r', 2.56)
    xl = params.get('xl', 0.171)

    # 1. Calcular IPC
    ipc = calcular_ipc(hp, voltaje, fases, fp, eficiencia)

    # 2. Calcular Im
    im = calcular_im(ipc)

    # 3. Factores
    factor_conductores = obtener_factor_ajuste_conductores(cantidad_conductores)
    factor_temperatura = obtener_factor_temperatura(temperatura_ambiente, temperatura_cable)

    # 4. Calcular Id
    id_val = calcular_id(im, factor_conductores, factor_temperatura)

    # 5. Selección de calibre por ampacidad
    calibre_ampacidad = seleccionar_calibre_por_ampacidad(id_val, TABLA_AMPACIDAD)

    # 6. Caída de tensión
    caida = calcular_caida_tension(
        longitud=longitud,
        corriente=ipc,
        voltaje=voltaje,
        fp=fp,
        resistencia=r,
        reactancia=xl,
        fases=fases,
    )

    # 7. Calibre por caída de tensión
    if caida['porcentaje'] <= porcentaje_vc_deseado:
        calibre_caida = calibre_ampacidad
    else:
        calibre_caida = seleccionar_calibre_por_ampacidad(id_val * 1.1, TABLA_AMPACIDAD)

    # 8. Interruptor
    interruptor = seleccionar_interruptor(ipc, factor_utilizacion, fases)
    calibre_interruptor = calibre_ampacidad

    # 9. Calibre sugerido
    calibre_sugerido = seleccionar_calibre_sugerido(
        calibre_ampacidad,
        calibre_caida,
        calibre_interruptor,
    )

    # 10. Calibre de tierra
    calibre_tierra = seleccionar_calibre_tierra(interruptor['amperaje'])

    # 11. Aprobado
    aprobado = caida['porcentaje'] <= porcentaje_vc_deseado

    return {
        'ipc': ipc,
        'im': im,
        'factorConductores': factor_conductores,
        'factorTemperatura': factor_temperatura,
        'id': id_val,
        'calibreAmpacidad': calibre_ampacidad,
        'caidaV': caida['caidaV'],
        'porcentaje': caida['porcentaje'],
        'calibreCaida': calibre_caida,
        'interruptor': interruptor,
        'calibreInterruptor': calibre_interruptor,
        'calibreSugerido': calibre_sugerido,
        'calibreTierra': calibre_tierra,
        'aprobado': aprobado,
    }

