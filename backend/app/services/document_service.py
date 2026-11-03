"""
Servicio de generación de documentos para GECRAI.
Permite generar memorias de cálculo en formato PDF y Excel con diseño profesional.
"""

import os
import uuid
from datetime import datetime
from typing import Dict, Any, Optional, Tuple
from io import BytesIO

from reportlab.lib import colors
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm, cm, inch
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    Image,
    HRFlowable,
)
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY

from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

# Directorio para almacenar documentos generados
DOCUMENTS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "static", "documents")
os.makedirs(DOCUMENTS_DIR, exist_ok=True)

# Ruta del logo de GECRAI (desde el frontend)
LOGO_PATH = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    "..", "..", "frontend", "src", "assets", "hero.png",
)

# Constantes de diseño GECRAI
GECRai_COLOR = colors.HexColor("#00ff00")  # Verde GECRAI
GECRai_BG = colors.HexColor("#121212")     # Fondo oscuro
GECRai_TEXT = colors.HexColor("#ffffff")   # Texto blanco
GECRai_CARD = colors.HexColor("#1e1e1e")   # Tarjeta gris oscuro
GECRai_BORDER = colors.HexColor("#333333") # Borde gris

# Contador simple para números de memoria (en producción usaría base de datos)
_memoria_counter = 1


def _generar_numero_memoria() -> str:
    """Genera un número único de memoria de cálculo."""
    global _memoria_counter
    numero = _memoria_counter
    _memoria_counter += 1
    fecha = datetime.now().strftime("%Y%m%d")
    return f"GECRAI-{fecha}-{numero:04d}"


def _crear_encabezado_pdf() -> list:
    """Crea el encabezado del documento PDF con logo y datos de GECRAI."""
    elementos = []

    # Logo de GECRAI (intentar cargar el archivo SVG/PNG)
    logo_path = LOGO_PATH
    if os.path.exists(logo_path):
        try:
            logo_img = Image(logo_path, width=60, height=60)
            elementos.append(logo_img)
        except Exception:
            # Si falla la carga de imagen, mostrar texto
            elementos.append(Paragraph("⚡", ParagraphStyle("LogoFallback", fontSize=40, textColor=GECRai_COLOR, alignment=TA_CENTER)))
    else:
        elementos.append(Paragraph("⚡", ParagraphStyle("LogoFallback", fontSize=40, textColor=GECRai_COLOR, alignment=TA_CENTER)))

    # Título principal
    estilo_titulo = ParagraphStyle(
        "TituloGECRAI",
        fontName="Helvetica-Bold",
        fontSize=24,
        textColor=GECRai_COLOR,
        alignment=TA_CENTER,
        spaceAfter=5,
    )
    elementos.append(Paragraph("GECRAI", estilo_titulo))

    # Subtítulo
    estilo_subtitulo = ParagraphStyle(
        "SubtituloGECRAI",
        fontName="Helvetica",
        fontSize=14,
        textColor=GECRai_TEXT,
        alignment=TA_CENTER,
        spaceAfter=5,
    )
    elementos.append(Paragraph("Sistema Inteligente para Memorias de Cálculo", estilo_subtitulo))

    # Línea separadora
    elementos.append(Spacer(1, 5))
    elementos.append(HRFlowable(width="100%", thickness=3, color=GECRai_COLOR, spaceAfter=10))

    # Información de la empresa
    estilo_info = ParagraphStyle(
        "InfoGECRAI",
        fontName="Helvetica",
        fontSize=10,
        textColor=GECRai_TEXT,
        alignment=TA_CENTER,
    )
    elementos.append(Paragraph("GProA Technology", estilo_info))
    elementos.append(Paragraph("Ingeniería Eléctrica - NOM-001-SEDE-2012", estilo_info))
    elementos.append(Spacer(1, 15))

    return elementos


def _crear_encabezado_memoria(numero_memoria: str, fecha_actual: str) -> list:
    """Crea el encabezado de la memoria con número y fecha."""
    elementos = []

    estilo_info = ParagraphStyle(
        "InfoMemoria",
        fontName="Helvetica",
        fontSize=10,
        textColor=GECRai_TEXT,
        alignment=TA_LEFT,
    )
    elementos.append(Paragraph(f"<b>Número de Memoria:</b> {numero_memoria}", estilo_info))
    elementos.append(Paragraph(f"<b>Fecha de Generación:</b> {fecha_actual}", estilo_info))
    elementos.append(Spacer(1, 15))

    return elementos


