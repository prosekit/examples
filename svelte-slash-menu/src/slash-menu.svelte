<script lang="ts">
import { AutocompleteItem } from 'prosekit/svelte/autocomplete-item'
import { AutocompletePopover } from 'prosekit/svelte/autocomplete-popover'
import { AutocompleteEmpty } from 'prosekit/svelte/autocomplete-empty'
import { AutocompleteList } from 'prosekit/svelte/autocomplete-list'
import { useEditor } from 'prosekit/svelte'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>()

const handleHeadingInsert = (level: number) => {
  $editor.commands.insertHeading({ level })
}

const handleHeadingConvert = (level: number) => {
  $editor.commands.setHeading({ level })
}
</script>

<AutocompletePopover
  editor={$editor}
  regex={/\/.*$/iu}
  class='relative block max-h-[400px] min-w-[120px] select-none overflow-auto whitespace-nowrap p-1 z-10 box-border rounded border border-solid border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-zinc-800'
>
  <AutocompleteList editor={$editor}>
    <AutocompleteEmpty class='relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none aria-selected:bg-gray-200/70 aria-selected:dark:bg-gray-700/70'>
      No Command match
    </AutocompleteEmpty>

    <AutocompleteItem
      class='relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none aria-selected:bg-gray-200/70 aria-selected:dark:bg-gray-700/70'
      onSelect={() => handleHeadingInsert(1)}
    >
      Insert Heading 1
    </AutocompleteItem>
    <AutocompleteItem
      class='relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none aria-selected:bg-gray-200/70 aria-selected:dark:bg-gray-700/70'
      onSelect={() => handleHeadingInsert(2)}
    >
      Insert Heading 2
    </AutocompleteItem>
    <AutocompleteItem
      class='relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none aria-selected:bg-gray-200/70 aria-selected:dark:bg-gray-700/70'
      onSelect={() => handleHeadingConvert(1)}
    >
      Turn into Heading 1
    </AutocompleteItem>
    <AutocompleteItem
      class='relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none aria-selected:bg-gray-200/70 aria-selected:dark:bg-gray-700/70'
      onSelect={() => handleHeadingConvert(2)}
    >
      Turn into Heading 2
    </AutocompleteItem>
  </AutocompleteList>
</AutocompletePopover>
