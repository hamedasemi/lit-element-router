import { LitElement, css, html } from "lit";
import { RouterLink, RouterView, router } from "../lit-element-router.js";
import "./test.js";

export class MyElement extends router(LitElement) {
  constructor() {
    super();
  }

  static get routes() {
    return {
      mode: "hash",
      routes: [
        {
          name: "home",
          pattern: "",
          data: { title: "Home" },
        },
        {
          name: "info",
          pattern: "info",
        },
        {
          name: "user",
          pattern: "user/:id",
        },
        {
          name: "not-found",
          pattern: "*",
        },
      ],
    };
  }
  // 同样支持原写法
  // static get routes() {
  //   return [
  //     {
  //       name: "home",
  //       pattern: "",
  //       data: { title: "Home" },
  //     },
  //     {
  //       name: "info",
  //       pattern: "info",
  //     },
  //     {
  //       name: "user",
  //       pattern: "user/:id",
  //     },
  //     {
  //       name: "not-found",
  //       pattern: "*",
  //     },
  //   ];
  // }

  router(route, params, query, data) {
    this.route = route;
    this.params = params;
    this.query = query;
    console.log(route, params, query, data);
  }

  render() {
    return html`
      <div>
        <router-link href="/">Home</router-link>
        <router-link href="/info">Info</router-link>
        <router-link href="/info?data=12345">Info?data=12345</router-link>
        <router-link href="/user/14">user/14</router-link>
        <router-link href="/xxx">not-found</router-link>
      </div>

      <router-view active-route=${this.route}>
        <h1 route="home">Home</h1>
        <h1 route="info">Info ${this.query.data}</h1>
        <h1 route="user">User ${this.params.id}</h1>
        <h1 route="not-found">Not Found</h1>
      </router-view>
    `;
  }

  static styles = css`
    :host {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }

    h1 {
      font-size: 3.2em;
      line-height: 1.1;
    }

    @media (prefers-color-scheme: light) {
      a:hover {
        color: #747bff;
      }
    }
  `;
}

customElements.define("router-link", RouterLink);
customElements.define("router-view", RouterView);
customElements.define("my-element", MyElement);
