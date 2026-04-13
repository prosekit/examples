<script setup lang="ts">
import type { BasicExtension } from 'prosekit/basic'
import { canUseRegexLookbehind, type Union } from 'prosekit/core'
import type { MentionExtension } from 'prosekit/extensions/mention'
import { useEditor } from 'prosekit/vue'
import {
  AutocompleteEmpty,
  AutocompleteItem,
  AutocompletePopup,
  AutocompletePositioner,
  AutocompleteRoot,
} from 'prosekit/vue/autocomplete'

const props = defineProps<{
  users: { id: number; name: string }[]
  loading?: boolean
  onQueryChange?: (query: string) => void
  onOpenChange?: (open: boolean) => void
}>()

const editor = useEditor<Union<[MentionExtension, BasicExtension]>>()

function handleUserInsert(id: number, username: string) {
  editor.value.commands.insertMention({
    id: id.toString(),
    value: '@' + username,
    kind: 'user',
  })
  editor.value.commands.insertText({ text: ' ' })
}

// Match inputs like "@", "@foo", "@foo bar" etc. Do not match "@ foo".
const regex = canUseRegexLookbehind() ? /(?<!\S)@(\S.*)?$/u : /@(\S.*)?$/u
</script>

<template>
  <AutocompleteRoot
    :regex="regex"
    @query-change="(event) => props.onQueryChange?.(event.detail)"
    @open-change="(event) => props.onOpenChange?.(event.detail)"
  >
    <AutocompletePositioner
      class="block overflow-visible w-min h-min z-50 ease-out transition-transform duration-100 motion-reduce:transition-none"
    >
      <AutocompletePopup
        class="box-border origin-(--transform-origin) transition transition-discrete motion-reduce:transition-none data-[state=closed]:duration-150 data-[state=closed]:opacity-0 starting:opacity-0 data-[state=closed]:scale-95 starting:scale-95 duration-40 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg overscroll-none flex flex-col relative max-h-100 min-w-60 select-none overflow-auto whitespace-nowrap p-1"
      >
        <AutocompleteEmpty
          class="relative flex items-center justify-between min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800"
        >
          {{ props.loading ? 'Loading...' : 'No results' }}
        </AutocompleteEmpty>

        <AutocompleteItem
          v-for="user in props.users"
          :key="user.id"
          class="relative flex items-center justify-between min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800"
          @select="() => handleUserInsert(user.id, user.name)"
        >
          <span v-if="props.loading" class="opacity-50">
            {{ user.name }}
          </span>
          <span v-else>
            {{ user.name }}
          </span>
        </AutocompleteItem>
      </AutocompletePopup>
    </AutocompletePositioner>
  </AutocompleteRoot>
</template>
