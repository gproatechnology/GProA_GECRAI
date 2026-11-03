"""
Tests unitarios para el motor de cálculos eléctricos NOM-001 (SEDE-2012).

Pruebas para las funciones de:
- Cálculo de IPC (corriente a plena carga)
- Cálculo de IM (corriente de utilización)
- Cálculo de ID (corriente de diseño)
- Cálculo de caída de tensión
- Selección de calibre por ampacidad
- Selección de interruptor
- Selección de calibre de tierra
- Cálculo de memoria completa
"""

import pytest

from app.services.nom001_calculations import (
    calcular_caida_tension,
    calcular_id,
    calcular_im,
    calcular_ipc,
    columna_tension_430_248,
    columna_tension_430_249,
    columna_tension_430_250,
    obtener_ipc_tabla,
)
from app.services.nom001_selection import (
    obtener_factor_ajuste_conductores,
    obtener_factor_temperatura,
    seleccionar_calibre_por_ampacidad,
    seleccionar_calibre_sugerido,
    seleccionar_calibre_tierra,
    seleccionar_interruptor,
)
from app.services.nom001_tables import (
    TABLA_AMPACIDAD,
    TABLA_IPC_POR_FASES,
    VOLTAJES_POR_FASES,
)


# =============================================================================
# Pruebas para tablas de datos NOM-001
# =============================================================================


class TestTablasNOM001:
    """Pruebas para las tablas de referencia NOM-001."""

    def test_tablas_tienen_datos(self):
        """Verifica que las tablas principales no estén vacías."""
        assert len(TABLA_AMPACIDAD) > 0
        assert len(TABLA_IPC_POR_FASES) > 0
        assert len(VOLTAJES_POR_FASES) > 0

    def test_voltajes_por_fases(self):
        """Verifica que existan voltajes válidos para cada cantidad de fases."""
        assert 1 in VOLTAJES_POR_FASES
        assert 2 in VOLTAJES_POR_FASES
        assert 3 in VOLTAJES_POR_FASES
        assert len(VOLTAJES_POR_FASES[1]) > 0
        assert len(VOLTAJES_POR_FASES[2]) > 0
        assert len(VOLTAJES_POR_FASES[3]) > 0

    def test_tabla_ampacidad_no_vacia(self):
        """Verifica que la tabla de ampacidad tenga valores."""
        assert '14 AWG' in TABLA_AMPACIDAD
        assert TABLA_AMPACIDAD['14 AWG'] > 0


# =============================================================================
# Pruebas para mapeo de voltajes a columnas de tabla
# =============================================================================


class TestColumnasTension:
    """Pruebas para el mapeo de voltaje a columnas de tabla NOM-001."""

    def test_columna_430_250_trifasico(self):
        """Verifica el mapeo de voltaje para trifásico (Tabla 430-250)."""
        assert columna_tension_430_250(115) == 115
        assert columna_tension_430_250(200) == 200
        assert columna_tension_430_250(208) == 208
        assert columna_tension_430_250(230) == 230
        assert columna_tension_430_250(440) == 460
        assert columna_tension_430_250(480) == 460
        assert columna_tension_430_250(575) == 575
        assert columna_tension_430_250(600) == 575
        assert columna_tension_430_250(2400) == 2300

    def test_columna_430_248_monofasico(self):
        """Verifica el mapeo de voltaje para monofásico (Tabla 430-248)."""
        assert columna_tension_430_248(115) == 115
        assert columna_tension_430_248(200) == 200
        assert columna_tension_430_248(230) == 230

    def test_columna_430_249_bifasico(self):
        """Verifica el mapeo de voltaje para bifásico (Tabla 430-249)."""
        assert columna_tension_430_249(115) == 115
        assert columna_tension_430_249(230) == 230
        assert columna_tension_430_249(460) == 460
        assert columna_tension_430_249(2300) == 2300


# =============================================================================
# Pruebas para cálculo de IPC (Corriente a Plena Carga)
# =============================================================================


class TestCalcularIPC:
    """Pruebas para el cálculo de corriente a plena carga (IPC)."""

    def test_calculo_20hp_440v_3f(self):
        """Caso de referencia: 20 HP, 440V, 3 fases → IPC = 27 A."""
        resultado = calcular_ipc(20, 440, 3, 0.85, 0.9)
        assert resultado == 27.0

    def test_calculo_20hp_220v_1f(self):
        """Cálculo para 20 HP, 220V, 1 fase."""
        resultado = calcular_ipc(20, 220, 1, 0.85, 0.9)
        assert resultado > 0
        assert isinstance(resultado, float)

    def test_calculo_potencia_cero_devuelve_cero(self):
        """Si HP es 0, el IPC debe ser 0."""
        resultado = calcular_ipc(0, 440, 3, 0.85, 0.9)
        assert resultado == 0.0

    def test_calculo_voltaje_cero_devuelve_cero(self):
        """Si voltaje es 0, el IPC debe ser 0."""
        resultado = calcular_ipc(20, 0, 3, 0.85, 0.9)
        assert resultado == 0.0

    def test_obtener_ipc_tabla_valor_existente(self):
        """Verifica que la tabla devuelva valor para 20 HP, 440V, 3F."""
        valor = obtener_ipc_tabla(20, 440, 3)
        assert valor == 27.0

    def test_obtener_ipc_tabla_valor_no_existente(self):
        """Verifica que devuelva None para HP no existente en tabla."""
        valor = obtener_ipc_tabla(999, 440, 3)
        assert valor is None


