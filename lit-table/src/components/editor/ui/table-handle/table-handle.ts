import 'prosekit/lit/table-handle'
import 'prosekit/web/menu'

import { ContextConsumer } from '@lit/context'
import {
  html,
  LitElement,
  nothing,
  type PropertyDeclaration,
  type PropertyValues,
} from 'lit'
import type { Editor } from 'prosekit/core'
import { defineUpdateHandler } from 'prosekit/core'
import type { TableExtension } from 'prosekit/extensions/table'

import { editorContext } from '../editor-context'

function getTableHandleState(editor: Editor<TableExtension>) {
  return {
    addTableColumnBefore: {
      canExec: editor.commands.addTableColumnBefore.canExec(),
      command: () => editor.commands.addTableColumnBefore(),
    },
    addTableColumnAfter: {
      canExec: editor.commands.addTableColumnAfter.canExec(),
      command: () => editor.commands.addTableColumnAfter(),
    },
    deleteCellSelection: {
      canExec: editor.commands.deleteCellSelection.canExec(),
      command: () => editor.commands.deleteCellSelection(),
    },
    deleteTableColumn: {
      canExec: editor.commands.deleteTableColumn.canExec(),
      command: () => editor.commands.deleteTableColumn(),
    },
    addTableRowAbove: {
      canExec: editor.commands.addTableRowAbove.canExec(),
      command: () => editor.commands.addTableRowAbove(),
    },
    addTableRowBelow: {
      canExec: editor.commands.addTableRowBelow.canExec(),
      command: () => editor.commands.addTableRowBelow(),
    },
    deleteTableRow: {
      canExec: editor.commands.deleteTableRow.canExec(),
      command: () => editor.commands.deleteTableRow(),
    },
    deleteTable: {
      canExec: editor.commands.deleteTable.canExec(),
      command: () => editor.commands.deleteTable(),
    },
  }
}

class LitTableHandle extends LitElement {
  static override properties = {
    dir: { type: String } satisfies PropertyDeclaration<'ltr' | 'rtl'>,
  }

  override dir: string = ''

  private editorConsumer = new ContextConsumer(this, {
    context: editorContext,
    subscribe: true,
  })

  private removeUpdateExtension?: VoidFunction

  override createRenderRoot() {
    return this
  }

  override connectedCallback() {
    super.connectedCallback()
    this.classList.add('contents')
    this.attachEditorListener()
  }

