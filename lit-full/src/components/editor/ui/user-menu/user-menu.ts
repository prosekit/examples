import { ContextConsumer } from '@lit/context'
import { html, LitElement, nothing, type PropertyDeclaration } from 'lit'
import { repeat } from 'lit/directives/repeat.js'
import type { BasicExtension } from 'prosekit/basic'
import type { Editor, Union } from 'prosekit/core'
import { canUseRegexLookbehind } from 'prosekit/core'
import type { MentionExtension } from 'prosekit/extensions/mention'
import {
  registerAutocompleteEmptyElement,
  registerAutocompleteItemElement,
  registerAutocompletePopupElement,
  registerAutocompletePositionerElement,
  registerAutocompleteRootElement,
} from 'prosekit/lit/autocomplete'

import { editorContext } from '../editor-context.ts'

// Match inputs like "@", "@foo", "@foo bar" etc. Do not match "@ foo".
const regex = canUseRegexLookbehind() ? /(?<!\S)@(\S.*)?$/u : /@(\S.*)?$/u

interface User {
  id: number
  name: string
}

class UserMenuElement extends LitElement {
  static override properties = {
    users: { attribute: false } satisfies PropertyDeclaration<User[]>,
    loading: { type: Boolean } satisfies PropertyDeclaration<boolean>,
  }

  users: User[] = []
  loading = false

  private editorConsumer = new ContextConsumer(this, {
    context: editorContext,
    subscribe: true,
  })

  override createRenderRoot() {
    return this
  }

  private handleUserInsert(
    editor: Editor<Union<[MentionExtension, BasicExtension]>>,
    id: number,
    username: string,
  ) {
    editor.commands.insertMention({
      id: id.toString(),
      value: '@' + username,
      kind: 'user',
    })
    editor.commands.insertText({ text: ' ' })
  }

  private handleQueryChange = (event: Event) => {
    const detail = (event as CustomEvent<string>).detail
    this.dispatchEvent(new CustomEvent('queryChange', { detail }))
  }

  private handleOpenChange = (event: Event) => {
    const detail = (event as CustomEvent<boolean>).detail
    this.dispatchEvent(new CustomEvent('openChange', { detail }))
  }

  override render() {
    const editor = this.editorConsumer.value as
      | Editor<Union<[MentionExtension, BasicExtension]>>
      | undefined
    if (!editor) {
      return nothing
    }

    return html`
      <prosekit-autocomplete-root
        .editor=${editor}
        .regex=${regex}
        @queryChange=${this.handleQueryChange}
        @openChange=${this.handleOpenChange}
      >
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
                ${this.loading ? 'Loading...' : 'No results'}
              </prosekit-autocomplete-empty>
              ${repeat(
                this.users,
                (user) => user.id,
                (user) => html`
                  <prosekit-autocomplete-item
                    class="relative flex items-center justify-between min-w-32 scroll-my-1 rounded-md px-3 py-1.5 text-sm box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800"
                    @select=${() =>
                      this.handleUserInsert(editor, user.id, user.name)}
                  >
                    <span class=${this.loading ? 'opacity-50' : nothing}>
                      ${user.name}
                    </span>
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

export function registerLitEditorUserMenu() {
  registerAutocompleteEmptyElement()
  registerAutocompleteItemElement()
  registerAutocompletePopupElement()
  registerAutocompletePositionerElement()
  registerAutocompleteRootElement()

  if (customElements.get('lit-editor-user-menu')) return
  customElements.define('lit-editor-user-menu', UserMenuElement)
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-editor-user-menu': UserMenuElement
  }
}
