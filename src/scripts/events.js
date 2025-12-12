/* Events.js - Listeners y eventos */
class EventManager {
    static addEventListener(element, event, handler) {
        if (element) {
            element.addEventListener(event, handler);
        }
    }

    static removeEventListener(element, event, handler) {
        if (element) {
            element.removeEventListener(event, handler);
        }
    }

    static delegateEvents(parent, selector, event, handler) {
        parent.addEventListener(event, function (e) {
            if (e.target.matches(selector)) {
                handler(e);
            }
        });
    }
}