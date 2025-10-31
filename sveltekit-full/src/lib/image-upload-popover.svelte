<script lang="ts">
import { useEditor } from 'prosekit/svelte'
import {
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from 'prosekit/svelte/popover'
import Button from './button.svelte'
import type { EditorExtension } from './extension'
import { sampleUploader } from './sample-uploader'

export let disabled: boolean
export let tooltip: string

let open = false
let url = ''
let file: File | null = null
const editor = useEditor<EditorExtension>()

const handleFileChange = (event: Event) => {
  const nextFile = (event.target as HTMLInputElement)?.files?.[0] ?? null

  file = nextFile
  if (nextFile) {
    url = ''
  }
}

const handleUrlChange = (event: Event) => {
  const nextUrl = (event.target as HTMLInputElement)?.value ?? ''

  url = nextUrl
  if (nextUrl) {
    file = null
  }
}

const deferResetState = () => {
  setTimeout(() => {
    url = ''
    file = null
  }, 300)
}

const handleSubmit = () => {
  if (url) {
    $editor.commands.insertImage({ src: url })
  } else if (file) {
    $editor.commands.uploadImage({ file, uploader: sampleUploader })
  }
  deferResetState()
  open = false
}

const handleOpenChange = (openValue: boolean) => {
  if (!openValue) {
    deferResetState()
  }
  open = openValue
}
</script>

<PopoverRoot {open} on:OpenChange={handleOpenChange}>
  <PopoverTrigger>
    <Button pressed={open} {disabled} {tooltip}>
      <slot />
    </Button>
  </PopoverTrigger>

  <PopoverContent class="flex flex-col gap-y-4 p-6 text-sm w-sm z-10 box-border rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg [&:not([data-state])]:hidden will-change-transform data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[state=open]:animate-duration-150 data-[state=closed]:animate-duration-200 data-[side=bottom]:slide-in-from-top-2 data-[side=bottom]:slide-out-to-top-2 data-[side=left]:slide-in-from-right-2 data-[side=left]:slide-out-to-right-2 data-[side=right]:slide-in-from-left-2 data-[side=right]:slide-out-to-left-2 data-[side=top]:slide-in-from-bottom-2 data-[side=top]:slide-out-to-bottom-2">
    {#if !file}
      <label for="embed-link-input">Embed Link</label>
      <input
        class="flex h-9 rounded-md w-full bg-white dark:bg-gray-950 px-3 py-2 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-500 transition border box-border border-gray-200 dark:border-gray-800 border-solid ring-0 ring-transparent focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-0 outline-hidden focus-visible:outline-hidden file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50"
        placeholder="Paste the image link..."
        type="url"
        value={url}
        on:input={handleUrlChange}
        id="embed-link-input"
      />
    {/if}
    {#if !url}
      <label for="upload-input">Upload</label>
      <input
        class="flex h-9 rounded-md w-full bg-white dark:bg-gray-950 px-3 py-2 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-500 transition border box-border border-gray-200 dark:border-gray-800 border-solid ring-0 ring-transparent focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-0 outline-hidden focus-visible:outline-hidden file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50"
        accept="image/*"
        type="file"
        on:change={handleFileChange}
        id="upload-input"
      />
    {/if}
    {#if url}
      <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white dark:ring-offset-gray-950 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-0 bg-gray-900 dark:bg-gray-50 text-gray-50 dark:text-gray-900 hover:bg-gray-900/90 dark:hover:bg-gray-50/90 h-10 px-4 py-2 w-full" on:click={handleSubmit}>
        Insert Image
      </button>
    {/if}
    {#if file}
      <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white dark:ring-offset-gray-950 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-0 bg-gray-900 dark:bg-gray-50 text-gray-50 dark:text-gray-900 hover:bg-gray-900/90 dark:hover:bg-gray-50/90 h-10 px-4 py-2 w-full" on:click={handleSubmit}>
        Upload Image
      </button>
    {/if}
  </PopoverContent>
</PopoverRoot>
