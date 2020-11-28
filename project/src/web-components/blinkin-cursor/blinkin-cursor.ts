import { customElement, html, LitElement, property, TemplateResult } from 'lit-element';

@customElement('wc-blinkin-cursor')
export class BlinkinCursor extends LitElement {
  @property() private color = '#000';

  public render(): TemplateResult {
    return html`
      <style>
        :root {
        }
        .blinking-cursor {
          font-weight: 100;
          color: #2e3d48;
          animation: 1s blink step-end infinite;
          /* -webkit-animation: 1s blink step-end infinite;
          -moz-animation: 1s blink step-end infinite;
          -ms-animation: 1s blink step-end infinite;
          -o-animation: 1s blink step-end infinite; */
        }

        @keyframes blink {
          from,
          to {
            color: transparent;
          }
          50% {
            color: black;
          }
        }

        /* @-moz-keyframes blink {
          from,
          to {
            color: transparent;
          }
          50% {
            color: black;
          }
        }

        @-webkit-keyframes blink {
          from,
          to {
            color: transparent;
          }
          50% {
            color: black;
          }
        }

        @-ms-keyframes blink {
          from,
          to {
            color: transparent;
          }
          50% {
            color: black;
          }
        }

        @-o-keyframes blink {
          from,
          to {
            color: transparent;
          }
          50% {
            color: black;
          }
        } */
      </style>
      <span class="blinking-cursor">|</span>
    `;
  }
}
