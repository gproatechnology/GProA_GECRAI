/**
 * GECRAI Router - Sistema de navegación mejorado
 * Maneja la navegación entre páginas con transiciones suaves y estado de sesión
 */

class GECRAIRouter {
    constructor() {
        this.routes = {
            'splash': '/src/pages/splash.html',
            'login': '/src/pages/login.html',
            'dashboard': '/src/pages/dashboard.html',
            'gecrai': '/src/pages/gecrai.html',
            'inicio': '/src/pages/inicio.html',
            'error': '/src/pages/error.html'
        };

        this.init();
    }

    init() {
        // Verificar sesión al cargar cualquier página
        this.checkSession();

        // Manejar navegación con transiciones
        this.setupNavigation();
    }

    checkSession() {
        // Verificar si hay una sesión activa
        const user = localStorage.getItem('gecraiUser');

        // Si no hay sesión y no estamos en login/splash, redirigir a login
        if (!user && !window.location.href.includes('login.html') && !window.location.href.includes('splash.html')) {
            this.navigateTo('login');
            return;
        }

        // Si hay sesión y estamos en login/splash, redirigir a dashboard
        if (user && (window.location.href.includes('login.html') || window.location.href.includes('splash.html'))) {
            this.navigateTo('dashboard');
            return;
        }
    }

    setupNavigation() {
        // Manejar clics en enlaces internos
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-link') || e.target.closest('.nav-link')) {
                e.preventDefault();
                const target = e.target.getAttribute('href') || e.target.closest('.nav-link').getAttribute('href');
                const routeName = target.replace('/src/pages/', '').replace('.html', '');
                this.navigateTo(routeName);
            }
        });
    }

    navigateTo(routeName, options = {}) {
        const { transition = true, replaceState = false } = options;

        // Verificar si la ruta existe
        if (!this.routes[routeName]) {
            console.error(`Ruta '${routeName}' no encontrada`);
            this.navigateTo('error');
            return;
        }

        // Obtener la URL de destino
        const targetUrl = this.routes[routeName];

        // Aplicar transición si está habilitada
        if (transition) {
            this.applyTransition(() => {
                this.performNavigation(targetUrl, replaceState);
            });
        } else {
            this.performNavigation(targetUrl, replaceState);
        }
    }

    applyTransition(callback) {
        // Crear overlay de transición
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = '#121212';
        overlay.style.zIndex = '9999';
        overlay.style.transition = 'opacity 0.3s ease';
        overlay.style.opacity = '0';

        document.body.appendChild(overlay);

        // Animación de transición
        setTimeout(() => {
            overlay.style.opacity = '1';
            setTimeout(() => {
                callback();
                setTimeout(() => {
                    overlay.style.opacity = '0';
                    setTimeout(() => {
                        overlay.remove();
                    }, 300);
                }, 100);
            }, 300);
        }, 10);
    }

    performNavigation(url, replaceState) {
        if (replaceState) {
            window.history.replaceState({}, '', url);
            this.loadContent(url);
        } else {
            window.history.pushState({}, '', url);
            this.loadContent(url);
        }
    }

    loadContent(url) {
        // Para navegación SPA, podríamos cargar contenido dinámicamente
        // Por ahora, redirigimos normalmente
        window.location.href = url;
    }

    // Método para manejar el botón de regreso
    goBack() {
        window.history.back();
    }
}

// Inicializar el router cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    // Verificar si ya existe una instancia del router
    if (!window.gecraiRouter) {
        window.gecraiRouter = new GECRAIRouter();
    }
});

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GECRAIRouter;
}