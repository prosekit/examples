// @unocss-include

import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('my-editor')
export class MyEditor extends LitElement {
  render() {
    return html`
      <div></div>
    `
  }
}
