import { customElement, html, LitElement, property, TemplateResult } from 'lit-element';
import './custom-icon.scss';

@customElement('wc-custom-icon')
export class CustomIcon extends LitElement {
  @property({ type: String }) private iconName = 'icon-plus';
  @property({ type: Number }) private height = 32;
  @property({ type: Number }) private width = 32;
  @property({ type: String }) private color = '#32a9e2';

  public render(): TemplateResult {
    return html`
      <style>
        :root {
        }
        svg {
          height: ${this.height + 'px'};
          width: ${this.width + 'px'};
          fill: ${this.color};
          opacity: 1;
          transition: all 0.8s;
        }

        svg:active {
          opacity: 0.4;
          transition: 0s;
        }
      </style>

      <svg class="${this.iconName}" @click="${(): void => this.handleClick()}">
        <use href="./static/assets/sprite.svg#${this.iconName}"></use>
      </svg>
    `;
  }

  private handleClick(): void {
    this.dispatchEvent(
      new CustomEvent('icnClick', {
        bubbles: true,
        cancelable: false,
        composed: true,
      }),
    );
  }
}
