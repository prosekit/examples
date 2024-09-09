import { useEditor } from 'prosekit/react'

import Button from './button'
import type { EditorExtension } from './extension'

export default function Toolbar() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <div className="z-2 box-border border-zinc-200 dark:border-zinc-800 border-solid border-l-0 border-r-0 border-t-0 border-b flex flex-wrap gap-1 p-2 items-center">
      <Button
        pressed={editor.nodes.horizontalRule.isActive()}
        disabled={!editor.commands.insertHorizontalRule.canExec()}
        onClick={() => editor.commands.insertHorizontalRule()}
        tooltip="Divider"
      >
        <div className="i-lucide-minus h-5 w-5"></div>
      </Button>
    </div>
  )
}
