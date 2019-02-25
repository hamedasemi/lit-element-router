import { } from '@webcomponents/webcomponentsjs/webcomponents-loader.js'
import { LitElement, html } from 'lit-element'
import { routerMixin } from './lit-element-router'
import { } from './router-mixin/test-element'
import { } from './router-mixin/test-element-link'

class MyApp extends routerMixin(LitElement) {

    static get properties() {
        return {
            route: { type: String },
            params: { type: Object }
        }
    }

    constructor() {
        super()
        this.route = ''
        this.params = {}
        this.router([{
            name: 'home',
            pattern: '',
            callback: (route, params, query)=>{ console.log('callback', route, params, query)},
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
        }], (route, params, query, data) => {
            this.route = route
            this.params = params
            console.log(route, params, query, data)
        })
    }

    render() {
        return html`
            <test-element-link></test-element-link>
            <nav>
                <a @click=${this.linkClick} href="/">Home</a>
                <a @click=${this.linkClick} href="/info">Info</a>
                <a @click=${this.linkClick} href="/user/14">user/14</a>
                <a @click=${this.linkClick} href="/user/16">user/16</a>
                <a @click=${this.linkClick} href="/user/16/not/found">user/16/not/found</a>
            </nav>
            <div current-route='${this.route}'>
                <div route='home'>Home</div>
                <div route='info'>Info</div>
                <div route='user'>User ${this.params.id}</div>
                <div route='not-authorized'>Not Authorized</div>
                <div route='not-found'>Not Found</div>
            </div>
            <div current-route='${this.route}'>
                <div route='home'>Home</div>
                <div route='info'>mY Info</div>
                <div route='user'>User ${this.params.id}</div>
                <div route='not-authorized'>Not Authorized</div>
                <div route='not-found'>Not Found</div>
            </div>
            <test-element current-route='${this.route}'>
                <div route='home'>Home test-element</div>
                <div route='info'>mY Info test-element</div>
                <div route='user'>User ${this.params.id} test-element</div>
                <div route='not-authorized'>Not Authorized test-element</div>
                <div route='not-found'>Not Found test-element</div>
            </test-element>
        `
    }

    linkClick(event){
        event.preventDefault();
        this.navigate(event.target.href);
    }
}

customElements.define('my-app', MyApp)