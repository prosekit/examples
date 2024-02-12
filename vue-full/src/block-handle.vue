<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import { BlockPopover } from 'prosekit/vue/block-popover'
import { DragHandle } from 'prosekit/vue/drag-handle'

const editor = useEditor()
</script>

<template>
  <BlockPopover :editor="editor" class='flex items-center box-border justify-center my-[0.5em] h-[1.5em] w-[1.2em] hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-zinc-500/50 dark:text-zinc-500/50 transition-colors'>
    <DragHandle :editor="editor">
      <div class='i-lucide-grip-vertical h-5 w-5'></div>
    </DragHandle>
  </BlockPopover>
</template>
