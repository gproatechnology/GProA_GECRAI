// GECRAI Demo - JavaScript para interactividad

// Variables globales
let isLoggedIn = false;
let currentUser = null;
let chatHistory = [];

// Inicialización cuando carga la página
document.addEventListener('DOMContentLoaded', function () {
    checkAuthStatus();
    initializeDemo();
});

// Verificar estado de autenticación
function checkAuthStatus() {
    const authStatus = localStorage.getItem('gecraiAuth');
    if (authStatus) {
        isLoggedIn = true;
        currentUser = JSON.parse(authStatus);
        showWelcomeMessage();
    }
}

// Mostrar mensaje de bienvenida
function showWelcomeMessage() {
    if (currentUser) {
        const welcomeDiv = document.createElement('div');
        welcomeDiv.className = 'welcome-message';
        welcomeDiv.innerHTML = `
            <p>¡Bienvenido, ${currentUser.username}!</p>
            <button onclick="logout()" class="btn">Cerrar Sesión</button>
        `;
        document.body.appendChild(welcomeDiv);
    }
}

/* Autenticación (solo para demo) */
function login(username, password) {
    // Simulación de autenticación - Credenciales reales de GECRAI
    const validUsername = 'admin';
    const validPassword = '1234'; // Password real del sistema GECRAI

    if (username === validUsername && password === validPassword) {
        const user = {
            username: username,
            role: 'admin',
            timestamp: new Date().toISOString(),
            system: 'GECRAI v1.1 Pro'
        };

        localStorage.setItem('gecraiAuth', JSON.stringify(user));
        isLoggedIn = true;
        currentUser = user;

        showNotification('Acceso exitoso - Bienvenido a GECRAI', 'success');
        setTimeout(() => {
            window.location.href = 'gecrai.html';
        }, 1500);

        return true;
    } else {
        showNotification('Credenciales incorrectas', 'error');
        return false;
    }
}

// Cerrar sesión
function logout() {
    localStorage.removeItem('gecraiAuth');
    isLoggedIn = false;
    currentUser = null;
    window.location.href = 'index.html';
}

// Manejar formulario de login
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            login(username, password);
        });
    }
});

// Inicializar demo
function initializeDemo() {
    // Configurar listeners para los botones de demo
    setupDemoButtons();

    // Inicializar gráfico de barras
    initializeBarChart();

    // Configurar chat
    initializeChat();
}

// Configurar botones de demo
function setupDemoButtons() {
    // Los botones ya tienen onclick en el HTML, pero podemos agregar funcionalidad adicional
    console.log('Demo buttons initialized');
}

// Mostrar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Estilos para la notificación
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '5px',
        color: 'white',
        fontWeight: 'bold',
        zIndex: '1000',
        transition: 'all 0.3s ease'
    });

    // Colores según el tipo
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        info: '#17a2b8',
        warning: '#ffc107'
    };

    notification.style.backgroundColor = colors[type] || colors.info;

    document.body.appendChild(notification);

    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