def _crear_tabla_datos(datos: Dict[str, Any]) -> Table:
    """Crea una tabla con los datos del cálculo eléctrico."""
    estilo_celda_titulo = ParagraphStyle(
        "CeldaTitulo",
        fontName="Helvetica-Bold",
        fontSize=9,
        textColor=colors.white,
        alignment=TA_LEFT,
    )
    estilo_celda_valor = ParagraphStyle(
        "CeldaValor",
        fontName="Helvetica",
        fontSize=9,
        textColor=GECRai_TEXT,
        alignment=TA_LEFT,
    )

    filas = [
        [Paragraph("Parámetro", estilo_celda_titulo), Paragraph("Valor", estilo_celda_titulo)],
    ]

    campos = [
        ("Proyecto", datos.get("proyecto", "N/A")),
        ("Tag", datos.get("tag", "N/A")),
        ("Normativa", datos.get("normativa", "NOM-001-SEDE-2012")),
        ("Voltaje (V)", str(datos.get("voltaje", "N/A"))),
        ("Corriente (A)", str(datos.get("corriente", "N/A"))),
        ("Potencia (HP)", str(datos.get("hp", "N/A"))),
        ("Factor de Potencia", str(datos.get("fp", "N/A"))),
        ("Longitud (km)", str(datos.get("longitud", "N/A"))),
        ("Temperatura Ambiente (°C)", str(datos.get("temperaturaAmbiente", "N/A"))),
        ("Temperatura Cable (°C)", str(datos.get("temperaturaCable", "75"))),
        ("Potencia Calculada (kW)", str(datos.get("potencia", "N/A"))),
        ("IPC (A)", str(datos.get("ipc", "N/A"))),
        ("IM (A)", str(datos.get("im", "N/A"))),
        ("ID (A)", str(datos.get("id", "N/A"))),
        ("Calibre por Ampacidad", str(datos.get("calibreAmpacidad", "N/A"))),
        ("Caída de Tensión (V)", str(datos.get("caidaV", "N/A"))),
        ("Caída de Tensión (%)", str(datos.get("porcentaje", "N/A"))),
        ("Calibre por Caída", str(datos.get("calibreCaida", "N/A"))),
        ("Interruptor (A)", str(datos.get("interruptor", {}).get("amperaje", "N/A"))),
        ("Calibre Sugerido", str(datos.get("calibreSugerido", "N/A"))),
        ("Calibre de Tierra", str(datos.get("calibreTierra", "N/A"))),
        ("Estado", "APROBADO" if datos.get("aprobado", False) else "NO APROBADO"),
    ]

    for clave, valor in campos:
        filas.append([Paragraph(f"<b>{clave}</b>", estilo_celda_titulo), Paragraph(str(valor), estilo_celda_valor)])

    tabla = Table(filas, colWidths=[6*cm, 8*cm])
    tabla.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), GECRai_COLOR),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.black),
        ("ALIGN", (0, 0), (-1, -1), "LEFT"),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, -1), 9),
        ("GRID", (0, 0), (-1, -1), 0.5, GECRai_BORDER),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.HexColor("#1a1a1a"), colors.HexColor("#252525")]),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
    ]))

    return tabla


