import { useEditor } from 'prosekit/solid'
import { AutocompleteEmpty } from 'prosekit/solid/autocomplete-empty'
import { AutocompleteItem } from 'prosekit/solid/autocomplete-item'
import { AutocompleteList } from 'prosekit/solid/autocomplete-list'
import { AutocompletePopover } from 'prosekit/solid/autocomplete-popover'

import type { EditorExtension } from './extension'

export default function SlashMenu() {
  const editor = useEditor<EditorExtension>()

  const handleHeadingInsert = (level: number) => {
    editor().commands.insertHeading({ level })
  }

  const handleHeadingConvert = (level: number) => {
    editor().commands.setHeading({ level })
  }

  return (
    <AutocompletePopover
      editor={editor()}
      regex={/\/.*$/iu}
      class='relative block max-h-[400px] min-w-[120px] select-none overflow-auto whitespace-nowrap p-1 z-10 box-border rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-neutral-900 shadow-lg'
    >
      <AutocompleteList editor={editor()}>
        <AutocompleteEmpty class='relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none aria-selected:bg-zinc-100 dark:aria-selected:bg-zinc-800'>
          No Command match
        </AutocompleteEmpty>

        <AutocompleteItem
          class='relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none aria-selected:bg-zinc-100 dark:aria-selected:bg-zinc-800'
          onSelect={() => handleHeadingInsert(1)}
        >
          Insert Heading 1
        </AutocompleteItem>
        <AutocompleteItem
          class='relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none aria-selected:bg-zinc-100 dark:aria-selected:bg-zinc-800'
          onSelect={() => handleHeadingInsert(2)}
        >
          Insert Heading 2
        </AutocompleteItem>
        <AutocompleteItem
          class='relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none aria-selected:bg-zinc-100 dark:aria-selected:bg-zinc-800'
          onSelect={() => handleHeadingConvert(1)}
        >
          Turn into Heading 1
        </AutocompleteItem>
        <AutocompleteItem
          class='relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none aria-selected:bg-zinc-100 dark:aria-selected:bg-zinc-800'
          onSelect={() => handleHeadingConvert(2)}
        >
          Turn into Heading 2
        </AutocompleteItem>
      </AutocompleteList>
    </AutocompletePopover>
  )
}