/* Mostrar características del demo */
function showFeature(feature) {
    const features = {
        'dashboard': () => {
            // Mostrar dashboard por defecto
            const dashboardSection = document.getElementById('dashboard-section');
            if (dashboardSection) {
                dashboardSection.style.display = 'block';
            }
            // Ocultar otros módulos
            const nomAnalysis = document.getElementById('nom-analysis');
            const electricalCalculations = document.getElementById('electrical-calculations');
            const dataVisualization = document.getElementById('data-visualization');
            const aiAssistant = document.getElementById('ai-assistant');

            if (nomAnalysis) nomAnalysis.style.display = 'none';
            if (electricalCalculations) electricalCalculations.style.display = 'none';
            if (dataVisualization) dataVisualization.style.display = 'none';
            if (aiAssistant) aiAssistant.style.display = 'none';
        },
        'nom': () => {
            const dashboardSection = document.getElementById('dashboard-section');
            if (dashboardSection) {
                dashboardSection.style.display = 'none';
            }
            const nomAnalysis = document.getElementById('nom-analysis');
            const electricalCalculations = document.getElementById('electrical-calculations');
            const dataVisualization = document.getElementById('data-visualization');
            const aiAssistant = document.getElementById('ai-assistant');

            if (nomAnalysis) nomAnalysis.style.display = 'block';
            if (electricalCalculations) electricalCalculations.style.display = 'none';
            if (dataVisualization) dataVisualization.style.display = 'none';
            if (aiAssistant) aiAssistant.style.display = 'none';
        },
        'calculations': () => {
            const dashboardSection = document.getElementById('dashboard-section');
            if (dashboardSection) {
                dashboardSection.style.display = 'none';
            }
            const nomAnalysis = document.getElementById('nom-analysis');
            const electricalCalculations = document.getElementById('electrical-calculations');
            const dataVisualization = document.getElementById('data-visualization');
            const aiAssistant = document.getElementById('ai-assistant');

            if (nomAnalysis) nomAnalysis.style.display = 'none';
            if (electricalCalculations) electricalCalculations.style.display = 'block';
            if (dataVisualization) dataVisualization.style.display = 'none';
            if (aiAssistant) aiAssistant.style.display = 'none';
        },
        'visualization': () => {
            const dashboardSection = document.getElementById('dashboard-section');
            if (dashboardSection) {
                dashboardSection.style.display = 'none';
            }
            const nomAnalysis = document.getElementById('nom-analysis');
            const electricalCalculations = document.getElementById('electrical-calculations');
            const dataVisualization = document.getElementById('data-visualization');
            const aiAssistant = document.getElementById('ai-assistant');

            if (nomAnalysis) nomAnalysis.style.display = 'none';
            if (electricalCalculations) electricalCalculations.style.display = 'none';
            if (dataVisualization) dataVisualization.style.display = 'block';
            if (aiAssistant) aiAssistant.style.display = 'none';
        },
        'ai': () => {
            const dashboardSection = document.getElementById('dashboard-section');
            if (dashboardSection) {
                dashboardSection.style.display = 'none';
            }
            const nomAnalysis = document.getElementById('nom-analysis');
            const electricalCalculations = document.getElementById('electrical-calculations');
            const dataVisualization = document.getElementById('data-visualization');
            const aiAssistant = document.getElementById('ai-assistant');

            if (nomAnalysis) nomAnalysis.style.display = 'none';
            if (electricalCalculations) electricalCalculations.style.display = 'none';
            if (dataVisualization) dataVisualization.style.display = 'none';
            if (aiAssistant) aiAssistant.style.display = 'block';
        }
    };

    if (features[feature]) {
        features[feature]();
        const featureNames = {
            'dashboard': 'Dashboard Energético',
            'nom': 'Análisis NOM-001',
            'calculations': 'Cálculos Eléctricos',
            'visualization': 'Visualización de Datos',
            'ai': 'Asistente IA'
        };
        showNotification(`Mostrando: ${featureNames[feature] || feature}`, 'info');
    }
}

// Simular análisis completo
function simulateAnalysis() {
    const analysisCard = document.getElementById('nom-analysis');
    const button = analysisCard.querySelector('.btn');

    // Mostrar loading
    button.innerHTML = '<span class="loading"></span> Analizando...';
    button.disabled = true;

    setTimeout(() => {
        // Simular resultados del análisis
        const results = [
            '✅ Análisis de protecciones completado',
            '✅ Verificación de puesta a tierra exitosa',
            '✅ Revisión de distancias de seguridad aprobada',
            '✅ Evaluación de conductores completada',
            '⚠️ Recomendación: Actualizar interruptor principal a 150A'
        ];

        const resultsDiv = analysisCard.querySelector('.analysis-results') || document.createElement('div');
        resultsDiv.className = 'analysis-results';
        resultsDiv.innerHTML = `
            <h4>Resultados del Análisis:</h4>
            <ul>
                ${results.map(result => `<li>${result}</li>`).join('')}
            </ul>
            <p><strong>Tiempo de análisis:</strong> ${Math.random() * 2 + 1}s</p>
            <p><strong>Cumplimiento normativo:</strong> <span class="status compliance">95% CUMPLE</span></p>
        `;

        if (!analysisCard.querySelector('.analysis-results')) {
            analysisCard.appendChild(resultsDiv);
        }

        button.innerHTML = 'Analizar Nuevamente';
        button.disabled = false;

        showNotification('Análisis completado exitosamente', 'success');
    }, 2000);
}

