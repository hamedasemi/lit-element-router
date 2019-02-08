import { parseParams, parseQuery, stripExtraTrailingSlash } from './router-utility'

let globalRoutes
let globalCallback

window.addEventListener('route', () => {
    router.call(this, globalRoutes, globalCallback)
})

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
            if (new RegExp(route.pattern.replace(/:[^\s/]+/g, '([\\w\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff-]+)') + '(|/)$').test(uri)) {
                found.push(true)
                params = parseParams(route.pattern, uri)
                query = parseQuery(querystring)
                if (typeof route.guard === 'function') {
                    if (route.guard()) {
                        name = route.name
                    } else {
                        name = 'not-authoized'
                    }
                } else {
                    name = route.name
                }
            } else {
                found.push(false)
            }
        }
    })

    found = found.filter((f) => { return f })

    if (!found.length) {
        name = routes.filter((route) => { return route.pattern === '*' })[0].name
    }

    callback(name, params, query)
}