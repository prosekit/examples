import 'prosekit/lit/tooltip'

import { html, LitElement, nothing, type PropertyDeclaration } from 'lit'

class LitButton extends LitElement {
  static override properties = {
    pressed: { type: Boolean },
    disabled: { type: Boolean },
    tooltip: { type: String },
    icon: { type: String },
  } satisfies Record<string, PropertyDeclaration>

  pressed = false
  disabled = false
  tooltip = ''
  icon = ''

  override createRenderRoot() {
    return this
  }

  override connectedCallback() {
    super.connectedCallback()
    this.classList.add('contents')
  }

  private handleMouseDown = (event: MouseEvent) => {
    // Prevent the editor from being blurred when the button is clicked
    event.preventDefault()
  }

  override render() {
    const tooltip = this.tooltip

    return html`
      <prosekit-tooltip-root>
        <prosekit-tooltip-trigger class="block">
          <button
            data-state=${this.pressed ? 'on' : 'off'}
            class="outline-unset focus-visible:outline-unset flex items-center justify-center rounded-md p-2 font-medium transition focus-visible:ring-2 text-sm focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 disabled:pointer-events-none min-w-9 min-h-9 text-gray-900 dark:text-gray-50 disabled:text-gray-900/50 dark:disabled:text-gray-50/50 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 data-[state=on]:bg-gray-200 dark:data-[state=on]:bg-gray-700"
            ?disabled=${this.disabled}
            @mousedown=${this.handleMouseDown}
          >
            ${this.icon
              ? html`
                  <div class="${this.icon}"></div>
                `
              : nothing}
            ${tooltip
              ? html`
                  <span class="sr-only">${tooltip}</span>
                `
              : nothing}
          </button>
        </prosekit-tooltip-trigger>
        ${tooltip
          ? html`
              <prosekit-tooltip-positioner
                class="block overflow-visible w-min h-min z-50 ease-out transition-transform duration-100 motion-reduce:transition-none"
              >
                <prosekit-tooltip-popup
                  class="flex box-border origin-(--transform-origin) transition transition-discrete motion-reduce:transition-none duration-100 data-[state=closed]:duration-150 data-[state=closed]:opacity-0 starting:opacity-0 data-[state=closed]:scale-95 starting:scale-95 overflow-hidden rounded-md border border-solid bg-gray-900 dark:bg-gray-50 px-3 py-1.5 text-xs text-gray-50 dark:text-gray-900 shadow-xs text-nowrap"
                >
                  ${tooltip}
                </prosekit-tooltip-popup>
              </prosekit-tooltip-positioner>
            `
          : nothing}
      </prosekit-tooltip-root>
    `
  }
}

customElements.define('lit-editor-button', LitButton)

declare global {
  interface HTMLElementTagNameMap {
    'lit-editor-button': LitButton
  }
}
