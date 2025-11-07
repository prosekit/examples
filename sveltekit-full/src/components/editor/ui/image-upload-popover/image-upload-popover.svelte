<script lang="ts">
import type { Uploader } from 'prosekit/extensions/file'
import type { ImageExtension } from 'prosekit/extensions/image'
import { useEditor } from 'prosekit/svelte'
import {
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from 'prosekit/svelte/popover'

import { Button } from '../button'

interface Props {
  uploader: Uploader<string>
  tooltip: string
  disabled: boolean
  children?: import('svelte').Snippet
}

const props: Props = $props()

let open = $state(false)
let url = $state('')
let file = $state<File | null>(null)

const editor = useEditor<ImageExtension>()

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const selectedFile = target.files?.[0]

  if (selectedFile) {
    file = selectedFile
    url = ''
  } else {
    file = null
  }
}

function handleUrlChange(event: Event) {
  const target = event.target as HTMLInputElement
  const inputUrl = target.value

  if (inputUrl) {
    url = inputUrl
    file = null
  } else {
    url = ''
  }
}

function deferResetState() {
  setTimeout(() => {
    url = ''
    file = null
  }, 300)
}

function handleSubmit() {
  if (url) {
    $editor.commands.insertImage({ src: url })
  } else if (file) {
    $editor.commands.uploadImage({ file, uploader: props.uploader })
  }
  open = false
  deferResetState()
}

function handleOpenChange(isOpen: boolean) {
  if (!isOpen) {
    deferResetState()
  }
  open = isOpen
}
</script>

<PopoverRoot {open} onOpenChange={handleOpenChange}>
  <PopoverTrigger>
    <Button pressed={open} disabled={props.disabled} tooltip={props.tooltip}>
      {@render props.children?.()}
    </Button>
  </PopoverTrigger>

  <PopoverContent class="flex flex-col gap-y-4 p-6 text-sm w-sm z-10 box-border rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg [&:not([data-state])]:hidden will-change-transform motion-safe:data-[state=open]:animate-in motion-safe:data-[state=closed]:animate-out motion-safe:data-[state=open]:fade-in-0 motion-safe:data-[state=closed]:fade-out-0 motion-safe:data-[state=open]:zoom-in-95 motion-safe:data-[state=closed]:zoom-out-95 motion-safe:data-[state=open]:animate-duration-150 motion-safe:data-[state=closed]:animate-duration-200 motion-safe:data-[side=bottom]:slide-in-from-top-2 motion-safe:data-[side=bottom]:slide-out-to-top-2 motion-safe:data-[side=left]:slide-in-from-right-2 motion-safe:data-[side=left]:slide-out-to-right-2 motion-safe:data-[side=right]:slide-in-from-left-2 motion-safe:data-[side=right]:slide-out-to-left-2 motion-safe:data-[side=top]:slide-in-from-bottom-2 motion-safe:data-[side=top]:slide-out-to-bottom-2">
    {#if !file}
      <label>Embed Link</label>
      <input
        class="flex h-9 rounded-md w-full bg-white dark:bg-gray-950 px-3 py-2 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-500 transition border box-border border-gray-200 dark:border-gray-800 border-solid ring-0 ring-transparent focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-0 outline-hidden focus-visible:outline-hidden file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50"
        placeholder="Paste the image link..."
        type="url"
        value={url}
        oninput={handleUrlChange}
      />
    {/if}

    {#if !url}
      <label>Upload</label>
      <input
        class="flex h-9 rounded-md w-full bg-white dark:bg-gray-950 px-3 py-2 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-500 transition border box-border border-gray-200 dark:border-gray-800 border-solid ring-0 ring-transparent focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-0 outline-hidden focus-visible:outline-hidden file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50"
        accept="image/*"
        type="file"
        onchange={handleFileChange}
      />
    {/if}

    {#if url}
      <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white dark:ring-offset-gray-950 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-0 bg-gray-900 dark:bg-gray-50 text-gray-50 dark:text-gray-900 hover:bg-gray-900/90 dark:hover:bg-gray-50/90 h-10 px-4 py-2 w-full" onclick={handleSubmit}>
        Insert Image
      </button>
    {/if}

    {#if file}
      <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white dark:ring-offset-gray-950 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-0 bg-gray-900 dark:bg-gray-50 text-gray-50 dark:text-gray-900 hover:bg-gray-900/90 dark:hover:bg-gray-50/90 h-10 px-4 py-2 w-full" onclick={handleSubmit}>
        Upload Image
      </button>
    {/if}
  </PopoverContent>
</PopoverRoot>
