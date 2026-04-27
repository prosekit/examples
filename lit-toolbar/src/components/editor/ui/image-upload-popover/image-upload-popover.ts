import '../button/index'

import { html, LitElement, nothing, type PropertyDeclaration } from 'lit'
import type { Editor } from 'prosekit/core'
import type { Uploader } from 'prosekit/extensions/file'
import type { ImageExtension } from 'prosekit/extensions/image'
import type { OpenChangeEvent } from 'prosekit/lit/popover'

let imageUploadId = 0

class LitImageUploadPopover extends LitElement {
  static override properties = {
    editor: { attribute: false } satisfies PropertyDeclaration<Editor>,
    uploader: { attribute: false } satisfies PropertyDeclaration<
      Uploader<string>
    >,
    tooltip: { type: String },
    disabled: { type: Boolean },
    icon: { type: String },
  }

  editor?: Editor<ImageExtension>
  uploader?: Uploader<string>
  tooltip = ''
  disabled = false
  icon = ''

  private open = false
  private url = ''
  private file: File | null = null
  private ariaId = `lit-image-upload-${imageUploadId++}`

  override createRenderRoot() {
    return this
  }

  override connectedCallback() {
    super.connectedCallback()
    this.classList.add('contents')
  }

  private handleOpenChange = (event: OpenChangeEvent) => {
    if (!event.detail) {
      this.deferResetState()
    }

    this.open = event.detail
    this.requestUpdate()
  }

  private handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    const selectedFile = target.files?.[0]

    if (selectedFile) {
      this.file = selectedFile
      this.url = ''
    } else {
      this.file = null
    }

    this.requestUpdate()
  }

  private handleUrlChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    const inputUrl = target.value

    if (inputUrl) {
      this.url = inputUrl
      this.file = null
    } else {
      this.url = ''
    }

    this.requestUpdate()
  }

  private deferResetState() {
    setTimeout(() => {
      this.url = ''
      this.file = null
      this.requestUpdate()
    }, 300)
  }

  private handleSubmit = () => {
    const editor = this.editor
    if (!editor) return

    if (this.url) {
      editor.commands.insertImage({ src: this.url })
    } else if (this.file && this.uploader) {
      editor.commands.uploadImage({ file: this.file, uploader: this.uploader })
    }

    this.open = false
    this.deferResetState()
    this.requestUpdate()
  }

  override render() {
    return html`
      <prosekit-popover-root
        .open=${this.open}
        @open-change=${this.handleOpenChange}
      >
        <prosekit-popover-trigger>
          <lit-editor-button
            .pressed=${this.open}
            .disabled=${this.disabled}
            .tooltip=${this.tooltip}
            .icon=${this.icon}
          ></lit-editor-button>
        </prosekit-popover-trigger>

        <prosekit-popover-positioner
          placement="bottom"
          class="block overflow-visible w-min h-min z-50 ease-out transition-transform duration-100 motion-reduce:transition-none"
        >
          <prosekit-popover-popup
            class="box-border origin-(--transform-origin) transition-[opacity,scale] transition-discrete motion-reduce:transition-none data-[state=closed]:duration-150 data-[state=closed]:opacity-0 starting:opacity-0 data-[state=closed]:scale-95 starting:scale-95 duration-40 rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg bg-[canvas] flex flex-col gap-y-4 p-6 text-sm w-sm"
          >
            ${!this.file
              ? html`
                  <label for="id-link-${this.ariaId}">Embed Link</label>
                  <input
                    id="id-link-${this.ariaId}"
                    class="flex h-9 rounded-md w-full bg-[canvas] px-3 py-2 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-500 transition border box-border border-gray-200 dark:border-gray-800 border-solid ring-0 ring-transparent focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-0 outline-hidden focus-visible:outline-hidden file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Paste the image link..."
                    type="url"
                    .value=${this.url}
                    @input=${this.handleUrlChange}
                  />
                `
              : nothing}
            ${!this.url
              ? html`
                  <label for="id-upload-${this.ariaId}">Upload</label>
                  <input
                    id="id-upload-${this.ariaId}"
                    class="flex h-9 rounded-md w-full bg-[canvas] px-3 py-2 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-500 transition border box-border border-gray-200 dark:border-gray-800 border-solid ring-0 ring-transparent focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-0 outline-hidden focus-visible:outline-hidden file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50"
                    accept="image/*"
                    type="file"
                    @change=${this.handleFileChange}
                  />
                `
              : nothing}
            ${this.url
              ? html`
                  <button
                    class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white dark:ring-offset-gray-950 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-0 bg-gray-900 dark:bg-gray-50 text-gray-50 dark:text-gray-900 hover:bg-gray-900/90 dark:hover:bg-gray-50/90 h-10 px-4 py-2 w-full"
                    @click=${this.handleSubmit}
                  >
                    Insert Image
                  </button>
                `
              : nothing}
            ${this.file
              ? html`
                  <button
                    class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white dark:ring-offset-gray-950 transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-0 bg-gray-900 dark:bg-gray-50 text-gray-50 dark:text-gray-900 hover:bg-gray-900/90 dark:hover:bg-gray-50/90 h-10 px-4 py-2 w-full"
                    @click=${this.handleSubmit}
                  >
                    Upload Image
                  </button>
                `
              : nothing}
          </prosekit-popover-popup>
        </prosekit-popover-positioner>
      </prosekit-popover-root>
    `
  }
}

customElements.define('lit-editor-image-upload-popover', LitImageUploadPopover)

declare global {
  interface HTMLElementTagNameMap {
    'lit-editor-image-upload-popover': LitImageUploadPopover
  }
}
