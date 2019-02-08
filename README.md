[![Coverage Status](https://coveralls.io/repos/github/hamedasemi/lit-element-router/badge.svg?branch=mainline)](https://coveralls.io/github/hamedasemi/lit-element-router?branch=mainline)
[![npm version](https://badge.fury.io/js/lit-element-router.svg)](https://badge.fury.io/js/lit-element-router)
[![Known Vulnerabilities](https://snyk.io/test/github/hamedasemi/lit-element-router/badge.svg?targetFile=package.json)](https://snyk.io/test/github/hamedasemi/lit-element-router?targetFile=package.json)
[![CircleCI](https://circleci.com/gh/hamedasemi/lit-element-router/tree/release.svg?style=svg)](https://circleci.com/gh/hamedasemi/lit-element-router/tree/release)

# lit-element-router
LitElement Router.

## Background

## Usage

```javascript
import { LitElement, html } from 'lit-element'
import { router, RouterSlot, RouterLink } from './lit-element-router'

class MyApp extends LitElement {

    static get properties() {
        return {
            route: { type: String },
            params: { type: String }
        }
    }

    constructor() {
        super()
        router([{
            name: 'home',
            pattern: '/',
            guard: () => { return true }
        }, {
            name: 'info',
            pattern: 'info'
        }, {
            name: 'user',
            pattern: 'user/:id',
            guard: () => { return true }
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
                <router-link href="/">Home</router-link>
                <router-link href="/info">Info</router-link>
                <router-link href="/user/14">user/14</router-link>
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