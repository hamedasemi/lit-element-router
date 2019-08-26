import { parseParams, parseQuery, testRoute } from '../utility/router-utility';

export let routerMixin = (superclass) => class extends superclass {
    static get properties() {
        return {
            route: { type: String, reflect: true, attribute: 'route' },
            canceled: { type: Boolean }
        }
    }

    firstUpdated() {

        this.router(this.constructor.routes, (...args) => this.onRoute(...args));
        window.addEventListener('route', () => {
            this.router(this.constructor.routes, (...args) => this.onRoute(...args));
        })

        window.onpopstate = () => {
            window.dispatchEvent(new CustomEvent('route'));
        }
        if (super.firstUpdated) super.firstUpdated();
    }

    router(routes, callback) {
        this.canceled = true;

        const uri = decodeURI(window.location.pathname);
        const querystring = decodeURI(window.location.search);
        const hash = decodeURI(window.location.hash);
        const testRouteOptions = { uri: uri, querystring: querystring, hash: hash };

        let notFoundRoute = routes.filter(route => route.pattern === '*')[0];

        routes = routes.filter(route => route.pattern !== '*' && testRoute(route, testRouteOptions));

        if (routes.length) {
            let route = routes[0];
            let routePattern = route.useHash ? "#/" + route.pattern : route.pattern;
            let paramLocation = route.useHash ? hash : uri;

            route.params = parseParams(routePattern, paramLocation);
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

        if (super.router) super.router();
    }
};

export let routerLinkMixin = (superclass) => class extends superclass {

    navigate(href) {
        window.history.pushState({}, null, href + window.location.search);
        window.dispatchEvent(new CustomEvent('route'));

        if (super.navigate) super.navigate();
    }
};

export let routerOutletMixin = (superclass) => class extends superclass {

    static get properties() {
        return {
            currentRoute: { type: String, reflect: true, attribute: 'current-route' }
        }
    }

    updated(updatedProperties) {
        updatedProperties.has('currentRoute') && this.routerOutlet();
        if (super.updated) super.updated();
    }

    firstUpdated() {
        this.routerOutlet();
    }

    routerOutlet() {
        Array.from(this.shadowRoot.querySelectorAll(`[route]`)).map((selected) => {
            this.appendChild(selected);
        });
        if (this.currentRoute) {
            Array.from(this.querySelectorAll(`[route~=${this.currentRoute}]`)).map((selected) => {
                this.shadowRoot.appendChild(selected)
            });
        }

        if (super.routerOutlet) super.routerOutlet();
    }
};
