<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'
import Toggle from './toggle.vue'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <div class='z-2 sticky top-0 box-border flex flex-wrap gap-1 bg-gray-100 p-2 dark:bg-zinc-900 items-center'>
    <Toggle
      :pressed="editor.nodes.codeBlock.isActive()"
      :disabled="!editor.commands.setCodeBlock.canApply()"
      :onClick="() => editor.commands.setCodeBlock()"
    >
      <div className='i-lucide-square-code h-5 w-5' />
    </Toggle>
  </div>
</template>
