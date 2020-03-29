# LitElement Router
A LitElement Router (1278 bytes gzip) that uses JavaScript Mixin, Decorators and RegExp.

[![Coverage Status](https://coveralls.io/repos/github/hamedasemi/lit-element-router/badge.svg?branch=mainline)](https://coveralls.io/github/hamedasemi/lit-element-router?branch=mainline)
[![npm version](https://badge.fury.io/js/lit-element-router.svg)](https://badge.fury.io/js/lit-element-router)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/lit-element-router)
[![Known Vulnerabilities](https://snyk.io/test/github/hamedasemi/lit-element-router/badge.svg?targetFile=package.json)](https://snyk.io/test/github/hamedasemi/lit-element-router?targetFile=package.json)
[![CircleCI](https://circleci.com/gh/hamedasemi/lit-element-router.svg?style=svg)](https://circleci.com/gh/hamedasemi/lit-element-router)


# Installation
```sh
npm install lit-element-router --save
```


# Working Examples
You can find working example projects on StackBlitz:  

Simple: https://stackblitz.com/edit/lit-element-router  
Authentication: https://stackblitz.com/edit/lit-element-router-authentication  
Authentication and Authorization (todo): https://stackblitz.com/edit/lit-element-router-authentication-and-authorization  
Advanced (todo): https://stackblitz.com/edit/lit-element-router-advanced  
Multi Router (todo): https://stackblitz.com/edit/lit-element-router-multi  
All In One: https://stackblitz.com/edit/lit-element-router-all-in-one  


# Usage
Add the __Router__ to LitElement using the router method then register the routes and the router callback.
```javascript
import { LitElement, html } from 'lit-element';
import { router } from 'lit-element-router';

import './app-link';
import './app-main';

@router
class App extends LitElement {
// OR
class App extends router(LitElement) {
  static get properties() {
    return {
      route: { type: String },
      params: { type: Object },
      query: { type: Object }
    };
  }

  static get routes() {
    return [{
      name: 'home',
      pattern: '',
      data: { title: 'Home' }
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

  constructor() {
    super();
    this.route = '';
    this.params = {};
    this.query = {};
  }

  router(route, params, query, data) {
    this.route = route;
    this.params = params;
    this.query = query;
    console.log(route, params, query, data);
  }

  render() {
    return html`
      <app-link href="/">Home</app-link>
      <app-link href="/info">Info</app-link>
      <app-link href="/info?data=12345">Info?data=12345</app-link>
      <app-link href="/user/14">user/14</app-link>

      <app-main active-route=${this.route}>
          <h1 route='home'>Home</h1>
          <h1 route='info'>Info ${this.query.data}</h1>
          <h1 route='user'>User ${this.params.id} </h1>
          <h1 route='not-found'>Not Found </h1>
      </app-main>
    `;
  }
}

customElements.define('my-app', App);
```


Add the __Outlet__ to LitElement using the outlet method.
```javascript
import { LitElement, html } from 'lit-element';
import { outlet } from 'lit-element-router';

@outlet
class Main extends LitElement {
// OR
class Main extends outlet(LitElement) {
  render() {
    return html`
      <slot></slot>
    `;
  }
}

customElements.define('app-main', Main);
```


Add the __Navigator__ to LitElement using the navigator method then use the navigate method to navigate.
```javascript
import { LitElement, html } from 'lit-element';
import { navigator } from 'lit-element-router';

@navigator
class Link extends LitElement {
// OR
class Link extends navigator(LitElement) {
    static get properties() {
        return {
            href: { type: String }
        };
    }
    constructor() {
        super();
        this.href = '';
    }
    render() {
        return html`
            <a href='${this.href}' @click='${this.linkClick}'>
                <slot></slot>
            </a>
        `;
    }
    linkClick(event) {
        event.preventDefault();
        this.navigate(this.href);
    }
}

customElements.define('app-link', Link);
```

# Supported Browsers
<table>
  <tr>
    <td align="center"><img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_64x64.png" alt="Edge" width="32"><br><b>Edge</b></td>
    <td align="center"><img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_64x64.png" alt="Firefox" width="32"><br><b>Firefox</b></td>
    <td align="center"><img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_64x64.png" alt="Chrome" width="32"><br><b>Chrome</b></td>
    <td align="center"><img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_64x64.png" alt="Safari" width="32"><br><b>Safari</b></td>
    <td align="center"><img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_64x64.png" alt="iOS Safari" width="32"><br><b>Mobile Safari</b></td>
    <td align="center"><img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_64x64.png" alt="Samsung" width="32"><br><b>Samsung</b></td>
    <td align="center"><img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_64x64.png" alt="Opera" width="32"><br><b>Opera</b></td>
    <td align="center"><img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_64x64.png" alt="Electron" width="32"><br><b>Electron</b></td>
  </tr>
  <tr>
    <td align="center">Last 2 versions</td>
    <td align="center">Last 2 versions</td>
    <td align="center">Last 2 versions</td>
    <td align="center">Last 2 versions</td>
    <td align="center">Last 2 versions</td>
    <td align="center">Last 2 versions</td>
    <td align="center">Last 2 versions</td>
    <td align="center">Last 2 versions</td>
  </tr>
</table>

# Contributors
<table>
<tbody>
  <tr>
    <td align="center"><img src="https://avatars0.githubusercontent.com/u/5767593?s=256" alt="Hamed Asemi" width="128"><br>Hamed Asemi</td>
    <td align="center"><img src="https://avatars0.githubusercontent.com/u/10547444?s=256" alt="Lazy Llama" width="128"><br>Lazy Llama</td>
    <td align="center"><img src="https://avatars0.githubusercontent.com/u/1210641?s=256" alt="Andreas Kohn" width="128"><br>Andreas Kohn</td>
    <td align="center"><img src="https://avatars0.githubusercontent.com/u/1060733?s=256" alt="zzzgit" width="128"><br>zzzgit</td>
    <td align="center"><img src="https://avatars1.githubusercontent.com/u/3071451?s=256" alt="truongminh" width="128"><br>Nguyễn Trường Minh</td>
  </tr>
  </tbody>
</table>


# Contributions
__Clone__ these two repositories and put them side by side in a common folder:
```sh
git clone git@github.com:hamedasemi/lit-element-router.git
```
```sh
git clone git@github.com:hamedasemi/lit-element-router-test.git
```

Navigate to both lit-element-router and lit-element-router-test directories and __install__ dependencies
```sh
npm install
```


Navigate to lit-element-router-test and __run__ the webpack dev __server__
```sh
npm run serve
```

Start the development on lit-element-router, __observe__ and __test__ changes right in the lit-element-router-test __live__

Run the __test__ locally (only necessary if you are developing the utility)
```sh
npm test
```

Add your name and picture to the __contributors' list__ at lit-element-router repository https://github.com/hamedasemi/lit-element-router#contributors

Create a __pull request__ of your changes on both repositories lit-element-router and lit-element-router-test