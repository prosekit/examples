import { useEditor } from 'prosekit/react'

import Button from './button'
import type { EditorExtension } from './extension'

export default function Toolbar() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <div className="z-2 box-border border-zinc-200 dark:border-zinc-800 border-solid border-l-0 border-r-0 border-t-0 border-b flex flex-wrap gap-1 p-2 items-center">
      <Button
        pressed={editor.nodes.list.isActive({ kind: 'bullet' })}
        disabled={!editor.commands.toggleList.canApply({ kind: 'bullet' })}
        onClick={() => editor.commands.toggleList({ kind: 'bullet' })}
      >
        <div className="i-lucide-list h-5 w-5" />
      </Button>

      <Button
        pressed={editor.nodes.list.isActive({ kind: 'ordered' })}
        disabled={!editor.commands.toggleList.canApply({ kind: 'ordered' })}
        onClick={() => editor.commands.toggleList({ kind: 'ordered' })}
      >
        <div className="i-lucide-list-ordered h-5 w-5" />
      </Button>

      <Button
        pressed={editor.nodes.list.isActive({ kind: 'task' })}
        disabled={!editor.commands.toggleList.canApply({ kind: 'task' })}
        onClick={() => editor.commands.toggleList({ kind: 'task' })}
      >
        <div className="i-lucide-list-checks h-5 w-5" />
      </Button>

      <Button
        pressed={editor.nodes.list.isActive({ kind: 'toggle' })}
        disabled={!editor.commands.toggleList.canApply({ kind: 'toggle' })}
        onClick={() => editor.commands.toggleList({ kind: 'toggle' })}
      >
        <div className="i-lucide-list-collapse h-5 w-5" />
      </Button>
    </div>
  )
}
