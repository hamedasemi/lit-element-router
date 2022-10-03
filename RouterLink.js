import { LitElement, html, css } from "lit-element";
import { navigator } from "./lit-element-router.js";

export class RouterLink extends navigator(LitElement) {
  static get properties() {
    return {
      href: { type: String },
    };
  }
  static get styles() {
    return css`
      a {
        margin: 5px;
      }
    `;
  }
  constructor() {
    super();
    this.href = "";
  }
  render() {
    return html`
      <a href="${this.href}" @click="${this.linkClick}">
        <slot></slot>
      </a>
    `;
  }
  linkClick(event) {
    event.preventDefault();
    this.navigate(this.href);
  }
}

// customElements.define("router-link", RouterLink);
// export default RouterLink;
