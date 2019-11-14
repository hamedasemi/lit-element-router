import { } from '@webcomponents/webcomponentsjs/webcomponents-loader.js'
import { LitElement, html } from 'lit-element'
import { routerMixin } from './lit-element-router'
import { } from './router-mixin/any-arbitrary-lit-element'
import { } from './router-mixin/an-arbitrary-lit-element'

class MyApp extends routerMixin(LitElement) {

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

    router(route, params, query, data) {
        this.route = route
        this.params = params
        console.log(route, params, query, data)
    }

    render() {
        return html`
            <an-arbitrary-lit-element href="/">Home</an-arbitrary-lit-element>
            <an-arbitrary-lit-element href="/info">Info</an-arbitrary-lit-element>
            <an-arbitrary-lit-element href="/info?foo=bar">Info</an-arbitrary-lit-element>
            <an-arbitrary-lit-element href="/user/14">user/14</an-arbitrary-lit-element>
            <an-arbitrary-lit-element href="/user/16">user/16</an-arbitrary-lit-element>
            <an-arbitrary-lit-element href="/user/16/not/found">user/16/not/found</an-arbitrary-lit-element>

            <any-arbitrary-lit-element current-route='${this.route}'>
                <div route='home'>Home any-arbitrary-lit-element</div>
                <div route='info'>mY Info any-arbitrary-lit-element</div>
                <div route='user'>User ${this.params.id} any-arbitrary-lit-element</div>
                <div route='not-authorized'>Not Authorized any-arbitrary-lit-element</div>
                <div route='not-found'>Not Found any-arbitrary-lit-element</div>
            </any-arbitrary-lit-element>
        `
    }
}

customElements.define('my-app', MyApp)