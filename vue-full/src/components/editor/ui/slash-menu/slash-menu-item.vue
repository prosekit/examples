<script setup lang="ts">
import { AutocompleteItem } from 'prosekit/vue/autocomplete'

const props = defineProps<{
  label: string
  kbd?: string
  onSelect: () => void
}>()
</script>

<template>
  <AutocompleteItem
    class="relative flex items-center justify-between min-w-32 scroll-my-1 rounded-md px-3 py-1.5 text-sm box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800"
    @select="props.onSelect"
  >
    <span>{{ props.label }}</span>
    <kbd
      v-if="props.kbd"
      class="text-xs font-mono text-gray-400 dark:text-gray-500"
    >
      {{ props.kbd }}
    </kbd>
  </AutocompleteItem>
</template>
