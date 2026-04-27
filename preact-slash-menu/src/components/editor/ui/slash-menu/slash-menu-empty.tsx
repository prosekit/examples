import { AutocompleteEmpty } from 'prosekit/preact/autocomplete'

export default function SlashMenuEmpty() {
  return (
    <AutocompleteEmpty className="relative flex items-center justify-between min-w-32 scroll-my-1 rounded-md px-3 py-1.5 text-sm box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800">
      <span>No results</span>
    </AutocompleteEmpty>
  )
}
