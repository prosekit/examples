import 'prosekit/basic/style.css'

import { LitElement, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { createRef, ref, type Ref } from 'lit/directives/ref.js'
import { createEditor, type Editor, type NodeJSON } from 'prosekit/core'

import { defineExtension, type EditorExtension } from './extension'

@customElement('my-editor')
export class MyEditor extends LitElement {
  createRenderRoot() {
    return this
  }

  @state()
  editor?: Editor<EditorExtension>

  @property({ type: Object, attribute: false })
  defaultDoc?: NodeJSON

  private editorRef: Ref<HTMLDivElement> = createRef()

  protected firstUpdated(): void {
    if (!this.editor) {
      const extension = defineExtension()
      this.editor = createEditor({
        extension,
        defaultDoc: this.defaultDoc || defaultDoc,
      })
    }

    this.editor.mount(this.editorRef.value)
  }

  render() {
    return html`
      <div class='box-border h-full w-full min-h-36 overflow-y-hidden overflow-x-hidden rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700 flex flex-col bg-white dark:bg-neutral-900'>
        <div class='relative w-full flex-1 box-border overflow-y-scroll'>
          <div class='ProseMirror box-border min-h-full px-[max(40px,_calc(50%-330px))] py-[24px] outline-none outline-0 [&_span[data-mention="user"]]:text-blue-500 [&_span[data-mention="tag"]]:text-violet-500 [&_pre]:text-white [&_pre]:bg-zinc-800' ${ref(this.editorRef)}></div>
        </div>
      </div>
    `
  }
}

const defaultDoc: NodeJSON = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: {
        level: 1,
      },
      content: [
        {
          type: 'text',
          text: 'Image',
        },
      ],
    },
    {
      type: 'image',
      attrs: {
        src: 'https://placehold.co/120x80',
      },
    },
    {
      type: 'heading',
      attrs: {
        level: 1,
      },
      content: [
        {
          type: 'text',
          text: 'Code Block',
        },
      ],
    },
    {
      type: 'codeBlock',
      attrs: {
        language: 'python',
      },
      content: [
        {
          type: 'text',
          text: 'if __name__ == "__main__":\n    print("hello world!")\n\n'.repeat(
            20,
          ),
        },
      ],
    },
  ],
}
