import { shikiBundledLanguagesInfo } from 'prosekit/extensions/code-block'

import { createElement } from './create-element'

export function createLanguageSelector({
  language,
  setLanguage,
}: {
  language?: string
  setLanguage: (language: string) => void
}) {
  const select = createElement(
    'select',
    {
      class:
        'outline-unset focus:outline-unset relative box-border w-auto cursor-pointer select-none appearance-none rounded border-none bg-transparent px-2 py-1 text-xs transition text-white opacity-0 hover:opacity-80 [div[data-node-view-root]:hover_&]:opacity-50 [div[data-node-view-root]:hover_&]:hover:opacity-80',
    },
    createElement('option', { value: '' }, 'Plain Text'),
    ...shikiBundledLanguagesInfo.map((info) => {
      return createElement('option', { value: info.id }, info.name)
    }),
  )

  select.value = language || ''
  select.addEventListener('change', (event) => {
    setLanguage((event.target as HTMLSelectElement).value)
  })

  return createElement(
    'div',
    {
      class: 'relative left-2 top-3 h-0 select-none overflow-visible',
      contenteditable: 'false',
    },
    select,
  )
}
