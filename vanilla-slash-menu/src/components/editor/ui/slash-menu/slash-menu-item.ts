import 'prosekit/web/autocomplete'

import type {
  AutocompleteItemElement,
  AutocompleteItemEvents,
} from 'prosekit/web/autocomplete'

export function renderSlashMenuItem(options: {
  label: string
  kbd?: string
  onSelect: (event: AutocompleteItemEvents['select']) => void
}) {
  const item = document.createElement(
    'prosekit-autocomplete-item',
  ) as AutocompleteItemElement
  item.className =
    'relative flex items-center justify-between min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-hidden data-focused:bg-gray-100 dark:data-focused:bg-gray-800'
  item.addEventListener('select', (event) =>
    options.onSelect(event as AutocompleteItemEvents['select']),
  )

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
