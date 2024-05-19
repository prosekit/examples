<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import type { EditorExtension } from './extension'
import ImageUploadPopover from './image-upload-popover.vue'
import Toggle from './toggle.vue'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <div class="z-2 sticky top-0 box-border flex flex-wrap gap-1 p-2 items-center bg-white dark:bg-neutral-900 border-zinc-200 dark:border-zinc-800 border-solid border-l-0 border-r-0 border-t-0 border-b">
    <Toggle
      :pressed="false"
      :disabled="!editor.commands.undo.canApply()"
      :onClick="() => editor.commands.undo()"
      tooltip="Undo"
    >
      <div class="i-lucide-undo-2 h-5 w-5" />
    </Toggle>

    <Toggle
      :pressed="false"
      :disabled="!editor.commands.redo.canApply()"
      :onClick="() => editor.commands.redo()"
      tooltip="Redo"
    >
      <div class="i-lucide-redo-2 h-5 w-5" />
    </Toggle>

    <Toggle
      :pressed="editor.marks.bold.isActive()"
      :disabled="!editor.commands.toggleBold.canApply()"
      :onClick="() => editor.commands.toggleBold()"
      tooltip="Bold"
    >
      <div class="i-lucide-bold h-5 w-5"></div>
    </Toggle>

    <Toggle
      :pressed="editor.marks.italic.isActive()"
      :disabled="!editor.commands.toggleItalic.canApply()"
      :onClick="() => editor.commands.toggleItalic()"
      tooltip="Italic"
    >
      <div class="i-lucide-italic h-5 w-5"></div>
    </Toggle>

    <Toggle
      :pressed="editor.marks.underline.isActive()"
      :disabled="!editor.commands.toggleUnderline.canApply()"
      :onClick="() => editor.commands.toggleUnderline()"
      tooltip="Underline"
    >
      <div class="i-lucide-underline h-5 w-5"></div>
    </Toggle>

    <Toggle
      :pressed="editor.marks.strike.isActive()"
      :disabled="!editor.commands.toggleStrike.canApply()"
      :onClick="() => editor.commands.toggleStrike()"
      tooltip="Strike"
    >
      <div class="i-lucide-strikethrough h-5 w-5"></div>
    </Toggle>

    <Toggle
      :pressed="editor.marks.code.isActive()"
      :disabled="!editor.commands.toggleCode.canApply()"
      :onClick="() => editor.commands.toggleCode()"
      tooltip="Code"
    >
      <div class="i-lucide-code h-5 w-5"></div>
    </Toggle>

    <Toggle
      :pressed="editor.nodes.heading.isActive({ level: 1 })"
      :disabled="!editor.commands.toggleHeading.canApply({ level: 1 })"
      :onClick="() => editor.commands.toggleHeading({ level: 1 })"
      tooltip="Heading 1"
    >
      <div class="i-lucide-heading-1 h-5 w-5"></div>
    </Toggle>

    <Toggle
      :pressed="editor.nodes.heading.isActive({ level: 2 })"
      :disabled="!editor.commands.toggleHeading.canApply({ level: 2 })"
      :onClick="() => editor.commands.toggleHeading({ level: 2 })"
      tooltip="Heading 2"
    >
      <div class="i-lucide-heading-2 h-5 w-5"></div>
    </Toggle>

    <Toggle
      :pressed="editor.nodes.heading.isActive({ level: 3 })"
      :disabled="!editor.commands.toggleHeading.canApply({ level: 3 })"
      :onClick="() => editor.commands.toggleHeading({ level: 3 })"
      tooltip="Heading 3"
    >
      <div class="i-lucide-heading-3 h-5 w-5"></div>
    </Toggle>

    <Toggle
      :pressed="editor.nodes.list.isActive({ kind: 'bullet' })"
      :disabled="!editor.commands.toggleList.canApply({ kind: 'bullet' })"
      :onClick="() => editor.commands.toggleList({ kind: 'bullet' })"
      tooltip="Bullet List"
    >
      <div class="i-lucide-list h-5 w-5"></div>
    </Toggle>

    <Toggle
      :pressed="editor.nodes.list.isActive({ kind: 'ordered' })"
      :disabled="!editor.commands.toggleList.canApply({ kind: 'ordered' })"
      :onClick="() => editor.commands.toggleList({ kind: 'ordered' })"
      tooltip="Ordered List"
    >
      <div class="i-lucide-list-ordered h-5 w-5"></div>
    </Toggle>

    <Toggle
      :pressed="editor.nodes.list.isActive({ kind: 'task' })"
      :disabled="!editor.commands.toggleList.canApply({ kind: 'task' })"
      :onClick="() => editor.commands.toggleList({ kind: 'task' })"
      tooltip="Task List"
    >
      <div class="i-lucide-list-checks h-5 w-5"></div>
    </Toggle>

    <Toggle
      :pressed="editor.nodes.list.isActive({ kind: 'toggle' })"
      :disabled="!editor.commands.toggleList.canApply({ kind: 'toggle' })"
      :onClick="() => editor.commands.toggleList({ kind: 'toggle' })"
      tooltip="Toggle List"
    >
      <div class="i-lucide-list-collapse h-5 w-5"></div>
    </Toggle>

    <Toggle
      :pressed="false"
      :disabled="!editor.commands.indentList.canApply()"
      :onClick="() => editor.commands.indentList()"
      tooltip="Increase indentation"
    >
      <div class="i-lucide-indent-increase h-5 w-5"></div>
    </Toggle>

    <Toggle
      :pressed="false"
      :disabled="!editor.commands.dedentList.canApply()"
      :onClick="() => editor.commands.dedentList()"
      tooltip="Decrease indentation"
    >
      <div class="i-lucide-indent-decrease h-5 w-5"></div>
    </Toggle>

    <ImageUploadPopover
      :disabled="!editor.commands.insertImage.canApply()"
      tooltip="Insert Image"
    >
      <div class="i-lucide-image h-5 w-5"></div>
    </ImageUploadPopover>
  </div>
</template>
