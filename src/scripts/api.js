/* API.js - Comunicación con IA/Backend */
class API {
    static async callAIEndpoint(prompt) {
        try {
            const response = await fetch('https://api.gecrai.com/ai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('gecraiToken')
                },
                body: JSON.stringify({ prompt })
            });

            if (!response.ok) {
                throw new Error('Error en la llamada a la API');
            }

            return await response.json();
        } catch (error) {
            console.error('Error en API:', error);
            return { error: 'Error de conexión con la IA' };
        }
    }

    static async authenticate(username, password) {
        try {
            const response = await fetch('https://api.gecrai.com/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error('Credenciales inválidas');
            }

            const data = await response.json();
            localStorage.setItem('gecraiToken', data.token);
            return data;
        } catch (error) {
            console.error('Error de autenticación:', error);
            return { error: 'Autenticación fallida' };
        }
    }
}