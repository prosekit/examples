import './components/editor/examples/slash-menu'
import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('my-editor')
export class MyEditor extends LitElement {
  createRenderRoot() {
    return this
  }

  render() {
    return html`
      <lit-editor-example-slash-menu></lit-editor-example-slash-menu>
    `
  }
}
