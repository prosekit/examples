<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import Button from './button.vue'
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
  <div class='z-2 box-border border-zinc-200 dark:border-zinc-800 border-solid border-l-0 border-r-0 border-t-0 border-b flex flex-wrap gap-1 p-2 items-center'>
    <Button
      :pressed="isTextAlignActive(editor, 'left')"
      :disabled="!editor.commands.setTextAlign.canApply('left')"
      :onClick="() => editor.commands.setTextAlign('left')"
    >
      Left
    </Button>

    <Button
      :pressed="isTextAlignActive(editor, 'center')"
      :disabled="!editor.commands.setTextAlign.canApply('center')"
      :onClick="() => editor.commands.setTextAlign('center')"
    >
      Center
    </Button>

    <Button
      :pressed="isTextAlignActive(editor, 'right')"
      :disabled="!editor.commands.setTextAlign.canApply('right')"
      :onClick="() => editor.commands.setTextAlign('right')"
    >
      Right
    </Button>

    <Button
      :pressed="isTextAlignActive(editor, 'justify')"
      :disabled="!editor.commands.setTextAlign.canApply('justify')"
      :onClick="() => editor.commands.setTextAlign('justify')"
    >
      Justify
    </Button>
  </div>
</template>
