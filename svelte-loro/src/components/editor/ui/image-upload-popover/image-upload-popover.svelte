<script lang="ts">
import type { Uploader } from 'prosekit/extensions/file'
import type { ImageExtension } from 'prosekit/extensions/image'
import { useEditor } from 'prosekit/svelte'
import { PopoverPopup, PopoverPositioner, PopoverRoot, PopoverTrigger } from 'prosekit/svelte/popover'
import type { OpenChangeEvent } from 'prosekit/web/popover'

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
const ariaId = $props.id()

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

function handleOpenChange(event: OpenChangeEvent) {
  if (!event.detail) {
    deferResetState()
  }
  open = event.detail
}
</script>

<PopoverRoot {open} onOpenChange={handleOpenChange}>
  <PopoverTrigger>
    <Button pressed={open} disabled={props.disabled} tooltip={props.tooltip}>
      {@render props.children?.()}
    </Button>
  </PopoverTrigger>

  <PopoverPositioner
    placement="bottom"
    class="block overflow-visible w-min h-min z-50 ease-out transition-transform duration-100 motion-reduce:transition-none"
  ><PopoverPopup class="box-border origin-(--transform-origin) transition-[opacity,scale] transition-discrete motion-reduce:transition-none data-[state=closed]:duration-150 data-[state=closed]:opacity-0 starting:opacity-0 data-[state=closed]:scale-95 starting:scale-95 duration-40 rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg bg-[canvas] flex flex-col gap-y-4 p-6 text-sm w-sm">
      {#if !file}
        <label for="id-link-{ariaId}">Embed Link</label>
        <input
          id="id-link-{ariaId}"
          class="flex h-9 rounded-md w-full bg-[canvas] px-3 py-2 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-500 transition border box-border border-gray-200 dark:border-gray-800 border-solid ring-0 ring-transparent focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-0 outline-hidden focus-visible:outline-hidden file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Paste the image link..."
          type="url"
          value={url}
          oninput={handleUrlChange}
        />
      {/if}

      {#if !url}
        <label for="id-upload-{ariaId}">Upload</label>
        <input
          id="id-upload-{ariaId}"
          class="flex h-9 rounded-md w-full bg-[canvas] px-3 py-2 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-500 transition border box-border border-gray-200 dark:border-gray-800 border-solid ring-0 ring-transparent focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-0 outline-hidden focus-visible:outline-hidden file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50"
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
    </PopoverPopup></PopoverPositioner>
</PopoverRoot>