// Calcular valores eléctricos
function calculateElectrical() {
    const voltage = parseFloat(document.querySelector('#electrical-calculations input[type="number"]').value);
    const current = parseFloat(document.querySelectorAll('#electrical-calculations input[type="number"]')[1].value);

    if (voltage && current) {
        const power = (voltage * current) / 1000; // kW
        const currentA = current;
        const powerFactor = 0.85;
        const apparentPower = power / powerFactor;
        const resistance = voltage / current;

        const resultDiv = document.getElementById('calc-result');
        resultDiv.innerHTML = `
            <h4>Resultados del Cálculo:</h4>
            <p><strong>Potencia Activa:</strong> ${power.toFixed(2)} kW</p>
            <p><strong>Corriente:</strong> ${currentA.toFixed(2)} A</p>
            <p><strong>Potencia Aparente:</strong> ${apparentPower.toFixed(2)} kVA</p>
            <p><strong>Resistencia:</strong> ${resistance.toFixed(2)} Ω</p>
            <p><strong>Factor de Potencia:</strong> ${powerFactor}</p>
        `;

        showNotification('Cálculo completado', 'success');
    } else {
        showNotification('Por favor ingresa valores válidos', 'error');
    }
}

// Inicializar gráfico de barras
function initializeBarChart() {
    const bars = document.querySelectorAll('.bar');
    const values = [80, 75, 85]; // Valores por defecto

    bars.forEach((bar, index) => {
        bar.style.height = values[index] + '%';
    });
}

// Actualizar gráfico
function refreshChart() {
    const bars = document.querySelectorAll('.bar');
    const values = [
        Math.floor(Math.random() * 30) + 70, // L1: 70-100%
        Math.floor(Math.random() * 30) + 70, // L2: 70-100%
        Math.floor(Math.random() * 30) + 70  // L3: 70-100%
    ];

    bars.forEach((bar, index) => {
        bar.style.height = values[index] + '%';
        bar.textContent = values[index] + '%';
    });

    // Animación de actualización
    bars.forEach(bar => {
        bar.style.transform = 'scaleY(0.8)';
        setTimeout(() => {
            bar.style.transform = 'scaleY(1)';
        }, 100);
    });

    showNotification('Datos actualizados', 'info');
}

// Inicializar chat
function initializeChat() {
    chatHistory = [
        {
            type: 'ai',
            message: '¡Hola! Soy el asistente IA de GECRAI. ¿En qué puedo ayudarte con el análisis eléctrico?',
            timestamp: new Date()
        }
    ];

    renderChatHistory();
}

