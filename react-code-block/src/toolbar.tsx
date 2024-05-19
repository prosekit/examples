import { useEditor } from 'prosekit/react'

import type { EditorExtension } from './extension'
import Toggle from './toggle'

export default function Toolbar() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <div className='z-2 sticky top-0 box-border flex flex-wrap gap-1 p-2 items-center bg-background border-border border-solid border-l-0 border-r-0 border-t-0 border-b'>
      <Toggle
        pressed={editor.nodes.codeBlock.isActive()}
        disabled={!editor.commands.setCodeBlock.canApply()}
        onClick={() => editor.commands.setCodeBlock()}
      >
        <div className='i-lucide-square-code h-5 w-5' />
      </Toggle>
    </div>
  )
}
