import type { BasicExtension } from 'prosekit/basic'
import type { Editor } from 'prosekit/core'
import type { Uploader } from 'prosekit/extensions/file'
import { useEditorDerivedValue } from 'prosekit/solid'
import {
  Show,
  type JSX,
} from 'solid-js'

import { Button } from '../button'
import { ImageUploadPopover } from '../image-upload-popover'

function getToolbarItems(editor: Editor<BasicExtension>) {
  return {
    undo: editor.commands.undo
      ? {
        isActive: false,
        canExec: editor.commands.undo.canExec(),
        command: () => editor.commands.undo(),
      }
      : undefined,
    redo: editor.commands.redo
      ? {
        isActive: false,
        canExec: editor.commands.redo.canExec(),
        command: () => editor.commands.redo(),
      }
      : undefined,
    bold: editor.commands.toggleBold
      ? {
        isActive: editor.marks.bold.isActive(),
        canExec: editor.commands.toggleBold.canExec(),
        command: () => editor.commands.toggleBold(),
      }
      : undefined,
    italic: editor.commands.toggleItalic
      ? {
        isActive: editor.marks.italic.isActive(),
        canExec: editor.commands.toggleItalic.canExec(),
        command: () => editor.commands.toggleItalic(),
      }
      : undefined,
    underline: editor.commands.toggleUnderline
      ? {
        isActive: editor.marks.underline.isActive(),
        canExec: editor.commands.toggleUnderline.canExec(),
        command: () => editor.commands.toggleUnderline(),
      }
      : undefined,
    strike: editor.commands.toggleStrike
      ? {
        isActive: editor.marks.strike.isActive(),
        canExec: editor.commands.toggleStrike.canExec(),
        command: () => editor.commands.toggleStrike(),
      }
      : undefined,
    code: editor.commands.toggleCode
      ? {
        isActive: editor.marks.code.isActive(),
        canExec: editor.commands.toggleCode.canExec(),
        command: () => editor.commands.toggleCode(),
      }
      : undefined,
    codeBlock: editor.commands.insertCodeBlock
      ? {
        isActive: editor.nodes.codeBlock.isActive(),
        canExec: editor.commands.insertCodeBlock.canExec({ language: 'javascript' }),
        command: () => editor.commands.insertCodeBlock({ language: 'javascript' }),
      }
      : undefined,
    heading1: editor.commands.toggleHeading
      ? {
        isActive: editor.nodes.heading.isActive({ level: 1 }),
        canExec: editor.commands.toggleHeading.canExec({ level: 1 }),
        command: () => editor.commands.toggleHeading({ level: 1 }),
      }
      : undefined,
    heading2: editor.commands.toggleHeading
      ? {
        isActive: editor.nodes.heading.isActive({ level: 2 }),
        canExec: editor.commands.toggleHeading.canExec({ level: 2 }),
        command: () => editor.commands.toggleHeading({ level: 2 }),
      }
      : undefined,
    heading3: editor.commands.toggleHeading
      ? {
        isActive: editor.nodes.heading.isActive({ level: 3 }),
        canExec: editor.commands.toggleHeading.canExec({ level: 3 }),
        command: () => editor.commands.toggleHeading({ level: 3 }),
      }
      : undefined,
    horizontalRule: editor.commands.insertHorizontalRule
      ? {
        isActive: editor.nodes.horizontalRule.isActive(),
        canExec: editor.commands.insertHorizontalRule.canExec(),
        command: () => editor.commands.insertHorizontalRule(),
      }
      : undefined,
    blockquote: editor.commands.toggleBlockquote
      ? {
        isActive: editor.nodes.blockquote.isActive(),
        canExec: editor.commands.toggleBlockquote.canExec(),
        command: () => editor.commands.toggleBlockquote(),
      }
      : undefined,
    bulletList: editor.commands.toggleList
      ? {
        isActive: editor.nodes.list.isActive({ kind: 'bullet' }),
        canExec: editor.commands.toggleList.canExec({ kind: 'bullet' }),
        command: () => editor.commands.toggleList({ kind: 'bullet' }),
      }
      : undefined,
    orderedList: editor.commands.toggleList
      ? {
        isActive: editor.nodes.list.isActive({ kind: 'ordered' }),
        canExec: editor.commands.toggleList.canExec({ kind: 'ordered' }),
        command: () => editor.commands.toggleList({ kind: 'ordered' }),
      }
      : undefined,
    taskList: editor.commands.toggleList
      ? {
        isActive: editor.nodes.list.isActive({ kind: 'task' }),
        canExec: editor.commands.toggleList.canExec({ kind: 'task' }),
        command: () => editor.commands.toggleList({ kind: 'task' }),
      }
      : undefined,
    toggleList: editor.commands.toggleList
      ? {
        isActive: editor.nodes.list.isActive({ kind: 'toggle' }),
        canExec: editor.commands.toggleList.canExec({ kind: 'toggle' }),
        command: () => editor.commands.toggleList({ kind: 'toggle' }),
      }
      : undefined,
    indentList: editor.commands.indentList
      ? {
        isActive: false,
        canExec: editor.commands.indentList.canExec(),
        command: () => editor.commands.indentList(),
      }
      : undefined,
    dedentList: editor.commands.dedentList
      ? {
        isActive: false,
        canExec: editor.commands.dedentList.canExec(),
        command: () => editor.commands.dedentList(),
      }
      : undefined,
    insertImage: editor.commands.insertImage
      ? {
        isActive: false,
        canExec: editor.commands.insertImage.canExec(),
      }
      : undefined,
  }
}

