import { LitElement, html } from 'lit-element'
import { routerOutletMixin } from '../lit-element-router'

export class TestElement extends routerOutletMixin(LitElement) {
    
}

customElements.define('test-element', TestElement)