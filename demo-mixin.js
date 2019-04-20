import { } from '@webcomponents/webcomponentsjs/webcomponents-loader.js'
import { LitElement, html } from 'lit-element'
import { routerMixin } from './lit-element-router'
import {} from './router-mixin/any-arbitary-lit-element'
import {} from './router-mixin/an-arbitary-lit-element'

class MyApp extends routerMixin(LitElement) {

    createRenderRoot() {
        return this;
    }

    static get properties() {
        return {
            route: { type: String },
            params: { type: Object }
        }
    }

    static get routes() {
        return [{
            name: 'home',
            pattern: '',
            data: { title: 'Home' },
            callback: (route, params, query) => { console.log('callback', route, params, query) },
            guard: () => { return true }
        }, {
            name: 'info',
            pattern: 'info'
        }, {
            name: 'user',
            pattern: 'user/:id',
            guard: () => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(true)
                    }, 1000);
                })
            }
        }, {
            name: 'not-found',
            pattern: '*'
        }];
    }

    constructor() {
        super()
        this.route = ''
        this.params = {}
    }

    onRoute(route, params, query, data) {
        this.route = route
        this.params = params
        console.log(route, params, query, data)
    }

    render() {
        return html`
            <a is="route-link" href="/">Home</a>
            <a is="route-link" href="/info">Info</a>
            <a is="route-link" href="/user/14">user/14</a>
            <a is="route-link" href="/user/16">user/16</a>
            <a is="route-link" href="/user/16/not/found">user/16/not/found</a>
 
            <any-arbitary-lit-element current-route='${this.route}'>
                <template route='home'>
                    <p>Home any-arbitary-lit-element</p>
                </template>
                <template route='info'>
                    <p>My Info any-arbitary-lit-element</p>
                </template>
                <template route='user'>
                    <p>User ${this.params.id} any-arbitary-lit-element</p>
                </template>
                <template route='not-authorized'>
                    <p>Not Authorized any-arbitary-lit-element</p>
                </template>
                <template route='not-found'>
                    <p>Not Found any-arbitary-lit-element</p>
                </template>
            </any-arbitary-lit-element>
        `
    }
}

customElements.define('my-app', MyApp)