export default function Toolbar(props: { uploader?: Uploader<string> }): JSX.Element {
  const items = useEditorDerivedValue(getToolbarItems)

  return (
    <div class="z-2 box-border border-gray-200 dark:border-gray-800 border-solid border-l-0 border-r-0 border-t-0 border-b flex flex-wrap gap-1 p-2 items-center">
      <Show when={items().undo}>
        {(item) => (
          <Button
            pressed={item().isActive}
            disabled={!item().canExec}
            onClick={item().command}
            tooltip="Undo"
          >
            <div class="i-lucide-undo-2 size-5 block" />
          </Button>
        )}
      </Show>
      <Show when={items().redo}>
        {(item) => (
          <Button
            pressed={item().isActive}
            disabled={!item().canExec}
            onClick={item().command}
            tooltip="Redo"
          >
            <div class="i-lucide-redo-2 size-5 block" />
          </Button>
        )}
      </Show>

      <Show when={items().bold}>
        {(item) => (
          <Button
            pressed={item().isActive}
            disabled={!item().canExec}
            onClick={item().command}
            tooltip="Bold"
          >
            <div class="i-lucide-bold size-5 block" />
          </Button>
        )}
      </Show>
      <Show when={items().italic}>
        {(item) => (
          <Button
            pressed={item().isActive}
            disabled={!item().canExec}
            onClick={item().command}
            tooltip="Italic"
          >
            <div class="i-lucide-italic size-5 block" />
          </Button>
        )}
      </Show>
      <Show when={items().underline}>
        {(item) => (
          <Button
            pressed={item().isActive}
            disabled={!item().canExec}
            onClick={item().command}
            tooltip="Underline"
          >
            <div class="i-lucide-underline size-5 block" />
          </Button>
        )}
      </Show>
      <Show when={items().strike}>
        {(item) => (
          <Button
            pressed={item().isActive}
            disabled={!item().canExec}
            onClick={item().command}
            tooltip="Strike"
          >
            <div class="i-lucide-strikethrough size-5 block" />
          </Button>
        )}
      </Show>
      <Show when={items().code}>
        {(item) => (
          <Button
            pressed={item().isActive}
            disabled={!item().canExec}
            onClick={item().command}
            tooltip="Code"
          >
            <div class="i-lucide-code size-5 block" />
          </Button>
        )}
      </Show>
      <Show when={items().codeBlock}>
        {(item) => (
          <Button
            pressed={item().isActive}
            disabled={!item().canExec}
            onClick={item().command}
            tooltip="Code Block"
          >
            <div class="i-lucide-square-code size-5 block" />
          </Button>
        )}
      </Show>
      <Show when={items().heading1}>
        {(item) => (
          <Button
            pressed={item().isActive}
            disabled={!item().canExec}
            onClick={item().command}
            tooltip="Heading 1"
          >
            <div class="i-lucide-heading-1 size-5 block" />
          </Button>
        )}
      </Show>
      <Show when={items().heading2}>
        {(item) => (
          <Button
            pressed={item().isActive}
            disabled={!item().canExec}
            onClick={item().command}
            tooltip="Heading 2"
          >
            <div class="i-lucide-heading-2 size-5 block" />
          </Button>
        )}
      </Show>
      <Show when={items().heading3}>
        {(item) => (
          <Button
            pressed={item().isActive}
            disabled={!item().canExec}
            onClick={item().command}
            tooltip="Heading 3"
          >
            <div class="i-lucide-heading-3 size-5 block" />
          </Button>
        )}
      </Show>
      <Show when={items().horizontalRule}>
        {(item) => (
          <Button
            pressed={item().isActive}
            disabled={!item().canExec}
            onClick={item().command}
            tooltip="Divider"
          >
            <div class="i-lucide-minus size-5 block"></div>
          </Button>
        )}
      </Show>
      <Show when={items().blockquote}>
        {(item) => (
          <Button
            pressed={item().isActive}
            disabled={!item().canExec}
            onClick={item().command}
            tooltip="Blockquote"
          >
            <div class="i-lucide-text-quote size-5 block" />
          </Button>
        )}
      </Show>
      <Show when={items().bulletList}>
        {(item) => (
          <Button
            pressed={item().isActive}
            disabled={!item().canExec}
            onClick={item().command}
            tooltip="Bullet List"
          >
            <div class="i-lucide-list size-5 block" />
          </Button>
        )}
      </Show>
      <Show when={items().orderedList}>
        {(item) => (
          <Button
            pressed={item().isActive}
            disabled={!item().canExec}
            onClick={item().command}
            tooltip="Ordered List"
          >
            <div class="i-lucide-list-ordered size-5 block" />
          </Button>
        )}
      </Show>
      <Show when={items().taskList}>
        {(item) => (
          <Button
            pressed={item().isActive}
            disabled={!item().canExec}
            onClick={item().command}
            tooltip="Task List"
          >
            <div class="i-lucide-list-checks size-5 block" />
          </Button>
        )}
      </Show>
      <Show when={items().toggleList}>
        {(item) => (
          <Button
            pressed={item().isActive}
            disabled={!item().canExec}
            onClick={item().command}
            tooltip="Toggle List"
          >
            <div class="i-lucide-list-collapse size-5 block" />
          </Button>
        )}
      </Show>
      <Show when={items().indentList}>
        {(item) => (
          <Button
            pressed={item().isActive}
            disabled={!item().canExec}
            onClick={item().command}
            tooltip="Increase indentation"
          >
            <div class="i-lucide-indent-increase size-5 block" />
          </Button>
        )}
      </Show>
      <Show when={items().dedentList}>
        {(item) => (
          <Button
            pressed={item().isActive}
            disabled={!item().canExec}
            onClick={item().command}
            tooltip="Decrease indentation"
          >
            <div class="i-lucide-indent-decrease size-5 block" />
          </Button>
        )}
      </Show>
      <Show when={props.uploader && items().insertImage}>
        {(item) => (
          <ImageUploadPopover
            uploader={props.uploader!}
            disabled={!item().canExec}
            tooltip="Insert Image"
          >
            <div class="i-lucide-image size-5 block" />
          </ImageUploadPopover>
        )}
      </Show>
    </div>
  )
}