def generar_memoria_pdf(datos: Dict[str, Any], nombre_archivo: Optional[str] = None) -> Tuple[str, str]:
    """
    Genera una memoria de cálculo en formato PDF con diseño profesional.

    Args:
        datos: Diccionario con los datos del cálculo eléctrico.
        nombre_archivo: Nombre opcional del archivo. Si no se proporciona, se genera uno automático.

    Returns:
        Tupla con (nombre_archivo, ruta_archivo).
    """
    if nombre_archivo is None:
        numero_memoria = _generar_numero_memoria()
        nombre_archivo = f"memoria_{numero_memoria}.pdf"

    ruta_archivo = os.path.join(DOCUMENTS_DIR, nombre_archivo)

    doc = SimpleDocTemplate(
        ruta_archivo,
        pagesize=letter,
        rightMargin=2*cm,
        leftMargin=2*cm,
        topMargin=2*cm,
        bottomMargin=2*cm,
        title=f"Memoria de Cálculo GECRAI - {datos.get('proyecto', 'Sin nombre')}",
        author="GECRAI v1.1 Pro - GProA Technology",
    )

    elementos = []

    # Encabezado con logo y título
    elementos.extend(_crear_encabezado_pdf())

    # Número de memoria y fecha
    numero_memoria = _generar_numero_memoria()
    fecha_actual = datetime.now().strftime("%d/%m/%Y %H:%M:%S")

    elementos.extend(_crear_encabezado_memoria(numero_memoria, fecha_actual))

    # Tabla de datos
    elementos.append(_crear_tabla_datos(datos))

    # Pie de página
    elementos.append(Spacer(1, 20))
    estilo_pie = ParagraphStyle(
        "PiePagina",
        fontName="Helvetica-Oblique",
        fontSize=8,
        textColor=GECRai_TEXT,
        alignment=TA_CENTER,
    )
    elementos.append(HRFlowable(width="100%", thickness=1, color=GECRai_BORDER, spaceBefore=10, spaceAfter=5))
    elementos.append(Paragraph(
        f"Documento generado por GECRAI v1.1 Pro - {fecha_actual}<br/>"
        f"GProA Technology - Sistema Inteligente para Memorias de Cálculo Eléctrico",
        estilo_pie,
    ))

    doc.build(elementos)

    return nombre_archivo, ruta_archivo


