import { AutocompleteItem } from 'prosekit/solid/autocomplete'
import {
  Show,
  type JSX,
} from 'solid-js'

export default function SlashMenuItem(props: {
  label: string
  kbd?: string
  onSelect: () => void
}): JSX.Element {
  return (
    <AutocompleteItem onSelect={props.onSelect} class="relative flex items-center justify-between min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-hidden data-focused:bg-gray-100 dark:data-focused:bg-gray-800">
      <span>{props.label}</span>
      <Show when={props.kbd}>
        <kbd class="text-xs font-mono text-gray-400 dark:text-gray-500">{props.kbd}</kbd>
      </Show>
    </AutocompleteItem>
  )
}
