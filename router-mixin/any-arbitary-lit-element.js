import { LitElement, html } from 'lit-element'
import { routerOutletMixin } from '../lit-element-router'

export class AnyArbitaryLitElement extends routerOutletMixin(LitElement) {
    createRendeRoot () {
        return this;
    }
}

customElements.define('any-arbitary-lit-element', AnyArbitaryLitElement) 