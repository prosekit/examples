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
              <prosekit-tooltip-content
                class="z-50 overflow-hidden rounded-md border border-solid bg-gray-900 dark:bg-gray-50 px-3 py-1.5 text-xs text-gray-50 dark:text-gray-900 shadow-xs [&:not([data-state])]:hidden will-change-transform motion-safe:data-[state=open]:animate-in motion-safe:data-[state=closed]:animate-out motion-safe:data-[state=open]:fade-in-0 motion-safe:data-[state=closed]:fade-out-0 motion-safe:data-[state=open]:zoom-in-95 motion-safe:data-[state=closed]:zoom-out-95 motion-safe:data-[state=open]:animate-duration-150 motion-safe:data-[state=closed]:animate-duration-200 motion-safe:data-[side=bottom]:slide-in-from-top-2 motion-safe:data-[side=bottom]:slide-out-to-top-2 motion-safe:data-[side=left]:slide-in-from-right-2 motion-safe:data-[side=left]:slide-out-to-right-2 motion-safe:data-[side=right]:slide-in-from-left-2 motion-safe:data-[side=right]:slide-out-to-left-2 motion-safe:data-[side=top]:slide-in-from-bottom-2 motion-safe:data-[side=top]:slide-out-to-bottom-2"
              >
                ${tooltip}
              </prosekit-tooltip-content>
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
