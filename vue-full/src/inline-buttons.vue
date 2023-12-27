<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'
import Toggle from './toggle.vue'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <Toggle
    :pressed="editor.marks.bold.isActive()"
    :disabled="!editor.commands.toggleBold.canApply()"
    :onClick="() => editor.commands.toggleBold()"
  >
    <div class="i-ci-bold h-5 w-5"></div>
  </Toggle>

  <Toggle
    :pressed="editor.marks.italic.isActive()"
    :disabled="!editor.commands.toggleItalic.canApply()"
    :onClick="() => editor.commands.toggleItalic()"
  >
    <div class="i-ci-italic h-5 w-5"></div>
  </Toggle>

  <Toggle
    :pressed="editor.marks.underline.isActive()"
    :disabled="!editor.commands.toggleUnderline.canApply()"
    :onClick="() => editor.commands.toggleUnderline()"
  >
    <div class="i-ci-underline h-5 w-5"></div>
  </Toggle>

  <Toggle
    :pressed="editor.marks.strike.isActive()"
    :disabled="!editor.commands.toggleStrike.canApply()"
    :onClick="() => editor.commands.toggleStrike()"
  >
    <div class="i-ci-strikethrough h-5 w-5"></div>
  </Toggle>

  <Toggle
    :pressed="editor.marks.code.isActive()"
    :disabled="!editor.commands.toggleCode.canApply()"
    :onClick="() => editor.commands.toggleCode()"
  >
    <div class="i-ci-code h-5 w-5"></div>
  </Toggle>
</template>
