import { parseParams, parseQuery, testRoute } from '../utility/router-utility';

export let routerMixin = (superclass) => class extends superclass {
    static get properties() {
        return {
            route: { type: String, reflect: true, attribute: 'route' },
            canceled: { type: Boolean }
        }
    }

    connectedCallback(...args) {
        super.connectedCallback(...args);

        this.routing(this.constructor.routes, (...args) => this.router(...args));
        window.addEventListener('route', () => {
            this.routing(this.constructor.routes, (...args) => this.router(...args));
        })

        window.onpopstate = () => {
            window.dispatchEvent(new CustomEvent('route'));
        }
    }

    routing(routes, callback) {
        this.canceled = true;

        const uri = decodeURI(window.location.pathname);
        const querystring = decodeURI(window.location.search);

        let notFoundRoute = routes.filter(route => route.pattern === '*')[0];

        routes = routes.filter(route => route.pattern !== '*' && testRoute(uri, route.pattern));

        if (routes.length) {
            let route = routes[0];
            route.params = parseParams(route.pattern, uri);
            route.query = parseQuery(querystring);

            if (route.guard && typeof route.guard === 'function') {

                this.canceled = false;
                Promise.resolve(route.guard())
                    .then((allowed) => {
                        if (!this.canceled) {
                            if (allowed) {
                                route.callback && route.callback(route.name, route.params, route.query, route.data);
                                callback(route.name, route.params, route.query, route.data);
                            } else {
                                route.callback && route.callback('not-authorized', route.params, route.query, route.data);
                                callback('not-authorized', route.params, route.query, route.data);
                            }
                        }
                    })
            } else {
                route.callback && route.callback(route.name, route.params, route.query, route.data)
                callback(route.name, route.params, route.query, route.data);
            }
        } else if (notFoundRoute) {
            notFoundRoute.callback && notFoundRoute.callback(notFoundRoute.name, {}, parseQuery(querystring), notFoundRoute.data)
            callback(notFoundRoute.name, {}, parseQuery(querystring), notFoundRoute.data);
        } else {
            callback('not-found', {}, parseQuery(querystring), notFoundRoute.data);
        }
    }
};

export let routerLinkMixin = (superclass) => class extends superclass {
    navigate(href) {
        window.history.pushState({}, null, href);
        window.dispatchEvent(new CustomEvent('route'));
    }
};

export let routerOutletMixin = (superclass) => class extends superclass {

    static get properties() {
        return {
            currentRoute: { type: String, reflect: true, attribute: 'current-route' }
        }
    }

    constructor() {
        super();

        let newStyleSheet = new CSSStyleSheet;
        newStyleSheet.replaceSync( `
            ::slotted([route]:not([selected])) { display: none; }
            [route]:not([selected]) { display: none; }
        `);

        this.shadowRoot.adoptedStyleSheets = [...this.shadowRoot.adoptedStyleSheets, newStyleSheet];
    }

    attributeChangedCallback(...args) {
        super.attributeChangedCallback(...args);

        args[0] === 'current-route' && this.routerOutlet();
    }

    connectedCallback(...args) {
        super.connectedCallback(...args);
        
        this.routerOutlet();
    }

    routerOutlet() {
        Array.from(this.querySelectorAll(`[route]`)).map((selected) => {
            selected.removeAttribute('selected');
        });
        if (this.currentRoute) {
            Array.from(this.querySelectorAll(`[route~=${this.currentRoute}]`)).map((selected) => {
                selected.setAttribute('selected', true);
            });
        }
    }
};