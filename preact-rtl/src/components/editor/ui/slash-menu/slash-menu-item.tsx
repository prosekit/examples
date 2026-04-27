import { AutocompleteItem } from 'prosekit/preact/autocomplete'

export default function SlashMenuItem(props: {
  label: string
  kbd?: string
  onSelect: () => void
}) {
  return (
    <AutocompleteItem
      onSelect={props.onSelect}
      className="relative flex items-center justify-between min-w-32 scroll-my-1 rounded-md px-3 py-1.5 text-sm box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800"
    >
      <span>{props.label}</span>
      {props.kbd && (
        <kbd className="text-xs font-mono text-gray-400 dark:text-gray-500">
          {props.kbd}
        </kbd>
      )}
    </AutocompleteItem>
  )
}
