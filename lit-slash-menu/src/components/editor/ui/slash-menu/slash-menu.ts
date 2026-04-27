import 'prosekit/lit/autocomplete'

import { ContextConsumer } from '@lit/context'
import { html, LitElement } from 'lit'
import type { BasicExtension } from 'prosekit/basic'
import type { Editor } from 'prosekit/core'
import { canUseRegexLookbehind } from 'prosekit/core'

import { editorContext } from '../editor-context'

// Match inputs like "/", "/table", "/heading 1" etc. Do not match "/ heading".
const regex = canUseRegexLookbehind() ? /(?<!\S)\/(\S.*)?$/u : /\/(\S.*)?$/u

class SlashMenuElement extends LitElement {
  private editorConsumer = new ContextConsumer(this, {
    context: editorContext,
    subscribe: true,
  })

  override createRenderRoot() {
    return this
  }

  override render() {
    const editor = this.editorConsumer.value as
      | Editor<BasicExtension>
      | undefined
    if (!editor) {
      return html``
    }

    return html`
      <prosekit-autocomplete-root .editor=${editor} .regex=${regex}>
        <prosekit-autocomplete-positioner
          class="block overflow-visible w-min h-min z-50 ease-out transition-transform duration-100 motion-reduce:transition-none"
        >
          <prosekit-autocomplete-popup
            class="box-border origin-(--transform-origin) transition-[opacity,scale] transition-discrete motion-reduce:transition-none data-[state=closed]:duration-150 data-[state=closed]:opacity-0 starting:opacity-0 data-[state=closed]:scale-95 starting:scale-95 duration-40 rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg bg-[canvas] flex flex-col relative max-h-100 min-h-0 min-w-60 select-none overflow-hidden whitespace-nowrap"
          >
            <div
              class="flex flex-col flex-1 min-h-0 overflow-y-auto p-1 bg-[canvas] overscroll-contain"
            >
              <lit-editor-slash-menu-item
                class="contents"
                label="Text"
                @select=${() => editor.commands.setParagraph()}
              ></lit-editor-slash-menu-item>
              <lit-editor-slash-menu-item
                class="contents"
                label="Heading 1"
                kbd="#"
                @select=${() => editor.commands.setHeading({ level: 1 })}
              ></lit-editor-slash-menu-item>
              <lit-editor-slash-menu-item
                class="contents"
                label="Heading 2"
                kbd="##"
                @select=${() => editor.commands.setHeading({ level: 2 })}
              ></lit-editor-slash-menu-item>
              <lit-editor-slash-menu-item
                class="contents"
                label="Heading 3"
                kbd="###"
                @select=${() => editor.commands.setHeading({ level: 3 })}
              ></lit-editor-slash-menu-item>
              <lit-editor-slash-menu-item
                class="contents"
                label="Bullet list"
                kbd="-"
                @select=${() => editor.commands.wrapInList({ kind: 'bullet' })}
              ></lit-editor-slash-menu-item>
              <lit-editor-slash-menu-item
                class="contents"
                label="Ordered list"
                kbd="1."
                @select=${() => editor.commands.wrapInList({ kind: 'ordered' })}
              ></lit-editor-slash-menu-item>
              <lit-editor-slash-menu-item
                class="contents"
                label="Task list"
                kbd="[]"
                @select=${() => editor.commands.wrapInList({ kind: 'task' })}
              ></lit-editor-slash-menu-item>
              <lit-editor-slash-menu-item
                class="contents"
                label="Toggle list"
                kbd=">>"
                @select=${() => editor.commands.wrapInList({ kind: 'toggle' })}
              ></lit-editor-slash-menu-item>
              <lit-editor-slash-menu-item
                class="contents"
                label="Quote"
                kbd=">"
                @select=${() => editor.commands.setBlockquote()}
              ></lit-editor-slash-menu-item>
              <lit-editor-slash-menu-item
                class="contents"
                label="Table"
                @select=${() => editor.commands.insertTable({ row: 3, col: 3 })}
              ></lit-editor-slash-menu-item>
              <lit-editor-slash-menu-item
                class="contents"
                label="Divider"
                kbd="---"
                @select=${() => editor.commands.insertHorizontalRule()}
              ></lit-editor-slash-menu-item>
              <lit-editor-slash-menu-item
                class="contents"
                label="Code"
                kbd="\`\`\`"
                @select=${() => editor.commands.setCodeBlock()}
              ></lit-editor-slash-menu-item>
              <lit-editor-slash-menu-empty
                class="contents"
              ></lit-editor-slash-menu-empty>
            </div>
          </prosekit-autocomplete-popup>
        </prosekit-autocomplete-positioner>
      </prosekit-autocomplete-root>
    `
  }
}

customElements.define('lit-editor-slash-menu', SlashMenuElement)
