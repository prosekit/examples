<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <div class='z-2 sticky top-0 box-border flex flex-wrap gap-1 p-2 items-center bg-white dark:bg-neutral-900 border-zinc-200 dark:border-zinc-800 border-solid border-l-0 border-r-0 border-t-0 border-b'>
    <Toggle
      :pressed="editor.marks.strike.isActive()"
      :onClick="() => editor.commands.toggleStrike()"
    >
      Underline
    </Toggle>
  </div>
</template>
