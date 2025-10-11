import { useEditor } from 'prosekit/solid'
import {
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from 'prosekit/solid/popover'
import { createSignal, Show, type ParentProps } from 'solid-js'

import Button from './button'
import type { EditorExtension } from './extension'
import { sampleUploader } from './sample-uploader'

export function ImageUploadPopover(
  props: ParentProps<{
    tooltip: string
    disabled: () => boolean
  }>,
) {
  const [open, setOpen] = createSignal(false)
  const [url, setUrl] = createSignal('')
  const [file, setFile] = createSignal<File | null>(null)

  const editor = useEditor<EditorExtension>()

  const handleFileChange = (
    event: Event & { currentTarget: HTMLInputElement },
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
    event: InputEvent & { currentTarget: HTMLInputElement },
  ) => {
    const nextUrl = event.currentTarget.value
    if (nextUrl) {
      setUrl(nextUrl)
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
    const src = url()
    const nextFile = file()

    if (src) {
      editor().commands.insertImage({ src })
    } else if (nextFile) {
      editor().commands.uploadImage({
        file: nextFile,
        uploader: sampleUploader,
      })
    }
    setOpen(false)
    deferResetState()
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      deferResetState()
    }
    setOpen(nextOpen)
  }

  return (
    <PopoverRoot open={open()} onOpenChange={handleOpenChange}>
      <PopoverTrigger>
        <Button
          pressed={() => open()}
          disabled={props.disabled}
          tooltip={props.tooltip}
        >
          {props.children}
        </Button>
      </PopoverTrigger>

      <PopoverContent class="flex flex-col gap-y-4 p-6 text-sm w-sm z-10 box-border rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg [&:not([data-state])]:hidden will-change-transform data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[state=open]:animate-duration-150 data-[state=closed]:animate-duration-200 data-[side=bottom]:slide-in-from-top-2 data-[side=bottom]:slide-out-to-top-2 data-[side=left]:slide-in-from-right-2 data-[side=left]:slide-out-to-right-2 data-[side=right]:slide-in-from-left-2 data-[side=right]:slide-out-to-left-2 data-[side=top]:slide-in-from-bottom-2 data-[side=top]:slide-out-to-bottom-2">
        <Show when={!file()}>
          <>
            <label>Embed Link</label>
            <input
              class="flex h-9 rounded-md w-full bg-white dark:bg-gray-950 px-3 py-2 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-500 transition border box-border border-gray-200 dark:border-gray-800 border-solid ring-0 ring-transparent focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-0 outline-hidden focus-visible:outline-hidden file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Paste the image link..."
              type="url"
              value={url()}
              onInput={handleUrlChange}
            />
          </>
        </Show>

        <Show when={!url()}>
          <>
            <label>Upload</label>
            <input
              class="flex h-9 rounded-md w-full bg-white dark:bg-gray-950 px-3 py-2 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-500 transition border box-border border-gray-200 dark:border-gray-800 border-solid ring-0 ring-transparent focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-0 outline-hidden focus-visible:outline-hidden file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50"
              accept="image/*"
              type="file"
              onChange={handleFileChange}
            />
          </>
        </Show>

        <Show when={url()}>
          <button
            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white dark:ring-offset-gray-950 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-0 bg-gray-900 dark:bg-gray-50 text-gray-50 dark:text-gray-900 hover:bg-gray-900/90 dark:hover:bg-gray-50/90 h-10 px-4 py-2 w-full"
            type="button"
            onClick={handleSubmit}
          >
            Insert Image
          </button>
        </Show>

        <Show when={file()}>
          <button
            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white dark:ring-offset-gray-950 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-0 bg-gray-900 dark:bg-gray-50 text-gray-50 dark:text-gray-900 hover:bg-gray-900/90 dark:hover:bg-gray-50/90 h-10 px-4 py-2 w-full"
            type="button"
            onClick={handleSubmit}
          >
            Upload Image
          </button>
        </Show>
      </PopoverContent>
    </PopoverRoot>
  )
}
