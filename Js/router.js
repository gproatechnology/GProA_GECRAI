/* Router.js - Navegación y carga de templates */
class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = null;
    }

    addRoute(path, template) {
        this.routes[path] = template;
    }

    navigate(path) {
        if (this.routes[path]) {
            this.currentRoute = path;
            this.loadTemplate(this.routes[path]);
        } else {
            console.error(`Route ${path} not found`);
        }
    }

    loadTemplate(templatePath) {
        fetch(templatePath)
            .then(response => response.text())
            .then(html => {
                document.getElementById('app-container').innerHTML = html;
            })
            .catch(error => {
                console.error('Error loading template:', error);
            });
    }
}

// Exportar router
const router = new Router();