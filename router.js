import { parseParams, parseQuery, stripExtraTrailingSlash } from './router-utility'

let globalRoutes
let globalCallback

window.addEventListener('route', () => {
    router.call(this, globalRoutes, globalCallback)
})

window.onpopstate = () => {
    window.dispatchEvent(new CustomEvent('route'))
}

export function router(routes, callback) {
    globalRoutes = routes
    globalCallback = callback
    let found = []
    let name = ''
    let params = {}
    let query = {}
    const uri = stripExtraTrailingSlash(decodeURI(window.location.pathname))
    const querystring = decodeURI(window.location.search)

    routes.map((route) => {
        if (route.pattern !== '*') {
            // if (new RegExp(route.pattern.replace(/:[^\s/]+/g, '([\\wäåö-]+)') + '(|/)$').test(uri)) {
                // [A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff-]+
            if (new RegExp(route.pattern.replace(/:[^\s/]+/g, '([\\w\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff-]+)') + '(|/)$').test(uri)) {
                found.push(true)
                params = parseParams(route.pattern, uri)
                query = parseQuery(querystring)
                if (route.guard) {
                    const guard = route.guard();
                    if (guard instanceof Promise) {
                        guard.then((result) => {
                            if (result) {
                                name = route.name
                                route.callback && route.callback(name, params, query)
                                callback(name, params, query)
                            } else {
                                name = 'not-authorized'
                                route.callback && route.callback(name, params, query)
                                callback(name, params, query)
                            }
                        })

                    } else if (typeof guard === 'boolean' && guard) {
                        name = route.name
                        route.callback && route.callback(name, params, query)
                        callback(name, params, query)
                    } else {
                        name = 'not-authorized'
                        route.callback && route.callback(name, params, query)
                        callback(name, params, query)
                    }
                } else {
                    name = route.name
                    route.callback && route.callback(name, params, query)
                    callback(name, params, query)
                }
            } else {
                found.push(false)
            }
        }
    })

    found = found.filter((f) => { return f })

    if (!found.length) {
        let route = routes.filter((route) => { return route.pattern === '*' })[0]
        route.callback && route.callback(route.name, params, query)
        callback(route.name, params, query)
    }

    
}