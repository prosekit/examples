import { useEditor } from 'prosekit/react'
import {
  TableHandleColumnRoot,
  TableHandleColumnTrigger,
  TableHandlePopoverContent,
  TableHandlePopoverItem,
  TableHandleRoot,
  TableHandleRowRoot,
  TableHandleRowTrigger,
} from 'prosekit/react/table-handle'

import type { EditorExtension } from './extension'

export function TableHandle() {
  const editor = useEditor<EditorExtension>({ update: true })

  return (
    <TableHandleRoot className="contents">
      <TableHandleColumnRoot className="flex items-center box-border justify-center h-[1.2em] w-[1.5em] bg-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-zinc-500/50 dark:text-zinc-500/50 translate-y-3 border border-zinc-200 dark:border-zinc-800 border-solid [&:not([data-state])]:hidden will-change-transform data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[state=open]:animate-duration-150 data-[state=closed]:animate-duration-200">
        <TableHandleColumnTrigger>
          <div className="i-lucide-grip-horizontal h-5 w-5"></div>
        </TableHandleColumnTrigger>
        <TableHandlePopoverContent className="relative block max-h-[400px] min-w-[120px] select-none overflow-auto whitespace-nowrap p-1 z-10 box-border rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-neutral-900 shadow-lg [&:not([data-state])]:hidden">
          <TableHandlePopoverItem
            className="relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-zinc-100 dark:data-[focused]:bg-zinc-800"
            onSelect={editor.commands.addTableColumnBefore}
            disabled={!editor.commands.addTableColumnBefore.canExec()}
          >
            Insert Left
          </TableHandlePopoverItem>
          <TableHandlePopoverItem
            className="relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-zinc-100 dark:data-[focused]:bg-zinc-800"
            onSelect={editor.commands.addTableColumnAfter}
            disabled={!editor.commands.addTableColumnAfter.canExec()}
          >
            Insert Right
          </TableHandlePopoverItem>
          <TableHandlePopoverItem
            className="relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-zinc-100 dark:data-[focused]:bg-zinc-800"
            onSelect={editor.commands.deleteCellSelection}
            disabled={!editor.commands.deleteCellSelection.canExec()}
          >
            Clear Contents
          </TableHandlePopoverItem>
          <TableHandlePopoverItem
            className="relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-zinc-100 dark:data-[focused]:bg-zinc-800"
            onSelect={editor.commands.deleteTableColumn}
            disabled={!editor.commands.deleteTableColumn.canExec()}
          >
            Delete Column
          </TableHandlePopoverItem>
        </TableHandlePopoverContent>
      </TableHandleColumnRoot>
      <TableHandleRowRoot className="flex items-center box-border justify-center h-[1.5em] w-[1.2em] bg-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-zinc-500/50 dark:text-zinc-500/50 translate-x-3 border border-zinc-200 dark:border-zinc-800 border-solid [&:not([data-state])]:hidden will-change-transform data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[state=open]:animate-duration-150 data-[state=closed]:animate-duration-200">
        <TableHandleRowTrigger>
          <div className="i-lucide-grip-vertical h-5 w-5"></div>
        </TableHandleRowTrigger>
        <TableHandlePopoverContent className="relative block max-h-[400px] min-w-[120px] select-none overflow-auto whitespace-nowrap p-1 z-10 box-border rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-neutral-900 shadow-lg [&:not([data-state])]:hidden">
          <TableHandlePopoverItem
            className="relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-zinc-100 dark:data-[focused]:bg-zinc-800"
            onSelect={editor.commands.addTableRowAbove}
            disabled={!editor.commands.addTableRowAbove.canExec()}
          >
            Insert Above
          </TableHandlePopoverItem>
          <TableHandlePopoverItem
            className="relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-zinc-100 dark:data-[focused]:bg-zinc-800"
            onSelect={editor.commands.addTableRowBelow}
            disabled={!editor.commands.addTableRowBelow.canExec()}
          >
            Insert Below
          </TableHandlePopoverItem>
          <TableHandlePopoverItem
            className="relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-zinc-100 dark:data-[focused]:bg-zinc-800"
            onSelect={editor.commands.deleteCellSelection}
            disabled={!editor.commands.deleteCellSelection.canExec()}
          >
            Clear Contents
          </TableHandlePopoverItem>
          <TableHandlePopoverItem
            className="relative block min-w-[120px] scroll-my-1 rounded px-3 py-1.5 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-zinc-100 dark:data-[focused]:bg-zinc-800"
            onSelect={editor.commands.deleteTableRow}
            disabled={!editor.commands.deleteTableRow.canExec()}
          >
            Delete Row
          </TableHandlePopoverItem>
        </TableHandlePopoverContent>
      </TableHandleRowRoot>
    </TableHandleRoot>
  )
}