import { LitElement, html } from 'lit-element'
import { routerOutletMixin } from '../lit-element-router'

export class AnyArbitaryLitElement extends routerOutletMixin(LitElement) {
    
}

customElements.define('any-arbitary-lit-element', AnyArbitaryLitElement)