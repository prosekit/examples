import type { Editor } from 'prosekit/core'
import { useEditorDerivedValue } from 'prosekit/react'

import Button from './button'
import type { EditorExtension } from './extension'

function getToolbarItems(editor: Editor<EditorExtension>) {
  return {
    codeBlock: {
      isActive: editor.nodes.codeBlock.isActive(),
      canExec: editor.commands.setCodeBlock.canExec(),
      command: () => editor.commands.setCodeBlock(),
    },
  }
}

export default function Toolbar() {
  const items = useEditorDerivedValue(getToolbarItems)

  return (
    <div className="z-2 box-border border-gray-200 dark:border-gray-800 border-solid border-l-0 border-r-0 border-t-0 border-b flex flex-wrap gap-1 p-2 items-center">
      <Button
        pressed={items.codeBlock.isActive}
        disabled={!items.codeBlock.canExec}
        onClick={items.codeBlock.command}
      >
        <div className="i-lucide-square-code size-5 block" />
      </Button>
    </div>
  )
}
