import { customElement, html, LitElement, property, TemplateResult } from 'lit-element';
@customElement('wc-svg-wave')
export class SvgWave extends LitElement {
  @property({ type: String }) private waveColor = '#2aa9e2';

  public render(): TemplateResult {
    return html`
      <style>
        :root {
        }
        /* svg {
          position: fixed;
          bottom: 0px;
          left: 0px;
        } */

        div.waves {
          width: 100%;
          bottom: 0;
          /*height: 100%;*/
          position: absolute;
          z-index: 99;
        }
        svg {
          position: absolute;
          width: 100%;
          bottom: 0;
          left: 0;
          animation-name: move-left;
          animation-duration: 8s;
          animation-iteration-count: infinite;
          animation-direction: alternate;
        }
        .spacer {
          height: 100px;
          width: 100%;
        }

        @keyframes example {
          0% {
            left: 0px;
            top: 0px;
          }

          50% {
            left: -2000px;
            top: 200px;
          }

          100% {
            left: 0px;
            top: 0px;
          }
        }
      </style>
      <div class="waves">
        <svg width="100%" height="200px" fill="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#2aa9e2"
            d="
          M0 67
          C 273,183
            822,-40
            1920.00,106 
          
          V 359 
          H 0 
          V 67
          Z"
          >
            <animate
              repeatCount="indefinite"
              fill="url(#grad1)"
              attributeName="d"
              dur="15s"
              attributeType="XML"
              values="
            M0 77 
            C 473,283
              822,-40
              1920,116 
            
            V 359 
            H 0 
            V 67 
            Z; 

            M0 77 
            C 473,-40
              1222,283
              1920,136 
            
            V 359 
            H 0 
            V 67 
            Z; 

            M0 77 
            C 973,260
              1722,-53
              1920,120 
            
            V 359 
            H 0 
            V 67 
            Z; 

            M0 77 
            C 473,283
              822,-40
              1920,116 
            
            V 359 
            H 0 
            V 67 
            Z
            "
            ></animate>
          </path>
        </svg>
      </div>
    `;
  }
}
