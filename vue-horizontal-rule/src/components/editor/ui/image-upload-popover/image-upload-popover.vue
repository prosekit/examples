<script setup lang="ts">
import type { Uploader } from 'prosekit/extensions/file'
import type { ImageExtension } from 'prosekit/extensions/image'
import { useEditor } from 'prosekit/vue'
import {
  PopoverPopup,
  PopoverPositioner,
  PopoverRoot,
  PopoverTrigger,
} from 'prosekit/vue/popover'
import type { OpenChangeEvent } from 'prosekit/web/popover'
import { ref, useId } from 'vue'

import { Button } from '../button'

const props = defineProps<{
  uploader: Uploader<string>
  tooltip: string
  disabled: boolean
}>()

const open = ref(false)
const url = ref('')
const file = ref<File | null>(null)
const ariaId = useId()

const editor = useEditor<ImageExtension>()

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const selectedFile = target.files?.[0]

  if (selectedFile) {
    file.value = selectedFile
    url.value = ''
  } else {
    file.value = null
  }
}

function handleUrlChange(event: Event) {
  const target = event.target as HTMLInputElement
  const inputUrl = target.value

  if (inputUrl) {
    url.value = inputUrl
    file.value = null
  } else {
    url.value = ''
  }
}

function deferResetState() {
  setTimeout(() => {
    url.value = ''
    file.value = null
  }, 300)
}

function handleSubmit() {
  if (url.value) {
    editor.value.commands.insertImage({ src: url.value })
  } else if (file.value) {
    editor.value.commands.uploadImage({
      file: file.value,
      uploader: props.uploader,
    })
  }
  open.value = false
  deferResetState()
}

function handleOpenChange(event: OpenChangeEvent) {
  if (!event.detail) {
    deferResetState()
  }
  open.value = event.detail
}
</script>

<template>
  <PopoverRoot :open="open" @open-change="handleOpenChange">
    <PopoverTrigger>
      <Button
        :pressed="open"
        :disabled="props.disabled"
        :tooltip="props.tooltip"
      >
        <slot />
      </Button>
    </PopoverTrigger>

    <PopoverPositioner
      placement="bottom"
      class="block overflow-visible bg-transparent w-min h-min z-50 motion-safe:ease-out motion-safe:transition-transform motion-safe:duration-100"
    >
      <PopoverPopup
        class="box-border data-[state=closed]:motion-safe:duration-150 motion-safe:transition-discrete motion-safe:transition-all data-[state=closed]:opacity-0 starting:opacity-0 opacity-100 data-[state=closed]:scale-95 starting:scale-95 scale-100 motion-safe:duration-40 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg flex flex-col gap-y-4 p-6 text-sm w-sm"
      >
        <label v-if="!file" :for="`id-link-${ariaId}`">Embed Link</label>
        <input
          v-if="!file"
          :id="`id-link-${ariaId}`"
          class="flex h-9 rounded-md w-full bg-white dark:bg-gray-950 px-3 py-2 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-500 transition border box-border border-gray-200 dark:border-gray-800 border-solid ring-0 ring-transparent focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-0 outline-hidden focus-visible:outline-hidden file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Paste the image link..."
          type="url"
          :value="url"
          @input="handleUrlChange"
        />

        <label v-if="!url" :for="`id-upload-${ariaId}`">Upload</label>
        <input
          v-if="!url"
          :id="`id-upload-${ariaId}`"
          class="flex h-9 rounded-md w-full bg-white dark:bg-gray-950 px-3 py-2 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-500 transition border box-border border-gray-200 dark:border-gray-800 border-solid ring-0 ring-transparent focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-0 outline-hidden focus-visible:outline-hidden file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50"
          accept="image/*"
          type="file"
          @change="handleFileChange"
        />

        <button
          v-if="url"
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white dark:ring-offset-gray-950 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-0 bg-gray-900 dark:bg-gray-50 text-gray-50 dark:text-gray-900 hover:bg-gray-900/90 dark:hover:bg-gray-50/90 h-10 px-4 py-2 w-full"
          @click="handleSubmit"
        >
          Insert Image
        </button>

        <button
          v-if="file"
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white dark:ring-offset-gray-950 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-0 bg-gray-900 dark:bg-gray-50 text-gray-50 dark:text-gray-900 hover:bg-gray-900/90 dark:hover:bg-gray-50/90 h-10 px-4 py-2 w-full"
          @click="handleSubmit"
        >
          Upload Image
        </button>
      </PopoverPopup>
    </PopoverPositioner>
  </PopoverRoot>
</template>
