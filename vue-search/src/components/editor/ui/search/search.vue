<script setup lang="ts">
import {
  defineSearchQuery,
  type SearchCommandsExtension,
} from 'prosekit/extensions/search'
import { useEditor, useExtension } from 'prosekit/vue'
import { computed, ref } from 'vue'

import { Button } from '../button'

const props = defineProps<{ onClose?: () => void }>()

const showReplace = ref(false)
const searchText = ref('')
const replaceText = ref('')

const editor = useEditor<SearchCommandsExtension>()

const extension = computed(() => {
  if (!searchText.value) {
    return null
  }
  return defineSearchQuery({
    search: searchText.value,
    replace: replaceText.value,
  })
})

useExtension(extension)

function toggleReplace() {
  showReplace.value = !showReplace.value
}

function isPlainEnter(event: KeyboardEvent) {
  return (
    event.key === 'Enter' &&
    !event.shiftKey &&
    !event.metaKey &&
    !event.altKey &&
    !event.ctrlKey &&
    !event.isComposing
  )
}

function isShiftEnter(event: KeyboardEvent) {
  return (
    event.key === 'Enter' &&
    event.shiftKey &&
    !event.metaKey &&
    !event.altKey &&
    !event.ctrlKey &&
    !event.isComposing
  )
}

function handleSearchKeyDown(event: KeyboardEvent) {
  if (isPlainEnter(event)) {
    event.preventDefault()
    editor.value.commands.findNext()
  } else if (isShiftEnter(event)) {
    event.preventDefault()
    editor.value.commands.findPrev()
  }
}

function handleReplaceKeyDown(event: KeyboardEvent) {
  if (isPlainEnter(event)) {
    event.preventDefault()
    editor.value.commands.replaceNext()
  } else if (isShiftEnter(event)) {
    event.preventDefault()
    editor.value.commands.replaceAll()
  }
}
</script>

<template>
  <div
    class="z-2 box-border border-gray-200 dark:border-gray-800 border-solid border-l-0 border-r-0 border-t-0 border-b grid grid-cols-[min-content_1fr_min-content] gap-2 p-2"
  >
    <Button tooltip="Toggle Replace" :on-click="toggleReplace">
      <span
        :data-rotate="showReplace ? '' : undefined"
        class="i-lucide-chevron-right size-5 block transition-transform data-rotate:rotate-90"
      />
    </Button>
    <input
      v-model="searchText"
      placeholder="Search"
      type="text"
      class="flex h-9 rounded-md w-full bg-white dark:bg-gray-950 px-3 py-2 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-500 transition border box-border border-gray-200 dark:border-gray-800 border-solid ring-0 ring-transparent focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-0 outline-hidden focus-visible:outline-hidden file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50 col-start-2"
      @keydown="handleSearchKeyDown"
    />
    <div class="flex items-center justify-between gap-1">
      <Button
        tooltip="Previous (Shift Enter)"
        :on-click="editor.commands.findPrev"
      >
        <span class="i-lucide-arrow-left size-5 block" />
      </Button>
      <Button tooltip="Next (Enter)" :on-click="editor.commands.findNext">
        <span class="i-lucide-arrow-right size-5 block" />
      </Button>
      <Button tooltip="Close" :on-click="props.onClose">
        <span class="i-lucide-x size-5 block" />
      </Button>
    </div>
    <template v-if="showReplace">
      <input
        v-model="replaceText"
        placeholder="Replace"
        type="text"
        class="flex h-9 rounded-md w-full bg-white dark:bg-gray-950 px-3 py-2 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-500 transition border box-border border-gray-200 dark:border-gray-800 border-solid ring-0 ring-transparent focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-0 outline-hidden focus-visible:outline-hidden file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50 col-start-2"
        @keydown="handleReplaceKeyDown"
      />
      <div class="flex items-center justify-between gap-1">
        <Button
          tooltip="Replace (Enter)"
          :on-click="editor.commands.replaceNext"
        >
          Replace
        </Button>
        <Button
          tooltip="Replace All (Shift Enter)"
          :on-click="editor.commands.replaceAll"
        >
          All
        </Button>
      </div>
    </template>
  </div>
</template>
