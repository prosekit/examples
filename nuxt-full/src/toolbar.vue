<script setup lang="ts">
import { useEditor } from 'prosekit/vue'

import Button from './button.vue'
import type { EditorExtension } from './extension'
import ImageUploadPopover from './image-upload-popover.vue'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <div
    class="z-2 box-border border-zinc-200 dark:border-zinc-800 border-solid border-l-0 border-r-0 border-t-0 border-b flex flex-wrap gap-1 p-2 items-center"
  >
    <Button
      :pressed="false"
      :disabled="!editor.commands.undo.canExec()"
      tooltip="Undo"
      @click="() => editor.commands.undo()"
    >
      <div class="i-lucide-undo-2 h-5 w-5" />
    </Button>

    <Button
      :pressed="false"
      :disabled="!editor.commands.redo.canExec()"
      tooltip="Redo"
      @click="() => editor.commands.redo()"
    >
      <div class="i-lucide-redo-2 h-5 w-5" />
    </Button>

    <Button
      :pressed="editor.marks.bold.isActive()"
      :disabled="!editor.commands.toggleBold.canExec()"
      tooltip="Bold"
      @click="() => editor.commands.toggleBold()"
    >
      <div class="i-lucide-bold h-5 w-5" />
    </Button>

    <Button
      :pressed="editor.marks.italic.isActive()"
      :disabled="!editor.commands.toggleItalic.canExec()"
      tooltip="Italic"
      @click="() => editor.commands.toggleItalic()"
    >
      <div class="i-lucide-italic h-5 w-5" />
    </Button>

    <Button
      :pressed="editor.marks.underline.isActive()"
      :disabled="!editor.commands.toggleUnderline.canExec()"
      tooltip="Underline"
      @click="() => editor.commands.toggleUnderline()"
    >
      <div class="i-lucide-underline h-5 w-5" />
    </Button>

    <Button
      :pressed="editor.marks.strike.isActive()"
      :disabled="!editor.commands.toggleStrike.canExec()"
      tooltip="Strike"
      @click="() => editor.commands.toggleStrike()"
    >
      <div class="i-lucide-strikethrough h-5 w-5" />
    </Button>

    <Button
      :pressed="editor.marks.code.isActive()"
      :disabled="!editor.commands.toggleCode.canExec()"
      tooltip="Code"
      @click="() => editor.commands.toggleCode()"
    >
      <div class="i-lucide-code h-5 w-5" />
    </Button>

    <Button
      :pressed="editor.nodes.heading.isActive({ level: 1 })"
      :disabled="!editor.commands.toggleHeading.canExec({ level: 1 })"
      tooltip="Heading 1"
      @click="() => editor.commands.toggleHeading({ level: 1 })"
    >
      <div class="i-lucide-heading-1 h-5 w-5" />
    </Button>

    <Button
      :pressed="editor.nodes.heading.isActive({ level: 2 })"
      :disabled="!editor.commands.toggleHeading.canExec({ level: 2 })"
      tooltip="Heading 2"
      @click="() => editor.commands.toggleHeading({ level: 2 })"
    >
      <div class="i-lucide-heading-2 h-5 w-5" />
    </Button>

    <Button
      :pressed="editor.nodes.heading.isActive({ level: 3 })"
      :disabled="!editor.commands.toggleHeading.canExec({ level: 3 })"
      tooltip="Heading 3"
      @click="() => editor.commands.toggleHeading({ level: 3 })"
    >
      <div class="i-lucide-heading-3 h-5 w-5" />
    </Button>

    <Button
      :pressed="editor.nodes.list.isActive({ kind: 'bullet' })"
      :disabled="!editor.commands.toggleList.canExec({ kind: 'bullet' })"
      tooltip="Bullet List"
      @click="() => editor.commands.toggleList({ kind: 'bullet' })"
    >
      <div class="i-lucide-list h-5 w-5" />
    </Button>

    <Button
      :pressed="editor.nodes.list.isActive({ kind: 'ordered' })"
      :disabled="!editor.commands.toggleList.canExec({ kind: 'ordered' })"
      tooltip="Ordered List"
      @click="() => editor.commands.toggleList({ kind: 'ordered' })"
    >
      <div class="i-lucide-list-ordered h-5 w-5" />
    </Button>

    <Button
      :pressed="editor.nodes.list.isActive({ kind: 'task' })"
      :disabled="!editor.commands.toggleList.canExec({ kind: 'task' })"
      tooltip="Task List"
      @click="() => editor.commands.toggleList({ kind: 'task' })"
    >
      <div class="i-lucide-list-checks h-5 w-5" />
    </Button>

    <Button
      :pressed="editor.nodes.list.isActive({ kind: 'toggle' })"
      :disabled="!editor.commands.toggleList.canExec({ kind: 'toggle' })"
      tooltip="Toggle List"
      @click="() => editor.commands.toggleList({ kind: 'toggle' })"
    >
      <div class="i-lucide-list-collapse h-5 w-5" />
    </Button>

    <Button
      :pressed="false"
      :disabled="!editor.commands.indentList.canExec()"
      tooltip="Increase indentation"
      @click="() => editor.commands.indentList()"
    >
      <div class="i-lucide-indent-increase h-5 w-5" />
    </Button>

    <Button
      :pressed="false"
      :disabled="!editor.commands.dedentList.canExec()"
      tooltip="Decrease indentation"
      @click="() => editor.commands.dedentList()"
    >
      <div class="i-lucide-indent-decrease h-5 w-5" />
    </Button>

    <ImageUploadPopover
      :disabled="!editor.commands.insertImage.canExec()"
      tooltip="Insert Image"
    >
      <div class="i-lucide-image h-5 w-5" />
    </ImageUploadPopover>
  </div>
</template>
