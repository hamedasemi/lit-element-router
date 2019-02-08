/**
 * 
 * @param {String} str - The uri that has extra slashes
 */
export function stripExtraTrailingSlash(str) {
    while (str.length !== 1 && str.substr(-1) === '/') {
        str = str.substr(0, str.length - 1);
    }
    return str;
}

/**
 * 
 * @param {String} querystring - The author of the book.
 */
export function parseQuery(querystring) {
    return querystring ? JSON.parse('{"' + querystring.substring(1).replace(/&/g, '","').replace(/=/g, '":"') + '"}') : {}
}

/**
 * 
 * @param {String} pattern - The author of the book.
 * @param {String} uri  - The author of the book.
 */
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