<script setup lang="ts">
import { useEditor } from 'prosekit/vue'

import Button from './button.vue'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <div
    class="z-2 box-border border-gray-200 dark:border-gray-800 border-solid border-l-0 border-r-0 border-t-0 border-b flex flex-wrap gap-1 p-2 items-center"
  >
    <Button
      :pressed="false"
      :disabled="!editor.commands.undo.canExec()"
      @click="() => editor.commands.undo()"
    >
      <div class="i-lucide-undo-2 size-5 block" />
    </Button>

    <Button
      :pressed="false"
      :disabled="!editor.commands.redo.canExec()"
      @click="() => editor.commands.redo()"
    >
      <div class="i-lucide-redo-2 size-5 block" />
    </Button>

    <Button
      :pressed="editor.marks.bold.isActive()"
      :disabled="!editor.commands.toggleBold.canExec()"
      @click="() => editor.commands.toggleBold()"
    >
      <div class="i-lucide-bold size-5 block" />
    </Button>

    <Button
      :pressed="editor.marks.italic.isActive()"
      :disabled="!editor.commands.toggleItalic.canExec()"
      @click="() => editor.commands.toggleItalic()"
    >
      <div class="i-lucide-italic size-5 block" />
    </Button>

    <Button
      :pressed="editor.nodes.heading.isActive({ level: 1 })"
      :disabled="!editor.commands.toggleHeading.canExec({ level: 1 })"
      @click="() => editor.commands.toggleHeading({ level: 1 })"
    >
      <div class="i-lucide-heading-1 size-5 block" />
    </Button>

    <Button
      :pressed="editor.nodes.heading.isActive({ level: 2 })"
      :disabled="!editor.commands.toggleHeading.canExec({ level: 2 })"
      @click="() => editor.commands.toggleHeading({ level: 2 })"
    >
      <div class="i-lucide-heading-2 size-5 block" />
    </Button>

    <Button
      :pressed="editor.nodes.heading.isActive({ level: 3 })"
      :disabled="!editor.commands.toggleHeading.canExec({ level: 3 })"
      @click="() => editor.commands.toggleHeading({ level: 3 })"
    >
      <div class="i-lucide-heading-3 size-5 block" />
    </Button>
  </div>
</template>
