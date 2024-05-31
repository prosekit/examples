import { useEditor } from 'prosekit/react'

import Button from './button'
import type { EditorExtension } from './extension'

export default function Toolbar() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <div className='z-2 box-border border-zinc-200 dark:border-zinc-800 border-solid border-l-0 border-r-0 border-t-0 border-b flex flex-wrap gap-1 p-2 items-center'>
      <Button
        pressed={editor.nodes.heading.isActive({ level: 1 })}
        disabled={!editor.commands.toggleHeading.canApply({ level: 1 })}
        onClick={() => editor.commands.toggleHeading({ level: 1 })}
      >
        H1
      </Button>

      <Button
        pressed={editor.nodes.heading.isActive({ level: 2 })}
        disabled={!editor.commands.toggleHeading.canApply({ level: 2 })}
        onClick={() => editor.commands.toggleHeading({ level: 2 })}
      >
        H2
      </Button>

      <Button
        pressed={editor.nodes.heading.isActive({ level: 3 })}
        disabled={!editor.commands.toggleHeading.canApply({ level: 3 })}
        onClick={() => editor.commands.toggleHeading({ level: 3 })}
      >
        H3
      </Button>
    </div>
  )
}