// Renderizar historial del chat
function renderChatHistory() {
    const chatContainer = document.getElementById('chatMessages');
    if (!chatContainer) return;

    chatContainer.innerHTML = '';

    chatHistory.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${msg.type}`;
        messageDiv.innerHTML = `
            <strong>${msg.type === 'user' ? 'Tú' : 'Asistente'}:</strong> ${msg.message}
            <small style="opacity: 0.7; margin-left: 10px;">
                ${msg.timestamp.toLocaleTimeString()}
            </small>
        `;
        chatContainer.appendChild(messageDiv);
    });

    // Scroll al final
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Enviar mensaje al chat
function sendMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();

    if (!message) return;

    // Agregar mensaje del usuario
    chatHistory.push({
        type: 'user',
        message: message,
        timestamp: new Date()
    });

    userInput.value = '';
    renderChatHistory();

    // Simular respuesta del IA
    setTimeout(() => {
        const response = generateAIResponse(message);
        chatHistory.push({
            type: 'ai',
            message: response,
            timestamp: new Date()
        });
        renderChatHistory();
    }, 1000);
}

// Generar respuesta del IA
function generateAIResponse(message) {
    const lowerMessage = message.toLowerCase();

    // Respuestas predefinidas basadas en palabras clave
    const responses = {
        'nom': 'El análisis NOM-001 evalúa el cumplimiento de las instalaciones eléctricas según la normativa mexicana. Verificamos protecciones, puesta a tierra, distancias de seguridad y más.',
        'corriente': 'Para calcular la corriente: I = P / (V × √3 × cos φ) para sistemas trifásicos. ¿Tienes algún sistema específico que quieras analizar?',
        'voltaje': 'Los voltajes estándar son 127V, 220V, 440V y 480V en sistemas industriales. ¿Qué tipo de sistema estás evaluando?',
        'potencia': 'La potencia se calcula como P = V × I × √3 × cos φ para sistemas trifásicos. ¿Necesitas ayuda con algún cálculo específico?',
        'tierra': 'El sistema de puesta a tierra es crucial para la seguridad. Debe cumplir con resistencias específicas según la NOM-001.',
        'proteccion': 'Las protecciones contra sobrecorriente son esenciales. Calculamos Ic = In × 1.25 + If × k según las condiciones de instalación.'
    };

    // Buscar palabras clave
    for (const [keyword, response] of Object.entries(responses)) {
        if (lowerMessage.includes(keyword)) {
            return response;
        }
    }

    // Respuestas genéricas
    const genericResponses = [
        'Gracias por tu consulta. ¿Podrías ser más específico sobre qué aspecto del análisis eléctrico te interesa?',
        'Interesante pregunta. En GECRAI podemos ayudarte con cálculos eléctricos, análisis de cumplimiento normativo y más.',
        '¿Te refieres a algún análisis específico? Puedo ayudarte con NOM-001, cálculos de carga, protecciones, etc.',
        '¿Necesitas información sobre algún componente específico del sistema eléctrico? Estoy aquí para ayudarte.'
    ];

    return genericResponses[Math.floor(Math.random() * genericResponses.length)];
}

// Manejar Enter en el input del chat
document.addEventListener('DOMContentLoaded', function () {
    const userInput = document.getElementById('userInput');
    if (userInput) {
        userInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});

// Función para volver al inicio
function goHome() {
    window.location.href = 'index.html';
}

// Función para imprimir reporte
function printReport() {
    window.print();
}

// Función para exportar datos
function exportData() {
    const data = {
        timestamp: new Date().toISOString(),
        analysis: 'Demo GECRAI',
        results: 'Datos de ejemplo para demo'
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gecrai-demo-data.json';
    a.click();

    showNotification('Datos exportados', 'success');
}

// Funciones de utilidad para el demo
function showLoading(element) {
    element.innerHTML = '<span class="loading"></span> Cargando...';
}

function hideLoading(element, originalText) {
    element.innerHTML = originalText;
}

// Inicialización específica para la página gecrai.html
document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname.includes('gecrai.html')) {
        // Mostrar todas las características por defecto
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.style.display = 'none';
        });

        // Mostrar mensaje de bienvenida
        showWelcomeMessage();
    }
});

// Función para alternar tema (para futuras mejoras)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('gecraiTheme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Cargar tema guardado
document.addEventListener('DOMContentLoaded', function () {
    const savedTheme = localStorage.getItem('gecraiTheme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});

// Debug helper
function debugInfo() {
    console.log('GECRAI Demo Debug Info:', {
        isLoggedIn: isLoggedIn,
        currentUser: currentUser,
        chatHistoryLength: chatHistory.length,
        currentPage: window.location.pathname
    });
}

// Exponer funciones globales
window.showFeature = showFeature;
window.simulateAnalysis = simulateAnalysis;
window.calculateElectrical = calculateElectrical;
window.refreshChart = refreshChart;
window.sendMessage = sendMessage;
window.logout = logout;
window.goHome = goHome;
window.printReport = printReport;
window.exportData = exportData;
window.debugInfo = debugInfo;