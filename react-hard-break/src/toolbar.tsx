import type { Editor } from 'prosekit/core'
import { useEditorDerivedValue } from 'prosekit/react'

import Button from './button'
import type { EditorExtension } from './extension'

function getToolbarItems(editor: Editor<EditorExtension>) {
  return {
    hardBreak: {
      canExec: editor.commands.insertHardBreak.canExec(),
      command: () => editor.commands.insertHardBreak(),
    },
  }
}

export default function Toolbar() {
  const items = useEditorDerivedValue(getToolbarItems)

  return (
    <div className="z-2 box-border border-gray-200 dark:border-gray-800 border-solid border-l-0 border-r-0 border-t-0 border-b flex flex-wrap gap-1 p-2 items-center">
      <Button
        pressed={false}
        disabled={!items.hardBreak.canExec}
        onClick={items.hardBreak.command}
        tooltip="Insert Hard Break"
      >
        Insert Hard Break
      </Button>
    </div>
  )
}