  override disconnectedCallback() {
    this.detachEditorListener()
    super.disconnectedCallback()
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties)
    this.attachEditorListener()
  }

  private attachEditorListener() {
    this.detachEditorListener()

    const editor = this.editorConsumer.value
    if (!editor) return

    this.removeUpdateExtension = editor.use(
      defineUpdateHandler(() => this.requestUpdate()),
    )
  }

  private detachEditorListener() {
    this.removeUpdateExtension?.()
    this.removeUpdateExtension = undefined
  }

  override render() {
    const editor = this.editorConsumer.value as
      | Editor<TableExtension>
      | undefined
    if (!editor) {
      return nothing
    }

    const state = getTableHandleState(editor)
    const placement = this.dir === 'rtl' ? 'right' : 'left'

    return html`
      <prosekit-table-handle-root .editor=${editor}>
        <prosekit-table-handle-drag-preview
          .editor=${editor}
        ></prosekit-table-handle-drag-preview>
        <prosekit-table-handle-drop-indicator
          .editor=${editor}
        ></prosekit-table-handle-drop-indicator>
        <prosekit-table-handle-column-positioner
          .editor=${editor}
          class="block overflow-visible w-min h-min z-50 ease-out transition-transform duration-100 motion-reduce:transition-none"
        >
          <prosekit-table-handle-column-popup
            class="translate-y-[50%] flex box-border origin-(--transform-origin) transition-[opacity,scale] transition-discrete motion-reduce:transition-none duration-100 data-[state=closed]:duration-150 data-[state=closed]:opacity-0 starting:opacity-0 data-[state=closed]:scale-95 starting:scale-95"
          >
            <prosekit-table-handle-column-menu-root>
              <prosekit-table-handle-column-menu-trigger
                .editor=${editor}
                class="h-4.5 w-6 flex items-center box-border justify-center bg-[canvas] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-sm text-gray-500/50 dark:text-gray-400/50 border border-gray-200 dark:border-gray-800 border-solid p-0 transition-colors overflow-clip"
              >
                <div
                  class="i-lucide-grip-horizontal size-5 min-h-5 min-w-5 block"
                ></div>
              </prosekit-table-handle-column-menu-trigger>
              <prosekit-menu-positioner
                class="block overflow-visible w-min h-min z-50 ease-out transition-transform duration-100 motion-reduce:transition-none"
              >
                <prosekit-menu-popup
                  class="box-border origin-(--transform-origin) transition-[opacity,scale] transition-discrete motion-reduce:transition-none data-[state=closed]:duration-150 data-[state=closed]:opacity-0 starting:opacity-0 data-[state=closed]:scale-95 starting:scale-95 duration-40 rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg bg-[canvas] relative flex flex-col max-h-100 min-w-32 select-none overflow-auto whitespace-nowrap p-1 outline-none"
                >
                  ${state.addTableColumnBefore.canExec
                    ? html`
                        <prosekit-menu-item
                          class="relative min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 data-danger:text-red-500 box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800"
                          @select=${state.addTableColumnBefore.command}
                        >
                          <span>Insert Left</span>
                        </prosekit-menu-item>
                      `
                    : nothing}
                  ${state.addTableColumnAfter.canExec
                    ? html`
                        <prosekit-menu-item
                          class="relative min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 data-danger:text-red-500 box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800"
                          @select=${state.addTableColumnAfter.command}
                        >
                          <span>Insert Right</span>
                        </prosekit-menu-item>
                      `
                    : nothing}
                  ${state.deleteCellSelection.canExec
                    ? html`
                        <prosekit-menu-item
                          class="relative min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 data-danger:text-red-500 box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800"
                          @select=${state.deleteCellSelection.command}
                        >
                          <span>Clear Contents</span>
                          <span
                            class="text-xs tracking-widest text-gray-500 dark:text-gray-500"
                          >
                            Del
                          </span>
                        </prosekit-menu-item>
                      `
                    : nothing}
                  ${state.deleteTableColumn.canExec
                    ? html`
                        <prosekit-menu-item
                          class="relative min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 data-danger:text-red-500 box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800"
                          @select=${state.deleteTableColumn.command}
                        >
                          <span>Delete Column</span>
                        </prosekit-menu-item>
                      `
                    : nothing}
                  ${state.deleteTable.canExec
                    ? html`
                        <prosekit-menu-item
                          class="relative min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 data-danger:text-red-500 box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800"
                          data-danger=""
                          @select=${state.deleteTable.command}
                        >
                          <span>Delete Table</span>
                        </prosekit-menu-item>
                      `
                    : nothing}
                </prosekit-menu-popup>
              </prosekit-menu-positioner>
            </prosekit-table-handle-column-menu-root>
          </prosekit-table-handle-column-popup>
        </prosekit-table-handle-column-positioner>
        <prosekit-table-handle-row-positioner
          .editor=${editor}
          .placement=${placement}
          class="block overflow-visible w-min h-min z-50 ease-out transition-transform duration-100 motion-reduce:transition-none"
        >
          <prosekit-table-handle-row-popup
            class="ltr:translate-x-[50%] rtl:translate-x-[-50%] flex box-border origin-(--transform-origin) transition-[opacity,scale] transition-discrete motion-reduce:transition-none duration-100 data-[state=closed]:duration-150 data-[state=closed]:opacity-0 starting:opacity-0 data-[state=closed]:scale-95 starting:scale-95"
          >
            <prosekit-table-handle-row-menu-root>
              <prosekit-table-handle-row-menu-trigger
                .editor=${editor}
                class="h-6 w-4.5 flex items-center box-border justify-center bg-[canvas] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-sm text-gray-500/50 dark:text-gray-400/50 border border-gray-200 dark:border-gray-800 border-solid p-0 transition-colors overflow-clip"
              >
                <div
                  class="i-lucide-grip-vertical size-5 min-h-5 min-w-5 block"
                ></div>
              </prosekit-table-handle-row-menu-trigger>
              <prosekit-menu-positioner
                class="block overflow-visible w-min h-min z-50 ease-out transition-transform duration-100 motion-reduce:transition-none"
              >
                <prosekit-menu-popup
                  class="box-border origin-(--transform-origin) transition-[opacity,scale] transition-discrete motion-reduce:transition-none data-[state=closed]:duration-150 data-[state=closed]:opacity-0 starting:opacity-0 data-[state=closed]:scale-95 starting:scale-95 duration-40 rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg bg-[canvas] relative flex flex-col max-h-100 min-w-32 select-none overflow-auto whitespace-nowrap p-1 outline-none"
                >
                  ${state.addTableRowAbove.canExec
                    ? html`
                        <prosekit-menu-item
                          class="relative min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 data-danger:text-red-500 box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800"
                          @select=${state.addTableRowAbove.command}
                        >
                          <span>Insert Above</span>
                        </prosekit-menu-item>
                      `
                    : nothing}
                  ${state.addTableRowBelow.canExec
                    ? html`
                        <prosekit-menu-item
                          class="relative min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 data-danger:text-red-500 box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800"
                          @select=${state.addTableRowBelow.command}
                        >
                          <span>Insert Below</span>
                        </prosekit-menu-item>
                      `
                    : nothing}
                  ${state.deleteCellSelection.canExec
                    ? html`
                        <prosekit-menu-item
                          class="relative min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 data-danger:text-red-500 box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800"
                          @select=${state.deleteCellSelection.command}
                        >
                          <span>Clear Contents</span>
                          <span
                            class="text-xs tracking-widest text-gray-500 dark:text-gray-500"
                          >
                            Del
                          </span>
                        </prosekit-menu-item>
                      `
                    : nothing}
                  ${state.deleteTableRow.canExec
                    ? html`
                        <prosekit-menu-item
                          class="relative min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 data-danger:text-red-500 box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800"
                          @select=${state.deleteTableRow.command}
                        >
                          <span>Delete Row</span>
                        </prosekit-menu-item>
                      `
                    : nothing}
                  ${state.deleteTable.canExec
                    ? html`
                        <prosekit-menu-item
                          class="relative min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 data-danger:text-red-500 box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800"
                          data-danger=""
                          @select=${state.deleteTable.command}
                        >
                          <span>Delete Table</span>
                        </prosekit-menu-item>
                      `
                    : nothing}
                </prosekit-menu-popup>
              </prosekit-menu-positioner>
            </prosekit-table-handle-row-menu-root>
          </prosekit-table-handle-row-popup>
        </prosekit-table-handle-row-positioner>
      </prosekit-table-handle-root>
    `
  }
}

customElements.define('lit-editor-table-handle', LitTableHandle)

declare global {
  interface HTMLElementTagNameMap {
    'lit-editor-table-handle': LitTableHandle
  }
}