# =============================================================================
# Pruebas para cálculo de IM (Corriente de Utilización)
# =============================================================================


class TestCalcularIM:
    """Pruebas para el cálculo de corriente de utilización (IM = IPC × 1.25)."""

    def test_calculo_im_basico(self):
        """Verifica que IM = IPC × 1.25."""
        assert calcular_im(20) == 25.0
        assert calcular_im(27) == 33.75
        assert calcular_im(10) == 12.5

    def test_calculo_im_cero(self):
        """Si IPC es 0, IM debe ser 0."""
        assert calcular_im(0) == 0.0

    def test_calculo_im_negativo(self):
        """Si IPC es negativo, el resultado sigue la fórmula."""
        assert calcular_im(-10) == -12.5


# =============================================================================
# Pruebas para cálculo de ID (Corriente de Diseño)
# =============================================================================


class TestCalcularID:
    """Pruebas para el cálculo de corriente de diseño (ID)."""

    def test_calculo_id_factor_1(self):
        """Con factores 1.0, ID = IM."""
        assert calcular_id(33.75, 1.0, 1.0) == 33.75

    def test_calculo_id_con_factores(self):
        """Con factores diferentes a 1, ID cambia."""
        resultado = calcular_id(33.75, 0.8, 0.9)
        assert resultado > 33.75  # Dividir entre número menor a 1 aumenta

    def test_calculo_id_factores_cero_devuelve_im(self):
        """Si factores son 0, se devuelve IM (evita división por cero)."""
        assert calcular_id(33.75, 0, 0) == 33.75

    def test_calculo_id_redondeo(self):
        """El resultado se redondea a 2 decimales."""
        resultado = calcular_id(10, 1.0, 1.0)
        assert resultado == 10.0


# =============================================================================
# Pruebas para cálculo de caída de tensión
# =============================================================================


class TestCalcularCaidaTension:
    """Pruebas para el cálculo de caída de tensión."""

    def test_calculo_caida_trifasico(self):
        """Cálculo de caída para sistema trifásico."""
        resultado = calcular_caida_tension(
            longitud=70,
            corriente=27,
            voltaje=440,
            fp=0.85,
            resistencia=2.56,
            reactancia=0.171,
            fases=3,
        )
        assert 'caidaV' in resultado
        assert 'porcentaje' in resultado
        assert resultado['caidaV'] > 0
        assert resultado['porcentaje'] > 0

    def test_calculo_caida_monofasico(self):
        """Cálculo de caída para sistema monofásico."""
        resultado = calcular_caida_tension(
            longitud=50,
            corriente=15,
            voltaje=220,
            fp=0.9,
            resistencia=2.56,
            reactancia=0.171,
            fases=1,
        )
        assert resultado['caidaV'] > 0
        assert resultado['porcentaje'] > 0

    def test_calculo_caida_cero_longitud(self):
        """Si longitud es 0, caída debe ser 0."""
        resultado = calcular_caida_tension(
            longitud=0,
            corriente=27,
            voltaje=440,
            fp=0.85,
            resistencia=2.56,
            reactancia=0.171,
            fases=3,
        )
        assert resultado['caidaV'] == 0.0
        assert resultado['porcentaje'] == 0.0


# =============================================================================
# Pruebas para selección de calibre y materiales
# =============================================================================


