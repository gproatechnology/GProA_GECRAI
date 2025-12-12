/* App.js - Orquestador principal mejorado */
document.addEventListener('DOMContentLoaded', function () {
    console.log('GECRAI Web App v1.1 Pro initialized');

    // Inicializar router mejorado
    initRouter();

    // Inicializar componentes
    initComponents();

    // Cargar estado inicial
    loadInitialState();

    // Configurar manejo de navegación
    setupNavigationHandlers();
});

function initRouter() {
    console.log('Initializing GECRAI Router...');

    // Asegurarse de que el router esté cargado
    if (typeof GECRAIRouter === 'undefined') {
        // Cargar el router dinámicamente si no está disponible
        const script = document.createElement('script');
        script.src = 'router.js';
        script.onload = function () {
            console.log('Router loaded dynamically');
        };
        document.head.appendChild(script);
    }
}

function initComponents() {
    console.log('Initializing GECRAI components...');

    // Inicializar componentes específicos de cada página
    const pageType = detectPageType();
    switch (pageType) {
        case 'splash':
            initSplashComponents();
            break;
        case 'login':
            initLoginComponents();
            break;
        case 'dashboard':
            initDashboardComponents();
            break;
        case 'gecrai':
            initGecraiComponents();
            break;
        default:
            console.log('Unknown page type or generic page');
    }
}

function detectPageType() {
    if (window.location.href.includes('splash.html')) return 'splash';
    if (window.location.href.includes('login.html')) return 'login';
    if (window.location.href.includes('dashboard.html')) return 'dashboard';
    if (window.location.href.includes('gecrai.html')) return 'gecrai';
    if (window.location.href.includes('inicio.html')) return 'inicio';
    return 'unknown';
}

function initSplashComponents() {
    console.log('Initializing splash screen components');
    // Componentes específicos de splash
}

function initLoginComponents() {
    console.log('Initializing login components');

    // Manejar formulario de login si existe
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            handleLogin();
        });
    }
}

function initDashboardComponents() {
    console.log('Initializing dashboard components');

    // Cargar información de usuario
    loadUserInfo();

    // Configurar botones de navegación
    setupDashboardNavigation();
}

function initGecraiComponents() {
    console.log('Initializing GECRAI assistant components');

    // Configurar chat y panel de control
    setupChatSystem();
    setupControlPanel();
}

function loadInitialState() {
    console.log('Loading initial application state');

    // Cargar estado desde localStorage o configuración predeterminada
    const appState = {
        user: JSON.parse(localStorage.getItem('gecraiUser')) || null,
        theme: localStorage.getItem('gecraiTheme') || 'dark',
        lastPage: localStorage.getItem('gecraiLastPage') || 'splash'
    };

    console.log('Current app state:', appState);

    // Aplicar tema
    applyTheme(appState.theme);
}

function setupNavigationHandlers() {
    console.log('Setting up navigation handlers');

    // Manejar clics en botones de navegación
    document.querySelectorAll('.nav-btn, .nav-link').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('data-target') || this.getAttribute('href');
            navigateToPage(target);
        });
    });

    // Manejar botón de regreso si existe
    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
        backBtn.addEventListener('click', function () {
            if (window.gecraiRouter) {
                window.gecraiRouter.goBack();
            } else {
                window.history.back();
            }
        });
    }
}

function navigateToPage(target) {
    console.log(`Navigating to: ${target}`);

    // Usar el router si está disponible
    if (window.gecraiRouter) {
        const routeName = target.replace('/src/pages/', '').replace('.html', '');
        window.gecraiRouter.navigateTo(routeName);
    } else {
        // Navegación básica si el router no está disponible
        window.location.href = target;
    }
}

function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validación básica
    if (!username || !password) {
        showError('Por favor ingresa usuario y contraseña');
        return;
    }

    // Autenticación simulada
    if (username === 'admin' && password === '1234') {
        // Guardar información de usuario
        const userData = {
            username: username,
            role: 'admin',
            loginTime: new Date().toISOString()
        };

        localStorage.setItem('gecraiUser', JSON.stringify(userData));
        localStorage.setItem('gecraiLastPage', 'dashboard');

        // Navegar al dashboard con transición
        navigateToPage('/src/pages/dashboard.html');
    } else {
        showError('Credenciales incorrectas. Usuario: admin, Contraseña: 1234');
    }
}

function loadUserInfo() {
    const userData = JSON.parse(localStorage.getItem('gecraiUser'));
    if (userData) {
        document.getElementById('username').textContent = userData.username;
        document.getElementById('userRole').textContent =
            userData.role === 'admin' ? 'Administrador' : 'Ingeniero';
    }
}

function setupDashboardNavigation() {
    // Configurar botones de navegación del dashboard
    const navButtons = {
        'gecrai-btn': '/src/pages/gecrai.html',
        'projects-btn': '/src/pages/dashboard.html',
        'logout-btn': '/src/pages/login.html'
    };

    Object.entries(navButtons).forEach(([id, target]) => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                navigateToPage(target);
            });
        }
    });
}

function setupChatSystem() {
    // Configurar sistema de chat para el asistente GECRAI
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');

    if (chatForm && chatInput) {
        chatForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const message = chatInput.value.trim();
            if (message) {
                sendChatMessage(message);
                chatInput.value = '';
            }
        });
    }
}

function setupControlPanel() {
    // Configurar panel de control del asistente
    const controlButtons = document.querySelectorAll('.control-btn');
    controlButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const action = this.getAttribute('data-action');
            handleControlAction(action);
        });
    });
}

function sendChatMessage(message) {
    // Lógica para enviar mensajes al chat
    console.log('Sending message:', message);
    // Aquí iría la lógica para procesar el mensaje y mostrar respuestas
}

function handleControlAction(action) {
    // Manejar acciones del panel de control
    console.log('Control action:', action);
    // Aquí iría la lógica para cada acción del panel
}

function showError(message) {
    // Mostrar mensajes de error
    alert(message);
    console.error('Error:', message);
}

function applyTheme(theme) {
    // Aplicar tema a la aplicación
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${theme}-theme`);
    console.log(`Applied ${theme} theme`);
}

// Funciones utilitarias adicionales
function logout() {
    localStorage.removeItem('gecraiUser');
    localStorage.removeItem('gecraiLastPage');
    navigateToPage('/src/pages/login.html');
}

// Exportar funciones para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initRouter,
        initComponents,
        loadInitialState,
        navigateToPage,
        handleLogin,
        logout
    };
}