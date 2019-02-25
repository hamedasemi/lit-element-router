import { LitElement, html } from 'lit-element'
import { routerLinkMixin } from '../lit-element-router'

export class TestElementLink extends routerLinkMixin(LitElement) {
    constructor() {
        super()
    }
    static get properties() {
        return {
        }
    }
    render() {
        return html`
            <slot></slot>
            <a href="info" @click='${this.linkClick}'>Go to Info</a>
        `
    }
    linkClick(event){
        event.preventDefault();
        this.navigate(event.target.href);
    }
}

customElements.define('test-element-link', TestElementLink)