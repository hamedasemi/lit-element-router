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

# Complete Example Using JavaScript Mixins
```js
import { LitElement, html } from 'lit-element';
import { routerMixin } from './lit-element-router';

import { } from './router-mixin/any-arbitary-lit-element';
import { } from './router-mixin/an-arbitary-lit-element';

class MyApp extends routerMixin(LitElement) {

    static get properties() {
        return {
            route: { type: String },
            params: { type: Object }
        };
    }

    static get routes() {
        return [{
            name: 'home',
            pattern: '',
            data: { title: 'Home' },
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

    onRoute(route, params, query, data) {
        this.route = route;
        this.params = params;
    }

    render() {
        return html`
            <an-arbitary-lit-element href="/">Home</an-arbitary-lit-element>
            <an-arbitary-lit-element href="/info">Info</an-arbitary-lit-element>
            <an-arbitary-lit-element href="/user/14">user/14</an-arbitary-lit-element>
            <an-arbitary-lit-element href="/user/16">user/16</an-arbitary-lit-element>
            <an-arbitary-lit-element href="/user/16/not/found">user/16/not/found</an-arbitary-lit-element>

            <any-arbitary-lit-element current-route='${this.route}'>
                <div route='home'>Home any-arbitary-lit-element</div>
                <div route='info'>mY Info any-arbitary-lit-element</div>
                <div route='user'>User ${this.params.id} any-arbitary-lit-element</div>
                <div route='not-authorized'>Not Authorized any-arbitary-lit-element</div>
                <div route='not-found'>Not Found any-arbitary-lit-element</div>
            </any-arbitary-lit-element>
        `;
    }
}

customElements.define('my-app', MyApp);
```

# Complete Example Using JavaScript Mixins in Details

## Make any arbitary components or elements to a router using router mixins method
```javascript
import { LitElement, html } from 'lit-element'
import { routerMixin } from 'lit-element-router'

class MyApp extends routerMixin(LitElement) {

}

customElements.define('my-app', MyApp)
```

## Register routes and the onRoute function
```javascript
import { LitElement, html } from 'lit-element'
import { routerMixin } from 'lit-element-router'

class MyApp extends routerMixin(LitElement) {
    static get routes() {
        return [{
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
        }];
    }

    onRoute(route, params, query, data) {
        this.route = route;
        this.params = params;
    }
}

customElements.define('my-app', MyApp)
```


## Make any arbitary components or elements to a router outlet using router outlet mixins method
```javascript
import { LitElement, html } from 'lit-element'
import { routerOutletMixin } from 'lit-element-router'

export class AnyArbitaryLitElement extends routerOutletMixin(LitElement) {
    
}

customElements.define('any-arbitary-lit-element', AnyArbitaryLitElement)
```

## Put the components under router outlet
```javascript
import { LitElement, html } from 'lit-element'
import { routerMixin } from 'lit-element-router'

class MyApp extends routerMixin(LitElement) {
    static get routes() {
        return [{
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
        }];
    }

    onRoute(route, params, query, data) {
        this.route = route;
        this.params = params;
    }

    render() {
        return html`
            <any-arbitary-lit-element current-route='${this.route}'>
                <div route='home'>Home any-arbitary-lit-element</div>
                <div route='info'>mY Info any-arbitary-lit-element</div>
                <div route='user'>User ${this.params.id} any-arbitary-lit-element</div>
                <div route='not-authorized'>Not Authorized any-arbitary-lit-element</div>
                <div route='not-found'>Not Found any-arbitary-lit-element</div>
            </any-arbitary-lit-element>
        `;
}

customElements.define('my-app', MyApp)
```


## Make any arbitary components or elements to a router link using router link mixins method
```javascript
import { LitElement, html } from 'lit-element'
import { routerLinkMixin } from 'lit-element-router'

export class AnArbitaryLitElement extends routerLinkMixin(LitElement) {
    
}

customElements.define('an-arbitary-lit-element', AnArbitaryLitElement)
```

## Navigate using the router navigate method
```javascript
import { LitElement, html } from 'lit-element'
import { routerLinkMixin } from 'lit-element-router'

export class AnArbitaryLitElement extends routerLinkMixin(LitElement) {
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

customElements.define('an-arbitary-lit-element', AnArbitaryLitElement)
```


## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Samsung | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions| last 2 versions| last 2 versions

