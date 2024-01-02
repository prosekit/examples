import { bundledLanguagesInfo } from 'shikiji'

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
    { class: 'relative box-border w-auto cursor-pointer select-none appearance-none rounded border-none bg-transparent px-2 py-1 text-xs outline-none transition focus:outline-none opacity-0 hover:opacity-80 [div[data-node-view-root]:hover_&]:opacity-50 [div[data-node-view-root]:hover_&]:hover:opacity-80' },
    createElement('option', { value: '' }, 'Plain Text'),
    ...bundledLanguagesInfo.map((info) => {
      return createElement('option', { value: info.id }, info.name)
    }),
  )

  select.value = language || ''
  select.addEventListener('change', (event) => {
    setLanguage((event.target as HTMLSelectElement).value)
  })

  return createElement('div', { class: 'relative left-2 top-3 h-0 select-none overflow-visible' }, select)
}
