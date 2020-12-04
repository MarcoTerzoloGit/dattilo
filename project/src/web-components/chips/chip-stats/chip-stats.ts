import { customElement, html, LitElement, property, TemplateResult } from 'lit-element';
import { ChipStatsConfigInterface } from './chip-stats.interface';
import '../../custom-icon/custom-icon';

@customElement('wc-chip-stats')
export class ChipStats extends LitElement {
  @property() private chipConfig: ChipStatsConfigInterface;
  @property() private color = '#32a9e2';

  public render(): TemplateResult {
    return html`
      <style>
        :root {
        }
        .chip-container {
          display: flex;
          width: 160px;
          justify-content: space-between;
          align-items: center;
          background-color: ${this.color};
          border-radius: 98px;
          padding: 8px;
          font-size: 16px;
          color: white;
          box-shadow: 0px 0px 13px 8px #9e9e9e38;
          border: 5px solid #fff;
        }
        .chip-content {
          width: 60%;
          margin-left: 8px;
          margin-right: 16px;
        }

        .progress {
          background-color: white;
          border-radius: 8px;
          height: 12px;
          font-size: 8px;
          color: ${this.color};
        }

        label {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: white;
          border-radius: 50%;
          height: 36px;
          width: 36px;
          color: ${this.color};
        }
      </style>
      <div class="chip-container">
        <label>
          <wc-custom-icon
            color="${this.color}"
            iconName="${this.chipConfig.label}"
            height="20"
            height="20"
          ></wc-custom-icon>
        </label>
        <div class="chip-content">${this.renderChipContent()}</div>
      </div>
    `;
  }

  renderChipContent(): TemplateResult {
    switch (this.chipConfig.chipType) {
      case 'completion':
        return html`
          <div class="progress" style="width: ${this.chipConfig.value}%">
            ${this.chipConfig.value}%
          </div>
        `;
      case 'score':
        return html`
          <div>${this.chipConfig.value} Points</div>
        `;
      case 'speed':
        return html`
          <div>${this.chipConfig.value} L/M</div>
        `;
      default:
    }

    return html`
      <p>pinco</p>
    `;
  }

  // private handleClick(): void {
  //   this.dispatchEvent(
  //     new CustomEvent('chipItemClick', {
  //       bubbles: true,
  //       cancelable: false,
  //       composed: true,
  //     }),
  //   );
  // }
}
