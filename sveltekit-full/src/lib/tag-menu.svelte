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

<AutocompletePopover regex={/#[\da-z]*$/i} class="relative block max-h-100 min-w-60 select-none overflow-auto whitespace-nowrap p-1 z-10 box-border rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg [&:not([data-state])]:hidden">
  <AutocompleteList>
    <AutocompleteEmpty class="relative flex items-center justify-between min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-hidden data-[focused]:bg-gray-100 dark:data-[focused]:bg-gray-800">No results</AutocompleteEmpty>
    {#each tags as tag}
      <AutocompleteItem
        class="relative flex items-center justify-between min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-hidden data-[focused]:bg-gray-100 dark:data-[focused]:bg-gray-800"
        onSelect={() => handleTagInsert(tag.id, tag.label)}
      >
        {tag.label}
      </AutocompleteItem>
    {/each}
  </AutocompleteList>
</AutocompletePopover>
