<script setup lang="ts">
import type { Editor, NodeAction } from 'prosekit/core'
import { useEditor } from 'prosekit/vue'

import Button from './button.vue'
import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })

function isTextAlignActive(editor: Editor<EditorExtension>, value: string) {
  return Object.values(editor.nodes).some((node: NodeAction<any>) => {
    return node.isActive({ textAlign: value })
  })
}
</script>

<template>
  <div
    class="z-2 box-border border-zinc-200 dark:border-zinc-800 border-solid border-l-0 border-r-0 border-t-0 border-b flex flex-wrap gap-1 p-2 items-center"
  >
    <Button
      :pressed="isTextAlignActive(editor, 'left')"
      :disabled="!editor.commands.setTextAlign.canExec('left')"
      @click="() => editor.commands.setTextAlign('left')"
    >
      Left
    </Button>

    <Button
      :pressed="isTextAlignActive(editor, 'center')"
      :disabled="!editor.commands.setTextAlign.canExec('center')"
      @click="() => editor.commands.setTextAlign('center')"
    >
      Center
    </Button>

    <Button
      :pressed="isTextAlignActive(editor, 'right')"
      :disabled="!editor.commands.setTextAlign.canExec('right')"
      @click="() => editor.commands.setTextAlign('right')"
    >
      Right
    </Button>

    <Button
      :pressed="isTextAlignActive(editor, 'justify')"
      :disabled="!editor.commands.setTextAlign.canExec('justify')"
      @click="() => editor.commands.setTextAlign('justify')"
    >
      Justify
    </Button>
  </div>
</template>
