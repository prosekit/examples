<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import { InlinePopover } from 'prosekit/vue/inline-popover'
import InlineButtons from './inline-buttons.vue'

const editor = useEditor()
</script>

<template>
  <InlinePopover class='relative block max-h-[400px] min-w-[120px] space-x-1 overflow-auto whitespace-nowrap rounded p-1 z-10 box-border rounded border border-solid border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-zinc-800' :editor="editor">
    <InlineButtons />
  </InlinePopover>
</template>
