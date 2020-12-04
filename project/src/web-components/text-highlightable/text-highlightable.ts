import { customElement, html, LitElement, property, TemplateResult } from 'lit-element';

@customElement('wc-text-highlightable')
export class TextHighlightable extends LitElement {
  @property() textWithMarker = '';

  public render(): TemplateResult {
    return html`
      <style>
        :root {
          --wc-button__theme__background-color: red;
        }
        .text-highlightable {
          width: 100%;
        }
        .highlighted {
          border-bottom: 4px solid #36e10f;
        }
      </style>
      <div class="text-highlightable" data-qa="quote-text">
        ${this.getHighlightedText()}
      </div>
    `;
  }

  private getHighlightedText(): TemplateResult {
    const [highlightedChars, regularChars] = this.textWithMarker.split('#');

    return html`
      <div><span class="highlighted" data-qa="quote-highLighted-text">${highlightedChars}</span>${regularChars}</div>
    `;
  }
}
