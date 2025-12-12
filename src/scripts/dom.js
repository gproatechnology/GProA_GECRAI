/* DOM.js - Manipulación del DOM */
class DOMManager {
    static createElement(tag, className, content) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (content) element.innerHTML = content;
        return element;
    }

    static appendChildren(parent, children) {
        children.forEach(child => {
            parent.appendChild(child);
        });
    }

    static removeElement(element) {
        if (element && element.parentNode) {
            element.parentNode.removeChild(element);
        }
    }

    static showElement(element) {
        if (element) {
            element.style.display = 'block';
        }
    }

    static hideElement(element) {
        if (element) {
            element.style.display = 'none';
        }
    }
}