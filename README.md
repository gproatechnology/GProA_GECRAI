# 🎯 GECRAI Demo Web - Sistema Inteligente para Memorias de Cálculo

Demo web completamente funcional del sistema **GECRAI v1.1 Pro** - Sistema Inteligente para Memorias de Cálculo Eléctrico.

## 🚀 **COMO INICIAR EL SERVIDOR LOCAL**

### **Requisitos**
- Python 3.x instalado
- Navegador web moderno (Chrome, Firefox, Edge, Safari)

### **Pasos para ejecutar el demo**

1. **Abrir terminal o símbolo del sistema**

2. **Navegar al directorio del proyecto**
```bash
cd "H:\Mi unidad\GProA Technology\Desarrollo de Proyectos IA\GECRAI"
```

3. **Iniciar el servidor web local**
```bash
python -m http.server 8000
```

4. **Acceder al demo en tu navegador**
- **Pantalla de Splash (inicio recomendado):** `http://localhost:8000/splash.html`
- Página Principal: `http://localhost:8000`
- Pantalla de Login: `http://localhost:8000/Templates/login.html`
- Dashboard: `http://localhost:8000/Templates/dashboard.html`
- Asistente GECRAI: `http://localhost:8000/Templates/gecrai.html`

## 📂 **ESTRUCTURA DEL PROYECTO**

```
GECRAI v1.1 Pro
│
├── INDEX.html                  # Página principal
├── splash.html                 # Pantalla de inicio con secuencia
│
├── CSS/
│   ├── main.css                # Punto de entrada CSS
│   ├── base.css                # Variables, reset y tipografía
│   ├── layout.css              # Estructura y grid
│   ├── components.css          # Componentes reutilizables
│   └── responsive.css          # Media queries
│
├── Js/
│   ├── app.js                  # Orquestador principal
│   ├── router.js               # Sistema de navegación
│   ├── dom.js                  # Manipulación DOM
│   ├── events.js               # Manejo de eventos
│   ├── state.js                # Estado global
│   ├── api.js                  # Comunicación con backend
│   ├── config.js               # Configuración
│   └── utils.js                # Funciones utilitarias
│
├── Templates/
│   ├── inicio.html             # Panel de inicio
│   ├── login.html              # Sistema de autenticación
│   ├── dashboard.html          # Dashboard principal
│   ├── gecrai.html             # Asistente GECRAI
│   └── error.html              # Página de error
│
└── Assets/
    ├── img/
    │   └── logo.png            # Logo GECRAI
    ├── fonts/
    │   └── Roboto-Regular.ttf  # Fuente principal
    └── data/
        └── mock.json           # Datos de demostración
```

## 🎬 **SECUENCIA DE INICIO COMPLETA**

1. **splash.html** → **login.html** (automático después de carga)
2. **login.html** → **dashboard.html** (después de autenticación exitosa)
3. **dashboard.html** → **gecrai.html** (acceso al asistente inteligente)
4. **Cualquier página** → **GProA Technology** (botón de salida)

## 🔧 **CARACTERÍSTICAS PRINCIPALES**

### ✨ **Diseño Auténtico GECRAI**
- Tema oscuro con acentos verdes (#00ff00) como el sistema real
- Tipografía Helvetica profesional
- Interfaz completamente responsive
- Animaciones suaves y efectos visuales
- Diseño basado en el sistema desktop GECRAI v1.1 Pro

### 🎬 **Splash Screen Profesional**
- Secuencia de carga animada con 7 pasos
- Barra de progreso visual
- Mensajes de estado del sistema
- Redirección automática al login
- Diseño idéntico al sistema desktop

### 🔐 **Sistema de Autenticación**
- **Usuario demo:** `admin`
- **Contraseña demo:** `1234`
- Gestión de sesiones con localStorage
- Protección de rutas
- Información de usuario en dashboard

### 🤖 **Asistente GECRAI**
- Panel de control con opciones de análisis eléctrico
- Chat inteligente con respuestas contextuales
- Selección de tipos de análisis:
  - NOM-001 (verificación normativa)
  - Cálculo de Potencia
  - Análisis de Corriente
  - Generación de Memorias de Cálculo
- Simulación de procesos técnicos

### 📊 **Funcionalidades Implementadas**
- ✅ **Análisis NOM-001** - Verificación de cumplimiento normativo eléctrico
- ⚡ **Cálculos Eléctricos** - Potencia, corriente y protecciones
- 📋 **Memorias de Cálculo** - Generación automática de documentos técnicos
- 📈 **Dashboard Inteligente** - Estadísticas y actividad reciente
- 📂 **Gestión de Proyectos** - Seguimiento de proyectos eléctricos

### 🌐 **Integración con GProA Technology**
- Botón de salida a `https://gproatechnology.com` en todas las páginas
- Información de desarrollador en login y templates
- Enlaces externos funcionales

## 🎯 **FLUJO DE PRUEBA COMPLETO**

1. **Iniciar en splash.html** para ver la secuencia de carga
2. **Autenticación automática** con usuario `admin` y contraseña `1234`
3. **Explorar el dashboard** con estadísticas de proyectos y análisis
4. **Probar el Asistente GECRAI** con el chat interactivo y panel de control
5. **Generar memorias de cálculo** simuladas
6. **Navegar entre templates** para ver diferentes secciones
7. **Probar el botón de salida** a GProA Technology
8. **Ver el diseño responsive** cambiando el tamaño de la ventana

## 🔧 **CONFIGURACIÓN TÉCNICA**

- **Puerto por defecto:** 8000
- **Ruta base:** `http://localhost:8000`
- **Estructura modular:** CSS y JS separados por funcionalidad
- **Datos mock:** Simulación de API con datos locales
- **Almacenamiento:** localStorage para sesiones
- **Tiempo de splash:** ~6 segundos (simulación de carga)

## 📊 **COMPATIBILIDAD**

- ✅ **Navegadores:** Chrome, Firefox, Safari, Edge
- ✅ **Dispositivos:** Desktop, Tablet, Móvil
- ✅ **Sistemas:** Windows, macOS, Linux
- ✅ **Resoluciones:** Desde 1024x768 hasta 4K

## 🔍 **SOLUCIÓN DE PROBLEMAS**

### **El servidor no inicia:**
```bash
# Verificar Python
python --version

# Cambiar puerto si está ocupado
python -m http.server 8080
```

### **Los estilos no cargan:**
- Verificar que los archivos CSS estén en la misma carpeta
- Comprobar la consola del navegador para errores
- Limpiar cache del navegador

### **La autenticación falla:**
- Usar exactamente: `admin` / `1234`
- Verificar JavaScript habilitado
- Comprobar localStorage disponible

### **El splash no redirige:**
- Verificar que el archivo splash.html esté en la raíz
- Asegurar que JavaScript esté habilitado
- Comprobar la consola para errores

## 📋 **DATOS DEL SISTEMA**

El sistema incluye datos mock que simulan:
- 3 proyectos eléctricos completos
- 45 análisis realizados
- 28 memorias de cálculo generadas
- 8 usuarios registrados
- Actividad reciente simulada
- Normativas NOM-001-SEDE-2012

## 🎯 **¡DEMO LISTO PARA USAR!**

El demo web de GECRAI v1.1 Pro está completamente funcional y replica la experiencia del sistema desktop. **Para comenzar, ejecuta el servidor y visita http://localhost:8000/splash.html**

---

**Desarrollado por GProA Technology** - Sistema Inteligente para Memorias de Cálculo Eléctrico