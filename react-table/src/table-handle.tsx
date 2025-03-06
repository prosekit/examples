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
      <TableHandleColumnRoot className="flex items-center box-border justify-center h-[1.2em] w-[1.5em] bg-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-500/50 dark:text-gray-500/50 translate-y-3 border border-gray-200 dark:border-gray-800 border-solid [&:not([data-state])]:hidden will-change-transform data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[state=open]:animate-duration-150 data-[state=closed]:animate-duration-200">
        <TableHandleColumnTrigger>
          <div className="i-lucide-grip-horizontal h-5 w-5"></div>
        </TableHandleColumnTrigger>
        <TableHandlePopoverContent className="relative block max-h-[25rem] min-w-[8rem] select-none overflow-auto whitespace-nowrap p-1 z-10 box-border rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg [&:not([data-state])]:hidden">
          {editor.commands.addTableColumnBefore.canExec() && (
            <TableHandlePopoverItem
              className="relative min-w-[8rem] scroll-my-1 rounded px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-gray-100 dark:data-[focused]:bg-gray-800"
              onSelect={editor.commands.addTableColumnBefore}
            >
              <span>Insert Left</span>
            </TableHandlePopoverItem>
          )}
          {editor.commands.addTableColumnAfter.canExec() && (
            <TableHandlePopoverItem
              className="relative min-w-[8rem] scroll-my-1 rounded px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-gray-100 dark:data-[focused]:bg-gray-800"
              onSelect={editor.commands.addTableColumnAfter}
            >
              <span>Insert Right</span>
            </TableHandlePopoverItem>
          )}
          {editor.commands.deleteCellSelection.canExec() && (
            <TableHandlePopoverItem
              className="relative min-w-[8rem] scroll-my-1 rounded px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-gray-100 dark:data-[focused]:bg-gray-800"
              onSelect={editor.commands.deleteCellSelection}
            >
              <span>Clear Contents</span>
              <span className="text-xs tracking-widest text-gray-500 dark:text-gray-500">
                Del
              </span>
            </TableHandlePopoverItem>
          )}
          {editor.commands.deleteTableColumn.canExec() && (
            <TableHandlePopoverItem
              className="relative min-w-[8rem] scroll-my-1 rounded px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-gray-100 dark:data-[focused]:bg-gray-800"
              onSelect={editor.commands.deleteTableColumn}
            >
              <span>Delete Column</span>
            </TableHandlePopoverItem>
          )}
        </TableHandlePopoverContent>
      </TableHandleColumnRoot>
      <TableHandleRowRoot className="flex items-center box-border justify-center h-[1.5em] w-[1.2em] bg-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-500/50 dark:text-gray-500/50 translate-x-3 border border-gray-200 dark:border-gray-800 border-solid [&:not([data-state])]:hidden will-change-transform data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[state=open]:animate-duration-150 data-[state=closed]:animate-duration-200">
        <TableHandleRowTrigger>
          <div className="i-lucide-grip-vertical h-5 w-5"></div>
        </TableHandleRowTrigger>
        <TableHandlePopoverContent className="relative block max-h-[25rem] min-w-[8rem] select-none overflow-auto whitespace-nowrap p-1 z-10 box-border rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg [&:not([data-state])]:hidden">
          {editor.commands.addTableRowAbove.canExec() && (
            <TableHandlePopoverItem
              className="relative min-w-[8rem] scroll-my-1 rounded px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-gray-100 dark:data-[focused]:bg-gray-800"
              onSelect={editor.commands.addTableRowAbove}
            >
              <span>Insert Above</span>
            </TableHandlePopoverItem>
          )}
          {editor.commands.addTableRowBelow.canExec() && (
            <TableHandlePopoverItem
              className="relative min-w-[8rem] scroll-my-1 rounded px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-gray-100 dark:data-[focused]:bg-gray-800"
              onSelect={editor.commands.addTableRowBelow}
            >
              <span>Insert Below</span>
            </TableHandlePopoverItem>
          )}
          {editor.commands.deleteCellSelection.canExec() && (
            <TableHandlePopoverItem
              className="relative min-w-[8rem] scroll-my-1 rounded px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-gray-100 dark:data-[focused]:bg-gray-800"
              onSelect={editor.commands.deleteCellSelection}
            >
              <span>Clear Contents</span>
              <span className="text-xs tracking-widest text-gray-500 dark:text-gray-500">
                Del
              </span>
            </TableHandlePopoverItem>
          )}
          {editor.commands.deleteTableRow.canExec() && (
            <TableHandlePopoverItem
              className="relative min-w-[8rem] scroll-my-1 rounded px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-gray-100 dark:data-[focused]:bg-gray-800"
              onSelect={editor.commands.deleteTableRow}
            >
              <span>Delete Row</span>
            </TableHandlePopoverItem>
          )}
        </TableHandlePopoverContent>
      </TableHandleRowRoot>
    </TableHandleRoot>
  )
}
