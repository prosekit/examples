<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'
import Toggle from './toggle.vue'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <div class='z-2 sticky top-0 box-border flex flex-wrap gap-1 bg-gray-100 p-2 dark:bg-zinc-900 items-center'>
    <Toggle
      :pressed="editor.nodes.list.isActive({ kind: 'bullet' })"
      :disabled="!editor.commands.toggleList.canApply({ kind: 'bullet' })"
      :onClick="() => editor.commands.toggleList({ kind: 'bullet' })"
    >
      <div class='i-lucide-list h-5 w-5'></div>
    </Toggle>

    <Toggle
      :pressed="editor.nodes.list.isActive({ kind: 'ordered' })"
      :disabled="!editor.commands.toggleList.canApply({ kind: 'ordered' })"
      :onClick="() => editor.commands.toggleList({ kind: 'ordered' })"
    >
      <div class='i-lucide-list-ordered h-5 w-5'></div>
    </Toggle>

    <Toggle
      :pressed="editor.nodes.list.isActive({ kind: 'task' })"
      :disabled="!editor.commands.toggleList.canApply({ kind: 'task' })"
      :onClick="() => editor.commands.toggleList({ kind: 'task' })"
    >
      <div class='i-lucide-list-checks h-5 w-5'></div>
    </Toggle>

    <Toggle
      :pressed="editor.nodes.list.isActive({ kind: 'toggle' })"
      :disabled="!editor.commands.toggleList.canApply({ kind: 'toggle' })"
      :onClick="() => editor.commands.toggleList({ kind: 'toggle' })"
    >
      <div class='i-lucide-list-collapse h-5 w-5'></div>
    </Toggle>
  </div>
</template>
