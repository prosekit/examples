<script setup lang="ts">
import { useEditor } from 'prosekit/vue'

import Button from './button.vue'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <div
    class="z-2 box-border border-zinc-200 dark:border-zinc-800 border-solid border-l-0 border-r-0 border-t-0 border-b flex flex-wrap gap-1 p-2 items-center"
  >
    <Button
      :pressed="false"
      :disabled="!editor.commands.undo.canApply()"
      @click="() => editor.commands.undo()"
    >
      <div class="i-lucide-undo-2 h-5 w-5" />
    </Button>

    <Button
      :pressed="false"
      :disabled="!editor.commands.redo.canApply()"
      @click="() => editor.commands.redo()"
    >
      <div class="i-lucide-redo-2 h-5 w-5" />
    </Button>

    <Button
      :pressed="editor.marks.bold.isActive()"
      :disabled="!editor.commands.toggleBold.canApply()"
      @click="() => editor.commands.toggleBold()"
    >
      <div class="i-lucide-bold h-5 w-5" />
    </Button>

    <Button
      :pressed="editor.marks.italic.isActive()"
      :disabled="!editor.commands.toggleItalic.canApply()"
      @click="() => editor.commands.toggleItalic()"
    >
      <div class="i-lucide-italic h-5 w-5" />
    </Button>

    <Button
      :pressed="editor.nodes.heading.isActive({ level: 1 })"
      :disabled="!editor.commands.toggleHeading.canApply({ level: 1 })"
      @click="() => editor.commands.toggleHeading({ level: 1 })"
    >
      <div class="i-lucide-heading-1 h-5 w-5" />
    </Button>

    <Button
      :pressed="editor.nodes.heading.isActive({ level: 2 })"
      :disabled="!editor.commands.toggleHeading.canApply({ level: 2 })"
      @click="() => editor.commands.toggleHeading({ level: 2 })"
    >
      <div class="i-lucide-heading-2 h-5 w-5" />
    </Button>

    <Button
      :pressed="editor.nodes.heading.isActive({ level: 3 })"
      :disabled="!editor.commands.toggleHeading.canApply({ level: 3 })"
      @click="() => editor.commands.toggleHeading({ level: 3 })"
    >
      <div class="i-lucide-heading-3 h-5 w-5" />
    </Button>
  </div>
</template>
