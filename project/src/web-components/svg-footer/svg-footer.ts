import { customElement, html, LitElement, property, TemplateResult } from 'lit-element';

@customElement('wc-svg-footer')
export class SvgFooter extends LitElement {
  @property({ type: String }) private waveColor = '#2aa9e2';

  public render(): TemplateResult {
    return html`
      <style>
        :root {
        }
        svg {
          position: fixed;
          bottom: 0px;
          left: 0px;
        }
      </style>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" style="position: fixed; bottom: 0px; left: 0px">
        <path
          fill="${this.waveColor}"
          fill-opacity="1"
          d="M0,96L40,85.3C80,75,160,53,240,85.3C320,117,400,203,480,245.3C560,288,640,288,720,256C800,224,880,160,960,160C1040,160,1120,224,1200,229.3C1280,235,1360,181,1400,154.7L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          data-darkreader-inline-fill=""
          style="--darkreader-inline-fill: #b9006e;"
        ></path>
      </svg>
    `;
  }
}
