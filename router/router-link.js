export class RouterLink extends HTMLAnchorElement {
    constructor() {
        super()
        this.addEventListener('click', e => this.clickHandler(e))
    }
    clickHandler(event) {
        event.preventDefault();
        window.history.pushState({}, null, event.target.href + window.location.search)
        window.dispatchEvent(new CustomEvent('route'))
    }
}

customElements.define('router-link', RouterLink, {
    extends: 'a'
})