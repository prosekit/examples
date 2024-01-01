import { defineNodeView } from 'prosekit/core'
import { bundledLanguagesInfo } from 'shikiji'

import { createElement } from './create-element'
import { getId } from './get-id'

const languages: Array<[id: string, name: string]> = bundledLanguagesInfo.map(
  (info) => [info.id, info.name],
)

export function defineCodeBlockView() {
  return defineNodeView({
    name: 'codeBlock',
    constructor: (node, view, getPos) => {
      const type = node.type

      const listId = `code-block-${getId()}`

      const input = createElement('input', {
        class: 'absolute m-2 box-border cursor-pointer rounded-md border-none bg-transparent px-2 py-0.5 text-xs text-gray-400 outline-none transition hover:bg-gray-500/30 hover:text-gray-800 opacity-0 [div[data-node-view-root]:hover_&]:opacity-100',
        type: 'text',
        list: listId,
        placeholder: 'Language...',
      })
      input.addEventListener('change', () => {
        const language = input.value

        const pos = getPos()
        if (pos == null) {
          return
        }

        const tr = view.state.tr.setNodeAttribute(pos, 'language', language)
        view.dispatch(tr)
      })

      const code = createElement('code', {})

      const dom = createElement(
        'div',
        {},
        createElement(
          'div',
          { class: 'relative top-2 box-border flex h-0 w-full overflow-visible' },
          input,
          createElement(
            'datalist',
            { id: listId },
            ...languages.map(([languageId, languageName]) => {
              return createElement(
                'option',
                { value: languageId },
                languageName,
              )
            }),
          ),
        ),
        createElement('pre', {}, code),
      )

      return {
        dom: dom,
        contentDOM: code,
        update: (node) => {
          if (node.type !== type) {
            return false
          }
          code.textContent = node.textContent
          return true
        },
        ignoreMutation: () => {
          return true
        },
      }
    },
  })
}
