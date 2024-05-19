<script setup lang="ts">
import {
  AutocompleteEmpty,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopover,
} from 'prosekit/vue/autocomplete'

import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'
import { useUserQuery } from './use-user-query'
import { ref } from 'vue'

const editor = useEditor<EditorExtension>()

const handleUserInsert = (id: number, username: string) => {
  editor.value.commands.insertMention({
    id: id.toString(),
    value: '@' + username,
    kind: 'user',
  })
  editor.value.commands.insertText({ text: ' ' })
}

const query = ref('')
const open = ref(false)
const handleQueryChange = (value: string) => (query.value = value)
const handleOpenChange = (value: boolean) => (open.value = value)
const { users, loading } = useUserQuery(query, open)
</script>

<template>
  <AutocompletePopover
    :regex="/@\w*$/"
    @query-change="handleQueryChange"
    @open-change="handleOpenChange"
    class="relative block max-h-[400px] min-w-[120px] select-none overflow-auto whitespace-nowrap p-1 z-10 box-border rounded-lg border border-border bg-background shadow-lg"
  >
    <AutocompleteList :filter="null">
      <AutocompleteEmpty class="relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-secondary">
        No results
      </AutocompleteEmpty>
      <AutocompleteItem
        v-for="user in users"
        :key="user.id"
        @select="handleUserInsert(user.id, user.name)"
        class="relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-secondary"
      >
        <span :class="loading && 'opacity-50'">
          {{ user.name }}
        </span>
      </AutocompleteItem>
    </AutocompleteList>
  </AutocompletePopover>
</template>
