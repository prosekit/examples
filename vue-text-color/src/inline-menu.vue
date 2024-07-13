<script setup lang="ts">
import { useEditor, useKeymap } from 'prosekit/vue'
import { InlinePopover } from 'prosekit/vue/inline-popover'
import { ref } from 'vue'
import Button from './button.vue'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
const colors = [
  { name: 'default', value: '' },
  { name: 'red', value: '#ef4444' },
  { name: 'orange', value: '#f97316' },
  { name: 'yellow', value: '#eab308' },
  { name: 'green', value: '#22c55e' },
  { name: 'blue', value: '#3b82f6' },
  { name: 'indigo', value: '#6366f1' },
  { name: 'violet', value: '#a855f7' },
]

const hasTextColor = (color: string) => {
  return editor.value.marks.textColor.isActive({ color })
}

const toggleTextColor = (color: string) => {
  if (!color || hasTextColor(color)) {
    editor.value.commands.removeTextColor()
  } else {
    editor.value.commands.setTextColor({ color })
  }
}

const open = ref(false)
const onOpenChange = (value: boolean) => {
  open.value = value
}

const onEscape = () => {
  if (open.value) {
    open.value = false
    return true
  }
  return false
}

useKeymap({ Escape: onEscape })
</script>

<template>
  <InlinePopover
    class="z-10 box-border border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-neutral-900 shadow-lg relative flex min-w-[120px] space-x-1 overflow-auto whitespace-nowrap rounded-md p-1"
    :open="open"
    @openChange="onOpenChange"
  >
    <Button
      v-for="color in colors"
      :key="color.name"
      :pressed="hasTextColor(color.value)"
      @click="() => toggleTextColor(color.value)"
      :tooltip="color.name"
    >
      <span :style="{ color: color.value }">A</span>
    </Button>
  </InlinePopover>
</template>
