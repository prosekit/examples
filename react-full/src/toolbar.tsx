import type { Editor } from 'prosekit/core'
import { useEditorDerivedValue } from 'prosekit/react'

import Button from './button'
import type { EditorExtension } from './extension'
import { ImageUploadPopover } from './image-upload-popover'

function getToolbarItems(editor: Editor<EditorExtension>) {
  return {
    undo: {
      isActive: false,
      canExec: editor.commands.undo.canExec(),
      command: editor.commands.undo,
    },
    redo: {
      isActive: false,
      canExec: editor.commands.redo.canExec(),
      command: editor.commands.redo,
    },
    bold: {
      isActive: editor.marks.bold.isActive(),
      canExec: editor.commands.toggleBold.canExec(),
      command: editor.commands.toggleBold,
    },
    italic: {
      isActive: editor.marks.italic.isActive(),
      canExec: editor.commands.toggleItalic.canExec(),
      command: editor.commands.toggleItalic,
    },
    underline: {
      isActive: editor.marks.underline.isActive(),
      canExec: editor.commands.toggleUnderline.canExec(),
      command: editor.commands.toggleUnderline,
    },
    strike: {
      isActive: editor.marks.strike.isActive(),
      canExec: editor.commands.toggleStrike.canExec(),
      command: editor.commands.toggleStrike,
    },
    code: {
      isActive: editor.marks.code.isActive(),
      canExec: editor.commands.toggleCode.canExec(),
      command: editor.commands.toggleCode,
    },
    codeBlock: {
      isActive: editor.nodes.codeBlock.isActive(),
      canExec: editor.commands.insertCodeBlock.canExec({
        language: 'javascript',
      }),
      command: () =>
        editor.commands.insertCodeBlock({ language: 'javascript' }),
    },
    heading1: {
      isActive: editor.nodes.heading.isActive({ level: 1 }),
      canExec: editor.commands.toggleHeading.canExec({ level: 1 }),
      command: () => editor.commands.toggleHeading({ level: 1 }),
    },
    heading2: {
      isActive: editor.nodes.heading.isActive({ level: 2 }),
      canExec: editor.commands.toggleHeading.canExec({ level: 2 }),
      command: () => editor.commands.toggleHeading({ level: 2 }),
    },
    heading3: {
      isActive: editor.nodes.heading.isActive({ level: 3 }),
      canExec: editor.commands.toggleHeading.canExec({ level: 3 }),
      command: () => editor.commands.toggleHeading({ level: 3 }),
    },
    horizontalRule: {
      isActive: editor.nodes.horizontalRule.isActive(),
      canExec: editor.commands.insertHorizontalRule.canExec(),
      command: editor.commands.insertHorizontalRule,
    },
    bulletList: {
      isActive: editor.nodes.list.isActive({ kind: 'bullet' }),
      canExec: editor.commands.toggleList.canExec({ kind: 'bullet' }),
      command: () => editor.commands.toggleList({ kind: 'bullet' }),
    },
    orderedList: {
      isActive: editor.nodes.list.isActive({ kind: 'ordered' }),
      canExec: editor.commands.toggleList.canExec({ kind: 'ordered' }),
      command: () => editor.commands.toggleList({ kind: 'ordered' }),
    },
    taskList: {
      isActive: editor.nodes.list.isActive({ kind: 'task' }),
      canExec: editor.commands.toggleList.canExec({ kind: 'task' }),
      command: () => editor.commands.toggleList({ kind: 'task' }),
    },
    toggleList: {
      isActive: editor.nodes.list.isActive({ kind: 'toggle' }),
      canExec: editor.commands.toggleList.canExec({ kind: 'toggle' }),
      command: () => editor.commands.toggleList({ kind: 'toggle' }),
    },
    indentList: {
      isActive: false,
      canExec: editor.commands.indentList.canExec(),
      command: editor.commands.indentList,
    },
    dedentList: {
      isActive: false,
      canExec: editor.commands.dedentList.canExec(),
      command: editor.commands.dedentList,
    },
    insertImage: {
      isActive: false,
      canExec: editor.commands.insertImage.canExec(),
    },
  }
}

