import { useEditor } from 'prosekit/react'
import {
  AutocompleteEmpty,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopover,
} from 'prosekit/react/autocomplete'

import type { EditorExtension } from './extension'

export default function SlashMenu() {
  const editor = useEditor<EditorExtension>()

  return (
    <AutocompletePopover
      regex={/\/.*$/iu}
      className="relative block max-h-[25rem] min-w-[8rem] select-none overflow-auto whitespace-nowrap p-1 z-10 box-border rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg [&:not([data-state])]:hidden"
    >
      <AutocompleteList>
        <AutocompleteEmpty className="relative block min-w-[8rem] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-gray-100 dark:data-[focused]:bg-gray-800">
          No results
        </AutocompleteEmpty>

        <AutocompleteItem
          className="relative block min-w-[8rem] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-gray-100 dark:data-[focused]:bg-gray-800"
          onSelect={() => editor.commands.setHeading({ level: 1 })}
        >
          Heading 1
        </AutocompleteItem>
        <AutocompleteItem
          className="relative block min-w-[8rem] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-gray-100 dark:data-[focused]:bg-gray-800"
          onSelect={() => editor.commands.setHeading({ level: 2 })}
        >
          Heading 2
        </AutocompleteItem>

        <AutocompleteItem
          className="relative block min-w-[8rem] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-gray-100 dark:data-[focused]:bg-gray-800"
          onSelect={() => editor.commands.wrapInList({ kind: 'task' })}
        >
          Task list
        </AutocompleteItem>

        <AutocompleteItem
          className="relative block min-w-[8rem] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-gray-100 dark:data-[focused]:bg-gray-800"
          onSelect={() => editor.commands.wrapInList({ kind: 'bullet' })}
        >
          Bullet list
        </AutocompleteItem>

        <AutocompleteItem
          className="relative block min-w-[8rem] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-gray-100 dark:data-[focused]:bg-gray-800"
          onSelect={() => editor.commands.wrapInList({ kind: 'ordered' })}
        >
          Ordered list
        </AutocompleteItem>

        <AutocompleteItem
          className="relative block min-w-[8rem] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-gray-100 dark:data-[focused]:bg-gray-800"
          onSelect={() => editor.commands.wrapInList({ kind: 'toggle' })}
        >
          Toggle list
        </AutocompleteItem>
      </AutocompleteList>
    </AutocompletePopover>
  )
}
