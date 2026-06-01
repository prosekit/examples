import { ContextConsumer } from '@lit/context'
import { html, LitElement, nothing, type PropertyDeclaration } from 'lit'
import { repeat } from 'lit/directives/repeat.js'
import type { BasicExtension } from 'prosekit/basic'
import type { Editor, Union } from 'prosekit/core'
import type { MentionExtension } from 'prosekit/extensions/mention'
import {
  registerAutocompleteEmptyElement,
  registerAutocompleteItemElement,
  registerAutocompletePopupElement,
  registerAutocompletePositionerElement,
  registerAutocompleteRootElement,
} from 'prosekit/lit/autocomplete'

import { editorContext } from '../editor-context.ts'

const regex = /#[\da-z]*$/i

interface Tag {
  id: number
  label: string
}

class TagMenuElement extends LitElement {
  static override properties = {
    tags: { attribute: false } satisfies PropertyDeclaration<Tag[]>,
  }

  tags: Tag[] = []

  private editorConsumer = new ContextConsumer(this, {
    context: editorContext,
    subscribe: true,
  })

  override createRenderRoot() {
    return this
  }

  private handleTagInsert(
    editor: Editor<Union<[MentionExtension, BasicExtension]>>,
    id: number,
    label: string,
  ) {
    editor.commands.insertMention({
      id: id.toString(),
      value: '#' + label,
      kind: 'tag',
    })
    editor.commands.insertText({ text: ' ' })
  }

  override render() {
    const editor = this.editorConsumer.value as
      | Editor<Union<[MentionExtension, BasicExtension]>>
      | undefined
    if (!editor) {
      return nothing
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
              <prosekit-autocomplete-empty
                class="relative flex items-center justify-between min-w-32 scroll-my-1 rounded-md px-3 py-1.5 text-sm box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800"
              >
                No results
              </prosekit-autocomplete-empty>
              ${repeat(
                this.tags,
                (tag) => tag.id,
                (tag) => html`
                  <prosekit-autocomplete-item
                    class="relative flex items-center justify-between min-w-32 scroll-my-1 rounded-md px-3 py-1.5 text-sm box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800"
                    @select=${() =>
                      this.handleTagInsert(editor, tag.id, tag.label)}
                  >
                    ${'#' + tag.label}
                  </prosekit-autocomplete-item>
                `,
              )}
            </div>
          </prosekit-autocomplete-popup>
        </prosekit-autocomplete-positioner>
      </prosekit-autocomplete-root>
    `
  }
}

export function registerLitEditorTagMenu() {
  registerAutocompleteEmptyElement()
  registerAutocompleteItemElement()
  registerAutocompletePopupElement()
  registerAutocompletePositionerElement()
  registerAutocompleteRootElement()

  if (customElements.get('lit-editor-tag-menu')) return
  customElements.define('lit-editor-tag-menu', TagMenuElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-editor-tag-menu': TagMenuElement
  }
}
