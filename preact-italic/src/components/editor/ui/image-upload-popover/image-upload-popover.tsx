import type { ComponentChild, JSX } from 'preact'
import { useId, useState } from 'preact/hooks'
import type { Uploader } from 'prosekit/extensions/file'
import type { ImageExtension } from 'prosekit/extensions/image'
import { useEditor } from 'prosekit/preact'
import {
  PopoverPopup,
  PopoverPositioner,
  PopoverRoot,
  PopoverTrigger,
} from 'prosekit/preact/popover'
import type { OpenChangeEvent } from 'prosekit/web/popover'

import { Button } from '../button'

export default function ImageUploadPopover(props: {
  uploader: Uploader<string>
  tooltip: string
  disabled: boolean
  children: ComponentChild
}) {
  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const ariaId = useId()

  const editor = useEditor<ImageExtension>()

  const handleFileChange = (
    event: JSX.TargetedEvent<HTMLInputElement, Event>,
  ) => {
    const file = event.currentTarget.files?.[0]

    if (file) {
      setFile(file)
      setUrl('')
    } else {
      setFile(null)
    }
  }

  const handleUrlChange = (
    event: JSX.TargetedEvent<HTMLInputElement, Event>,
  ) => {
    const url = event.currentTarget.value

    if (url) {
      setUrl(url)
      setFile(null)
    } else {
      setUrl('')
    }
  }

  const deferResetState = () => {
    setTimeout(() => {
      setUrl('')
      setFile(null)
    }, 300)
  }

  const handleSubmit = () => {
    if (url) {
      editor.commands.insertImage({ src: url })
    } else if (file) {
      editor.commands.uploadImage({ file, uploader: props.uploader })
    }
    setOpen(false)
    deferResetState()
  }

  const handleOpenChange = (event: OpenChangeEvent) => {
    if (!event.detail) {
      deferResetState()
    }
    setOpen(event.detail)
  }

  return (
    <PopoverRoot open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger>
        <Button
          pressed={open}
          disabled={props.disabled}
          tooltip={props.tooltip}
        >
          {props.children}
        </Button>
      </PopoverTrigger>

      <PopoverPositioner
        placement="bottom"
        className="block overflow-visible bg-transparent w-min h-min z-50 motion-safe:ease-out motion-safe:transition-transform motion-safe:duration-100"
      >
        <PopoverPopup className="box-border data-[state=closed]:motion-safe:duration-150 motion-safe:transition-discrete motion-safe:transition-all data-[state=closed]:opacity-0 starting:opacity-0 opacity-100 data-[state=closed]:scale-95 starting:scale-95 scale-100 motion-safe:duration-40 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg flex flex-col gap-y-4 p-6 text-sm w-sm">
          {file ? null : (
            <>
              <label htmlFor={`id-link-${ariaId}`}>Embed Link</label>
              <input
                id={`id-link-${ariaId}`}
                className="flex h-9 rounded-md w-full bg-white dark:bg-gray-950 px-3 py-2 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-500 transition border box-border border-gray-200 dark:border-gray-800 border-solid ring-0 ring-transparent focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-0 outline-hidden focus-visible:outline-hidden file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Paste the image link..."
                type="url"
                value={url}
                onChange={handleUrlChange}
              />
            </>
          )}

          {url ? null : (
            <>
              <label htmlFor={`id-upload-${ariaId}`}>Upload</label>
              <input
                id={`id-upload-${ariaId}`}
                className="flex h-9 rounded-md w-full bg-white dark:bg-gray-950 px-3 py-2 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-500 transition border box-border border-gray-200 dark:border-gray-800 border-solid ring-0 ring-transparent focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-0 outline-hidden focus-visible:outline-hidden file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50"
                accept="image/*"
                type="file"
                onChange={handleFileChange}
              />
            </>
          )}

          {url ? (
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white dark:ring-offset-gray-950 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-0 bg-gray-900 dark:bg-gray-50 text-gray-50 dark:text-gray-900 hover:bg-gray-900/90 dark:hover:bg-gray-50/90 h-10 px-4 py-2 w-full"
              onClick={handleSubmit}
            >
              Insert Image
            </button>
          ) : null}

          {file ? (
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white dark:ring-offset-gray-950 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-0 bg-gray-900 dark:bg-gray-50 text-gray-50 dark:text-gray-900 hover:bg-gray-900/90 dark:hover:bg-gray-50/90 h-10 px-4 py-2 w-full"
              onClick={handleSubmit}
            >
              Upload Image
            </button>
          ) : null}
        </PopoverPopup>
      </PopoverPositioner>
    </PopoverRoot>
  )
}
