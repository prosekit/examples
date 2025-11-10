<script setup lang="ts">
import type { BasicExtension } from 'prosekit/basic'
import type { Union } from 'prosekit/core'
import type { MentionExtension } from 'prosekit/extensions/mention'
import { useEditor } from 'prosekit/vue'
import {
  AutocompleteEmpty,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopover,
} from 'prosekit/vue/autocomplete'

const props = defineProps<{ tags: { id: number; label: string }[] }>()

const editor = useEditor<Union<[MentionExtension, BasicExtension]>>()

function handleTagInsert(id: number, label: string) {
  editor.value.commands.insertMention({
    id: id.toString(),
    value: '#' + label,
    kind: 'tag',
  })
  editor.value.commands.insertText({ text: ' ' })
}
</script>

<template>
  <AutocompletePopover
    :regex="/#[\da-z]*$/i"
    class="relative block max-h-100 min-w-60 select-none overflow-auto whitespace-nowrap p-1 z-10 box-border rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg [&:not([data-state])]:hidden"
  >
    <AutocompleteList>
      <AutocompleteEmpty
        class="relative flex items-center justify-between min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-hidden data-focused:bg-gray-100 dark:data-focused:bg-gray-800"
      >
        No results
      </AutocompleteEmpty>

      <AutocompleteItem
        v-for="tag in props.tags"
        :key="tag.id"
        class="relative flex items-center justify-between min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-hidden data-focused:bg-gray-100 dark:data-focused:bg-gray-800"
        @select="() => handleTagInsert(tag.id, tag.label)"
      >
        #{{ tag.label }}
      </AutocompleteItem>
    </AutocompleteList>
  </AutocompletePopover>
</template>
