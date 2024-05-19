<script setup lang="ts">
import {
  AutocompleteEmpty,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopover,
} from 'prosekit/vue/autocomplete'

import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'
import { tags } from './tag-data'

const editor = useEditor<EditorExtension>()

const handleTagInsert = (id: number, label: string) => {
  editor.value.commands.insertMention({
    id: id.toString(),
    value: '#' + label,
    kind: 'tag',
  })
  editor.value.commands.insertText({ text: ' ' })
}
</script>

<template>
  <AutocompletePopover :regex="/#[\da-z]*$/i" class="relative block max-h-[400px] min-w-[120px] select-none overflow-auto whitespace-nowrap p-1 z-10 box-border rounded-lg border border-border bg-background shadow-lg">
    <AutocompleteList>
      <AutocompleteEmpty class="relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-secondary">
        No results
      </AutocompleteEmpty>
      <AutocompleteItem
        v-for="tag in tags"
        :key="tag.id"
        class="relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-secondary"
        @select="() => handleTagInsert(tag.id, tag.label)"
      >
        {{ tag.label }}
      </AutocompleteItem>
    </AutocompleteList>
  </AutocompletePopover>
</template>
