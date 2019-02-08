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