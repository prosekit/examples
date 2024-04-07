<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
import { PopoverTrigger } from 'prosekit/vue/popover-trigger'
import { PopoverRoot } from 'prosekit/vue/popover-root'
import { PopoverContent } from 'prosekit/vue/popover-content'
import { computed, ref } from 'vue'
import type { EditorExtension } from './extension'
import Toggle from './toggle.vue'

const open = ref(false)
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

const deferResetState = () => {
  setTimeout(() => {
    webUrl.value = ''
    objectUrl.value = ''
  }, 300)
}

const handleSubmit = () => {
  editor.commands.insertImage({ src: url.value })
  deferResetState()
  open.value = false
}

const handleOpenChange = (openValue: boolean) => {
  if (!openValue) {
    deferResetState()
  }
  open.value = openValue
}
</script>

<template>
  <PopoverRoot :open="open" :onOpenChange="handleOpenChange">
    <Toggle
      :as="PopoverTrigger"
      :pressed="open"
      :disabled="!editor.commands.insertImage.canApply()"
    >
      <slot />
    </Toggle>

    <PopoverContent class='flex flex-col gap-y-4 p-6 text-sm w-sm z-10 box-border rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-neutral-900 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=open]:animate-duration-150 data-[state=closed]:animate-duration-200 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'>
      <template v-if="!objectUrl">
        <label>Embed Link</label>
        <input
          class='flex h-10 rounded-md w-full bg-white dark:bg-neutral-900 px-3 py-2 text-sm placeholder:text-zinc-500 dark:placeholder:text-zinc-500 transition border box-border border-zinc-200 dark:border-zinc-800 border-solid ring-0 ring-transparent focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-300 focus-visible:ring-offset-0 outline-none focus-visible:outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50'
          placeholder="Paste the image link..."
          type="url"
          :value="webUrl"
          @input="handleWebUrlChange"
        />
      </template>
      <template v-if="!webUrl">
        <label>Upload</label>
        <input
          class='flex h-10 rounded-md w-full bg-white dark:bg-neutral-900 px-3 py-2 text-sm placeholder:text-zinc-500 dark:placeholder:text-zinc-500 transition border box-border border-zinc-200 dark:border-zinc-800 border-solid ring-0 ring-transparent focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-300 focus-visible:ring-offset-0 outline-none focus-visible:outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50'
          accept="image/*"
          type="file"
          @input="handleFileChange"
        />
      </template>
      <button v-if="url" class='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white dark:ring-offset-neutral-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 hover:bg-zinc-900/90 dark:hover:bg-zinc-50/90 h-10 px-4 py-2 w-full' @click="handleSubmit">
        Insert Image
      </button>
    </PopoverContent>
  </PopoverRoot>
</template>
