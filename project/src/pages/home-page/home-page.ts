import { customElement, html, LitElement, property, TemplateResult } from 'lit-element';
import { ajax } from 'rxjs/ajax';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import '../../components/game-view/game-view';
import '../../web-components/svg-footer/svg-footer';
import '../../web-components/svg-wave/svg-wave';
import '../../web-components/navbar/navbar';

@customElement('home-page')
export class HomePage extends LitElement {
  @property()
  private currentQuote = '';

  @property()
  private currentAuthor = '';

  connectedCallback(): void {
    super.connectedCallback();
    this.getQuotes();
  }

  public render(): TemplateResult {
    return html`
      <style>
        .page {
          padding-bottom: 320px;
          /* overflow: hidden; */
        }
      </style>
      <div class="page">
        <wc-navbar @navbarItemClick="${(event: any): void => this.handleRoutes(event)}"></wc-navbar>
        <game-view quoteText="${this.currentQuote}" author="${this.currentAuthor}"></game-view>
        <wc-svg-wave></wc-svg-wave>
      </div>
    `;
  }

  handleRoutes(event: any): void {
    alert(event.detail.menuItem);
  }

  getQuotes(): void {
    const apiResponse$ = ajax.getJSON(`https://type.fit/api/quotes`).pipe(
      catchError(error => {
        console.log('error: ', error);
        return of(error);
      }),
    );

    apiResponse$.subscribe(quotes => {
      const randomIndex: number = Math.floor(Math.random() * quotes.length);
      this.currentQuote = `#${quotes[randomIndex].text}`;
      this.currentAuthor = quotes[randomIndex].author || 'Anonymus';
    });
  }
}
