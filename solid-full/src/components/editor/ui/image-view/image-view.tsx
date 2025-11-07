import { UploadTask } from 'prosekit/extensions/file'
import type { ImageAttrs } from 'prosekit/extensions/image'
import type { SolidNodeViewProps } from 'prosekit/solid'
import { ResizableHandle, ResizableRoot } from 'prosekit/solid/resizable'
import { createEffect, createSignal, onCleanup, Show, type JSX } from 'solid-js'

export default function ImageView(props: SolidNodeViewProps): JSX.Element {
  const attrs = () => props.node.attrs as ImageAttrs
  const url = () => attrs().src || ''
  const uploading = () => url().startsWith('blob:')

  const [aspectRatio, setAspectRatio] = createSignal<number | undefined>()
  const [error, setError] = createSignal<string | undefined>()
  const [progress, setProgress] = createSignal(0)

  createEffect(() => {
    if (!uploading()) return

    const uploadTask = UploadTask.get<string>(url())
    if (!uploadTask) return

    let canceled = false

    uploadTask.finished.catch((err) => {
      if (canceled) return
      setError(String(err))
    })
    const unsubscribeProgress = uploadTask.subscribeProgress(
      ({ loaded, total }) => {
        if (canceled) return
        setProgress(total ? loaded / total : 0)
      },
    )

    onCleanup(() => {
      canceled = true
      unsubscribeProgress()
    })
  })

  const handleImageLoad = (event: Event) => {
    const img = event.target as HTMLImageElement
    const { naturalWidth, naturalHeight } = img
    const ratio = naturalWidth / naturalHeight
    if (ratio && Number.isFinite(ratio)) {
      setAspectRatio(ratio)
    }
    if (naturalWidth && naturalHeight && (!attrs().width || !attrs().height)) {
      props.setAttrs({ width: naturalWidth, height: naturalHeight })
    }
  }

  return (
    <ResizableRoot
      width={attrs().width ?? undefined}
      height={attrs().height ?? undefined}
      aspectRatio={aspectRatio()}
      onResizeEnd={(event) => props.setAttrs(event.detail)}
      attr:data-selected={props.selected ? '' : undefined}
      class="relative flex items-center justify-center box-border overflow-hidden my-2 group max-h-[600px] max-w-full min-h-[64px] min-w-[64px] outline-2 outline-transparent data-selected:outline-blue-500 outline-solid"
    >
      <Show when={url() && !error()}>
        <img
          src={url()}
          onLoad={handleImageLoad}
          alt="upload preview"
          class="h-full w-full max-w-full max-h-full object-contain"
        />
      </Show>
      <Show when={uploading() && !error()}>
        <div class="absolute bottom-0 left-0 m-1 flex content-center items-center gap-2 rounded-sm bg-gray-800/60 p-1.5 text-xs text-white/80 transition">
          <div class="i-lucide-loader-circle size-4 animate-spin block"></div>
          <div>{Math.round(progress() * 100)}%</div>
        </div>
      </Show>
      <Show when={error()}>
        <div class="absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center gap-4 bg-gray-200 p-2 text-sm dark:bg-gray-800 @container">
          <div class="i-lucide-image-off size-8 block"></div>
          <div class="hidden opacity-80 @xs:block">Failed to upload image</div>
        </div>
      </Show>
      <ResizableHandle
        class="absolute bottom-0 right-0 rounded-sm m-1.5 p-1 transition bg-gray-900/30 active:bg-gray-800/60 hover:bg-gray-800/60 text-white/50 active:text-white/80 active:translate-x-0.5 active:translate-y-0.5 opacity-0 hover:opacity-100 group-hover:opacity-100 group-data-resizing:opacity-100"
        position="bottom-right"
      >
        <div class="i-lucide-arrow-down-right size-4 block"></div>
      </ResizableHandle>
    </ResizableRoot>
  )
}