def generar_memoria_excel(datos: Dict[str, Any], nombre_archivo: Optional[str] = None) -> Tuple[str, str]:
    """
    Genera una memoria de cálculo en formato Excel con formato profesional.

    Args:
        datos: Diccionario con los datos del cálculo eléctrico.
        nombre_archivo: Nombre opcional del archivo. Si no se proporciona, se genera uno automático.

    Returns:
        Tupla con (nombre_archivo, ruta_archivo).
    """
    if nombre_archivo is None:
        numero_memoria = _generar_numero_memoria()
        nombre_archivo = f"memoria_{numero_memoria}.xlsx"

    ruta_archivo = os.path.join(DOCUMENTS_DIR, nombre_archivo)

    wb = Workbook()
    ws = wb.active
    ws.title = "Memoria de Cálculo"

    # Estilos profesionales
    fuente_titulo = Font(name="Arial", size=18, bold=True, color="00FF00")
    fuente_subtitulo = Font(name="Arial", size=12, bold=True, color="FFFFFF")
    fuente_cabecera = Font(name="Arial", size=11, bold=True, color="FFFFFF")
    fuente_celda = Font(name="Arial", size=10, color="FFFFFF")
    fuente_valor = Font(name="Arial", size=10, color="FFFFFF")

    relleno_titulo = PatternFill(start_color="00FF00", end_color="00FF00", fill_type="solid")
    relleno_cabecera = PatternFill(start_color="1E1E1E", end_color="1E1E1E", fill_type="solid")
    relleno_celda_par = PatternFill(start_color="1A1A1A", end_color="1A1A1A", fill_type="solid")
    relleno_celda_impar = PatternFill(start_color="252525", end_color="252525", fill_type="solid")

    alineacion_izquierda = Alignment(horizontal="left", vertical="center")
    alineacion_centro = Alignment(horizontal="center", vertical="center")
    borde_delgado = Side(style="thin", color="333333")
    borde = Border(left=borde_delgado, right=borde_delgado, top=borde_delgado, bottom=borde_delgado)

    # Título principal
    ws.merge_cells("A1:B1")
    celda_titulo = ws["A1"]
    celda_titulo.value = "⚡ GECRAI - Sistema Inteligente para Memorias de Cálculo"
    celda_titulo.font = fuente_titulo
    celda_titulo.alignment = alineacion_centro
    ws.row_dimensions[1].height = 35

    # Subtítulo
    ws.merge_cells("A2:B2")
    celda_sub = ws["A2"]
    celda_sub.value = "GProA Technology - NOM-001-SEDE-2012"
    celda_sub.font = fuente_subtitulo
    celda_sub.alignment = alineacion_centro
    ws.row_dimensions[2].height = 20

    # Número de memoria y fecha
    numero_memoria = _generar_numero_memoria()
    fecha_actual = datetime.now().strftime("%d/%m/%Y %H:%M:%S")

    ws.merge_cells("A3:B3")
    celda_num = ws["A3"]
    celda_num.value = f"Número de Memoria: {numero_memoria}"
    celda_num.font = fuente_celda
    celda_num.alignment = alineacion_izquierda
    celda_num.fill = relleno_celda_par
    celda_num.border = borde

    ws.merge_cells("A4:B4")
    celda_fecha = ws["A4"]
    celda_fecha.value = f"Fecha de Generación: {fecha_actual}"
    celda_fecha.font = fuente_celda
    celda_fecha.alignment = alineacion_izquierda
    celda_fecha.fill = relleno_celda_impar
    celda_fecha.border = borde

    # Encabezados de tabla
    ws.merge_cells("A5:B5")
    celda_tabla_titulo = ws["A5"]
    celda_tabla_titulo.value = "PARÁMETROS DE CÁLCULO NOM-001-SEDE-2012"
    celda_tabla_titulo.font = fuente_cabecera
    celda_tabla_titulo.fill = relleno_cabecera
    celda_tabla_titulo.alignment = alineacion_centro
    ws.row_dimensions[5].height = 20

    # Datos
    filas_datos = [
        ("Proyecto", datos.get("proyecto", "N/A")),
        ("Tag", datos.get("tag", "N/A")),
        ("Normativa", datos.get("normativa", "NOM-001-SEDE-2012")),
        ("Voltaje (V)", str(datos.get("voltaje", "N/A"))),
        ("Corriente (A)", str(datos.get("corriente", "N/A"))),
        ("Potencia (HP)", str(datos.get("hp", "N/A"))),
        ("Factor de Potencia", str(datos.get("fp", "N/A"))),
        ("Longitud (km)", str(datos.get("longitud", "N/A"))),
        ("Temperatura Ambiente (°C)", str(datos.get("temperaturaAmbiente", "N/A"))),
        ("Temperatura Cable (°C)", str(datos.get("temperaturaCable", "75"))),
        ("Potencia Calculada (kW)", str(datos.get("potencia", "N/A"))),
        ("IPC (A)", str(datos.get("ipc", "N/A"))),
        ("IM (A)", str(datos.get("im", "N/A"))),
        ("ID (A)", str(datos.get("id", "N/A"))),
        ("Calibre por Ampacidad", str(datos.get("calibreAmpacidad", "N/A"))),
        ("Caída de Tensión (V)", str(datos.get("caidaV", "N/A"))),
        ("Caída de Tensión (%)", str(datos.get("porcentaje", "N/A"))),
        ("Calibre por Caída", str(datos.get("calibreCaida", "N/A"))),
        ("Interruptor (A)", str(datos.get("interruptor", {}).get("amperaje", "N/A"))),
        ("Calibre Sugerido", str(datos.get("calibreSugerido", "N/A"))),
        ("Calibre de Tierra", str(datos.get("calibreTierra", "N/A"))),
        ("Estado", "APROBADO" if datos.get("aprobado", False) else "NO APROBADO"),
    ]

    fila_actual = 6
    for idx, (clave, valor) in enumerate(filas_datos):
        fila = fila_actual + idx
        celda_clave = ws[f"A{fila}"]
        celda_valor = ws[f"B{fila}"]

        celda_clave.value = clave
        celda_valor.value = str(valor)

        relleno = relleno_celda_par if idx % 2 == 0 else relleno_celda_impar

        celda_clave.fill = relleno
        celda_valor.fill = relleno

        celda_clave.font = fuente_celda
        celda_valor.font = fuente_valor
        celda_clave.border = borde
        celda_valor.border = borde
        celda_clave.alignment = alineacion_izquierda
        celda_valor.alignment = alineacion_izquierda

    # Ajustar anchos de columna
    ws.column_dimensions["A"].width = 30
    ws.column_dimensions["B"].width = 40

    wb.save(ruta_archivo)

    return nombre_archivo, ruta_archivo


def obtener_ruta_documento(nombre_archivo: str) -> Optional[str]:
    """
    Obtiene la ruta completa de un documento generado.

    Args:
        nombre_archivo: Nombre del archivo.

    Returns:
        Ruta completa del archivo o None si no existe.
    """
    ruta = os.path.join(DOCUMENTS_DIR, nombre_archivo)
    if os.path.exists(ruta):
        return ruta
    return None


def eliminar_documento(nombre_archivo: str) -> bool:
    """
    Elimina un documento generado.

    Args:
        nombre_archivo: Nombre del archivo a eliminar.

    Returns:
        True si se eliminó correctamente, False si no existía.
    """
    ruta = os.path.join(DOCUMENTS_DIR, nombre_archivo)
    if os.path.exists(ruta):
        os.remove(ruta)
        return True
    return False
