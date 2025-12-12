/* Config.js - Endpoints, keys, flags */
const Config = {
    API_BASE_URL: 'https://api.gecrai.com',
    AI_ENDPOINT: '/ai',
    AUTH_ENDPOINT: '/auth',
    DATA_ENDPOINT: '/data',

    // Flags de desarrollo
    DEBUG_MODE: true,
    MOCK_DATA: true,

    // Claves de API (en producción deberían estar en variables de entorno)
    API_KEY: 'gecrai-demo-key-2025',

    // Configuración de UI
    THEME: 'dark',
    PRIMARY_COLOR: '#00ff00',
    SECONDARY_COLOR: '#00aa00'
};

// Exportar configuración
export default Config;