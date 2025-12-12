
# 🎯 GECRAI Demo Web - Sistema Completo

Demo web completamente funcional del sistema **GECRAI v1.1 Pro** que replica exactamente la experiencia del software desktop.

## 🔧 **CARACTERÍSTICAS PRINCIPALES**

### ✨ **Diseño Auténtico**
- Tema oscuro con acentos verdes (#00ff00) como el sistema real
- Tipografía Helvetica profesional
- Animaciones suaves y efectos visuales
- Interfaz completamente responsive

### 🔐 **Sistema de Autenticación Real**
- **Usuario:** `admin`
- **Contraseña:** `1234`
- Replica exacta del sistema de autenticación de GECRAI
- Gestión de sesiones con localStorage
- Notificaciones del sistema

### 🎨 **Pantalla de Splash**
- Simulación del inicio del sistema real
- Barra de progreso animada
- Mensajes de estado del sistema
- Diseño idéntico al desktop

### 📊 **Funcionalidades Implementadas**
- ✅ **Análisis NOM-001** - Verificación de cumplimiento normativo
- ⚡ **Calculadora Eléctrica** - Cálculos de potencia y corriente
- 📈 **Visualización de Datos** - Gráficos interactivos
- 🤖 **Asistente IA** - Chat inteligente para consultas técnicas
- 📋 **Generación de Reportes** - Creación de documentos PDF

## 🚀 **FLUJO DE PRUEBA COMPLETO**

### **Pasos para probar:**

1. **Iniciar el Servidor**
   ```bash
   cd "C:\Users\X1\OneDrive\Documentos\Python_VS Code\GProA\GECRAI_1.1\demo_web"
   python -m http.server 8000
   ```

2. **Acceder al Demo**
   - Página Principal: `http://localhost:8000`
   - Pantalla de Splash: `http://localhost:8000/splash.html`
   - Autenticación: `http://localhost:8000/auth.html`
   - Sistema Principal: `http://localhost:8000/gecrai.html`

3. **Probar Funcionalidades**
   - Usar credenciales: `admin` / `1234`
   - Probar cada módulo del sistema
   - Interactuar con la calculadora eléctrica
   - Consultar el asistente IA

## 📂 **ARCHIVOS DEL DEMO**

| Archivo | Función |
|---------|---------|
| `splash.html` | Pantalla de inicio animada |
| `index.html` | Página principal del sistema |
| `auth.html` | Sistema de autenticación |
| `gecrai.html` | Interfaz principal del sistema |
| `styles.css` | Estilos principales (tema oscuro) |
| `splash-styles.css` | Estilos de pantalla de splash |
| `script.js` | Funcionalidad JavaScript |

## 🔧 **ESPECIFICACIONES TÉCNICAS**

### **Autenticación**
- Sistema de credenciales hardcodeadas (demo)
- Almacenamiento local de sesiones
- Validación de acceso a módulos
- Gestión de roles de usuario

### **Interfaz de Usuario**
- Diseño responsive para todos los dispositivos
- Animaciones CSS con transiciones suaves
- Tema visual idéntico al sistema desktop
- Iconografía consistente con GECRAI

### **Funcionalidades Eléctricas**
- Cálculos de potencia: P = V × I
- Análisis de carga trifásica
- Verificación NOM-001 básica
- Simulación de protecciones eléctricas

## 🎯 **COMPATIBILIDAD**

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

## 📊 **ESTADÍSTICAS DEL DEMO**

| Métrica | Valor |
|---------|-------|
| Archivos HTML | 4 |
| Archivos CSS | 2 |
| Líneas de JavaScript | 400+ |
| Funcionalidades | 6 |
| Tiempo de desarrollo | Optimizado |

---

## 🎯 **¡DEMO LISTO PARA USAR!**

El demo web de GECRAI está completamente funcional y replica la experiencia completa del sistema desktop. **Para comenzar, ejecuta el servidor y visita http://localhost:8000**
