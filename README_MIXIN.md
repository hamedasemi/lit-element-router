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

# Example Using JavaScript Mixins

## Minimal 
```javascript
import { LitElement, html } from 'lit-element'
import { routerMixin } from 'lit-element-router'

class MyApp extends routerMixin(LitElement) {

    static get properties() {
        return {
            route: { type: String },
            params: { type: Object }
        };
    }

    constructor() {
        super()
        this.route = ''
        this.params = {}
        this.router([{
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
        }], (route, params, query, data) => {
            this.route = route
            this.params = params
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
            <div current-route='${this.route}'>
                <div route='home'>Home</div>
                <div route='info'>Info</div>
                <div route='user'>User ${this.params.id}</div>
                <div route='not-authorized'>Not Authorized</div>
                <div route='not-found'>Not Found</div>
            </div>
        `
    }

    linkClick(event){
        event.preventDefault();
        this.navigate(event.target.href);
    }
}

customElements.define('my-app', MyApp)
```

## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Samsung | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions| last 2 versions| last 2 versions

