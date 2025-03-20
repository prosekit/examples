import { AutocompleteEmpty } from 'prosekit/solid/autocomplete'

export default function SlashMenuEmpty() {
  return (
    <AutocompleteEmpty class="relative flex items-center justify-between min-w-[8rem] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-gray-100 dark:data-[focused]:bg-gray-800">
      <span>No results</span>
    </AutocompleteEmpty>
  )
}
