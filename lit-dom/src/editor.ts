import 'prosekit/basic/style.css'

import { LitElement, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { createRef, ref, type Ref } from 'lit/directives/ref.js'
import { createEditor, type Editor, type NodeJSON } from 'prosekit/core'

import { defineRootExtension, type RootExtension } from './extension'

@customElement('my-editor')
export class MyEditor extends LitElement {
  createRenderRoot() {
    return this
  }

  @state()
  editor?: Editor<RootExtension>

  @property({ type: Object, attribute: false })
  defaultDoc?: NodeJSON

  private editorRef: Ref<HTMLDivElement> = createRef()

  protected firstUpdated(): void {
    if (!this.editor) {
      const extension = defineRootExtension()
      this.editor = createEditor({
        extension,
        defaultDoc: this.defaultDoc || defaultDoc,
      })
    }

    this.editor.mount(this.editorRef.value)
  }

  render() {
    return html`
      <div class='box-border h-full max-h-[500px] w-full overflow-y-auto overflow-x-hidden rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700'>
        <div class='relative flex min-h-full w-full flex-col'>
          <div class='dark:bg-zinc-900 relative box-border min-h-full flex-1 overflow-auto bg-white px-[max(16px,_calc(50%-330px))] py-[16px] outline-none outline-0 [&_span[data-mention="user"]]:color-blue-500 [&_span[data-mention="tag"]]:color-violet-500 [&_pre]:color-white [&_pre]:bg-zinc-800' ${ref(this.editorRef)}></div>
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
