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
- **Nuevo punto de entrada:** `http://localhost:8000/src/` (redirige a splash)
- **Pantalla de Splash:** `http://localhost:8000/src/pages/splash.html`
- **Página Principal (legado):** `http://localhost:8000`
- **Pantalla de Login:** `http://localhost:8000/src/pages/login.html`
- **Dashboard:** `http://localhost:8000/src/pages/dashboard.html`
- **Asistente GECRAI:** `http://localhost:8000/src/pages/gecrai.html`

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

1. **src/index.html** → **src/pages/splash.html** (nuevo punto de entrada)
2. **src/pages/splash.html** → **src/pages/login.html** (automático después de carga)
3. **src/pages/login.html** → **src/pages/dashboard.html** (después de autenticación exitosa)
4. **src/pages/dashboard.html** → **src/pages/gecrai.html** (acceso al asistente inteligente)
5. **Cualquier página** → **GProA Technology** (botón de salida)

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

1. **Iniciar en src/index.html** para ver la nueva estructura organizada
2. **Secuencia de carga** en src/pages/splash.html
3. **Autenticación automática** con usuario `admin` y contraseña `1234`
4. **Explorar el dashboard** con estadísticas de proyectos y análisis
5. **Probar el Asistente GECRAI** con el chat interactivo y panel de control
6. **Generar memorias de cálculo** simuladas
7. **Navegar entre páginas** para ver diferentes secciones
8. **Probar el botón de salida** a GProA Technology
9. **Ver el diseño responsive** cambiando el tamaño de la ventana

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

Para hacer un respaldo de tu proyecto GECRAI en el repositorio GitHub, sigue estos pasos:

📋 PASOS PARA HACER RESPALDO EN GITHUB
1. Preparar el directorio local
# Navega a tu directorio de proyecto
cd "H:\Mi unidad\GProA Technology\Desarrollo de Proyectos IA\GECRAI"
2. Inicializar Git (si no está inicializado)
git init
3. Configurar tu información de Git
git config --global user.name "TuNombre"
git config --global user.email "tu@email.com"
4. Agregar el repositorio remoto
git remote add origin https://github.com/gproatechnology/GProA_GECRAI.git
5. Verificar el estado actual
git status
6. Agregar todos los archivos al área de staging
git add .
7. Hacer el primer commit
git commit -m "Demo web GECRAI v1.1 Pro completa con splashscreen y navegación"
8. Subir a GitHub (push)
git push -u origin main
⚠️ NOTAS IMPORTANTES
Si el repositorio ya existe en GitHub, usa:
git pull origin main --allow-unrelated-histories
Si tienes problemas de autenticación, configura tu token de GitHub:
git config --global credential.helper store
Para actualizaciones futuras:
git add .
git commit -m "Descripción de cambios"
git push
📁 ESTRUCTURA QUE SE SUBIRÁ
Tu repositorio incluirá:

src/index.html (nuevo punto de entrada)
src/pages/ con todas las páginas organizadas
src/styles/ con todos los estilos CSS
src/scripts/ con todos los módulos JavaScript
src/assets/ con imágenes, fuentes y datos
README.md con documentación actualizada
INDEX.html (redirección legado)
🔐 SEGURIDAD
Asegúrate de:

No incluir archivos sensibles en el repositorio
Verificar que todos los archivos sean necesarios
Mantener una estructura limpia y organizada
El respaldo estará disponible en: https://github.com/gproatechnology/GProA_GECRAI.git

**Desarrollado por GProA Technology** - Sistema Inteligente para Memorias de Cálculo Eléctrico