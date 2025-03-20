<script setup lang="ts">
import { AutocompleteItem } from 'prosekit/vue/autocomplete'

defineProps<{
  label: string
  kbd?: string
  onSelect: () => void
}>()
</script>

<template>
  <AutocompleteItem
    class="relative flex items-center justify-between min-w-[8rem] scroll-my-1 rounded px-3 py-1.5 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-gray-100 dark:data-[focused]:bg-gray-800"
    @select="onSelect"
  >
    <span>{{ label }}</span>
    <kbd v-if="kbd" class="text-xs font-mono text-gray-400 dark:text-gray-500">
      {{ kbd }}
    </kbd>
  </AutocompleteItem>
</template>
