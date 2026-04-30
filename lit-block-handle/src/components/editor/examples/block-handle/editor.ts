import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { ContextProvider } from '@lit/context'
import {
  html,
  LitElement,
  type PropertyDeclaration,
  type PropertyValues,
} from 'lit'
import { createRef, ref, type Ref } from 'lit/directives/ref.js'
import type { Editor, NodeJSON } from 'prosekit/core'
import { createEditor } from 'prosekit/core'

import { sampleContent } from '../../sample/sample-doc-block-handle'
import { registerLitEditorBlockHandle } from '../../ui/block-handle'
import { registerLitEditorDropIndicator } from '../../ui/drop-indicator'
import { editorContext } from '../../ui/editor-context'

import { defineExtension } from './extension'

export class LitEditor extends LitElement {
  static override properties = {
    initialContent: {
      attribute: false,
    } satisfies PropertyDeclaration<NodeJSON | undefined>,
  }

  initialContent?: NodeJSON

  private editor?: Editor
  private ref: Ref<HTMLDivElement>

  constructor() {
    super()
    this.ref = createRef<HTMLDivElement>()
  }

  override createRenderRoot() {
    return this
  }

  override disconnectedCallback() {
    this.editor?.unmount()
    super.disconnectedCallback()
  }

  override willUpdate() {
    if (this.editor) {
      return
    }

    const extension = defineExtension()
    this.editor = createEditor({
      extension,
      defaultContent: this.initialContent ?? sampleContent,
    })
    new ContextProvider(this, {
      context: editorContext,
      initialValue: this.editor,
    })
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties)
    this.editor?.mount(this.ref.value)
  }

  override render() {
    return html`
      <div
        class="box-border h-full w-full min-h-36 overflow-y-hidden overflow-x-hidden rounded-md border border-solid border-gray-200 dark:border-gray-700 shadow-sm flex flex-col bg-[canvas] text-black dark:text-white"
      >
        <div class="relative w-full flex-1 box-border overflow-y-auto">
          <div
            ${ref(this.ref)}
            class="ProseMirror box-border min-h-full px-[max(4rem,calc(50%-20rem))] py-8 outline-hidden outline-0 [&_span[data-mention=user]]:text-blue-500 [&_span[data-mention=tag]]:text-violet-500"
          ></div>
          <lit-editor-block-handle></lit-editor-block-handle>
          <lit-editor-drop-indicator></lit-editor-drop-indicator>
        </div>
      </div>
    `
  }
}

export function registerLitEditor() {
  registerLitEditorBlockHandle()
  registerLitEditorDropIndicator()

  if (customElements.get('lit-editor-example-block-handle')) return
  customElements.define('lit-editor-example-block-handle', LitEditor)
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-editor-example-block-handle': LitEditor
  }
}
