import { customElement, html, LitElement, property, query, TemplateResult } from 'lit-element';
import { generateColor } from '../../utils/color-generator';
import '../../web-components/text-highlightable/text-highlightable';
import '../../web-components/blinkin-cursor/blinkin-cursor';
import '../../web-components/chips/chip-stats/chip-stats';
import { ChipStatsConfigInterface } from '../../web-components/chips/chip-stats/chip-stats.interface';
import { updateProgressService, updateScoreService, updateSpeedService } from './services/update-stats.service';

// import * as test from 'smtp-webcomponents';
// debugger;
// console.log(test);
// customElements.define('wc-test-label', TestLabel);

@customElement('game-view')
export class GameView extends LitElement {
  @query('#letter-box')
  private letterBox: HTMLDivElement;

  @query('#animated-box')
  private animatedBox: HTMLDivElement;

  @property()
  private insertedText = '';

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
  private updateSpeedService: Function;

  @property()
  private chipConfig: {
    completion: ChipStatsConfigInterface;
    speed: ChipStatsConfigInterface;
    score: ChipStatsConfigInterface;
  } = {
    completion: {
      label: 'icon-percent',
      chipType: 'completion',
      value: 0,
    },
    speed: {
      label: 'icon-stopwatch',
      chipType: 'speed',
      value: 0,
    },
    score: {
      label: 'icon-bar-chart',
      chipType: 'score',
      value: 0,
    },
  };

  connectedCallback(): void {
    super.connectedCallback();
    this.updateSpeedService = updateSpeedService();
  }

  public render(): TemplateResult {
    this.expectedCharacter = this.quoteText[this.expectedCharacterIndex];

    return html`
      <style>
        .content-container {
          padding: 40px;
          position: absolute;
          top: 60px;
          z-index: 1;
          width: 100%;
          box-sizing: border-box !important;
        }

        .author-text {
          display: flex;
          justify-content: center;
        }

        .author-text p {
          font-size: 16px;
          font-style: italic;
          border-left: 4px solid #2aa9e2;
          padding-left: 4px;
        }

        .insert-text {
          padding: 12px;
          margin-top: 40px;
          margin-bottom: 40px;
          min-height: 60px;
          box-shadow: 0px 0px 8px 0px #9e9e9e8a;
          border-radius: 20px;
          border: none;
          width: 100%;
          box-sizing: border-box;
          font-size: 16px;
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

        .chip-div {
          display: flex;
          justify-content: space-around;
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

          .chip-div {
            flex-direction: column;
            align-items: center;
          }
        }
      </style>
      <div class="content-container">
        <wc-text-highlightable textWithMarker="${this.quoteText}"></wc-text-highlightable>

        <div class="author-text" data-qa="quote-author">
          <p>${this.author}</p>
        </div>
        <div
          data-qa="input-quote-text"
          class="insert-text"
          tabindex="-1"
          @keypress="${(event: InputEvent): void => this.getKeyPress(event)}"
          @click="${(event: KeyboardEvent): void => this.toggleCaret('on')}"
          @blur="${(event: KeyboardEvent): void => this.toggleCaret('off')}"
        >
          ${this.insertedText}<wc-blinkin-cursor></wc-blinkin-cursor>
        </div>

        <input
          data-qa="input-quote-text"
          class="insert-text"
          type="text"
          .value="${this.insertedText}"
          @input="${(event: InputEvent): void => this.getKeyPress(event)}"
        />

        <div class="box-container">
          <div class="box" data-qa="nextCharacter" id="letter-box" style="${`background-color: ${generateColor()}`}">
            <p>${this.expectedCharacter === ' ' ? '-' : this.expectedCharacter}</p>
          </div>
          <div class="box animated-character" id="animated-box">
            <p>${this.expectedCharacter === ' ' ? '-' : this.expectedCharacter}</p>
          </div>
        </div>

        <div class="chip-div">
          <wc-chip-stats .chipConfig=${this.chipConfig.completion}></wc-chip-stats>
          <wc-chip-stats .chipConfig=${this.chipConfig.score}></wc-chip-stats>
          <wc-chip-stats .chipConfig=${this.chipConfig.speed}></wc-chip-stats>
        </div>

        <!-- <p>expeced character index ${this.expectedCharacterIndex}</p>
          <p>last inserted character ${this.lastCharacter}</p>
          <p>value ${this.insertedText}</p>
          <p>quoteText ${this.quoteText}</p>
          <p>equals? ${this.quoteText === `${this.insertedText}#`}</p> -->
      </div>
    `;
  }

  private updateChips(): void {
    this.chipConfig = {
      // update progress
      completion: {
        ...this.chipConfig.completion,
        value: updateProgressService(this.quoteText?.length - 1, this.insertedText?.length),
      },
      // update score
      score: {
        ...this.chipConfig.score,
        value: updateScoreService(this.chipConfig.score.value, this.lastCharacter, this.expectedCharacter),
      },
      // update speed
      speed: {
        ...this.chipConfig.speed,
        value: this.updateSpeedService(),
      },
    };

    // persist data (MVP NEXT)
  }

  private toggleCaret(status: 'on' | 'off') {
    this.textReady = status === 'on' ? true : false;
  }

  private getKeyPress(event: InputEvent): void {
    // debugger;
    this.lastCharacter = event.data;

    this.updateChips();
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
      this.insertedText = `${this.insertedText}${this.lastCharacter}`;
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
//     this.insertedText = this.insertedText.slice(0, this.insertedText.length - 1);
//     this.moveMarkerBackward([...this.quoteText], this.expectedCharacterIndex - 1);
//     this.expectedCharacterIndex =
//       this.expectedCharacterIndex === 1 ? this.expectedCharacterIndex : this.expectedCharacterIndex - 1;
//     this.expectedCharacter = this.quoteText[this.expectedCharacterIndex];
//   }
//   console.log('TEST', event);
// }
