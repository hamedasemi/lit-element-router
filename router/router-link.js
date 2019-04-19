import { LitElement, html } from 'lit-element'

export class RouterLink extends LitElement {

    constructor() {
        super()
        this.addEventListener('click', this.clickHandler.bind(this))
    }

    createRenderRoot () {
        return this;
    }

    clickHandler(event) {
        event.preventDefault();
        window.history.pushState({}, null, event.target.href + window.location.search)
        window.dispatchEvent(new CustomEvent('route'))
    }

    static get properties() {
        return {
            href: { type: String }
        }
    }

    render() {
        return html`
            <a href='${this.href}'>
                ${this.textContent}
            </a>
        `
    }
}

customElements.define('router-link', RouterLink)