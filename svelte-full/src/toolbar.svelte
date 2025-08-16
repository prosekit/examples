<script lang="ts">
import { useEditor } from 'prosekit/svelte'
import Button from './button.svelte'
import type { EditorExtension } from './extension'
import ImageUploadPopover from './image-upload-popover.svelte'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<div class="z-2 box-border border-gray-200 dark:border-gray-800 border-solid border-l-0 border-r-0 border-t-0 border-b flex flex-wrap gap-1 p-2 items-center">
  <Button
    pressed={false}
    disabled={!$editor.commands.undo.canExec()}
    onClick={() => $editor.commands.undo()}
    tooltip="Undo"
  >
    <div class="i-lucide-undo-2 size-5 block"></div>
  </Button>

  <Button
    pressed={false}
    disabled={!$editor.commands.redo.canExec()}
    onClick={() => $editor.commands.redo()}
    tooltip="Redo"
  >
    <div class="i-lucide-redo-2 size-5 block"></div>
  </Button>

  <Button
    pressed={$editor.marks.bold.isActive()}
    disabled={!$editor.commands.toggleBold.canExec()}
    onClick={() => $editor.commands.toggleBold()}
    tooltip="Bold"
  >
    <div class="i-lucide-bold size-5 block"></div>
  </Button>

  <Button
    pressed={$editor.marks.italic.isActive()}
    disabled={!$editor.commands.toggleItalic.canExec()}
    onClick={() => $editor.commands.toggleItalic()}
    tooltip="Italic"
  >
    <div class="i-lucide-italic size-5 block"></div>
  </Button>

  <Button
    pressed={$editor.marks.underline.isActive()}
    disabled={!$editor.commands.toggleUnderline.canExec()}
    onClick={() => $editor.commands.toggleUnderline()}
    tooltip="Underline"
  >
    <div class="i-lucide-underline size-5 block"></div>
  </Button>

  <Button
    pressed={$editor.marks.strike.isActive()}
    disabled={!$editor.commands.toggleStrike.canExec()}
    onClick={() => $editor.commands.toggleStrike()}
    tooltip="Strike"
  >
    <div class="i-lucide-strikethrough size-5 block"></div>
  </Button>

  <Button
    pressed={$editor.marks.code.isActive()}
    disabled={!$editor.commands.toggleCode.canExec()}
    onClick={() => $editor.commands.toggleCode()}
    tooltip="Code"
  >
    <div class="i-lucide-code size-5 block"></div>
  </Button>

  <Button
    pressed={$editor.nodes.heading.isActive({ level: 1 })}
    disabled={!$editor.commands.toggleHeading.canExec({ level: 1 })}
    onClick={() => $editor.commands.toggleHeading({ level: 1 })}
    tooltip="Heading 1"
  >
    <div class="i-lucide-heading-1 size-5 block"></div>
  </Button>

  <Button
    pressed={$editor.nodes.heading.isActive({ level: 2 })}
    disabled={!$editor.commands.toggleHeading.canExec({ level: 2 })}
    onClick={() => $editor.commands.toggleHeading({ level: 2 })}
    tooltip="Heading 2"
  >
    <div class="i-lucide-heading-2 size-5 block"></div>
  </Button>

  <Button
    pressed={$editor.nodes.heading.isActive({ level: 3 })}
    disabled={!$editor.commands.toggleHeading.canExec({ level: 3 })}
    onClick={() => $editor.commands.toggleHeading({ level: 3 })}
    tooltip="Heading 3"
  >
    <div class="i-lucide-heading-3 size-5 block"></div>
  </Button>

  <Button
    pressed={$editor.nodes.horizontalRule.isActive()}
    disabled={!$editor.commands.insertHorizontalRule.canExec()}
    onClick={() => $editor.commands.insertHorizontalRule()}
    tooltip="Divider"
  >
    <div class="i-lucide-minus size-5 block"></div>
  </Button>

  <Button
    pressed={$editor.nodes.list.isActive({ kind: 'bullet' })}
    disabled={!$editor.commands.toggleList.canExec({ kind: 'bullet' })}
    onClick={() => $editor.commands.toggleList({ kind: 'bullet' })}
    tooltip="Bullet List"
  >
    <div class="i-lucide-list size-5 block"></div>
  </Button>

  <Button
    pressed={$editor.nodes.list.isActive({ kind: 'ordered' })}
    disabled={!$editor.commands.toggleList.canExec({ kind: 'ordered' })}
    onClick={() => $editor.commands.toggleList({ kind: 'ordered' })}
    tooltip="Ordered List"
  >
    <div class="i-lucide-list-ordered size-5 block"></div>
  </Button>

  <Button
    pressed={$editor.nodes.list.isActive({ kind: 'task' })}
    disabled={!$editor.commands.toggleList.canExec({ kind: 'task' })}
    onClick={() => $editor.commands.toggleList({ kind: 'task' })}
    tooltip="Task List"
  >
    <div class="i-lucide-list-checks size-5 block"></div>
  </Button>

  <Button
    pressed={$editor.nodes.list.isActive({ kind: 'toggle' })}
    disabled={!$editor.commands.toggleList.canExec({ kind: 'toggle' })}
    onClick={() => $editor.commands.toggleList({ kind: 'toggle' })}
    tooltip="Toggle List"
  >
    <div class="i-lucide-list-collapse size-5 block"></div>
  </Button>

  <Button
    pressed={false}
    disabled={!$editor.commands.indentList.canExec()}
    onClick={() => $editor.commands.indentList()}
    tooltip="Increase indentation"
  >
    <div class="i-lucide-indent-increase size-5 block"></div>
  </Button>

  <Button
    pressed={false}
    disabled={!$editor.commands.dedentList.canExec()}
    onClick={() => $editor.commands.dedentList()}
    tooltip="Decrease indentation"
  >
    <div class="i-lucide-indent-decrease size-5 block"></div>
  </Button>

  <ImageUploadPopover
    disabled={!$editor.commands.insertImage.canExec()}
    tooltip="Insert Image"
  >
    <div class="i-lucide-image size-5 block"></div>
  </ImageUploadPopover>
</div>
