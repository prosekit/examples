<script setup lang="ts">
import {
  AutocompleteEmpty,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopover,
} from 'prosekit/vue/autocomplete'

import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'
import { users } from './user-data'

const editor = useEditor<EditorExtension>()

const handleUserInsert = (id: number, username: string) => {
  editor.value.commands.insertMention({
    id: id.toString(),
    value: '@' + username,
    kind: 'user',
  })
  editor.value.commands.insertText({ text: ' ' })
}
</script>

<template>
  <AutocompletePopover :regex="/@\w*$/" class='relative block max-h-[400px] min-w-[120px] select-none overflow-auto whitespace-nowrap p-1 z-10 box-border rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-neutral-900 shadow-lg'>
    <AutocompleteList>
      <AutocompleteEmpty class='relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-zinc-100 dark:data-[focused]:bg-zinc-800'>
        No results
      </AutocompleteEmpty>
      <AutocompleteItem
        v-for="user in users"
        :key="user.id"
        class='relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-zinc-100 dark:data-[focused]:bg-zinc-800'
        @select="() => handleUserInsert(user.id, user.name)"
      >
        {{ user.name }}
      </AutocompleteItem>
    </AutocompleteList>
  </AutocompletePopover>
</template>
