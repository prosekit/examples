<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import Button from './button.vue'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <div class='z-2 sticky top-0 box-border flex flex-wrap gap-1 p-2 items-center bg-white dark:bg-neutral-900 border-zinc-200 dark:border-zinc-800 border-solid border-l-0 border-r-0 border-t-0 border-b'>
    <Button
      :pressed="false"
      :disabled="!editor.commands.undo.canApply()"
      :onClick="() => editor.commands.undo()"
    >
      <div class='i-lucide-undo-2 h-5 w-5' />
    </Button>

    <Button
      :pressed="false"
      :disabled="!editor.commands.redo.canApply()"
      :onClick="() => editor.commands.redo()"
    >
      <div class='i-lucide-redo-2 h-5 w-5' />
    </Button>

    <Button
      :pressed="editor.marks.bold.isActive()"
      :disabled="!editor.commands.toggleBold.canApply()"
      :onClick="() => editor.commands.toggleBold()"
    >
      <div class='i-lucide-bold h-5 w-5'></div>
    </Button>

    <Button
      :pressed="editor.marks.italic.isActive()"
      :disabled="!editor.commands.toggleItalic.canApply()"
      :onClick="() => editor.commands.toggleItalic()"
    >
      <div class='i-lucide-italic h-5 w-5'></div>
    </Button>

    <Button
      :pressed="editor.nodes.heading.isActive({ level: 1 })"
      :disabled="!editor.commands.toggleHeading.canApply({ level: 1 })"
      :onClick="() => editor.commands.toggleHeading({ level: 1 })"
    >
      <div class='i-lucide-heading-1 h-5 w-5'></div>
    </Button>

    <Button
      :pressed="editor.nodes.heading.isActive({ level: 2 })"
      :disabled="!editor.commands.toggleHeading.canApply({ level: 2 })"
      :onClick="() => editor.commands.toggleHeading({ level: 2 })"
    >
      <div class='i-lucide-heading-2 h-5 w-5'></div>
    </Button>

    <Button
      :pressed="editor.nodes.heading.isActive({ level: 3 })"
      :disabled="!editor.commands.toggleHeading.canApply({ level: 3 })"
      :onClick="() => editor.commands.toggleHeading({ level: 3 })"
    >
      <div class='i-lucide-heading-3 h-5 w-5'></div>
    </Button>
  </div>
</template>
