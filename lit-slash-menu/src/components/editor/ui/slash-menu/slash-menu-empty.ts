import 'prosekit/lit/autocomplete'

import { html, LitElement } from 'lit'

class SlashMenuEmptyElement extends LitElement {
  override createRenderRoot() {
    return this
  }

  override render() {
    return html`
      <prosekit-autocomplete-empty
        class="relative flex items-center justify-between min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-hidden data-focused:bg-gray-100 dark:data-focused:bg-gray-800"
      >
        <span>No results</span>
      </prosekit-autocomplete-empty>
    `
  }
}

customElements.define('lit-editor-slash-menu-empty', SlashMenuEmptyElement)
