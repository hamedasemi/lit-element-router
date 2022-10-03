import { LitElement, css, html } from "lit";

export class Test extends LitElement {
  static properties = {
    count: {},
  };

  constructor() {
    super();
    this.count = 10;
  }

  render() {
    return html`
      <div>
        <button @click=${this._onClick} part="button">
          count is ${this.count}
        </button>
      </div>
    `;
  }

  _onClick() {
    this.count++;
    console.log(this.count);
  }

  static styles = css`
    :host {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }

    button {
      border-radius: 8px;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      background-color: #1a1a1a;
      cursor: pointer;
      transition: border-color 0.25s;
    }
    button:hover {
      border-color: #646cff;
    }
    button:focus,
    button:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }

    @media (prefers-color-scheme: light) {
      a:hover {
        color: #747bff;
      }
      button {
        background-color: #f9f9f9;
      }
    }
  `;
}

customElements.define("lit-test", Test);
