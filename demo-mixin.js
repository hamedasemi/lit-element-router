import { } from '@webcomponents/webcomponentsjs/webcomponents-loader.js'
import { LitElement, html } from 'lit-element'
import { RouterSlot, RouterLink, routerMixin } from './lit-element-router'

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
            <nav>
                <a @click=${this.linkClick} href="/">Home</a>
                <a @click=${this.linkClick} href="/info">Info</a>
                <a @click=${this.linkClick} href="/user/14">user/14</a>
                <a @click=${this.linkClick} href="/user/16">user/16</a>
                <a @click=${this.linkClick} href="/user/16/not/found">user/16/not/found</a>
            </nav>
            <div route='${this.route}'>
                <div slot='home'>Home</div>
                <div slot='info'>Info</div>
                <div slot='user'>User ${this.params.id}</div>
                <div slot='not-authorized'>Not Authorized</div>
                <div slot='not-found'>Not Found</div>
            </div>
            <div route='${this.route}'>
                <div slot='home'>Home</div>
                <div slot='info'>Info</div>
                <div slot='user'>User ${this.params.id}</div>
                <div slot='not-authorized'>Not Authorized</div>
                <div slot='not-found'>Not Found</div>
            </div>
        `
    }

    linkClick(event){
        event.preventDefault();
        this.navigate(event.target.href);
    }
}

customElements.define('my-app', MyApp)