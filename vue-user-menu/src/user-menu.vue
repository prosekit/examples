<script setup lang="ts">
import { AutocompleteEmpty } from 'prosekit/vue/autocomplete-empty'
import { AutocompleteItem } from 'prosekit/vue/autocomplete-item'
import { AutocompleteList } from 'prosekit/vue/autocomplete-list'
import { AutocompletePopover } from 'prosekit/vue/autocomplete-popover'

import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'
import { users } from './user-data'

const editor = useEditor<EditorExtension>().value

const handleUserInsert = (id: number, username: string) => {
  editor.commands.insertMention({
    id: id.toString(),
    value: '@' + username,
    kind: 'user',
  })
  editor.commands.insertText({ text: ' ' })
}
</script>

<template>
  <AutocompletePopover
    :editor="editor"
    :regex="/@\w*$/"
    class="relative block max-h-[400px] min-w-[120px] select-none overflow-auto whitespace-nowrap p-1 z-10 box-border rounded border border-solid border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-zinc-800"
  >
    <AutocompleteList :editor="editor">
      <AutocompleteEmpty
        class="relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none aria-selected:bg-gray-200/70 aria-selected:dark:bg-gray-700/70"
      >
        No User match
      </AutocompleteEmpty>
      <AutocompleteItem
        v-for="user in users"
        :key="user.id"
        class="relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none aria-selected:bg-gray-200/70 aria-selected:dark:bg-gray-700/70"
        @select="handleUserInsert(user.id, user.name)"
      >
        {{ user.name }}
      </AutocompleteItem>
    </AutocompleteList>
  </AutocompletePopover>
</template>
