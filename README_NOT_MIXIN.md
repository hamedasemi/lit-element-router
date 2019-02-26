# LitElement Router
A simple and lightweight LitElement Router.

[![Coverage Status](https://coveralls.io/repos/github/hamedasemi/lit-element-router/badge.svg?branch=release)](https://coveralls.io/github/hamedasemi/lit-element-router?branch=release)
[![npm version](https://badge.fury.io/js/lit-element-router.svg)](https://badge.fury.io/js/lit-element-router)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/lit-element-router/1.0.0)
[![Known Vulnerabilities](https://snyk.io/test/github/hamedasemi/lit-element-router/badge.svg?targetFile=package.json)](https://snyk.io/test/github/hamedasemi/lit-element-router?targetFile=package.json)
[![CircleCI](https://circleci.com/gh/hamedasemi/lit-element-router/tree/release.svg?style=svg)](https://circleci.com/gh/hamedasemi/lit-element-router/tree/release)


## Installation

```sh
npm install lit-element-router --save
```

# Examples

## Mixin
[Complete example using JavaScript mixins](https://github.com/hamedasemi/lit-element-router/blob/mainline/README_MIXIN.md)

## Minimal 
```javascript
import { LitElement, html } from 'lit-element'
import { router } from 'lit-element-router'

class MyApp extends LitElement {
    constructor() {
        super()
        router([{
            name: 'home',
            pattern: ''
        }, {
            name: 'info',
            pattern: 'info'
        }, {
            name: 'user',
            pattern: 'user/:id'
        }, {
            name: 'not-found',
            pattern: '*'
        }], (route, params, query) => {
            console.log(route, params, query)
        })
    }
}

customElements.define('my-app', MyApp)
```

## Simple

```javascript
import { LitElement, html } from 'lit-element'
import { router, RouterSlot, RouterLink } from 'lit-element-router'

class MyApp extends LitElement {

    static get properties() {
        return {
            route: { type: String },
            params: { type: Object }
        }
    }

    constructor() {
        super()
        router([{
            name: 'home',
            pattern: ''
        }, {
            name: 'info',
            pattern: 'info'
        }, {
            name: 'user',
            pattern: 'user/:id'
        }, {
            name: 'not-found',
            pattern: '*'
        }], (route, params, query) => {
            this.route = route
            this.params = params
            console.log(route, params, query)
        })
    }

    render() {
        return html`
            <nav>
                <router-link href='/'>Home</router-link>
                <router-link href='/info'>Info</router-link>
                <router-link href='/user/14'>user/14</router-link>
            </nav>
            <router-slot route='${this.route}'>
                <div slot='home'>Home</div>
                <div slot='info'>Info</div>
                <div slot='user'>User ${this.params.id}</div>
                <div slot='not-found'>Not Found</div>
            </router-slot>
        `
    }
}

customElements.define('my-app', MyApp)
```


## Advanced

```javascript
import { LitElement, html } from 'lit-element'
import { router, RouterSlot, RouterLink } from 'lit-element-router'

class MyApp extends LitElement {

    static get properties() {
        return {
            route: { type: String },
            params: { type: Object }
        }
    }

    constructor() {
        super()
        router([{
            name: 'home',
            pattern: '',
            // Each route can accept an individual callback
            callback: (route, params, query)=>{ console.log('callback', route, params, query)},
            // Simple function guard
            guard: () => { return true }
        }, {
            name: 'info',
            pattern: 'info'
        }, {
            name: 'user',
            pattern: 'user/:id',
            // Promised function guard
            guard: () => {
                return new Promise((resolve, reject) => {
                    // Call an API for Athorization
                    resolve(true)
                })
            }
        }, {
            name: 'not-found',
            pattern: '*'
        }], (route, params, query) => {
            this.route = route
            this.params = params
            console.log(route, params, query)
        })
    }

    render() {
        return html`
            <nav>
                <router-link href='/'>Home</router-link>
                <router-link href='/info'>Info</router-link>
                <router-link href='/user/14'>user/14</router-link>
            </nav>
            <router-slot route='${this.route}'>
                <div slot='home'>Home</div>
                <div slot='info'>Info</div>
                <div slot='user'>User ${this.params.id}</div>
                <div slot='not-authorized'>Not Authorized</div>
                <div slot='not-found'>Not Found</div>
            </router-slot>
        `
    }
}

customElements.define('my-app', MyApp)
```

## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Samsung | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions| last 2 versions| last 2 versions

