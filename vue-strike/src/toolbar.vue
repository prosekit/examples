<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <div class='z-2 sticky top-0 box-border flex flex-wrap gap-1 bg-gray-100 p-2 dark:bg-zinc-900'>
    <Toggle
      :pressed="editor.marks.strike.isActive()"
      :onClick="() => editor.commands.toggleStrike()"
    >
      Underline
    </Toggle>
  </div>
</template>
