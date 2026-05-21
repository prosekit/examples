import { registerLitEditor } from './components/editor/examples/inline-menu'
import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

registerLitEditor()

@customElement('my-editor')
export class MyEditor extends LitElement {
  createRenderRoot() {
    return this
  }

  render() {
    return html`
      <lit-editor-example-inline-menu></lit-editor-example-inline-menu>
    `
  }
}
