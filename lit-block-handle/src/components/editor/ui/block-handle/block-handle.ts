import { ContextConsumer } from '@lit/context'
import { html, LitElement } from 'lit'
import {
  registerBlockHandleAddElement,
  registerBlockHandleDraggableElement,
  registerBlockHandlePopupElement,
  registerBlockHandlePositionerElement,
  registerBlockHandleRootElement,
} from 'prosekit/lit/block-handle'

import { editorContext } from '../editor-context'

class LitBlockHandle extends LitElement {
  declare dir: 'ltr' | 'rtl' | 'auto'

  private _editorConsumer = new ContextConsumer(this, {
    context: editorContext,
    subscribe: true,
  })

  override connectedCallback() {
    super.connectedCallback()
    this.classList.add('contents')
  }

  override createRenderRoot() {
    return this
  }

  override render() {
    const placement = this.dir === 'rtl' ? 'right' : 'left'
    const editor = this._editorConsumer.value ?? null

    return html`
      <prosekit-block-handle-root .editor=${editor}>
        <prosekit-block-handle-positioner
          .placement=${placement}
          class="block overflow-visible w-min h-min z-50 ease-out transition-transform duration-100 motion-reduce:transition-none"
        >
          <prosekit-block-handle-popup
            class="flex box-border origin-(--transform-origin) transition-[opacity,scale] transition-discrete motion-reduce:transition-none duration-100 data-[state=closed]:duration-150 data-[state=closed]:opacity-0 starting:opacity-0 data-[state=closed]:scale-95 starting:scale-95"
          >
            <prosekit-block-handle-add
              .editor=${editor}
              class="h-6 w-6 cursor-pointer flex items-center box-border justify-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded-sm text-gray-500/50 dark:text-gray-400/50"
            >
              <div class="i-lucide-plus size-5 block"></div>
            </prosekit-block-handle-add>
            <prosekit-block-handle-draggable
              .editor=${editor}
              class="h-6 w-5 cursor-grab flex items-center box-border justify-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded-sm text-gray-500/50 dark:text-gray-400/50"
            >
              <div class="i-lucide-grip-vertical size-5 block"></div>
            </prosekit-block-handle-draggable>
          </prosekit-block-handle-popup>
        </prosekit-block-handle-positioner>
      </prosekit-block-handle-root>
    `
  }
}

export function registerLitEditorBlockHandle() {
  registerBlockHandleAddElement()
  registerBlockHandleDraggableElement()
  registerBlockHandlePopupElement()
  registerBlockHandlePositionerElement()
  registerBlockHandleRootElement()

  if (customElements.get('lit-editor-block-handle')) return
  customElements.define('lit-editor-block-handle', LitBlockHandle)
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-editor-block-handle': LitBlockHandle
  }
}
