import type { Editor } from 'prosekit/core'
import type { TableExtension } from 'prosekit/extensions/table'
import { useEditorDerivedValue } from 'prosekit/solid'
import {
  TableHandleColumnRoot,
  TableHandleColumnTrigger,
  TableHandleDragPreview,
  TableHandleDropIndicator,
  TableHandlePopoverContent,
  TableHandlePopoverItem,
  TableHandleRoot,
  TableHandleRowRoot,
  TableHandleRowTrigger,
} from 'prosekit/solid/table-handle'
import { Show, type JSX } from 'solid-js'

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

interface Props {
  dir?: 'ltr' | 'rtl'
}

export default function TableHandle(props: Props): JSX.Element {
  const state = useEditorDerivedValue(getTableHandleState)

  return (
    <TableHandleRoot class="contents">
      <TableHandleDragPreview />
      <TableHandleDropIndicator />
      <TableHandleColumnRoot class="h-[1.2em] w-[1.5em] translate-y-[80%] flex items-center box-border justify-center bg-white dark:bg-gray-950 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-sm text-gray-500/50 dark:text-gray-500/50 border border-gray-200 dark:border-gray-800 border-solid p-0 overflow-hidden duration-150 transition-discrete transition data-[state=closed]:opacity-0 starting:opacity-0 opacity-100 data-[state=closed]:scale-95 starting:scale-95 scale-100">
        <TableHandleColumnTrigger class="flex items-center justify-center">
          <div class="i-lucide-grip-horizontal size-5 block"></div>
        </TableHandleColumnTrigger>
        <TableHandlePopoverContent class="relative block max-h-100 min-w-32 select-none overflow-auto whitespace-nowrap p-1 z-10 box-border rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg [&:not([data-state])]:hidden">
          <Show when={state().addTableColumnBefore.canExec}>
            <TableHandlePopoverItem
              class="relative min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 data-danger:text-red-500 box-border cursor-default select-none whitespace-nowrap outline-hidden data-focused:bg-gray-100 dark:data-focused:bg-gray-800"
              onSelect={() => state().addTableColumnBefore.command()}
            >
              <span>Insert Left</span>
            </TableHandlePopoverItem>
          </Show>
          <Show when={state().addTableColumnAfter.canExec}>
            <TableHandlePopoverItem
              class="relative min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 data-danger:text-red-500 box-border cursor-default select-none whitespace-nowrap outline-hidden data-focused:bg-gray-100 dark:data-focused:bg-gray-800"
              onSelect={() => state().addTableColumnAfter.command()}
            >
              <span>Insert Right</span>
            </TableHandlePopoverItem>
          </Show>
          <Show when={state().deleteCellSelection.canExec}>
            <TableHandlePopoverItem
              class="relative min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 data-danger:text-red-500 box-border cursor-default select-none whitespace-nowrap outline-hidden data-focused:bg-gray-100 dark:data-focused:bg-gray-800"
              onSelect={() => state().deleteCellSelection.command()}
            >
              <span>Clear Contents</span>
              <span class="text-xs tracking-widest text-gray-500 dark:text-gray-500">
                Del
              </span>
            </TableHandlePopoverItem>
          </Show>
          <Show when={state().deleteTableColumn.canExec}>
            <TableHandlePopoverItem
              class="relative min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 data-danger:text-red-500 box-border cursor-default select-none whitespace-nowrap outline-hidden data-focused:bg-gray-100 dark:data-focused:bg-gray-800"
              onSelect={() => state().deleteTableColumn.command()}
            >
              <span>Delete Column</span>
            </TableHandlePopoverItem>
          </Show>
          <Show when={state().deleteTable.canExec}>
            <TableHandlePopoverItem
              class="relative min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 data-danger:text-red-500 box-border cursor-default select-none whitespace-nowrap outline-hidden data-focused:bg-gray-100 dark:data-focused:bg-gray-800"
              data-danger=""
              onSelect={() => state().deleteTable.command()}
            >
              <span>Delete Table</span>
            </TableHandlePopoverItem>
          </Show>
        </TableHandlePopoverContent>
      </TableHandleColumnRoot>
      <TableHandleRowRoot
        placement={props.dir === 'rtl' ? 'right' : 'left'}
        class="h-[1.5em] w-[1.2em] ltr:translate-x-[80%] rtl:translate-x-[-80%] flex items-center box-border justify-center bg-white dark:bg-gray-950 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-sm text-gray-500/50 dark:text-gray-500/50 border border-gray-200 dark:border-gray-800 border-solid p-0 overflow-hidden duration-150 transition-discrete transition data-[state=closed]:opacity-0 starting:opacity-0 opacity-100 data-[state=closed]:scale-95 starting:scale-95 scale-100"
      >
        <TableHandleRowTrigger class="flex items-center justify-center">
          <div class="i-lucide-grip-vertical size-5 block"></div>
        </TableHandleRowTrigger>
        <TableHandlePopoverContent class="relative block max-h-100 min-w-32 select-none overflow-auto whitespace-nowrap p-1 z-10 box-border rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg [&:not([data-state])]:hidden">
          <Show when={state().addTableRowAbove.canExec}>
            <TableHandlePopoverItem
              class="relative min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 data-danger:text-red-500 box-border cursor-default select-none whitespace-nowrap outline-hidden data-focused:bg-gray-100 dark:data-focused:bg-gray-800"
              onSelect={() => state().addTableRowAbove.command()}
            >
              <span>Insert Above</span>
            </TableHandlePopoverItem>
          </Show>
          <Show when={state().addTableRowBelow.canExec}>
            <TableHandlePopoverItem
              class="relative min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 data-danger:text-red-500 box-border cursor-default select-none whitespace-nowrap outline-hidden data-focused:bg-gray-100 dark:data-focused:bg-gray-800"
              onSelect={() => state().addTableRowBelow.command()}
            >
              <span>Insert Below</span>
            </TableHandlePopoverItem>
          </Show>
          <Show when={state().deleteCellSelection.canExec}>
            <TableHandlePopoverItem
              class="relative min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 data-danger:text-red-500 box-border cursor-default select-none whitespace-nowrap outline-hidden data-focused:bg-gray-100 dark:data-focused:bg-gray-800"
              onSelect={() => state().deleteCellSelection.command()}
            >
              <span>Clear Contents</span>
              <span class="text-xs tracking-widest text-gray-500 dark:text-gray-500">
                Del
              </span>
            </TableHandlePopoverItem>
          </Show>
          <Show when={state().deleteTableRow.canExec}>
            <TableHandlePopoverItem
              class="relative min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 data-danger:text-red-500 box-border cursor-default select-none whitespace-nowrap outline-hidden data-focused:bg-gray-100 dark:data-focused:bg-gray-800"
              onSelect={() => state().deleteTableRow.command()}
            >
              <span>Delete Row</span>
            </TableHandlePopoverItem>
          </Show>
          <Show when={state().deleteTable.canExec}>
            <TableHandlePopoverItem
              class="relative min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 data-danger:text-red-500 box-border cursor-default select-none whitespace-nowrap outline-hidden data-focused:bg-gray-100 dark:data-focused:bg-gray-800"
              data-danger=""
              onSelect={() => state().deleteTable.command()}
            >
              <span>Delete Table</span>
            </TableHandlePopoverItem>
          </Show>
        </TableHandlePopoverContent>
      </TableHandleRowRoot>
    </TableHandleRoot>
  )
}
