<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import { Popover } from 'prosekit/vue/popover'
import { computed, ref, type PropType } from 'vue'
import type { EditorExtension } from './extension'

let props = defineProps({
  open: Boolean,
  onClose: Function as PropType<VoidFunction>,
})

const anchorElement = ref(null)
const webUrl = ref('')
const objectUrl = ref('')
const url = computed(() => webUrl.value || objectUrl.value)
const editor = useEditor<EditorExtension>().value

const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement)?.files?.[0]

  if (file) {
    objectUrl.value = URL.createObjectURL(file)
    webUrl.value = ''
  } else {
    objectUrl.value = ''
  }
}

const handleWebUrlChange = (event: Event) => {
  const url = (event.target as HTMLInputElement)?.value

  if (url) {
    webUrl.value = url
    objectUrl.value = ''
  } else {
    webUrl.value = ''
  }
}

const handleClose = () => {
  webUrl.value = ''
  objectUrl.value = ''
  props.onClose?.()
}

const handleSubmit = () => {
  editor.commands.insertImage({ src: url.value })
  setTimeout(handleClose, 100)
}
</script>

<template>
  <div>
    <div ref="anchorElement">
      <slot></slot>
    </div>
    <Popover
      :reference="anchorElement ?? undefined"
      :active="props.open"
      class='max-w-md space-y-4 p-6 text-sm z-10 box-border rounded border border-solid border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-zinc-800'
    >
      <div v-if="!objectUrl">
        <label>Embed Link</label>
        <input
          class='mt-2 box-border flex h-10 w-full rounded-md px-3 py-2 outline-none transition focus-visible:outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium [&[type=file]]:hover:bg-gray-500/10 border border-solid border-gray-200 dark:border-gray-700 ring-gray-500 ring-offset-0 focus-visible:ring-2 focus-visible:ring-offset-0'
          placeholder="Paste the image link..."
          type="url"
          @input="handleWebUrlChange"
        />
      </div>
      <div v-if="!webUrl">
        <label>Upload</label>
        <input
          class='mt-2 box-border flex h-10 w-full rounded-md px-3 py-2 outline-none transition focus-visible:outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium [&[type=file]]:hover:bg-gray-500/10 border border-solid border-gray-200 dark:border-gray-700 ring-gray-500 ring-offset-0 focus-visible:ring-2 focus-visible:ring-offset-0'
          accept="image/*"
          type="file"
          @input="handleFileChange"
        />
      </div>
      <button v-if="url" class='dark:text-dark box-border inline-flex h-10 w-full items-center justify-center rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-100' @click="handleSubmit">
        Insert Image
      </button>
    </Popover>
  </div>
</template>
