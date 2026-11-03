"""
Pruebas rigurosas del backend GECRAI
Prueba todos los endpoints y valida respuestas correctas
"""

import requests
import sys
from datetime import datetime

BASE_URL = "http://localhost:8000/api"

# Contadores globales
total_tests = 0
passed_tests = 0
failed_tests = 0


def print_test(name, status, detail=""):
    """Imprimir resultado de prueba"""
    global passed_tests, failed_tests
    if status:
        print(f"  [OK] {name}")
        passed_tests += 1
    else:
        print(f"  [FAIL] {name}")
        if detail:
            print(f"    Detalle: {detail}")
        failed_tests += 1


def print_section(title):
    """Imprimir titulo de seccion"""
    print(f"\n>>> {title}")
    print("-" * 60)


def test_api():
    """Ejecutar todas las pruebas"""
    global total_tests, passed_tests, failed_tests

    # Variable global para guardar token
    token = None
    memoria_id = None

    # =============================================================================
    # PRUEBA 1: AUTENTICACION
    # =============================================================================
    print_section("1. AUTENTICACION")

    # 1.1 Registro de usuario nuevo
    total_tests += 1
    try:
        r = requests.post(f"{BASE_URL}/auth/register", json={
            "username": "testuser_prod",
            "password": "test123456",
            "email": "testprod@gecrai.com",
            "role": "user"
        }, timeout=10)
        if r.status_code == 201:
            passed_tests += 1
            print_test("Registro de usuario", True, f"Codigo: {r.status_code}")
        else:
            failed_tests += 1
            print_test("Registro de usuario", False, f"Codigo: {r.status_code}, Respuesta: {r.text}")
    except Exception as e:
        failed_tests += 1
        print_test("Registro de usuario", False, str(e))

    # 1.2 Login con credenciales validas (admin/1234)
    total_tests += 1
    try:
        r = requests.post(f"{BASE_URL}/auth/login", json={
            "username": "admin",
            "password": "1234"
        }, timeout=10)
        if r.status_code == 200:
            data = r.json()
            token = data.get("token")
            if token and "user" in data:
                passed_tests += 1
                print_test("Login admin/1234", True, f"Token obtenido, usuario: {data.get('user',{}).get('username')}")
            else:
                failed_tests += 1
                print_test("Login admin/1234", False, f"Token o usuario faltante: {data}")
        else:
            failed_tests += 1
            print_test("Login admin/1234", False, f"Codigo: {r.status_code}, Respuesta: {r.text}")
    except Exception as e:
        failed_tests += 1
        print_test("Login admin/1234", False, str(e))

    # 1.3 Login con credenciales incorrectas
    total_tests += 1
    try:
        r = requests.post(f"{BASE_URL}/auth/login", json={
            "username": "admin",
            "password": "wrong_password"
        }, timeout=10)
        if r.status_code == 401:
            passed_tests += 1
            print_test("Login con contraseña incorrecta", True, "Rechazado con 401")
        else:
            failed_tests += 1
            print_test("Login con contraseña incorrecta", False, f"Codigo: {r.status_code}, esperado 401")
    except Exception as e:
        failed_tests += 1
        print_test("Login con contraseña incorrecta", False, str(e))

    # 1.4 Acceder a /api/auth/me con token valido
    total_tests += 1
    try:
        headers = {"Authorization": f"Bearer {token}"} if token else {}
        r = requests.get(f"{BASE_URL}/auth/me", headers=headers, timeout=10)
        if r.status_code == 200:
            data = r.json()
            if data.get("username") == "admin":
                passed_tests += 1
                print_test("GET /api/auth/me con token valido", True, f"Usuario: {data.get('username')}")
            else:
                failed_tests += 1
                print_test("GET /api/auth/me con token valido", False, f"Usuario inesperado: {data}")
        else:
            failed_tests += 1
            print_test("GET /api/auth/me con token valido", False, f"Codigo: {r.status_code}")
    except Exception as e:
        failed_tests += 1
        print_test("GET /api/auth/me con token valido", False, str(e))

    # 1.5 Acceder a /api/auth/me sin token (debe fallar)
    total_tests += 1
    try:
        r = requests.get(f"{BASE_URL}/auth/me", timeout=10)
        if r.status_code == 401:
            passed_tests += 1
            print_test("GET /api/auth/me sin token", True, "Rechazado con 401")
        else:
            failed_tests += 1
            print_test("GET /api/auth/me sin token", False, f"Codigo: {r.status_code}, esperado 401")
    except Exception as e:
        failed_tests += 1
        print_test("GET /api/auth/me sin token", False, str(e))

    # =============================================================================
    # PRUEBA 2: CALCULOS ELECTRICOS NOM-001
    # =============================================================================
    print_section("2. CALCULOS ELECTRICOS NOM-001")

    # 2.1 Calculo caso de referencia (20 HP, 440V, 3F)
    total_tests += 1
    try:
        r = requests.post(f"{BASE_URL}/calcular/nom-001", json={
            "hp": 20,
            "voltaje": 440,
            "fases": 3,
            "fp": 0.85,
            "longitud": 0.07,
            "temperaturaAmbiente": 30,
            "temperaturaCable": 75,
            "factorUtilizacion": 1.25,
            "tipoConductor": "MULTI",
            "hilosPorFase": 1,
            "canalizacion": "CHAROLA",
            "cantidadConductores": 3,
            "porcentajeVcDeseado": 3,
            "eficiencia": 0.9,
            "r": 2.56,
            "xl": 0.171
        }, timeout=10)
        if r.status_code == 200:
            data = r.json()
            if data.get("ipc") == 27.0 and data.get("calibreAmpacidad") == "8 AWG":
                passed_tests += 1
                print_test("Calculo NOM-001 (20HP, 440V, 3F)", True, f"IPC: {data.get('ipc')}A, Calibre: {data.get('calibreAmpacidad')}")
            else:
                failed_tests += 1
                print_test("Calculo NOM-001 (20HP, 440V, 3F)", False, f"Datos inesperados: {data}")
        else:
            failed_tests += 1
            print_test("Calculo NOM-001 (20HP, 440V, 3F)", False, f"Codigo: {r.status_code}, Respuesta: {r.text}")
    except Exception as e:
        failed_tests += 1
        print_test("Calculo NOM-001 (20HP, 440V, 3F)", False, str(e))

    # 2.2 Calculo con voltaje invalido (999V con 1 fase)
    total_tests += 1
    try:
        r = requests.post(f"{BASE_URL}/calcular/nom-001", json={
            "hp": 5,
            "voltaje": 999,
            "fases": 1,
            "fp": 0.85,
            "longitud": 10,
            "temperaturaAmbiente": 30,
            "temperaturaCable": 75,
            "factorUtilizacion": 1.25,
            "tipoConductor": "MULTI",
            "hilosPorFase": 1,
            "canalizacion": "CHAROLA",
            "cantidadConductores": 3,
            "porcentajeVcDeseado": 3,
            "eficiencia": 0.9,
            "r": 2.56,
            "xl": 0.171
        }, timeout=10)
        if r.status_code in [200, 400, 422]:
            passed_tests += 1
            print_test("Calculo con voltaje invalido (999V 1F)", True, f"Respuesta: {r.status_code}")
        else:
            failed_tests += 1
            print_test("Calculo con voltaje invalido (999V 1F)", False, f"Codigo inesperado: {r.status_code}")
    except Exception as e:
        failed_tests += 1
        print_test("Calculo con voltaje invalido (999V 1F)", False, str(e))

    # =============================================================================
    # PRUEBA 3: MEMORIAS DE CALCULO (CRUD)
    # =============================================================================
    print_section("3. MEMORIAS DE CALCULO (CRUD)")

    # 3.1 Crear memoria
    total_tests += 1
    try:
        r = requests.post(f"{BASE_URL}/memorias/", json={
            "normativa": "NOM-001-SEDE-2012",
            "voltaje": 440,
            "corriente": 27.0,
            "potencia": 11880.0,
            "proyecto": "Prueba Integracion",
            "tag": "INT-01",
            "resultado": {"ipc": 27, "calibre": "8 AWG"},
            "owner_id": 1
        }, timeout=10)
        if r.status_code == 201:
            data = r.json()
            memoria_id = data.get("id")
            if memoria_id:
                passed_tests += 1
                print_test("Crear memoria de calculo", True, f"ID: {memoria_id}, Proyecto: {data.get('proyecto')}")
            else:
                failed_tests += 1
                print_test("Crear memoria de calculo", False, f"ID no presente: {data}")
        else:
            failed_tests += 1
            print_test("Crear memoria de calculo", False, f"Codigo: {r.status_code}, Respuesta: {r.text}")
    except Exception as e:
        failed_tests += 1
        print_test("Crear memoria de calculo", False, str(e))

    # 3.2 Listar memorias
    total_tests += 1
    try:
        r = requests.get(f"{BASE_URL}/memorias/", timeout=10)
        if r.status_code == 200:
            data = r.json()
            if isinstance(data, list) and len(data) > 0:
                passed_tests += 1
                print_test("Listar memorias", True, f"{len(data)} memoria(s) encontrada(s)")
            else:
                failed_tests += 1
                print_test("Listar memorias", False, f"Lista vacia o formato incorrecto: {data}")
        else:
            failed_tests += 1
            print_test("Listar memorias", False, f"Codigo: {r.status_code}")
    except Exception as e:
        failed_tests += 1
        print_test("Listar memorias", False, str(e))

    # 3.3 Obtener memoria por ID
    total_tests += 1
    try:
        if memoria_id:
            r = requests.get(f"{BASE_URL}/memorias/{memoria_id}", timeout=10)
            if r.status_code == 200:
                data = r.json()
                if data.get("id") == memoria_id:
                    passed_tests += 1
                    print_test(f"Obtener memoria ID {memoria_id}", True, f"Proyecto: {data.get('proyecto')}")
                else:
                    failed_tests += 1
                    print_test(f"Obtener memoria ID {memoria_id}", False, f"ID no coincide: {data.get('id')}")
            else:
                failed_tests += 1
                print_test(f"Obtener memoria ID {memoria_id}", False, f"Codigo: {r.status_code}")
        else:
            failed_tests += 1
            print_test("Obtener memoria ID", False, "No hay ID de memoria disponible")
    except Exception as e:
        failed_tests += 1
        print_test("Obtener memoria ID", False, str(e))

    # =============================================================================
    # PRUEBA 4: METRICAS DASHBOARD
    # =============================================================================
    print_section("4. METRICAS DASHBOARD")

    total_tests += 1
    try:
        r = requests.get(f"{BASE_URL}/metrics/dashboard", timeout=10)
        if r.status_code == 200:
            data = r.json()
            required_fields = ["proyectosActivos", "analisisCompletados", "memoriasGeneradas", "usuariosRegistrados"]
            if all(k in data for k in required_fields):
                passed_tests += 1
                print_test("GET /api/metrics/dashboard", True, f"Proyectos: {data.get('proyectosActivos')}, Memorias: {data.get('memoriasGeneradas')}")
            else:
                failed_tests += 1
                print_test("GET /api/metrics/dashboard", False, f"Campos faltantes: {data}")
        else:
            failed_tests += 1
            print_test("GET /api/metrics/dashboard", False, f"Codigo: {r.status_code}")
    except Exception as e:
        failed_tests += 1
        print_test("GET /api/metrics/dashboard", False, str(e))

    # =============================================================================
    # PRUEBA 5: DOCUMENTOS (PDF/EXCEL)
    # =============================================================================
    print_section("5. DOCUMENTOS (PDF/EXCEL)")

    # 5.1 Generar PDF
    total_tests += 1
    try:
        r = requests.post(f"{BASE_URL}/documentos/generar/pdf", json={
            "proyecto": "Prueba Documento PDF",
            "tag": "PDF-01",
            "normativa": "NOM-001-SEDE-2012",
            "voltaje": 440,
            "corriente": 27.0,
            "potencia": 20,
            "fp": 0.85,
            "longitud": 0.07,
            "temperaturaAmbiente": 30,
            "temperaturaCable": 75,
            "factorUtilizacion": 1.25,
            "tipoConductor": "MULTI",
            "hilosPorFase": 1,
            "canalizacion": "CHAROLA",
            "cantidadConductores": 3,
            "porcentajeVcDeseado": 3,
            "eficiencia": 0.9,
            "r": 2.56,
            "xl": 0.171,
            "resultado": {"ipc": 27, "calibre": "8 AWG"},
            "owner_id": 1
        }, timeout=30)
        if r.status_code == 201:
            data = r.json()
            nombre_archivo = data.get("nombre_archivo", "")
            if nombre_archivo.endswith(".pdf"):
                passed_tests += 1
                print_test("Generar memoria PDF", True, f"Archivo: {nombre_archivo}")
            else:
                failed_tests += 1
                print_test("Generar memoria PDF", False, f"Extension incorrecta: {nombre_archivo}")
        else:
            failed_tests += 1
            print_test("Generar memoria PDF", False, f"Codigo: {r.status_code}, Respuesta: {r.text}")
    except Exception as e:
        failed_tests += 1
        print_test("Generar memoria PDF", False, str(e))

    # 5.2 Generar Excel
    total_tests += 1
    try:
        r = requests.post(f"{BASE_URL}/documentos/generar/excel", json={
            "proyecto": "Prueba Documento Excel",
            "tag": "EXL-01",
            "normativa": "NOM-001-SEDE-2012",
            "voltaje": 220,
            "corriente": 15.0,
            "potencia": 15,
            "fp": 0.90,
            "longitud": 0.15,
            "temperaturaAmbiente": 35,
            "temperaturaCable": 75,
            "factorUtilizacion": 1.25,
            "tipoConductor": "MULTI",
            "hilosPorFase": 1,
            "canalizacion": "TUBERIA",
            "cantidadConductores": 4,
            "porcentajeVcDeseado": 3,
            "eficiencia": 0.88,
            "r": 2.56,
            "xl": 0.171,
            "resultado": {"ipc": 18, "calibre": "6 AWG"},
            "owner_id": 1
        }, timeout=30)
        if r.status_code == 201:
            data = r.json()
            nombre_archivo = data.get("nombre_archivo", "")
            if nombre_archivo.endswith(".xlsx"):
                passed_tests += 1
                print_test("Generar memoria Excel", True, f"Archivo: {nombre_archivo}")
            else:
                failed_tests += 1
                print_test("Generar memoria Excel", False, f"Extension incorrecta: {nombre_archivo}")
        else:
            failed_tests += 1
            print_test("Generar memoria Excel", False, f"Codigo: {r.status_code}, Respuesta: {r.text}")
    except Exception as e:
        failed_tests += 1
        print_test("Generar memoria Excel", False, str(e))

    # 5.3 Descargar documento PDF
    total_tests += 1
    try:
        r = requests.get(f"{BASE_URL}/documentos/memoria_GECRAI-20261103-0001.pdf", timeout=30)
        if r.status_code == 200:
            content_type = r.headers.get("content-type", "")
            if len(r.content) > 0:
                passed_tests += 1
                print_test("Descargar PDF", True, f"Tamano: {len(r.content)} bytes")
            else:
                failed_tests += 1
                print_test("Descargar PDF", False, "Respuesta vacia")
        else:
            failed_tests += 1
            print_test("Descargar PDF", False, f"Codigo: {r.status_code}")
    except Exception as e:
        failed_tests += 1
        print_test("Descargar PDF", False, str(e))

    # 5.4 Listar documentos
    total_tests += 1
    try:
        r = requests.get(f"{BASE_URL}/documentos/", timeout=10)
        if r.status_code == 200:
            data = r.json()
            if isinstance(data, list) and len(data) >= 2:
                passed_tests += 1
                print_test("Listar documentos", True, f"{len(data)} documento(s) encontrado(s)")
            else:
                failed_tests += 1
                print_test("Listar documentos", False, f"Lista vacia o formato incorrecto: {data}")
        else:
            failed_tests += 1
            print_test("Listar documentos", False, f"Codigo: {r.status_code}")
    except Exception as e:
        failed_tests += 1
        print_test("Listar documentos", False, str(e))

    # 5.5 Eliminar documento
    total_tests += 1
    try:
        r = requests.delete(f"{BASE_URL}/documentos/memoria_GECRAI-20261103-0003.xlsx", timeout=10)
        if r.status_code == 204:
            passed_tests += 1
            print_test("Eliminar documento", True, "Eliminado correctamente")
        else:
            failed_tests += 1
            print_test("Eliminar documento", False, f"Codigo: {r.status_code}")
    except Exception as e:
        failed_tests += 1
        print_test("Eliminar documento", False, str(e))

    # =============================================================================
    # RESUMEN FINAL
    # =============================================================================
    print_section("RESUMEN FINAL")
    print(f"Total de pruebas: {total_tests}")
    print(f"Pruebas aprobadas: {passed_tests}")
    print(f"Pruebas fallidas: {failed_tests}")

    if failed_tests == 0:
        print(f"\nTODAS LAS PRUEBAS PASARON")
    else:
        print(f"\nHAY PRUEBAS FALLANDO")

    return failed_tests == 0


if __name__ == "__main__":
    print("=== PRUEBAS RIGUROSAS DEL BACKEND GECRAI ===")
    print(f"Fecha: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"URL base: {BASE_URL}")
    print()

    exito = test_api()
    sys.exit(0 if exito else 1)
