import { customElement, html, LitElement, property, TemplateResult } from 'lit-element';

@customElement('wc-chip')
export class Chip extends LitElement {
  // @property({ type: Number }) private height = 60;
  // @property({ type: Number }) private width = 60;
  // @property({ type: String }) private bgColor = 'teal';
  // @property({ type: Number }) private textSize = 16;
  // @property({ type: String }) private textColor = 'white';

  public render(): TemplateResult {
    return html`
      <style>
        :root {
          --wc-button__theme__background-color: red;
        }
      </style>
      <div @click="${(): void => this.handleClick()}">
        <slot></slot>
      </div>
    `;
  }

  private handleClick(): void {
    this.dispatchEvent(
      new CustomEvent('navbarItemClick', {
        bubbles: true,
        cancelable: false,
        composed: true,
      }),
    );
  }
}
