/* State.js - Estado global */
class AppState {
    constructor() {
        this.user = null;
        this.session = null;
        this.currentModule = 'home';
    }

    setUser(userData) {
        this.user = userData;
        localStorage.setItem('gecraiUser', JSON.stringify(userData));
    }

    getUser() {
        if (!this.user && localStorage.getItem('gecraiUser')) {
            this.user = JSON.parse(localStorage.getItem('gecraiUser'));
        }
        return this.user;
    }

    clearSession() {
        this.user = null;
        this.session = null;
        localStorage.removeItem('gecraiUser');
    }

    setCurrentModule(module) {
        this.currentModule = module;
    }

    getCurrentModule() {
        return this.currentModule;
    }
}

// Exportar estado global
const appState = new AppState();