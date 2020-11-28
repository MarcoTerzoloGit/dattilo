import { customElement, html, LitElement, property, TemplateResult } from 'lit-element';

@customElement('wc-dynamic-form')
export class DynamicForm extends LitElement {
  @property() private formconfig = [{ fieldType: 'input-text' }, { fieldType: 'input-text' }, {}];

  public render(): TemplateResult {
    return html`
      <style>
        :root {
          --wc-button__theme__background-color: red;
        }
        button {
        }
      </style>
      <div>
        ${this.renderForm()}
      </div>
    `;
  }

  // private handleClick(): void {
  //   this.dispatchEvent(
  //     new CustomEvent('btnClick', {
  //       bubbles: true,
  //       cancelable: false,
  //       composed: true,
  //     }),
  //   );
  // }

  private renderForm(): any {
    return this.formconfig.map(field => {
      switch (field.fieldType) {
        case 'input-text':
          return html`
            <div>INPUT 5</div>
          `;
        default:
          return html`
            <div>INPUT 3</div>
          `;
      }
    });

    // return this.formconfig.map(field => {
    //   switch (field.fieldType) {
    //     case 'input-text':
    //       html`
    //         <div>INPUT</div>
    //       `;
    //     default:
    //       html`
    //         <div>ERROR</div>
    //       `;
    //   }
    // });
  }
}
