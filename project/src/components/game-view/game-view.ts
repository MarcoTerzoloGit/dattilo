import { customElement, html, LitElement, property, query, TemplateResult } from 'lit-element';
import { generateColor } from '../../utils/color-generator';
import '../../web-components/text-highlightable/text-highlightable';
import '../../web-components/blinkin-cursor/blinkin-cursor';
import '../../web-components/chips/chip-stats/chip-stats';
import { ChipStatsConfigInterface } from '../../web-components/chips/chip-stats/chip-stats.interface';
import { updateProgressService, updateScoreService, updateSpeedService } from './services/update-stats.service';

@customElement('game-view')
export class GameView extends LitElement {
  @query('#letter-box')
  private letterBox: HTMLDivElement;

  @query('#animated-box')
  private animatedBox: HTMLDivElement;

  @property()
  private gameIsFinished = false;

  @property()
  private userName = '';

  @property()
  private userPassword = '';

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
          font-size: 24px;
          font-family: 'Noto Sans JP';
          text-align: center;
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

          .insert-text {
            margin-top: 20px;
            font-size: 20px;
          }

          .chip-div {
            display: none;
            flex-direction: column;
            align-items: center;
          }

          .chip-div.show {
            display: flex;
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

        <div class=${`chip-div ${this.chipConfig.completion.value === 100 ? 'show' : ''}`}>
          <wc-chip-stats .chipConfig=${this.chipConfig.completion}></wc-chip-stats>
          <wc-chip-stats .chipConfig=${this.chipConfig.score}></wc-chip-stats>
          <wc-chip-stats .chipConfig=${this.chipConfig.speed}></wc-chip-stats>
        </div>

        <div>
          <input
            name="username"
            type="text"
            placeholder="user name"
            .value="${this.userName}"
            @input="${(event: InputEvent): any => (this.userName += event.data)}"
          />
          <input
            name="password"
            type="password"
            placeholder="password"
            .value="${this.userPassword}"
            @input="${(event: InputEvent): any => (this.userPassword += event.data)}"
          />
          <button @click="${() => this.login()}">
            login
          </button>
          <button @click="${() => this.createStats({})}">
            create stats
          </button>
        </div>
      </div>
    `;
  }

  private async login() {
    const response = await fetch('http://localhost:1337/auth/local', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, *cors, same-origin
      // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // redirect: 'follow', // manual, *follow, error
      // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        identifier: 'pinco@pinco.it',
        password: 'pinco@pinco.it',
      }), // body data type must match "Content-Type" header
    }).then(res => res.json());

    this.saveToken(response.jwt);
    this.saveUserId(response.user.id);

    console.log('response', response);

    this.getStatistics();
  }

  async createStats(stats: any): Promise<void> {
    const token = sessionStorage.getItem('user-token');
    const userId = sessionStorage.getItem('user-id');

    const response = await fetch(`http://localhost:1337/statistiches`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...stats,
        user: userId,
      }),
    }).then(res => res.json());

    console.log('statistiches response', response);
  }

  saveToken(token: string): void {
    sessionStorage.setItem('user-token', token);
    console.log('JWT token saved');
  }

  saveUserId(userId: string): void {
    sessionStorage.setItem('user-id', userId);
    console.log('User id saved');
  }

  async getStatistics(): Promise<void> {
    const token = sessionStorage.getItem('user-token');
    const userId = sessionStorage.getItem('user-id');

    const response = await fetch(`http://localhost:1337/statistiches?user.id=${userId}`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, *cors, same-origin
      // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // redirect: 'follow', // manual, *follow, error
      // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    }).then(res => res.json());

    console.log('statistiches response', response);
  }

  private updateChips(): void {
    this.chipConfig = {
      // update progress
      completion: {
        ...this.chipConfig.completion,
        value: updateProgressService(this.quoteText?.length - 2, this.insertedText?.length),
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

  private getKeyPress(event: InputEvent): void {
    // debugger;
    if (this.gameIsFinished) {
      return;
    }
    this.lastCharacter = event.data;

    console.log('---->', this.userName, this.userPassword);

    this.updateChips();
    this.checkInsertedCharacter();
    this.checkEndOfGame();
    this.saveStatsWhenFinished();
  }

  private checkEndOfGame(): void {
    if (this.chipConfig.completion.value == 100) {
      this.gameIsFinished = true;
    }
  }

  private saveStatsWhenFinished(): void {
    if (this.gameIsFinished) {
      const payload = {
        lettersPerMinute: this.chipConfig.speed.value,
        score: this.chipConfig.score.value,
        matchMode: 'hardmode',
        date: new Date().toISOString(),
      };
      this.createStats(payload);
    }
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
