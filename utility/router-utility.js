export function stripExtraTrailingSlash(str) {
    while (str.length !== 1 && str.substr(-1) === '/') {
        str = str.substr(0, str.length - 1);
    }
    return str;
}

export function parseQuery(querystring) {
    return querystring ? JSON.parse('{"' + querystring.substring(1).replace(/&/g, '","').replace(/=/g, '":"') + '"}') : {}
}

export function parseParams(pattern, uri) {
    let params = {}

    const patternArray = pattern.split('/').filter((path) => { return path != '' })
    const uriArray = uri.split('/').filter((path) => { return path != '' })

    patternArray.map((pattern, i) => {
        if (/^:/.test(pattern)) {
            params[pattern.substring(1)] = uriArray[i]
        }
    })
    return params
}

export function patternToRegExp(pattern) {
    if (pattern) {
        return new RegExp('^(|/)' + pattern.replace(/:[^\s/]+/g, '([\\w\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff-]+)') + '(|/)$');
    } else {
        return new RegExp('(^$|^/$)');
    }
}

export function testRoute(uri, pattern) {
    if (patternToRegExp(pattern).test(uri)) {
        return true;
    }
}