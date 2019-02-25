import { parseParams, parseQuery, testRoute } from '../utility/router-utility';

export let routerMixin = (superclass) => class extends superclass {
    static get properties() {
        return {
            route: { type: String, reflect: true, attribute: 'route' }
        }
    }

    firstUpdated() {
        this.routerOutlet();
        window.addEventListener('route', () => {
            this.router.call(this, this.globalRoutes, this.globalCallback);
        })

        window.onpopstate = () => {
            window.dispatchEvent(new CustomEvent('route'));
        }
        if (super.firstUpdated) super.firstUpdated();
    }

    updated(updatedProperties) {
        updatedProperties.has('route') && this.routerOutlet();
        if (super.updated) super.updated();
    }

    routerOutlet() {
        let routerOutlets = [...this.shadowRoot.querySelectorAll(`[current-route]`)]

        routerOutlets.map((routerOutlet) => {
            if (!routerOutlet.shadowRoot) {
                routerOutlet.attachShadow({ mode: 'open' });
            }
            ([...routerOutlet.shadowRoot.querySelectorAll(`[route]`)]).map((selected) => {
                routerOutlet.appendChild(selected);
            });
            if (this.route) {
                ([...routerOutlet.querySelectorAll(`[route~=${this.route}]`)]).map((selected) => {
                    routerOutlet.shadowRoot.appendChild(selected)
                });
            }

        })
        if (super.routerOutlet) super.routerOutlet();
    }

    navigate(href) {
        window.history.pushState({}, null, href + window.location.search);
        window.dispatchEvent(new CustomEvent('route'));

        if (super.navigate) super.navigate();
    }


    router(routes, callback) {
        this.globalRoutes = routes;
        this.globalCallback = callback;

        const uri = decodeURI(window.location.pathname);
        const querystring = decodeURI(window.location.search);

        let notFoundRoute = routes.filter(route => route.pattern === '*')[0];

        routes = routes.filter(route => route.pattern !== '*' && testRoute(uri, route.pattern));

        if (routes.length) {
            let route = routes[0];
            route.params = parseParams(route.pattern, uri);
            route.query = parseQuery(querystring);

            if (route.guard && typeof route.guard === 'function') {
                Promise.resolve(route.guard())
                    .then((allowed) => {
                        if (allowed) {
                            route.callback && route.callback(route.name, route.params, route.query, route.data)
                            callback(route.name, route.params, route.query, route.data);
                        } else {
                            route.callback && route.callback('not-authorized', route.params, route.query, route.data)
                            callback('not-authorized', {}, {}, {});
                        }
                    })
            } else {
                route.callback && route.callback(route.name, route.params, route.query, route.data)
                callback(route.name, route.params, route.query, route.data);
            }
        } else if (notFoundRoute) {
            notFoundRoute.callback && notFoundRoute.callback(notFoundRoute.name, {}, {}, {})
            callback(notFoundRoute.name, {}, {}, {});
        } else {
            callback('not-found', {}, {}, {});
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
        ([...this.shadowRoot.querySelectorAll(`[route]`)]).map((selected) => {
            this.appendChild(selected);
        });
        if (this.currentRoute) {
            console.log('<<<<<<<<<<<<<<<', this.shadowRoot);
            ([...this.querySelectorAll(`[route~=${this.currentRoute}]`)]).map((selected) => {
                this.shadowRoot.appendChild(selected)
            });
        }

        if (super.routerOutlet) super.routerOutlet();
    }
};