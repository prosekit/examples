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
      :pressed="editor.nodes.list.isActive({ kind: 'bullet' })"
      :disabled="!editor.commands.toggleList.canExec({ kind: 'bullet' })"
      @click="() => editor.commands.toggleList({ kind: 'bullet' })"
    >
      <div class="i-lucide-list h-5 w-5" />
    </Button>

    <Button
      :pressed="editor.nodes.list.isActive({ kind: 'ordered' })"
      :disabled="!editor.commands.toggleList.canExec({ kind: 'ordered' })"
      @click="() => editor.commands.toggleList({ kind: 'ordered' })"
    >
      <div class="i-lucide-list-ordered h-5 w-5" />
    </Button>

    <Button
      :pressed="editor.nodes.list.isActive({ kind: 'task' })"
      :disabled="!editor.commands.toggleList.canExec({ kind: 'task' })"
      @click="() => editor.commands.toggleList({ kind: 'task' })"
    >
      <div class="i-lucide-list-checks h-5 w-5" />
    </Button>

    <Button
      :pressed="editor.nodes.list.isActive({ kind: 'toggle' })"
      :disabled="!editor.commands.toggleList.canExec({ kind: 'toggle' })"
      @click="() => editor.commands.toggleList({ kind: 'toggle' })"
    >
      <div class="i-lucide-list-collapse h-5 w-5" />
    </Button>
  </div>
</template>
