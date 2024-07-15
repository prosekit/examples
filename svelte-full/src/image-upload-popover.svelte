<script lang="ts">
import { useEditor } from 'prosekit/svelte'
import {
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from 'prosekit/svelte/popover'
import Button from './button.svelte'
import type { EditorExtension } from './extension'

export let disabled: boolean
export let tooltip: string

let open = false
let webUrl = ''
let objectUrl = ''
$: url = webUrl || objectUrl
const editor = useEditor<EditorExtension>()

const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement)?.files?.[0]

  if (file) {
    objectUrl = URL.createObjectURL(file)
    webUrl = ''
  } else {
    objectUrl = ''
  }
}

const handleWebUrlChange = (event: Event) => {
  const url = (event.target as HTMLInputElement)?.value

  if (url) {
    webUrl = url
    objectUrl = ''
  } else {
    webUrl = ''
  }
}

const deferResetState = () => {
  setTimeout(() => {
    webUrl = ''
    objectUrl = ''
  }, 300)
}

const handleSubmit = () => {
  $editor.commands.insertImage({ src: url })
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

  <PopoverContent class='flex flex-col gap-y-4 p-6 text-sm w-sm z-10 box-border rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-neutral-900 shadow-lg [&:not([data-state])]:hidden will-change-transform data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[state=open]:animate-duration-150 data-[state=closed]:animate-duration-200 data-[side=bottom]:slide-in-from-top-2 data-[side=bottom]:slide-out-to-top-2 data-[side=left]:slide-in-from-right-2 data-[side=left]:slide-out-to-right-2 data-[side=right]:slide-in-from-left-2 data-[side=right]:slide-out-to-left-2 data-[side=top]:slide-in-from-bottom-2 data-[side=top]:slide-out-to-bottom-2'>
    {#if !objectUrl}
      <label for="embed-link-input">Embed Link</label>
      <input
        class='flex h-9 rounded-md w-full bg-white dark:bg-neutral-900 px-3 py-2 text-sm placeholder:text-zinc-500 dark:placeholder:text-zinc-500 transition border box-border border-zinc-200 dark:border-zinc-800 border-solid ring-0 ring-transparent focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-300 focus-visible:ring-offset-0 outline-none focus-visible:outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50'
        placeholder="Paste the image link..."
        type="url"
        value={webUrl}
        on:input={handleWebUrlChange}
        id="embed-link-input"
      />
    {/if}
    {#if !webUrl}
      <label for="upload-input">Upload</label>
      <input
        class='flex h-9 rounded-md w-full bg-white dark:bg-neutral-900 px-3 py-2 text-sm placeholder:text-zinc-500 dark:placeholder:text-zinc-500 transition border box-border border-zinc-200 dark:border-zinc-800 border-solid ring-0 ring-transparent focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-300 focus-visible:ring-offset-0 outline-none focus-visible:outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50'
        accept="image/*"
        type="file"
        on:input={handleFileChange}
      />
    {/if}
    {#if url}
      <button class='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white dark:ring-offset-neutral-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-0 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 hover:bg-zinc-900/90 dark:hover:bg-zinc-50/90 h-10 px-4 py-2 w-full' on:click={handleSubmit}>
        Insert Image
      </button>
    {/if}
  </PopoverContent>
</PopoverRoot>
