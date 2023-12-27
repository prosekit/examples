import { useEditor } from 'prosekit/react'

import type { EditorExtension } from './extension'
import Toggle from './toggle'

export default function Toolbar() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <div className="z-2 sticky top-0 box-border flex flex-wrap gap-1 bg-gray-100 p-2 dark:bg-zinc-900">
      <Toggle
        pressed={editor.nodes.codeBlock.isActive()}
        disabled={!editor.commands.insertNode.canApply({ type: 'codeBlock' })}
        onClick={() => editor.commands.insertNode({ type: 'codeBlock' })}
      >
        <div className="i-ci-window-code-block h-5 w-5" />
      </Toggle>
    </div>
  )
}
