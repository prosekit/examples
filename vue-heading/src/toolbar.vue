<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'
import Toggle from './toggle.vue'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <div class='z-2 sticky top-0 box-border flex flex-wrap gap-1 bg-gray-100 p-2 dark:bg-zinc-900'>
    <Toggle
      :pressed="editor.nodes.heading.isActive({ level: 1 })"
      :onClick="() => editor.commands.toggleHeading({ level: 1 })"
    >
      H1
    </Toggle>

    <Toggle
      :pressed="editor.nodes.heading.isActive({ level: 2 })"
      :onClick="() => editor.commands.toggleHeading({ level: 2 })"
    >
      H2
    </Toggle>

    <Toggle
      :pressed="editor.nodes.heading.isActive({ level: 3 })"
      :onClick="() => editor.commands.toggleHeading({ level: 3 })"
    >
      H3
    </Toggle>
  </div>
</template>
