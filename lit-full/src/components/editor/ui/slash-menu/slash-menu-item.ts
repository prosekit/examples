import { html, LitElement } from 'lit'
import type { SelectEvent } from 'prosekit/lit/autocomplete'

export class SlashMenuItemElement extends LitElement {
  static override properties = {
    label: { type: String },
    kbd: { type: String },
  }

  label: string
  kbd: string

  constructor() {
    super()
    this.label = ''
    this.kbd = ''
  }

  override createRenderRoot() {
    return this
  }

  // Relay the inner item's non-bubbling `select` event on this element, so
  // consumers can listen for it without reaching into the light DOM.
  handleSelect = (event: SelectEvent) => {
    this.dispatchEvent(new CustomEvent('select', { detail: event.detail }))
  }

  override render() {
    return html`
      <prosekit-autocomplete-item
        @select=${this.handleSelect}
        class="relative flex items-center justify-between min-w-32 scroll-my-1 rounded-md px-3 py-1.5 text-sm box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800"
      >
        <span>${this.label}</span>
        ${
        this.kbd
          ? html`
              <kbd class="text-xs font-mono text-gray-400 dark:text-gray-500">
                ${this.kbd}
              </kbd>
            `
          : ''
      }
      </prosekit-autocomplete-item>
    `
  }
}
