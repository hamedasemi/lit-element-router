import { LitElement, html } from "lit-element";
import { outlet } from "./lit-element-router.js";

export class RouterView extends outlet(LitElement) {
  render() {
    return html` <slot></slot> `;
  }
}

// customElements.define("router-view", RouterView);
// export default RouterView;
