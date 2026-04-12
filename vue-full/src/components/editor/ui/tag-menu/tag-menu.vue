<script setup lang="ts">
import type { BasicExtension } from 'prosekit/basic'
import type { Union } from 'prosekit/core'
import type { MentionExtension } from 'prosekit/extensions/mention'
import { useEditor } from 'prosekit/vue'
import {
  AutocompleteEmpty,
  AutocompleteItem,
  AutocompletePopup,
  AutocompletePositioner,
  AutocompleteRoot,
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

const regex = /#[\da-z]*$/i
</script>

<template>
  <AutocompleteRoot :regex="regex">
    <AutocompletePositioner
      class="block overflow-visible w-min h-min z-50 ease-out transition-transform duration-100 motion-reduce:transition-none"
    >
      <AutocompletePopup
        class="box-border origin-(--transform-origin) transition transition-discrete motion-reduce:transition-none data-[state=closed]:duration-150 data-[state=closed]:opacity-0 starting:opacity-0 data-[state=closed]:scale-95 starting:scale-95 duration-40 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg flex flex-col relative max-h-100 min-w-60 select-none overflow-auto whitespace-nowrap p-1"
      >
        <AutocompleteEmpty
          class="relative flex items-center justify-between min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800"
        >
          No results
        </AutocompleteEmpty>

        <AutocompleteItem
          v-for="tag in props.tags"
          :key="tag.id"
          class="relative flex items-center justify-between min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800"
          @select="() => handleTagInsert(tag.id, tag.label)"
        >
          #{{ tag.label }}
        </AutocompleteItem>
      </AutocompletePopup>
    </AutocompletePositioner>
  </AutocompleteRoot>
</template>
