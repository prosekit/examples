<script setup lang="ts">
import { useEditor } from 'prosekit/vue'

import { Button } from '../../ui/button'

import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <div class="z-2 box-border border-gray-200 dark:border-gray-800 border-solid border-l-0 border-r-0 border-t-0 border-b flex flex-wrap gap-1 p-2 items-center">
    <Button
      :pressed="false"
      :disabled="!editor.commands.insertHardBreak.canExec()"
      @click="editor.commands.insertHardBreak()"
    >
      Insert Hard Break
    </Button>
  </div>
</template>
