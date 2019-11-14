import { LitElement, html, css } from 'lit-element'
import { routerOutletMixin } from '../lit-element-router'

export class AnyArbitraryLitElement extends routerOutletMixin(LitElement) {
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

customElements.define('any-arbitrary-lit-element', AnyArbitraryLitElement)