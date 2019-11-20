// @ts-check
import { LitElement, html, css } from 'lit-element'
import { routerMixin, outletMixin, linkMixin } from './lit-element-router'

export class Link extends linkMixin(LitElement) {
    constructor() {
        super()
        this.href = ''
    }
    static get properties() {
        return {
            href: { type: String }
        }
    }
    render() {
        return html`
            <a href='${this.href}' @click='${this.linkClick}'><slot></slot></a>
        `
    }
    linkClick(event) {
        event.preventDefault();
        this.navigate(this.href);
    }
}

export class Main extends outletMixin(LitElement) {
    static get styles() {
        return css `
            :host {
               color: gray;
            }
        `;
    }

    render() {
        return html `
            <slot></slot>
        `
    }
}

class App extends routerMixin(LitElement) {

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
            <app-link href="/">Home</app-link>
            <app-link href="/info">Info</app-link>
            <app-link href="/info?foo=bar">Info</app-link>
            <app-link href="/user/14">user/14</app-link>
            <app-link href="/user/16">user/16</app-link>
            <app-link href="/user/16/not/found">user/16/not/found</app-link>

            <app-main active-route='${this.route}'>
                <div route='home'>Home</div>
                <div route='info'>Info</div>
                <div route='user'>User ${this.params.id}</div>
                <div route='not-authenticated'>Not Authenticated</div>
                <div route='not-found'>Not Found</div>
            </app-main>
        `
    }
}

customElements.define('app-link', Link)
customElements.define('app-main', Main)
customElements.define('my-app', App)