class TestSeleccionCalibre:
    """Pruebas para selección de calibre y materiales."""

    def test_seleccion_calibre_por_ampacidad(self):
        """Verifica que se seleccione el calibre correcto para una corriente."""
        calibre = seleccionar_calibre_por_ampacidad(30, TABLA_AMPACIDAD)
        assert calibre is not None
        assert calibre in TABLA_AMPACIDAD
        assert TABLA_AMPACIDAD[calibre] >= 30

    def test_seleccion_calibre_cero(self):
        """Si corriente es 0, se selecciona el calibre mínimo."""
        calibre = seleccionar_calibre_por_ampacidad(0, TABLA_AMPACIDAD)
        assert calibre == '14 AWG'  # El calibre más pequeño en la tabla

    def test_seleccion_interruptor(self):
        """Verifica selección de interruptor según corriente."""
        interruptor = seleccionar_interruptor(27, 1.25, 3)
        assert 'amperaje' in interruptor
        assert 'polos' in interruptor
        assert interruptor['amperaje'] >= 27 * 1.25  # 33.75

    def test_seleccion_calibre_tierra(self):
        """Verifica selección de calibre de tierra según amperaje."""
        assert seleccionar_calibre_tierra(20) == '12 AWG'
        assert seleccionar_calibre_tierra(60) == '10 AWG'
        assert seleccionar_calibre_tierra(100) == '8 AWG'
        assert seleccionar_calibre_tierra(200) == '6 AWG'
        assert seleccionar_calibre_tierra(300) == '4 AWG'

    def test_seleccion_calibre_sugerido(self):
        """Verifica selección del calibre sugerido como el mayor de los tres."""
        # 4 AWG tiene mayor ampacidad que 8 AWG, por lo que 4 AWG es el sugerido
        resultado = seleccionar_calibre_sugerido('8 AWG', '6 AWG', '4 AWG')
        assert resultado == '4 AWG'

    def test_seleccion_calibre_sugerido_otro(self):
        """Otra combinación para verificar calibre sugerido."""
        resultado = seleccionar_calibre_sugerido('4 AWG', '2 AWG', '1/0 AWG')
        assert resultado == '1/0 AWG'  # 1/0 AWG es el mayor


# =============================================================================
# Pruebas para factores de corrección
# =============================================================================


class TestFactoresCorreccion:
    """Pruebas para factores de ajuste y temperatura."""

    def test_factor_ajuste_conductores_tres_o_menos(self):
        """Hasta 3 conductores, factor es 1.0."""
        assert obtener_factor_ajuste_conductores(1) == 1.0
        assert obtener_factor_ajuste_conductores(2) == 1.0
        assert obtener_factor_ajuste_conductores(3) == 1.0

    def test_factor_ajuste_conductores_seis(self):
        """Hasta 6 conductores, factor es 0.8."""
        assert obtener_factor_ajuste_conductores(4) == 0.8
        assert obtener_factor_ajuste_conductores(6) == 0.8

    def test_factor_temperatura_30_grados(self):
        """Hasta 30°C, factor de temperatura es 1.0."""
        assert obtener_factor_temperatura(30) == 1.0
        assert obtener_factor_temperatura(25) == 1.0

    def test_factor_temperatura_mayor_30(self):
        """Por encima de 30°C, el factor disminuye."""
        assert obtener_factor_temperatura(35) == 0.94
        assert obtener_factor_temperatura(40) == 0.88


# =============================================================================
# Pruebas para cálculo de memoria completa
# =============================================================================


class TestCalculoMemoriaCompleta:
    """Pruebas para el cálculo completo de memoria eléctrica."""

    def test_memoria_completa_caso_referencia(self):
        """Caso de referencia: 20 HP, 440V, 3F."""
        params = {
            'hp': 20,
            'voltaje': 440,
            'fases': 3,
            'fp': 0.85,
            'longitud': 0.07,
            'temperaturaAmbiente': 30,
            'temperaturaCable': 75,
            'factorUtilizacion': 1.25,
            'tipoConductor': 'MULTI',
            'hilosPorFase': 1,
            'canalizacion': 'CHAROLA',
            'cantidadConductores': 3,
            'porcentajeVcDeseado': 3,
            'eficiencia': 0.9,
            'r': 2.56,
            'xl': 0.171,
        }
        resultado = None  # Importar función local para evitar import circular

        from app.services.nom001_selection import calcular_memoria_completa

        resultado = calcular_memoria_completa(params)

        assert resultado['ipc'] == 27.0
        assert resultado['im'] == 33.75
        assert resultado['calibreAmpacidad'] == '8 AWG'
        assert resultado['interruptor']['amperaje'] == 40
        # Con 70m a 440V, la caída es ~1.69%, menor al 3% deseado, por lo que está aprobado
        assert resultado['aprobado'] is True

    def test_memoria_completa_potencia_cero(self):
        """Con HP 0, todos los cálculos deben ser 0."""
        params = {
            'hp': 0,
            'voltaje': 440,
            'fases': 3,
            'fp': 0.85,
            'longitud': 0.07,
            'temperaturaAmbiente': 30,
            'temperaturaCable': 75,
            'factorUtilizacion': 1.25,
            'tipoConductor': 'MULTI',
            'hilosPorFase': 1,
            'canalizacion': 'CHAROLA',
            'cantidadConductores': 3,
            'porcentajeVcDeseado': 3,
            'eficiencia': 0.9,
            'r': 2.56,
            'xl': 0.171,
        }
        from app.services.nom001_selection import calcular_memoria_completa

        resultado = calcular_memoria_completa(params)
        assert resultado['ipc'] == 0.0
        assert resultado['im'] == 0.0
        assert resultado['id'] == 0.0
