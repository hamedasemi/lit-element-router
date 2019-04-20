import { } from '@webcomponents/webcomponentsjs/webcomponents-loader.js'
import { LitElement, html } from 'lit-element'
import { routerMixin } from './lit-element-router'
import { } from './router-mixin/any-arbitary-lit-element'
import { } from './router-mixin/an-arbitary-lit-element'

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
                <div route='home'>Home any-arbitary-lit-element</div>
                <div route='info'>mY Info any-arbitary-lit-element</div>
                <div route='user'>User ${this.params.id} any-arbitary-lit-element</div>
                <div route='not-authorized'>Not Authorized any-arbitary-lit-element</div>
                <div route='not-found'>Not Found any-arbitary-lit-element</div>
            </any-arbitary-lit-element>
        `
    }
}

customElements.define('my-app', MyApp)