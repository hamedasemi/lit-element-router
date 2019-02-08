import { } from '@webcomponents/webcomponentsjs/webcomponents-loader.js'
import { LitElement, html } from 'lit-element'
import { router, RouterSlot, RouterLink } from './lit-element-router'

class MyApp extends LitElement {

    static get properties() {
        return {
            route: { type: String }
        }
    }

    constructor() {
        super()
        router([{
            name: 'home',
            pattern: '/',
            guard: () => { return true }
        }, {
            name: 'help',
            pattern: 'help'
        }, {
            name: 'username',
            pattern: 'user/:id/name/:name/:surename',
            guard: () => { return true }
        }, {
            name: 'user',
            pattern: 'user/:id'
        }, {
            name: 'not-found',
            pattern: '*'
        }], (route, params, query) => {
            this.route = route
            console.log(route, params, query)
        })
    }

    render() {
        console.log('render')

        return html`
            <nav>
                <router-link href="/">Home</router-link>
                <router-link href="/help">help</router-link>
                <router-link href="/user/12/name/Hamed/Asemi">user/12/name/Hamed/Asemi</router-link>
                <router-link href="/user/14">user/14</router-link>
                <router-link href="/anypath">anypath</router-link>
                <router-link href="/any/path">any/path</router-link>
            </nav>
            <router-slot route='${this.route}'>
                <h1 slot='home'>Home</h1>
                <h1 slot='home'>extra Hoe</h1>
                <h1 slot='user'>User</h1>
                <h1 slot='help'>Help</h1>
                <h1 slot='username'>Username</h1>
                <h1 slot='not-found'>Not Found</h1>
            </router-slot>

            <router-slot route='${this.route}'>
                <h1 slot='home'>Home</h1>
                <h1 slot='home'>extra Hoe</h1>
                <h1 slot='user'>User</h1>
                <h1 slot='help'>Help</h1>
                <h1 slot='username'>Username</h1>
                <h1 slot='not-found'>Not Found</h1>
            </router-slot>

            <router-slot route='${this.route}'>
                <h1 slot='home'>Home</h1>
                <h1 slot='home'>extra Hoe</h1>
                <h1 slot='user'>User</h1>
                <h1 slot='help'>Help</h1>
                <h1 slot='username'>Username</h1>
                <h1 slot='not-found'>Not Found</h1>
            </router-slot>
    `
    }
}

customElements.define('my-app', MyApp)