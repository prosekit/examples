import { useEditor } from 'prosekit/react'

import type { EditorExtension } from './extension'
import Toggle from './toggle'

export default function Toolbar() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <div className='z-2 sticky top-0 box-border flex flex-wrap gap-1 bg-gray-100 p-2 dark:bg-zinc-900'>
      <Toggle
        pressed={editor.nodes.list.isActive({ kind: 'bullet' })}
        disabled={!editor.commands.toggleList.canApply({ kind: 'bullet' })}
        onClick={() => editor.commands.toggleList({ kind: 'bullet' })}
      >
        <div className='i-lucide-list h-5 w-5' />
      </Toggle>

      <Toggle
        pressed={editor.nodes.list.isActive({ kind: 'ordered' })}
        disabled={!editor.commands.toggleList.canApply({ kind: 'ordered' })}
        onClick={() => editor.commands.toggleList({ kind: 'ordered' })}
      >
        <div className='i-lucide-list-ordered h-5 w-5' />
      </Toggle>

      <Toggle
        pressed={editor.nodes.list.isActive({ kind: 'task' })}
        disabled={!editor.commands.toggleList.canApply({ kind: 'task' })}
        onClick={() => editor.commands.toggleList({ kind: 'task' })}
      >
        <div className='i-lucide-list-checks h-5 w-5' />
      </Toggle>

      <Toggle
        pressed={editor.nodes.list.isActive({ kind: 'toggle' })}
        disabled={!editor.commands.toggleList.canApply({ kind: 'toggle' })}
        onClick={() => editor.commands.toggleList({ kind: 'toggle' })}
      >
        <div className='i-lucide-list-collapse h-5 w-5' />
      </Toggle>
    </div>
  )
}
