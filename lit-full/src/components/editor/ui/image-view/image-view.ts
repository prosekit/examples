import { html, render } from 'lit'
import type { Extension } from 'prosekit/core'
import { defineNodeView } from 'prosekit/core'
import { UploadTask } from 'prosekit/extensions/file'
import type { ImageAttrs } from 'prosekit/extensions/image'
import {
  registerResizableHandleElement,
  registerResizableRootElement,
  type ResizeEndEvent,
} from 'prosekit/lit/resizable'
import type { ProseMirrorNode } from 'prosekit/pm/model'
import type { Decoration, EditorView } from 'prosekit/pm/view'

interface ResizeEndEventDetail {
  width: number
  height: number
}

class ImageNodeView {
  dom: HTMLElement
  private node: ProseMirrorNode
  private view: EditorView
  private getPos: () => number | undefined
  private selected = false

  private aspectRatio: number | undefined
  private error: string | undefined
  private progress = 0
  private unsubscribeProgress?: VoidFunction
  private canceled = false
  private lastUrl = ''

  constructor(
    node: ProseMirrorNode,
    view: EditorView,
    getPos: () => number | undefined,
  ) {
    this.node = node
    this.view = view
    this.getPos = getPos

    this.dom = document.createElement('div')
    this.dom.setAttribute('data-node-view-root', 'true')

    registerResizableRootElement()
    registerResizableHandleElement()

    this.sync()
  }

  private setAttrs(attrs: Partial<ImageAttrs>) {
    const pos = this.getPos()
    if (typeof pos !== 'number') return
    const next: ImageAttrs = { ...(this.node.attrs as ImageAttrs), ...attrs }
    this.view.dispatch(this.view.state.tr.setNodeMarkup(pos, undefined, next))
  }

  private handleResizeEnd = (event: Event) => {
    const detail = (event as ResizeEndEvent).detail as ResizeEndEventDetail
    this.setAttrs({ width: detail.width, height: detail.height })
  }

  private handleImageLoad = (event: Event) => {
    const img = event.target as HTMLImageElement
    const { naturalWidth, naturalHeight } = img
    const ratio = naturalWidth / naturalHeight
    if (ratio && Number.isFinite(ratio)) {
      this.aspectRatio = ratio
    }
    const attrs = this.node.attrs as ImageAttrs
    if (naturalWidth && naturalHeight && (!attrs.width || !attrs.height)) {
      this.setAttrs({ width: naturalWidth, height: naturalHeight })
    } else {
      this.sync()
    }
  }

  private subscribeUpload(url: string) {
    this.unsubscribeUpload()
    this.canceled = false

    const uploadTask = UploadTask.get<string>(url)
    if (!uploadTask) return

    uploadTask.finished.catch((err) => {
      if (this.canceled) return
      this.error = String(err)
      this.sync()
    })
    this.unsubscribeProgress = uploadTask.subscribeProgress(
      ({ loaded, total }) => {
        if (this.canceled) return
        this.progress = total ? loaded / total : 0
        this.sync()
      },
    )
  }

  private unsubscribeUpload() {
    this.canceled = true
    this.unsubscribeProgress?.()
    this.unsubscribeProgress = undefined
  }

  private sync() {
    const attrs = this.node.attrs as ImageAttrs
    const url = attrs.src || ''
    const uploading = url.startsWith('blob:')

    if (url !== this.lastUrl) {
      this.lastUrl = url
      this.error = undefined
      this.progress = 0
      if (uploading) {
        this.subscribeUpload(url)
      } else {
        this.unsubscribeUpload()
      }
    }

    render(
      html`
        <prosekit-resizable-root
          class="relative flex items-center justify-center box-border overflow-hidden my-2 group max-h-150 max-w-full min-h-16 min-w-16 outline-2 outline-transparent data-selected:outline-blue-500 outline-solid"
          .width=${attrs.width ?? null}
          .height=${attrs.height ?? null}
          .aspectRatio=${this.aspectRatio ?? null}
          ?data-selected=${this.selected}
          @resizeEnd=${this.handleResizeEnd}
        >
          ${url && !this.error
            ? html`
                <img
                  src=${url}
                  alt="upload preview"
                  class="h-full w-full max-w-full max-h-full object-contain"
                  @load=${this.handleImageLoad}
                />
              `
            : ''}
          ${uploading && !this.error
            ? html`
                <div
                  class="absolute bottom-0 left-0 m-1 flex content-center items-center gap-2 rounded-sm bg-gray-800/60 p-1.5 text-xs text-white/80 transition"
                >
                  <div
                    class="i-lucide-loader-circle size-4 animate-spin block"
                  ></div>
                  <div>${Math.round(this.progress * 100)}%</div>
                </div>
              `
            : ''}
          ${this.error
            ? html`
                <div
                  class="absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center gap-4 bg-gray-200 p-2 text-sm dark:bg-gray-800 @container"
                >
                  <div class="i-lucide-image-off size-8 block"></div>
                  <div class="hidden opacity-80 @xs:block">
                    Failed to upload image
                  </div>
                </div>
              `
            : ''}
          <prosekit-resizable-handle
            class="absolute bottom-0 right-0 rounded-sm m-1.5 p-1 transition bg-gray-900/30 active:bg-gray-800/60 hover:bg-gray-800/60 text-white/50 active:text-white/80 active:translate-x-0.5 active:translate-y-0.5 opacity-0 hover:opacity-100 group-hover:opacity-100 group-data-resizing:opacity-100"
          >
            <div class="i-lucide-arrow-down-right size-4 block"></div>
          </prosekit-resizable-handle>
        </prosekit-resizable-root>
      `,
      this.dom,
    )
  }

  update(node: ProseMirrorNode, _decorations: readonly Decoration[]) {
    if (node.type !== this.node.type) return false
    this.node = node
    this.sync()
    return true
  }

  selectNode() {
    this.selected = true
    this.sync()
  }

  deselectNode() {
    this.selected = false
    this.sync()
  }

  destroy() {
    this.unsubscribeUpload()
    render(null, this.dom)
  }
}

export function defineImageView(): Extension {
  return defineNodeView({
    name: 'image',
    constructor: (node, view, getPos) => new ImageNodeView(node, view, getPos),
  })
}
