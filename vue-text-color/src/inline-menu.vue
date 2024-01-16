<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import { InlinePopover } from 'prosekit/vue/inline-popover'
import InlineButtons from './inline-buttons.vue'
import { effect, ref } from 'vue'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>()
const customColor = ref('')
const open = ref(false)
const handleOpenChange = (value: boolean) => {
  open.value = value
  if (!open.value) {
    customColor.value = ''
  }
}

effect(() => {
  const color = customColor.value
  if (color) {
    editor.value.commands.addTextColor({ color })
  }
})
</script>

<template>
  <InlinePopover
    :editor="editor"
    :open="open"
    :onOpenChange="handleOpenChange"
    class='relative block max-h-[400px] min-w-[120px] space-x-1 overflow-auto whitespace-nowrap rounded p-1 z-10 box-border rounded border border-solid border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-zinc-800'
  >
    <InlineButtons v-model="customColor" />
  </InlinePopover>
</template>
