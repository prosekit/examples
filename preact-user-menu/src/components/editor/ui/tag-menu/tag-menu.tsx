import type { BasicExtension } from 'prosekit/basic'
import type { Union } from 'prosekit/core'
import type { MentionExtension } from 'prosekit/extensions/mention'
import { useEditor } from 'prosekit/preact'
import {
  AutocompleteEmpty,
  AutocompleteItem,
  AutocompletePopup,
  AutocompletePositioner,
  AutocompleteRoot,
} from 'prosekit/preact/autocomplete'

const regex = /#[\da-z]*$/i

export default function TagMenu(props: {
  tags: { id: number; label: string }[]
}) {
  const editor = useEditor<Union<[MentionExtension, BasicExtension]>>()

  const handleTagInsert = (id: number, label: string) => {
    editor.commands.insertMention({
      id: id.toString(),
      value: '#' + label,
      kind: 'tag',
    })
    editor.commands.insertText({ text: ' ' })
  }

  return (
    <AutocompleteRoot regex={regex}>
      <AutocompletePositioner className="block overflow-visible w-min h-min z-50 ease-out transition-transform duration-100 motion-reduce:transition-none">
        <AutocompletePopup className="box-border origin-(--transform-origin) transition transition-discrete motion-reduce:transition-none data-[state=closed]:duration-150 data-[state=closed]:opacity-0 starting:opacity-0 data-[state=closed]:scale-95 starting:scale-95 duration-40 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg overscroll-none flex flex-col relative max-h-100 min-w-60 select-none overflow-auto whitespace-nowrap p-1">
          <AutocompleteEmpty className="relative flex items-center justify-between min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800">
            No results
          </AutocompleteEmpty>

          {props.tags.map((tag) => (
            <AutocompleteItem
              key={tag.id}
              className="relative flex items-center justify-between min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800"
              onSelect={() => handleTagInsert(tag.id, tag.label)}
            >
              #{tag.label}
            </AutocompleteItem>
          ))}
        </AutocompletePopup>
      </AutocompletePositioner>
    </AutocompleteRoot>
  )
}
