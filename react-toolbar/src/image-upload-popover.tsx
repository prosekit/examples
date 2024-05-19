import { useEditor } from 'prosekit/react'
import {
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from 'prosekit/react/popover'
import { useState, type FC, type ReactNode } from 'react'

import type { EditorExtension } from './extension'
import Toggle from './toggle'

export const ImageUploadPopover: FC<{
  tooltip: string
  disabled: boolean
  children: ReactNode
}> = ({ tooltip, disabled, children }) => {
  const [open, setOpen] = useState(false)
  const [webUrl, setWebUrl] = useState('')
  const [objectUrl, setObjectUrl] = useState('')
  const url = webUrl || objectUrl

  const editor = useEditor<EditorExtension>()

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const file = event.target.files?.[0]

    if (file) {
      setObjectUrl(URL.createObjectURL(file))
      setWebUrl('')
    } else {
      setObjectUrl('')
    }
  }

  const handleWebUrlChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const url = event.target.value

    if (url) {
      setWebUrl(url)
      setObjectUrl('')
    } else {
      setWebUrl('')
    }
  }

  const deferResetState = () => {
    setTimeout(() => {
      setWebUrl('')
      setObjectUrl('')
    }, 300)
  }

  const handleSubmit = () => {
    editor.commands.insertImage({ src: url })
    deferResetState()
    setOpen(false)
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      deferResetState()
    }
    setOpen(open)
  }

  return (
    <PopoverRoot open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger>
        <Toggle pressed={open} disabled={disabled} tooltip={tooltip}>
          {children}
        </Toggle>
      </PopoverTrigger>

      <PopoverContent className='flex flex-col gap-y-4 p-6 text-sm w-sm z-10 box-border rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-neutral-900 shadow-lg will-change-transform data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[state=open]:animate-duration-150 data-[state=closed]:animate-duration-200 data-[side=bottom]:slide-in-from-top-2 data-[side=bottom]:slide-out-to-top-2 data-[side=left]:slide-in-from-right-2 data-[side=left]:slide-out-to-right-2 data-[side=right]:slide-in-from-left-2 data-[side=right]:slide-out-to-left-2 data-[side=top]:slide-in-from-bottom-2 data-[side=top]:slide-out-to-bottom-2'>
        {objectUrl ? null : (
          <>
            <label>Embed Link</label>
            <input
              className='flex h-10 rounded-md w-full bg-white dark:bg-neutral-900 px-3 py-2 text-sm placeholder:text-zinc-500 dark:text-zinc-500 transition border box-border border-zinc-200 dark:border-zinc-800 border-solid ring-0 ring-transparent focus-visible:ring-2 focus-visible:ring-zinc-900 dark:ring-zinc-300 focus-visible:ring-offset-0 outline-none focus-visible:outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50'
              placeholder="Paste the image link..."
              type="url"
              value={webUrl}
              onChange={handleWebUrlChange}
            />
          </>
        )}

        {webUrl ? null : (
          <>
            <label>Upload</label>
            <input
              className='flex h-10 rounded-md w-full bg-white dark:bg-neutral-900 px-3 py-2 text-sm placeholder:text-zinc-500 dark:text-zinc-500 transition border box-border border-zinc-200 dark:border-zinc-800 border-solid ring-0 ring-transparent focus-visible:ring-2 focus-visible:ring-zinc-900 dark:ring-zinc-300 focus-visible:ring-offset-0 outline-none focus-visible:outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50'
              accept="image/*"
              type="file"
              onChange={handleFileChange}
            />
          </>
        )}

        {url ? (
          <button className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white dark:ring-offset-neutral-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:ring-zinc-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-zinc-900 text-zinc-50 dark:text-zinc-900 hover:bg-zinc-900 dark:bg-zinc-50/90 h-10 px-4 py-2 w-full' onClick={handleSubmit}>
            Insert Image
          </button>
        ) : null}
      </PopoverContent>
    </PopoverRoot>
  )
}
