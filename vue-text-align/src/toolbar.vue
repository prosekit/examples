<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import Toggle from './toggle.vue'
import type { Editor } from 'prosekit/core'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })

const isTextAlignActive = (editor: Editor<EditorExtension>, value: string) => {
  return Object.values(editor.nodes).some((node) => {
    return node.isActive({ textAlign: value })
  })
}
</script>

<template>
  <div class='z-2 sticky top-0 box-border flex flex-wrap gap-1 p-2 items-center bg-white dark:bg-neutral-900 border-zinc-200 dark:border-zinc-800 border-solid border-l-0 border-r-0 border-t-0 border-b'>
    <Toggle
      :pressed="isTextAlignActive(editor, 'left')"
      :disabled="!editor.commands.setTextAlign.canApply('left')"
      :onClick="() => editor.commands.setTextAlign('left')"
    >
      Left
    </Toggle>

    <Toggle
      :pressed="isTextAlignActive(editor, 'center')"
      :disabled="!editor.commands.setTextAlign.canApply('center')"
      :onClick="() => editor.commands.setTextAlign('center')"
    >
      Center
    </Toggle>

    <Toggle
      :pressed="isTextAlignActive(editor, 'right')"
      :disabled="!editor.commands.setTextAlign.canApply('right')"
      :onClick="() => editor.commands.setTextAlign('right')"
    >
      Right
    </Toggle>

    <Toggle
      :pressed="isTextAlignActive(editor, 'justify')"
      :disabled="!editor.commands.setTextAlign.canApply('justify')"
      :onClick="() => editor.commands.setTextAlign('justify')"
    >
      Justify
    </Toggle>
  </div>
</template>
