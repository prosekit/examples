import './app.css'
import './editor'

import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('my-app')
export class MyApp extends LitElement {
  render() {
    return html`
      <my-editor></my-editor>
    `
  }
}
