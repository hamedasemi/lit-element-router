import { LitElement, html } from 'lit-element'

export class RouterSlot extends LitElement {
    static get properties() {
        return {
            route: { type: String, reflect: true, attribute: 'route' }
        }
    }
    updated(updatedProperties) {
        updatedProperties.has('route') && this.slott()
    }
    slott() {
        if (this.route.length) {
            ([...this.shadowRoot.querySelectorAll(`[slot]`)]).map((selected) => {
                this.appendChild(selected)
            });

            ([...this.querySelectorAll(`[slot~=${this.route}]`)]).map((selected) => {
                this.shadowRoot.appendChild(selected)
            });
        }
    }
}

customElements.define('router-slot', RouterSlot)