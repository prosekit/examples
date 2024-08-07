<script lang="ts">
import {
  AutocompleteItem,
  AutocompletePopover,
  AutocompleteEmpty,
  AutocompleteList,
} from 'prosekit/svelte/autocomplete'
import { useEditor } from 'prosekit/svelte'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>()

const isBlockEmpty = () => {
  let selection = $editor.view.state.selection
  return selection.empty && selection.$from.parent.content.size === 0
}

const handleSelectHeading = (level: number) => {
  if (isBlockEmpty()) {
    $editor.commands.setHeading({ level })
  } else {
    $editor.commands.insertHeading({ level })
  }
}

const handleSelectList = (kind: 'task' | 'bullet' | 'ordered' | 'toggle') => {
  if (isBlockEmpty()) {
    $editor.commands.wrapInList({ kind })
  } else {
    $editor.commands.insertList({ kind })
  }
}
</script>

<AutocompletePopover regex={/\/.*$/iu} class='relative block max-h-[400px] min-w-[120px] select-none overflow-auto whitespace-nowrap p-1 z-10 box-border rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-neutral-900 shadow-lg [&:not([data-state])]:hidden'>
  <AutocompleteList>
    <AutocompleteEmpty class='relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-zinc-100 dark:data-[focused]:bg-zinc-800'>
      No results
    </AutocompleteEmpty>

    <AutocompleteItem
      class='relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-zinc-100 dark:data-[focused]:bg-zinc-800'
      onSelect={() => handleSelectHeading(1)}
    >
      Heading 1
    </AutocompleteItem>
    <AutocompleteItem
      class='relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-zinc-100 dark:data-[focused]:bg-zinc-800'
      onSelect={() => handleSelectHeading(2)}
    >
      Heading 2
    </AutocompleteItem>

    <AutocompleteItem
      class='relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-zinc-100 dark:data-[focused]:bg-zinc-800'
      onSelect={() => handleSelectList('task')}
    >
      Task list
    </AutocompleteItem>

    <AutocompleteItem
      class='relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-zinc-100 dark:data-[focused]:bg-zinc-800'
      onSelect={() => handleSelectList('bullet')}
    >
      Bullet list
    </AutocompleteItem>

    <AutocompleteItem
      class='relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-zinc-100 dark:data-[focused]:bg-zinc-800'
      onSelect={() => handleSelectList('ordered')}
    >
      Ordered list
    </AutocompleteItem>

    <AutocompleteItem
      class='relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-zinc-100 dark:data-[focused]:bg-zinc-800'
      onSelect={() => handleSelectList('toggle')}
    >
      Toggle list
    </AutocompleteItem>
  </AutocompleteList>
</AutocompletePopover>
