<script setup lang="ts">
import { useEditor } from 'prosekit/vue'

import Button from './button.vue'
import type { EditorExtension } from './extension'
import ImageUploadPopover from './image-upload-popover.vue'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <div
    class="z-2 box-border border-gray-200 dark:border-gray-800 border-solid border-l-0 border-r-0 border-t-0 border-b flex flex-wrap gap-1 p-2 items-center"
  >
    <Button
      :pressed="false"
      :disabled="!editor.commands.undo.canExec()"
      tooltip="Undo"
      @click="() => editor.commands.undo()"
    >
      <div class="i-lucide-undo-2 size-5 block" />
    </Button>

    <Button
      :pressed="false"
      :disabled="!editor.commands.redo.canExec()"
      tooltip="Redo"
      @click="() => editor.commands.redo()"
    >
      <div class="i-lucide-redo-2 size-5 block" />
    </Button>

    <Button
      :pressed="editor.marks.bold.isActive()"
      :disabled="!editor.commands.toggleBold.canExec()"
      tooltip="Bold"
      @click="() => editor.commands.toggleBold()"
    >
      <div class="i-lucide-bold size-5 block" />
    </Button>

    <Button
      :pressed="editor.marks.italic.isActive()"
      :disabled="!editor.commands.toggleItalic.canExec()"
      tooltip="Italic"
      @click="() => editor.commands.toggleItalic()"
    >
      <div class="i-lucide-italic size-5 block" />
    </Button>

    <Button
      :pressed="editor.marks.underline.isActive()"
      :disabled="!editor.commands.toggleUnderline.canExec()"
      tooltip="Underline"
      @click="() => editor.commands.toggleUnderline()"
    >
      <div class="i-lucide-underline size-5 block" />
    </Button>

    <Button
      :pressed="editor.marks.strike.isActive()"
      :disabled="!editor.commands.toggleStrike.canExec()"
      tooltip="Strike"
      @click="() => editor.commands.toggleStrike()"
    >
      <div class="i-lucide-strikethrough size-5 block" />
    </Button>

    <Button
      :pressed="editor.marks.code.isActive()"
      :disabled="!editor.commands.toggleCode.canExec()"
      tooltip="Code"
      @click="() => editor.commands.toggleCode()"
    >
      <div class="i-lucide-code size-5 block" />
    </Button>

    <Button
      :pressed="editor.nodes.codeBlock.isActive()"
      :disabled="
        !editor.commands.toggleCodeBlock.canExec({ language: 'javascript' })
      "
      tooltip="Code Block"
      @click="
        () =>
          editor.commands.toggleCodeBlock.canExec({ language: 'javascript' })
      "
    >
      <div class="i-lucide-square-code size-5 block" />
    </Button>

    <Button
      :pressed="editor.nodes.heading.isActive({ level: 1 })"
      :disabled="!editor.commands.toggleHeading.canExec({ level: 1 })"
      tooltip="Heading 1"
      @click="() => editor.commands.toggleHeading({ level: 1 })"
    >
      <div class="i-lucide-heading-1 size-5 block" />
    </Button>

    <Button
      :pressed="editor.nodes.heading.isActive({ level: 2 })"
      :disabled="!editor.commands.toggleHeading.canExec({ level: 2 })"
      tooltip="Heading 2"
      @click="() => editor.commands.toggleHeading({ level: 2 })"
    >
      <div class="i-lucide-heading-2 size-5 block" />
    </Button>

    <Button
      :pressed="editor.nodes.heading.isActive({ level: 3 })"
      :disabled="!editor.commands.toggleHeading.canExec({ level: 3 })"
      tooltip="Heading 3"
      @click="() => editor.commands.toggleHeading({ level: 3 })"
    >
      <div class="i-lucide-heading-3 size-5 block" />
    </Button>

    <Button
      :pressed="editor.nodes.horizontalRule.isActive()"
      :disabled="!editor.commands.insertHorizontalRule.canExec()"
      tooltip="Divider"
      @click="() => editor.commands.insertHorizontalRule()"
    >
      <div class="i-lucide-minus size-5 block"></div>
    </Button>

    <Button
      :pressed="editor.nodes.list.isActive({ kind: 'bullet' })"
      :disabled="!editor.commands.toggleList.canExec({ kind: 'bullet' })"
      tooltip="Bullet List"
      @click="() => editor.commands.toggleList({ kind: 'bullet' })"
    >
      <div class="i-lucide-list size-5 block" />
    </Button>

    <Button
      :pressed="editor.nodes.list.isActive({ kind: 'ordered' })"
      :disabled="!editor.commands.toggleList.canExec({ kind: 'ordered' })"
      tooltip="Ordered List"
      @click="() => editor.commands.toggleList({ kind: 'ordered' })"
    >
      <div class="i-lucide-list-ordered size-5 block" />
    </Button>

    <Button
      :pressed="editor.nodes.list.isActive({ kind: 'task' })"
      :disabled="!editor.commands.toggleList.canExec({ kind: 'task' })"
      tooltip="Task List"
      @click="() => editor.commands.toggleList({ kind: 'task' })"
    >
      <div class="i-lucide-list-checks size-5 block" />
    </Button>

    <Button
      :pressed="editor.nodes.list.isActive({ kind: 'toggle' })"
      :disabled="!editor.commands.toggleList.canExec({ kind: 'toggle' })"
      tooltip="Toggle List"
      @click="() => editor.commands.toggleList({ kind: 'toggle' })"
    >
      <div class="i-lucide-list-collapse size-5 block" />
    </Button>

    <Button
      :pressed="false"
      :disabled="!editor.commands.indentList.canExec()"
      tooltip="Increase indentation"
      @click="() => editor.commands.indentList()"
    >
      <div class="i-lucide-indent-increase size-5 block" />
    </Button>

    <Button
      :pressed="false"
      :disabled="!editor.commands.dedentList.canExec()"
      tooltip="Decrease indentation"
      @click="() => editor.commands.dedentList()"
    >
      <div class="i-lucide-indent-decrease size-5 block" />
    </Button>

    <ImageUploadPopover
      :disabled="!editor.commands.insertImage.canExec()"
      tooltip="Insert Image"
    >
      <div class="i-lucide-image size-5 block" />
    </ImageUploadPopover>
  </div>
</template>
