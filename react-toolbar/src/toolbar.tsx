import { useEditor } from 'prosekit/react'
import { useState } from 'react'

import type { EditorExtension } from './extension'
import { ImageUploadPopover } from './image-upload-popover'
import Toggle from './toggle'

export default function Toolbar() {
  const editor = useEditor<EditorExtension>({ update: true })

  const [imagePopoverOpen, setImagePopoverOpen] = useState(false)
  const closeImagePopover = () => {
    setImagePopoverOpen(false)
  }
  const toggleImagePopover = () => {
    setImagePopoverOpen((value) => !value)
  }

  return (
    <div className='z-2 sticky top-0 box-border flex flex-wrap gap-1 p-2 items-center bg-white dark:bg-neutral-900 border-zinc-200 dark:border-zinc-800 border-solid border-l-0 border-r-0 border-t-0 border-b'>
      <Toggle
        pressed={false}
        disabled={!editor.commands.undo.canApply()}
        onClick={editor.commands.undo}
      >
        <div className='i-lucide-undo-2 h-5 w-5' />
      </Toggle>

      <Toggle
        pressed={false}
        disabled={!editor.commands.redo.canApply()}
        onClick={editor.commands.redo}
      >
        <div className='i-lucide-redo-2 h-5 w-5' />
      </Toggle>

      <Toggle
        pressed={editor.marks.bold.isActive()}
        disabled={!editor.commands.toggleBold.canApply()}
        onClick={editor.commands.toggleBold}
      >
        <div className='i-lucide-bold h-5 w-5' />
      </Toggle>

      <Toggle
        pressed={editor.marks.italic.isActive()}
        disabled={!editor.commands.toggleItalic.canApply()}
        onClick={editor.commands.toggleItalic}
      >
        <div className='i-lucide-italic h-5 w-5' />
      </Toggle>

      <Toggle
        pressed={editor.nodes.heading.isActive({ level: 1 })}
        disabled={!editor.commands.toggleHeading.canApply({ level: 1 })}
        onClick={() => editor.commands.toggleHeading({ level: 1 })}
      >
        <div className='i-lucide-heading-1 h-5 w-5' />
      </Toggle>

      <Toggle
        pressed={editor.nodes.heading.isActive({ level: 2 })}
        disabled={!editor.commands.toggleHeading.canApply({ level: 2 })}
        onClick={() => editor.commands.toggleHeading({ level: 2 })}
      >
        <div className='i-lucide-heading-2 h-5 w-5' />
      </Toggle>

      <Toggle
        pressed={editor.nodes.heading.isActive({ level: 3 })}
        disabled={!editor.commands.toggleHeading.canApply({ level: 3 })}
        onClick={() => editor.commands.toggleHeading({ level: 3 })}
      >
        <div className='i-lucide-heading-3 h-5 w-5' />
      </Toggle>

      <ImageUploadPopover open={imagePopoverOpen} onClose={closeImagePopover}>
        <Toggle
          pressed={false}
          disabled={!editor.commands.insertImage.canApply()}
          onClick={toggleImagePopover}
        >
          <div className='i-lucide-image h-5 w-5' />
        </Toggle>
      </ImageUploadPopover>
    </div>
  )
}
