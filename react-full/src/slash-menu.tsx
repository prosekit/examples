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

  function isBlockEmpty() {
    const selection = editor.view.state.selection
    return selection.empty && selection.$from.parent.content.size === 0
  }

  function handleSelectHeading(level: number) {
    if (isBlockEmpty()) {
      editor.commands.setHeading({ level })
    } else {
      editor.commands.insertHeading({ level })
    }
  }

  function handleSelectList(kind: 'task' | 'bullet' | 'ordered' | 'toggle') {
    if (isBlockEmpty()) {
      editor.commands.wrapInList({ kind })
    } else {
      editor.commands.insertList({ kind })
    }
  }

  return (
    <AutocompletePopover
      regex={/\/.*$/iu}
      className="relative block max-h-[400px] min-w-[120px] select-none overflow-auto whitespace-nowrap p-1 z-10 box-border rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-neutral-900 shadow-lg [&:not([data-state])]:hidden"
    >
      <AutocompleteList>
        <AutocompleteEmpty className="relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-zinc-100 dark:data-[focused]:bg-zinc-800">
          No results
        </AutocompleteEmpty>

        <AutocompleteItem
          className="relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-zinc-100 dark:data-[focused]:bg-zinc-800"
          onSelect={() => handleSelectHeading(1)}
        >
          Heading 1
        </AutocompleteItem>
        <AutocompleteItem
          className="relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-zinc-100 dark:data-[focused]:bg-zinc-800"
          onSelect={() => handleSelectHeading(2)}
        >
          Heading 2
        </AutocompleteItem>

        <AutocompleteItem
          className="relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-zinc-100 dark:data-[focused]:bg-zinc-800"
          onSelect={() => handleSelectList('task')}
        >
          Task list
        </AutocompleteItem>

        <AutocompleteItem
          className="relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-zinc-100 dark:data-[focused]:bg-zinc-800"
          onSelect={() => handleSelectList('bullet')}
        >
          Bullet list
        </AutocompleteItem>

        <AutocompleteItem
          className="relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-zinc-100 dark:data-[focused]:bg-zinc-800"
          onSelect={() => handleSelectList('ordered')}
        >
          Ordered list
        </AutocompleteItem>

        <AutocompleteItem
          className="relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-zinc-100 dark:data-[focused]:bg-zinc-800"
          onSelect={() => handleSelectList('toggle')}
        >
          Toggle list
        </AutocompleteItem>
      </AutocompleteList>
    </AutocompletePopover>
  )
}
