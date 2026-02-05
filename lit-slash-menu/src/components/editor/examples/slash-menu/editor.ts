import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import '../../ui/slash-menu/index'

import {
  html,
  LitElement,
  type PropertyDeclaration,
  type PropertyValues,
} from 'lit'
import { createRef, ref, type Ref } from 'lit/directives/ref.js'
import type { Editor } from 'prosekit/core'
import { createEditor } from 'prosekit/core'

import { defineExtension } from './extension'

export class LitEditor extends LitElement {
  static override properties = {
    editor: {
      state: true,
      attribute: false,
    } satisfies PropertyDeclaration<Editor>,
  }

  private editor: Editor
  private ref: Ref<HTMLDivElement>

  constructor() {
    super()

    const extension = defineExtension()
    this.editor = createEditor({ extension })
    this.ref = createRef<HTMLDivElement>()
  }

  override createRenderRoot() {
    return this
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties)
    this.editor.mount(this.ref.value)
  }

  override render() {
    return html`
      <div
        class="box-border h-full w-full min-h-36 overflow-y-hidden overflow-x-hidden rounded-md border border-solid border-gray-200 dark:border-gray-700 shadow-sm flex flex-col bg-white dark:bg-gray-950 text-black dark:text-white"
      >
        <div class="relative w-full flex-1 box-border overflow-y-auto">
          <div
            ${ref(this.ref)}
            class="ProseMirror box-border min-h-full px-[max(4rem,calc(50%-20rem))] py-8 outline-hidden outline-0 [&_span[data-mention=user]]:text-blue-500 [&_span[data-mention=tag]]:text-violet-500"
          ></div>
          <lit-editor-slash-menu
            .editor=${this.editor}
            style="display: contents;"
          ></lit-editor-slash-menu>
        </div>
      </div>
    `
  }
}

export function registerLitEditor() {
  if (customElements.get('lit-editor-example-slash-menu')) return
  customElements.define('lit-editor-example-slash-menu', LitEditor)
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-editor-example-slash-menu': LitEditor
  }
}
