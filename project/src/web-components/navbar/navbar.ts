import { customElement, html, LitElement, property, TemplateResult } from 'lit-element';
import '../custom-icon/custom-icon';
@customElement('wc-navbar')
export class Navbar extends LitElement {
  @property() private menuItems: Array<string> = ['home', 'ladder', 'training', 'donate'];
  @property() private menuOpen: boolean;

  public render(): TemplateResult {
    return html`
      <style>
        :root {
          --wc-button__theme__background-color: red;
        }

        .navbar {
          position: relative;
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

        .menu-button {
          display: none;
          position: absolute;
          top: 8px;
          right: 8px;
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

        @media screen and (max-width: 800px) {
          .navbar {
            display: flex;
            flex-direction: column;
            height: unset;
          }

          .menu-button {
            display: inline;
          }

          .nav-item {
            display: ${this.menuOpen ? 'inithial' : 'none'};
          }
        }
      </style>
      <div class="navbar">
        <wc-custom-icon
          class="menu-button"
          iconName="${this.menuOpen ? 'icon-close' : 'icon-menu'}"
          color="#32a9e2"
          @click="${(): void => this.menuClick()}"
        ></wc-custom-icon>
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

  private menuClick(): void {
    this.menuOpen = !this.menuOpen;
  }
}
