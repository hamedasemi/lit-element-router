# LitElement Router
A LitElement Router (1278 bytes gzip) that uses JavaScript Mixin and RegExp.

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


# Usage
Add the __Router__ to LitElement using the router mixin then register the routes and the router callback.
```javascript
import { LitElement, html } from 'lit-element';
import { routerMixin } from 'lit-element-router';

import './app-link';
import './app-main';

class App extends routerMixin(LitElement) {

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


Add the __Outlet__ to LitElement using the outlet mixin.
```javascript
import { LitElement, html } from 'lit-element';
import { outletMixin } from 'lit-element-router';

export class Main extends outletMixin(LitElement) {
  render() {
    return html`
      <slot></slot>
    `;
  }
}

customElements.define('app-main', Main);
```


Add the __Link__ to LitElement using the link mixin then use the navigate method to navigate.
```javascript
import { LitElement, html } from 'lit-element';
import { linkMixin } from 'lit-element-router';

export class Link extends linkMixin(LitElement) {
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


# Contributors
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/hamedasemi" style="outline=:none;color:inherit;" target="_blank"><img src="https://avatars0.githubusercontent.com/u/5767593?s=460&v=4" style="border-radius:50%;" alt="Edge" width="120px" height="120px"><br> Hamed Asemi</a>
    <td align="center">
      <a href="https://github.com/lazylazyllama" style="outline=:none;color:inherit;" target="_blank"><img src="https://avatars0.githubusercontent.com/u/10547444?s=460&v=4" style="border-radius:50%;" alt="Edge" width="120px" height="120px"><br> Lazy Llama</a>
    </td>
    <td align="center"><a href="https://github.com/ankon" style="outline=:none;color:inherit;" target="_blank"><img src="https://avatars2.githubusercontent.com/u/1210641?s=460&v=4" style="border-radius:50%;" alt="Edge" width="120px" height="120px"><br> Andreas Kohn</a></td>
    <td align="center"><a href="https://github.com/zzzgit" style="outline=:none;color:inherit;" target="_blank"><img src="https://avatars0.githubusercontent.com/u/1060733?s=460&v=4" style="border-radius:50%;" alt="Edge" width="120px" height="120px"><br> zzzgit</a></td>
  </tr>
</table>

# Supported Browsers
<table>
  <tr>
    <td align="center">
      <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px"><br><b>Edge</b><br>Last 2 versions
    <td align="center">
      <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px"><br><b>Firefox</b><br>Last 2 versions
    </td>
    <td align="center">
      <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px"><br><b>Chrome</b><br>Last 2 versions
    </td>
    <td align="center">
      <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px"><br><b>Safari</b><br>Last 2 versions
    </td>
    <td align="center">
      <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px"><br><b>Mobile Safari</b><br>Last 2 versions
    </td>
    <td align="center">
      <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px"><br><b>Samsung</b><br>Last 2 versions
    </td>
    <td align="center">
      <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px"><br><b>Opera</b><br>Last 2 versions
    </td>
    <td align="center">
      <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px"><br><b>Electron</b><br>Last 2 versions
    </td>
  </tr>
</table>