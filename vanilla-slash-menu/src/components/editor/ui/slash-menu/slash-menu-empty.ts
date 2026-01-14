import 'prosekit/web/autocomplete'

import type { AutocompleteEmptyElement } from 'prosekit/web/autocomplete'

export function renderSlashMenuEmpty() {
  const empty = document.createElement(
    'prosekit-autocomplete-empty',
  ) as AutocompleteEmptyElement
  empty.className =
    'relative flex items-center justify-between min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-hidden data-focused:bg-gray-100 dark:data-focused:bg-gray-800'

  const span = document.createElement('span')
  span.textContent = 'No results'
  empty.append(span)

  return empty
}
