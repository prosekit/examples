import { useEditor } from 'prosekit/react'

import Button from './button'
import type { EditorExtension } from './extension'

export default function Toolbar() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <div className="z-2 box-border border-gray-200 dark:border-gray-800 border-solid border-l-0 border-r-0 border-t-0 border-b flex flex-wrap gap-1 p-2 items-center">
      <Button
        pressed={editor.nodes.blockquote.isActive()}
        disabled={!editor.commands.toggleBlockquote.canExec()}
        onClick={() => editor.commands.setBlockquote()}
        tooltip="Blockquote"
      >
        <div className="i-lucide-text-quote h-5 w-5" />
      </Button>
    </div>
  )
}
