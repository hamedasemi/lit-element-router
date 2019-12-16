import { parseParams, parseQuery, testRoute } from './utility/router-utility';

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
        let activeRoute = routes.filter(route => route.pattern !== '*' && testRoute(uri, route.pattern))[0];
        let query = parseQuery(querystring);

        if (activeRoute) {
            activeRoute.params = parseParams(activeRoute.pattern, uri);
            activeRoute.data = activeRoute.data || {};
            if (activeRoute.guard && typeof activeRoute.guard === 'function') {
                this.canceled = false;
                Promise.resolve(activeRoute.guard())
                    .then((allowed) => {
                        if (!this.canceled) {
                            if (allowed) {
                                activeRoute.callback && activeRoute.callback(activeRoute.name, activeRoute.params, query, activeRoute.data);
                                callback(activeRoute.name, activeRoute.params, query, activeRoute.data);
                            } else {
                                activeRoute.callback && activeRoute.callback('not-authenticated', activeRoute.params, query, activeRoute.data);
                                callback('not-authenticated', activeRoute.params, query, activeRoute.data);
                            }
                        }
                    })
            } else {
                activeRoute.callback && activeRoute.callback(activeRoute.name, activeRoute.params, query, activeRoute.data)
                callback(activeRoute.name, activeRoute.params, query, activeRoute.data);
            }
        } else if (notFoundRoute) {
            notFoundRoute.data = notFoundRoute.data || {};
            notFoundRoute.callback && notFoundRoute.callback(notFoundRoute.name, {}, query, notFoundRoute.data)
            callback(notFoundRoute.name, {}, query, notFoundRoute.data);
        } else {
            callback('not-found', {}, {}, {});
        }
    }
};

export let navigateMixin = (superclass) => class extends superclass {
    navigate(href) {
        window.history.pushState({}, null, href);
        window.dispatchEvent(new CustomEvent('route'));
    }
};

export let outletMixin = (superclass) => class extends superclass {

    static get properties() {
        return {
            activeRoute: { type: String, reflect: true, attribute: 'active-route' }
        }
    }

    attributeChangedCallback(...args) {
        super.attributeChangedCallback(...args);

        args.includes('active-route') && this.outlet();
    }

    connectedCallback(...args) {
        super.connectedCallback(...args);

        setImmediate(() => {
            this.outlet();
        })
    }

    outlet() {
        Array.from(this.querySelectorAll(`[route]`)).map((active) => {
            active.style.display = "none";
        });
        Array.from(this.shadowRoot.querySelectorAll(`[route]`)).map((active) => {
            active.style.display = "none";
        });
        if (this.activeRoute) {
            Array.from(this.querySelectorAll(`[route~=${this.activeRoute}]`)).map((active) => {
                active.style.display = null;
            });
            Array.from(this.shadowRoot.querySelectorAll(`[route~=${this.activeRoute}]`)).map((active) => {
                active.style.display = null;
            });
        }
    }
};