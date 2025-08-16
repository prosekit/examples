import { useEditor } from 'prosekit/solid'

import Button from './button'
import type { EditorExtension } from './extension'

export default function Toolbar() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <div class="z-2 box-border border-gray-200 dark:border-gray-800 border-solid border-l-0 border-r-0 border-t-0 border-b flex flex-wrap gap-1 p-2 items-center">
      <Button
        pressed={editor().nodes.codeBlock.isActive}
        disabled={() => !editor().commands.setCodeBlock.canExec()}
        onClick={editor().commands.setCodeBlock}
      >
        <div class="i-lucide-square-code size-5 block" />
      </Button>
    </div>
  )
}
