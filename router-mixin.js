import { parseParams, parseQuery, testRoute } from './router-utility';

export let routerMixin = (superclass) => class extends superclass {
    // static get properties() {
    //     return {
    //         route: { type: String, reflect: true, attribute: 'route' }
    //     }
    // }

    constructor() {
        super(...arguments)

        window.addEventListener('route', () => {
            this.router.call(this, this.globalRoutes, this.globalCallback);
        })

        window.onpopstate = () => {
            window.dispatchEvent(new CustomEvent('route'));
        }
    }

    firstUpdated(){
        this.slot();
        if (super.firstUpdated) super.firstUpdated();
    }

    updated(updatedProperties) {
        updatedProperties.has('route') && this.slot();
        if (super.updated) super.updated();
    }

    slot() {
        ([...this.shadowRoot.querySelectorAll(`[slot]`)]).map((selected) => {
            this.appendChild(selected)
        });
        if (this.route) {
            ([...this.querySelectorAll(`[slot~=${this.route}]`)]).map((selected) => {
                this.shadowRoot.appendChild(selected)
            });
        }

        if (super.slot) super.slot();
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
                const guard = route.guard();

                if (guard instanceof Promise) {

                    guard.then((resolved) => {
                        if (resolved) {
                            route.callback && route.callback(route.name, route.params, route.query, route.data)
                            callback(route.name, route.params, route.query, route.data);
                        } else {
                            route.callback && route.callback('not-authorized', route.params, route.query, route.data)
                            callback('not-authorized', {}, {});
                        }
                    })
                } else if (typeof guard === 'boolean') {
                    route.callback && route.callback(route.name, route.params, route.query, route.data)
                    callback(route.name, route.params, route.query, route.data);
                } else {
                    route.callback && route.callback('not-authorized', route.params, route.query, route.data)
                    callback('not-authorized', {}, {});
                }
            } else {
                route.callback && route.callback(route.name, route.params, route.query, route.data)
                callback(route.name, route.params, route.query, route.data);
            }
        } else {
            notFoundRoute.callback && notFoundRoute.callback(notFoundRoute.name, {}, {}, {})
            callback(notFoundRoute.name, {}, {}, {});
        }

        if (super.router) super.router();
    }
};
