import 'prosekit/web/autocomplete'

import type { AutocompleteItemElement } from 'prosekit/web/autocomplete'

export function renderSlashMenuItem(options: {
  label: string
  kbd?: string
  onSelect: () => void
}) {
  const item = document.createElement(
    'prosekit-autocomplete-item',
  ) as AutocompleteItemElement
  item.className =
    'relative flex items-center justify-between min-w-32 scroll-my-1 rounded-md px-3 py-1.5 text-sm box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800'
  item.addEventListener('select', () => options.onSelect())

  const span = document.createElement('span')
  span.textContent = options.label
  item.append(span)

  if (options.kbd) {
    const kbd = document.createElement('kbd')
    kbd.className = 'text-xs font-mono text-gray-400 dark:text-gray-500'
    kbd.textContent = options.kbd
    item.append(kbd)
  }

  return item
}
