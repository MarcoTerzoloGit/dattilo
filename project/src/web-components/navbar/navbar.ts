import { customElement, html, LitElement, property, TemplateResult } from 'lit-element';

@customElement('wc-navbar')
export class Navbar extends LitElement {
  @property() private menuItems: Array<string> = ['home', 'ladder', 'training', 'donate'];

  public render(): TemplateResult {
    return html`
      <style>
        :root {
          --wc-button__theme__background-color: red;
        }

        .navbar {
          width: 100%;
          height: 80px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          box-shadow: -2px 3px 20px 0px #00000024;
        }

        .nav-item {
          text-transform: uppercase;
          font-weight: bold;
          cursor: pointer;
          border: none;
          padding: 12px 18px;
          font-size: 16px;
          background-color: transparent;
          outline: none;
        }
        .ripple {
          background-position: center;
          transition: background 0.8s;
          background: transparent radial-gradient(circle, transparent 1%, #d9d9d9 1%) center/15000%;
        }
        .ripple:hover {
          color: #bcbcbc;
        }
        .ripple:active {
          background-color: #d9d9d9;
          background-size: 100%;
          transition: background 0s;
        }
      </style>
      <div class="navbar">
        ${this.renderMenuItems()}
      </div>
    `;
  }

  private renderMenuItems(): Array<TemplateResult> {
    return this.menuItems.map(
      item => html`
        <button data-qa=${item} class="nav-item ripple" @click="${(): void => this.handleClick(item)}">${item}</button>
      `,
    );
  }

  private handleClick(menuItem: string): void {
    this.dispatchEvent(
      new CustomEvent('navbarItemClick', {
        bubbles: true,
        cancelable: false,
        composed: true,
        detail: {
          menuItem,
        },
      }),
    );
  }
}
