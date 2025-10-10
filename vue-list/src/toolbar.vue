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
      tooltip="Bullet"
      @click="() => editor.commands.toggleList({ kind: 'bullet' })"
    >
      <div class="i-lucide-list size-5 block" />
    </Button>

    <Button
      :pressed="editor.nodes.list.isActive({ kind: 'ordered' })"
      :disabled="!editor.commands.toggleList.canExec({ kind: 'ordered' })"
      tooltip="Ordered"
      @click="() => editor.commands.toggleList({ kind: 'ordered' })"
    >
      <div class="i-lucide-list-ordered size-5 block" />
    </Button>

    <Button
      :pressed="editor.nodes.list.isActive({ kind: 'task' })"
      :disabled="!editor.commands.toggleList.canExec({ kind: 'task' })"
      tooltip="Task"
      @click="() => editor.commands.toggleList({ kind: 'task' })"
    >
      <div class="i-lucide-list-checks size-5 block" />
    </Button>

    <Button
      :pressed="editor.nodes.list.isActive({ kind: 'toggle' })"
      :disabled="!editor.commands.toggleList.canExec({ kind: 'toggle' })"
      tooltip="Toggle"
      @click="() => editor.commands.toggleList({ kind: 'toggle' })"
    >
      <div class="i-lucide-list-collapse size-5 block" />
    </Button>
  </div>
</template>
