import { routerLinkMixin } from '../lit-element-router'

export class RouterLink extends routerLinkMixin(HTMLAnchorElement) {
    constructor() {
        super()
        this.href = this.href;
        this.addEventListener('click', e => this.linkClick(e));
    }

    linkClick(event) {
        event.preventDefault();
        this.navigate(this.href);
    }
}

customElements.define('route-link', RouterLink, {extends: 'a'})