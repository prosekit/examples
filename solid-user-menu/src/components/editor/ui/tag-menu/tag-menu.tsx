import type { BasicExtension } from 'prosekit/basic'
import type { Union } from 'prosekit/core'
import type { MentionExtension } from 'prosekit/extensions/mention'
import { useEditor } from 'prosekit/solid'
import {
  AutocompleteEmpty,
  AutocompleteItem,
  AutocompletePopup,
  AutocompletePositioner,
  AutocompleteRoot,
} from 'prosekit/solid/autocomplete'
import { For, type JSX } from 'solid-js'

const regex = /#[\da-z]*$/i

export default function TagMenu(props: {
  tags: { id: number; label: string }[]
}): JSX.Element {
  const editor = useEditor<Union<[MentionExtension, BasicExtension]>>()

  const handleTagInsert = (id: number, label: string) => {
    editor().commands.insertMention({
      id: id.toString(),
      value: '#' + label,
      kind: 'tag',
    })
    editor().commands.insertText({ text: ' ' })
  }

  return (
    <AutocompleteRoot regex={regex}>
      <AutocompletePositioner class="block overflow-visible bg-transparent w-min h-min z-50 motion-safe:ease-out motion-safe:transition-transform motion-safe:duration-100">
        <AutocompletePopup class="box-border data-[state=closed]:motion-safe:duration-150 motion-safe:transition-discrete motion-safe:transition-all data-[state=closed]:opacity-0 starting:opacity-0 opacity-100 data-[state=closed]:scale-95 starting:scale-95 scale-100 motion-safe:duration-40 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg flex flex-col relative max-h-100 min-w-60 select-none overflow-auto whitespace-nowrap p-1">
          <AutocompleteEmpty class="relative flex items-center justify-between min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800">
            No results
          </AutocompleteEmpty>

          <For each={props.tags}>
            {(tag) => (
              <AutocompleteItem
                class="relative flex items-center justify-between min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800"
                onSelect={() => handleTagInsert(tag.id, tag.label)}
              >
                #{tag.label}
              </AutocompleteItem>
            )}
          </For>
        </AutocompletePopup>
      </AutocompletePositioner>
    </AutocompleteRoot>
  )
}
