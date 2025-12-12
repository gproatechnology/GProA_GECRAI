# 🎯 GECRAI Demo Web - Comedor IA IBM

Demo web completamente funcional del sistema **GECRAI v1.1 Pro** con estructura basada en Comedor IA IBM.

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
- Página Principal: `http://localhost:8000`
- Pantalla de Login: `http://localhost:8000/Templates/login.html`
- Dashboard: `http://localhost:8000/Templates/dashboard.html`
- Comedor IA: `http://localhost:8000/Templates/comedor.html`

## 📂 **ESTRUCTURA DEL PROYECTO**

```
Comedor IA IBM
│
├── INDEX.html                  # Página principal
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
│   ├── comedor.html            # Interfaz Comedor IA
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

## 🔧 **CARACTERÍSTICAS PRINCIPALES**

### ✨ **Diseño Auténtico**
- Tema oscuro con acentos verdes (#00ff00) como el sistema real
- Tipografía Helvetica profesional
- Interfaz completamente responsive
- Animaciones suaves y efectos visuales

### 🔐 **Sistema de Autenticación**
- **Usuario demo:** `admin`
- **Contraseña demo:** `1234`
- Gestión de sesiones con localStorage
- Protección de rutas

### 🤖 **Comedor IA IBM**
- Panel de control con opciones de análisis
- Chat inteligente con IA simulada
- Selección de tipos de análisis (NOM-001, potencia, corriente)
- Generación de reportes simulada

### 📊 **Funcionalidades Implementadas**
- ✅ **Análisis NOM-001** - Verificación de cumplimiento
- ⚡ **Calculadora Eléctrica** - Cálculos técnicos
- 📈 **Visualización de Datos** - Dashboard interactivo
- 🤖 **Asistente IA** - Chat para consultas técnicas
- 📋 **Generación de Reportes** - Simulación de documentos

## 🎯 **FLUJO DE PRUEBA COMPLETO**

1. **Iniciar sesión** con usuario `admin` y contraseña `1234`
2. **Explorar el dashboard** con estadísticas y actividad reciente
3. **Probar el Comedor IA** con el chat interactivo
4. **Navegar entre templates** para ver diferentes secciones
5. **Ver el diseño responsive** cambiando el tamaño de la ventana

## 🔧 **CONFIGURACIÓN TÉCNICA**

- **Puerto por defecto:** 8000
- **Ruta base:** `http://localhost:8000`
- **Estructura modular:** CSS y JS separados por funcionalidad
- **Datos mock:** Simulación de API con datos locales

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

---

## 🎯 **¡DEMO LISTO PARA USAR!**

El demo web de GECRAI está completamente funcional y replica la experiencia del sistema Comedor IA IBM. **Para comenzar, ejecuta el servidor y visita http://localhost:8000**