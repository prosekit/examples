import { registerLitEditor } from './components/editor/examples/code-block'
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
      <lit-editor-example-code-block></lit-editor-example-code-block>
    `
  }
}
