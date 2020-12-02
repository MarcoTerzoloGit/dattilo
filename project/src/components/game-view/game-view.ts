import { customElement, html, LitElement, property, query, TemplateResult } from 'lit-element';
import { generateColor } from '../../utils/color-generator';
import '../../web-components/text-highlightable/text-highlightable';
import '../../web-components/blinkin-cursor/blinkin-cursor';
import '../../web-components/chips/chip-stats/chip-stats';
import { ChipStatsConfigInterface } from '../../web-components/chips/chip-stats/chip-stats.interface';

@customElement('game-view')
export class GameView extends LitElement {
  @query('#letter-box')
  private letterBox: HTMLDivElement;

  @query('#animated-box')
  private animatedBox: HTMLDivElement;

  @property()
  private value = '';

  @property()
  private quoteText: string;

  @property()
  private author: string;

  @property()
  private expectedCharacterIndex = 1;

  @property()
  private expectedCharacter: string;

  @property()
  private lastCharacter = '';

  @property()
  private textReady: boolean;

  @property()
  private chipConfig: ChipStatsConfigInterface = {
    label: 'icon', // TODO show icon isntead of text
    chipType: 'completion',
    value: 25,
  };

  public render(): TemplateResult {
    this.expectedCharacter = this.quoteText[this.expectedCharacterIndex];

    return html`
      <style>
        div {
          margin: 20px;
          font-size: 24px;
          text-align: center;
        }

        .content-container {
          max-height: calc(100vh - 320px);
          padding-top: 20px;
        }

        .author-text {
          font-size: 16px;
          font-style: italic;
          border-left: 4px solid #2aa9e2;
          display: inline-block;
          padding-left: 4px;
        }

        .insert-text {
          padding: 12px;
          margin-top: 40px;
          margin-bottom: 40px;
          min-height: 40px;
          box-shadow: 0px 0px 8px 0px #9e9e9e8a;
          border-radius: 20px;
        }

        .insert-text:focus {
          outline: none;
        }

        .box-container {
          position: relative;
          display: flex;
          justify-content: center;
          height: 280px;
          overflow: hidden;
        }

        .box {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 200px;
          width: 200px;
          margin: 0 auto;
          margin-top: 20px;
          margin-bottom: 20px;
          position: absolute;
          font-size: 64px;
          box-shadow: 12px 12px 16px 0 rgba(0, 0, 0, 0.25), -8px -8px 12px 0 rgba(255, 255, 255, 0.3);
          border-radius: 50px;
        }

        .animated-character {
          background-color: #afd275;
          opacity: 0;
        }

        .roll-out-right {
          -webkit-animation: roll-out-right 0.4s linear both;
          animation: roll-out-right 0.4s linear both;
        }

        /* @-webkit-keyframes roll-out-right {
          0% {
            -webkit-transform: translateX(0) rotate(0deg);
            transform: translateX(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            -webkit-transform: translateX(1000px) rotate(540deg);
            transform: translateX(1000px) rotate(540deg);
            opacity: 0;
          }
        } */
        @keyframes roll-out-right {
          0% {
            -webkit-transform: translateX(0) rotate(0deg);
            transform: translateX(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            -webkit-transform: translateX(1000px) rotate(540deg);
            transform: translateX(1000px) rotate(540deg);
            opacity: 0;
          }
        }

        @media screen and (max-width: 800px) {
          .box-container {
            display: none;
          }
        }
      </style>
      <div class="content-container">
        <wc-text-highlightable textWithMarker="${this.quoteText}"></wc-text-highlightable>
        <div class="author-text" data-qa="quote-author">
          ${this.author}
        </div>
        <div
          data-qa="input-quote-text"
          class="insert-text"
          tabindex="-1"
          @keypress="${(event: KeyboardEvent): void => this.getKeyPress(event)}"
          @click="${(event: KeyboardEvent): void => this.toggleCaret('on')}"
          @blur="${(event: KeyboardEvent): void => this.toggleCaret('off')}"
        >
          ${this.value}<wc-blinkin-cursor></wc-blinkin-cursor>
        </div>

        <div class="box-container">
          <div class="box" id="letter-box" style="${`background-color: ${generateColor()}`}">
            <p>${this.expectedCharacter === ' ' ? '-' : this.expectedCharacter}</p>
          </div>
          <div class="box animated-character" id="animated-box">
            <p>${this.expectedCharacter === ' ' ? '-' : this.expectedCharacter}</p>
          </div>
        </div>

        <wc-chip-stats .chipConfig=${this.chipConfig}></wc-chip-stats>

        <!-- <p>expeced character index ${this.expectedCharacterIndex}</p>
          <p>last inserted character ${this.lastCharacter}</p>
          <p>value ${this.value}</p>
          <p>quoteText ${this.quoteText}</p>
          <p>equals? ${this.quoteText === `${this.value}#`}</p> -->
      </div>
    `;
  }

  private toggleCaret(status: 'on' | 'off') {
    this.textReady = status === 'on' ? true : false;
  }

  private getKeyPress(event: KeyboardEvent): void {
    console.log('TEST', event);
    this.lastCharacter = event.key;

    this.checkInsertedCharacter();
  }

  private checkInsertedCharacter(): void {
    if (this.lastCharacter === this.expectedCharacter) {
      const elm = this.animatedBox;
      const newone = elm.cloneNode(true);
      elm.parentNode.replaceChild(newone, elm);
      this.animatedBox.innerText = this.lastCharacter;
      this.animatedBox.classList.add('roll-out-right');

      this.highlightText(this.expectedCharacterIndex - 1);
      this.expectedCharacterIndex++;
      this.expectedCharacter = this.quoteText[this.expectedCharacterIndex];
      this.value = `${this.value}${this.lastCharacter}`;
    }
  }

  private highlightText(index: number): void {
    const chars = [...this.quoteText];

    this.moveMarkerForward(chars, index);

    this.quoteText = chars.join('');
  }

  private moveMarkerForward(arr: Array<string>, fromIndex: number): void {
    const element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(fromIndex + 1, 0, element);
  }

  private moveMarkerBackward(arr: Array<string>, fromIndex: number): void {
    const element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(fromIndex - 1, 0, element);
  }
}

// @keydown="${(event: KeyboardEvent): void => this.getKeyDown(event)}"
// private getKeyDown(event: KeyboardEvent): void {
//   if (event.key === 'Backspace') {
//     this.value = this.value.slice(0, this.value.length - 1);
//     this.moveMarkerBackward([...this.quoteText], this.expectedCharacterIndex - 1);
//     this.expectedCharacterIndex =
//       this.expectedCharacterIndex === 1 ? this.expectedCharacterIndex : this.expectedCharacterIndex - 1;
//     this.expectedCharacter = this.quoteText[this.expectedCharacterIndex];
//   }
//   console.log('TEST', event);
// }
