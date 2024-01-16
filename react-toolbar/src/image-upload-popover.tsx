import { useEditor } from 'prosekit/react'
import { Popover } from 'prosekit/react/popover'
import { useState, type FC, type ReactNode } from 'react'

import type { EditorExtension } from './extension'

export const ImageUploadPopover: FC<{
  open: boolean
  onClose: VoidFunction
  children: ReactNode
}> = ({ open, onClose, children }) => {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null)

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

  const handleClose = () => {
    setWebUrl('')
    setObjectUrl('')
    onClose()
  }

  const handleSubmit = () => {
    editor.commands.insertImage({ src: url })
    setTimeout(handleClose, 100)
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleClose()
    }
  }

  return (
    <>
      <div ref={setAnchorElement}>{children}</div>

      <Popover
        reference={anchorElement ?? undefined}
        open={open}
        onOpenChange={handleOpenChange}
        className='max-w-md space-y-4 p-6 text-sm z-10 box-border rounded border border-solid border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-zinc-800'
      >
        {objectUrl ? null : (
          <div>
            <label>Embed Link</label>
            <input
              className='mt-2 box-border flex h-10 w-full rounded-md px-3 py-2 outline-none transition focus-visible:outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium [&[type=file]]:hover:bg-gray-500/10 border border-solid border-gray-200 dark:border-gray-700 ring-gray-500 ring-offset-0 focus-visible:ring-2 focus-visible:ring-offset-0'
              placeholder="Paste the image link..."
              type="url"
              onChange={handleWebUrlChange}
            />
          </div>
        )}

        {webUrl ? null : (
          <div>
            <label>Upload</label>
            <input
              className='mt-2 box-border flex h-10 w-full rounded-md px-3 py-2 outline-none transition focus-visible:outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium [&[type=file]]:hover:bg-gray-500/10 border border-solid border-gray-200 dark:border-gray-700 ring-gray-500 ring-offset-0 focus-visible:ring-2 focus-visible:ring-offset-0'
              accept="image/*"
              type="file"
              onChange={handleFileChange}
            />
          </div>
        )}

        {url ? (
          <button className='dark:text-dark box-border inline-flex h-10 w-full items-center justify-center rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-100' onClick={handleSubmit}>
            Insert Image
          </button>
        ) : null}
      </Popover>
    </>
  )
}
