<script setup lang="ts">
import { UploadTask } from 'prosekit/extensions/file'
import { useEditor } from 'prosekit/vue'
import {
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from 'prosekit/vue/popover'
import { computed, ref } from 'vue'

import Button from './button.vue'
import type { EditorExtension } from './extension'
import { sampleUploader } from './sample-uploader'

const props = defineProps<{
  disabled: Boolean
  tooltip: string
}>()

const open = ref(false)
const webUrl = ref('')
const objectUrl = ref('')
const url = computed(() => webUrl.value || objectUrl.value)
const editor = useEditor<EditorExtension>()

function handleFileChange(event: Event) {
  const file = (event.target as HTMLInputElement)?.files?.[0]

  if (file) {
    const uploadTask = new UploadTask({
      file,
      uploader: sampleUploader,
    })
    objectUrl.value = uploadTask.objectURL
    webUrl.value = ''
  } else {
    objectUrl.value = ''
  }
}

function handleWebUrlChange(event: Event) {
  const url = (event.target as HTMLInputElement)?.value

  if (url) {
    webUrl.value = url
    objectUrl.value = ''
  } else {
    webUrl.value = ''
  }
}

function deferResetState() {
  setTimeout(() => {
    webUrl.value = ''
    objectUrl.value = ''
  }, 300)
}

function handleSubmit() {
  editor.value.commands.insertImage({ src: url.value })
  deferResetState()
  open.value = false
}

function handleOpenChange(openValue: boolean) {
  if (!openValue) {
    deferResetState()
  }
  open.value = openValue
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

    <PopoverContent
      class="flex flex-col gap-y-4 p-6 text-sm w-sm z-10 box-border rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg [&:not([data-state])]:hidden will-change-transform data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[state=open]:animate-duration-150 data-[state=closed]:animate-duration-200 data-[side=bottom]:slide-in-from-top-2 data-[side=bottom]:slide-out-to-top-2 data-[side=left]:slide-in-from-right-2 data-[side=left]:slide-out-to-right-2 data-[side=right]:slide-in-from-left-2 data-[side=right]:slide-out-to-left-2 data-[side=top]:slide-in-from-bottom-2 data-[side=top]:slide-out-to-bottom-2"
    >
      <template v-if="!objectUrl">
        <label>Embed Link</label>
        <input
          class="flex h-9 rounded-md w-full bg-white dark:bg-gray-950 px-3 py-2 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-500 transition border box-border border-gray-200 dark:border-gray-800 border-solid ring-0 ring-transparent focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-0 outline-hidden focus-visible:outline-hidden file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Paste the image link..."
          type="url"
          :value="webUrl"
          @input="handleWebUrlChange"
        />
      </template>
      <template v-if="!webUrl">
        <label>Upload</label>
        <input
          class="flex h-9 rounded-md w-full bg-white dark:bg-gray-950 px-3 py-2 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-500 transition border box-border border-gray-200 dark:border-gray-800 border-solid ring-0 ring-transparent focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-0 outline-hidden focus-visible:outline-hidden file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50"
          accept="image/*"
          type="file"
          @input="handleFileChange"
        />
      </template>
      <button
        v-if="url"
        class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white dark:ring-offset-gray-950 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-0 bg-gray-900 dark:bg-gray-50 text-gray-50 dark:text-gray-900 hover:bg-gray-900/90 dark:hover:bg-gray-50/90 h-10 px-4 py-2 w-full"
        @click="handleSubmit"
      >
        Insert Image
      </button>
    </PopoverContent>
  </PopoverRoot>
</template>
