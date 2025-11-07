<script setup lang="ts">
import { UploadTask } from 'prosekit/extensions/file'
import type { ImageAttrs } from 'prosekit/extensions/image'
import type { VueNodeViewProps } from 'prosekit/vue'
import {
  ResizableHandle,
  ResizableRoot,
} from 'prosekit/vue/resizable'
import {
  computed,
  onUnmounted,
  ref,
  watch,
} from 'vue'

const props = defineProps<VueNodeViewProps>()

const attrs = computed(() => props.node.value.attrs as ImageAttrs)
const url = computed(() => attrs.value.src || '')
const uploading = computed(() => url.value.startsWith('blob:'))

const aspectRatio = ref<number | undefined>()
const error = ref<string | undefined>()
const progress = ref(0)

watch(uploading, (isUploading) => {
  if (!isUploading) return

  const uploadTask = UploadTask.get<string>(url.value)
  if (!uploadTask) return

  let canceled = false

  uploadTask.finished.catch((err) => {
    if (canceled) return
    error.value = String(err)
  })
  const unsubscribeProgress = uploadTask.subscribeProgress(({ loaded, total }) => {
    if (canceled) return
    progress.value = total ? loaded / total : 0
  })

  onUnmounted(() => {
    canceled = true
    unsubscribeProgress()
  })
}, { immediate: true })

function handleImageLoad(event: Event) {
  const img = event.target as HTMLImageElement
  const { naturalWidth, naturalHeight } = img
  const ratio = naturalWidth / naturalHeight
  if (ratio && Number.isFinite(ratio)) {
    aspectRatio.value = ratio
  }
  if (naturalWidth && naturalHeight && (!attrs.value.width || !attrs.value.height)) {
    props.setAttrs({ width: naturalWidth, height: naturalHeight })
  }
}
</script>

<template>
  <ResizableRoot
    :width="attrs.width ?? undefined"
    :height="attrs.height ?? undefined"
    :aspect-ratio="aspectRatio"
    :data-selected="props.selected.value ? '' : undefined"
    class="relative flex items-center justify-center box-border overflow-hidden my-2 group max-h-[600px] max-w-full min-h-[64px] min-w-[64px] outline-2 outline-transparent data-selected:outline-blue-500 outline-solid"
    @resize-end="(event) => setAttrs(event.detail)"
  >
    <img
      v-if="url && !error"
      :src="url"
      alt="upload preview"
      class="h-full w-full max-w-full max-h-full object-contain"
      @load="handleImageLoad"
    />
    <div v-if="uploading && !error" class="absolute bottom-0 left-0 m-1 flex content-center items-center gap-2 rounded-sm bg-gray-800/60 p-1.5 text-xs text-white/80 transition">
      <div class="i-lucide-loader-circle size-4 animate-spin block"></div>
      <div>{{ Math.round(progress * 100) }}%</div>
    </div>
    <div v-if="error" class="absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center gap-4 bg-gray-200 p-2 text-sm dark:bg-gray-800 @container">
      <div class="i-lucide-image-off size-8 block"></div>
      <div class="hidden opacity-80 @xs:block">
        Failed to upload image
      </div>
    </div>
    <ResizableHandle
      class="absolute bottom-0 right-0 rounded-sm m-1.5 p-1 transition bg-gray-900/30 active:bg-gray-800/60 hover:bg-gray-800/60 text-white/50 active:text-white/80 active:translate-x-0.5 active:translate-y-0.5 opacity-0 hover:opacity-100 group-hover:opacity-100 group-data-resizing:opacity-100"
      position="bottom-right"
    >
      <div class="i-lucide-arrow-down-right size-4 block"></div>
    </ResizableHandle>
  </ResizableRoot>
</template>
