import type { NodeAction } from 'prosekit/core'
import { useEditor } from 'prosekit/solid'

import Button from './button'
import type { EditorExtension } from './extension'

export default function Toolbar() {
  const editor = useEditor<EditorExtension>({ update: true })

  const isTextAlignActive = (value: string) => {
    return Object.values(editor().nodes).some((node: NodeAction<any>) => {
      return node.isActive({ textAlign: value })
    })
  }

  return (
    <div class="z-2 box-border border-gray-200 dark:border-gray-800 border-solid border-l-0 border-r-0 border-t-0 border-b flex flex-wrap gap-1 p-2 items-center">
      <Button
        pressed={() => isTextAlignActive('left')}
        disabled={() => !editor().commands.setTextAlign.canExec('left')}
        onClick={() => editor().commands.setTextAlign('left')}
      >
        Left
      </Button>

      <Button
        pressed={() => isTextAlignActive('center')}
        disabled={() => !editor().commands.setTextAlign.canExec('center')}
        onClick={() => editor().commands.setTextAlign('center')}
      >
        Center
      </Button>

      <Button
        pressed={() => isTextAlignActive('right')}
        disabled={() => !editor().commands.setTextAlign.canExec('right')}
        onClick={() => editor().commands.setTextAlign('right')}
      >
        Right
      </Button>

      <Button
        pressed={() => isTextAlignActive('justify')}
        disabled={() => !editor().commands.setTextAlign.canExec('justify')}
        onClick={() => editor().commands.setTextAlign('justify')}
      >
        Justify
      </Button>
    </div>
  )
}
