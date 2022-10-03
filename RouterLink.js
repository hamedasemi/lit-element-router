import { LitElement, html, css } from "lit-element";
import { navigator } from "./lit-element-router.js";

export class RouterLink extends navigator(LitElement) {
  static get properties() {
    return {
      href: { type: String },
    };
  }
  constructor() {
    super();
    this.href = "";
  }
  render() {
    return html` <slot @click="${this.linkClick}"></slot> `;
  }
  linkClick(event) {
    event.preventDefault();
    this.navigate(this.href);
  }
}

// customElements.define("router-link", RouterLink);
// export default RouterLink;
