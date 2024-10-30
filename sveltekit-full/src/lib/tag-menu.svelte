<script lang="ts">
import {
  AutocompleteEmpty,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopover,
} from 'prosekit/svelte/autocomplete'

import { useEditor } from 'prosekit/svelte'
import type { EditorExtension } from './extension'
import { tags } from './tag-data'

const editor = useEditor<EditorExtension>()

const handleTagInsert = (id: number, label: string) => {
  $editor.commands.insertMention({
    id: id.toString(),
    value: '#' + label,
    kind: 'tag',
  })
  $editor.commands.insertText({ text: ' ' })
}
</script>

<AutocompletePopover regex={/#[\da-z]*$/i} class='relative block max-h-[25rem] min-w-[8rem] select-none overflow-auto whitespace-nowrap p-1 z-10 box-border rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-neutral-900 shadow-lg [&:not([data-state])]:hidden'>
  <AutocompleteList>
    <AutocompleteEmpty class='relative block min-w-[8rem] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-zinc-100 dark:data-[focused]:bg-zinc-800'
      >No results</AutocompleteEmpty
    >
    {#each tags as tag}
      <AutocompleteItem
        class='relative block min-w-[8rem] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-zinc-100 dark:data-[focused]:bg-zinc-800'
        onSelect={() => handleTagInsert(tag.id, tag.label)}
      >
        {tag.label}
      </AutocompleteItem>
    {/each}
  </AutocompleteList>
</AutocompletePopover>
