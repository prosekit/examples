<script setup lang="ts">
import { AutocompleteEmpty } from 'prosekit/vue/autocomplete-empty'
import { AutocompleteItem } from 'prosekit/vue/autocomplete-item'
import { AutocompleteList } from 'prosekit/vue/autocomplete-list'
import { AutocompletePopover } from 'prosekit/vue/autocomplete-popover'

import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'
import { tags } from './tag-data'

const editor = useEditor<EditorExtension>().value

const handleTagInsert = (id: number, label: string) => {
  editor.commands.insertMention({
    id: id.toString(),
    value: '#' + label,
    kind: 'tag',
  })
  editor.commands.insertText({ text: ' ' })
}
</script>

<template>
  <AutocompletePopover
    :editor="editor"
    :regex="/#[\da-z]*$/i"
    class='relative block max-h-[400px] min-w-[120px] select-none overflow-auto whitespace-nowrap p-1 z-10 box-border rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-neutral-900 shadow-lg'
  >
    <AutocompleteList :editor="editor">
      <AutocompleteEmpty class='relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none aria-selected:bg-zinc-100 dark:aria-selected:bg-zinc-800'>
        No Tag match
      </AutocompleteEmpty>
      <AutocompleteItem
        v-for="tag in tags"
        :key="tag.id"
        class='relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none aria-selected:bg-zinc-100 dark:aria-selected:bg-zinc-800'
        @select="() => handleTagInsert(tag.id, tag.label)"
      >
        {{ tag.label }}
      </AutocompleteItem>
    </AutocompleteList>
  </AutocompletePopover>
</template>