export default function Toolbar() {
  const items = useEditorDerivedValue(getToolbarItems)

  return (
    <div className="z-2 box-border border-gray-200 dark:border-gray-800 border-solid border-l-0 border-r-0 border-t-0 border-b flex flex-wrap gap-1 p-2 items-center">
      <Button
        pressed={items.undo.isActive}
        disabled={!items.undo.canExec}
        onClick={items.undo.command}
        tooltip="Undo"
      >
        <div className="i-lucide-undo-2 h-5 w-5" />
      </Button>

      <Button
        pressed={items.redo.isActive}
        disabled={!items.redo.canExec}
        onClick={items.redo.command}
        tooltip="Redo"
      >
        <div className="i-lucide-redo-2 h-5 w-5" />
      </Button>

      <Button
        pressed={items.bold.isActive}
        disabled={!items.bold.canExec}
        onClick={items.bold.command}
        tooltip="Bold"
      >
        <div className="i-lucide-bold h-5 w-5" />
      </Button>

      <Button
        pressed={items.italic.isActive}
        disabled={!items.italic.canExec}
        onClick={items.italic.command}
        tooltip="Italic"
      >
        <div className="i-lucide-italic h-5 w-5" />
      </Button>

      <Button
        pressed={items.underline.isActive}
        disabled={!items.underline.canExec}
        onClick={items.underline.command}
        tooltip="Underline"
      >
        <div className="i-lucide-underline h-5 w-5" />
      </Button>

      <Button
        pressed={items.strike.isActive}
        disabled={!items.strike.canExec}
        onClick={items.strike.command}
        tooltip="Strike"
      >
        <div className="i-lucide-strikethrough h-5 w-5" />
      </Button>

      <Button
        pressed={items.code.isActive}
        disabled={!items.code.canExec}
        onClick={items.code.command}
        tooltip="Code"
      >
        <div className="i-lucide-code h-5 w-5" />
      </Button>

      <Button
        pressed={items.codeBlock.isActive}
        disabled={!items.codeBlock.canExec}
        onClick={items.codeBlock.command}
        tooltip="Code Block"
      >
        <div className="i-lucide-square-code h-5 w-5" />
      </Button>

      <Button
        pressed={items.heading1.isActive}
        disabled={!items.heading1.canExec}
        onClick={items.heading1.command}
        tooltip="Heading 1"
      >
        <div className="i-lucide-heading-1 h-5 w-5" />
      </Button>

      <Button
        pressed={items.heading2.isActive}
        disabled={!items.heading2.canExec}
        onClick={items.heading2.command}
        tooltip="Heading 2"
      >
        <div className="i-lucide-heading-2 h-5 w-5" />
      </Button>

      <Button
        pressed={items.heading3.isActive}
        disabled={!items.heading3.canExec}
        onClick={items.heading3.command}
        tooltip="Heading 3"
      >
        <div className="i-lucide-heading-3 h-5 w-5" />
      </Button>

      <Button
        pressed={items.horizontalRule.isActive}
        disabled={!items.horizontalRule.canExec}
        onClick={items.horizontalRule.command}
        tooltip="Divider"
      >
        <div className="i-lucide-minus h-5 w-5"></div>
      </Button>

      <Button
        pressed={items.bulletList.isActive}
        disabled={!items.bulletList.canExec}
        onClick={items.bulletList.command}
        tooltip="Bullet List"
      >
        <div className="i-lucide-list h-5 w-5" />
      </Button>

      <Button
        pressed={items.orderedList.isActive}
        disabled={!items.orderedList.canExec}
        onClick={items.orderedList.command}
        tooltip="Ordered List"
      >
        <div className="i-lucide-list-ordered h-5 w-5" />
      </Button>

      <Button
        pressed={items.taskList.isActive}
        disabled={!items.taskList.canExec}
        onClick={items.taskList.command}
        tooltip="Task List"
      >
        <div className="i-lucide-list-checks h-5 w-5" />
      </Button>

      <Button
        pressed={items.toggleList.isActive}
        disabled={!items.toggleList.canExec}
        onClick={items.toggleList.command}
        tooltip="Toggle List"
      >
        <div className="i-lucide-list-collapse h-5 w-5" />
      </Button>

      <Button
        pressed={items.indentList.isActive}
        disabled={!items.indentList.canExec}
        onClick={items.indentList.command}
        tooltip="Increase indentation"
      >
        <div className="i-lucide-indent-increase h-5 w-5" />
      </Button>

      <Button
        pressed={items.dedentList.isActive}
        disabled={!items.dedentList.canExec}
        onClick={items.dedentList.command}
        tooltip="Decrease indentation"
      >
        <div className="i-lucide-indent-decrease h-5 w-5" />
      </Button>

      <ImageUploadPopover
        disabled={!items.insertImage.canExec}
        tooltip="Insert Image"
      >
        <div className="i-lucide-image h-5 w-5" />
      </ImageUploadPopover>
    </div>
  )
}
