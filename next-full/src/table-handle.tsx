import type { Editor } from 'prosekit/core'
import { useEditorDerivedValue } from 'prosekit/react'
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
} from 'prosekit/react/table-handle'

import type { EditorExtension } from './extension'

function getTableHandleState(editor: Editor<EditorExtension>) {
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
  }
}

export default function TableHandle() {
  const state = useEditorDerivedValue(getTableHandleState)

  return (
    <TableHandleRoot className="contents">
      <TableHandleDragPreview />
      <TableHandleDropIndicator />
      <TableHandleColumnRoot className="h-[1.2em] w-[1.5em] translate-y-[80%] flex items-center box-border justify-center bg-white dark:bg-gray-950 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-500/50 dark:text-gray-500/50 border border-gray-200 dark:border-gray-800 border-solid p-0 overflow-hidden duration-150 transition-discrete transition data-[state=closed]:opacity-0 starting:opacity-0 opacity-100 data-[state=closed]:scale-95 starting:scale-95 scale-100">
        <TableHandleColumnTrigger>
          <div className="i-lucide-grip-horizontal h-5 w-5"></div>
        </TableHandleColumnTrigger>
        <TableHandlePopoverContent className="relative block max-h-[25rem] min-w-[8rem] select-none overflow-auto whitespace-nowrap p-1 z-10 box-border rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg [&:not([data-state])]:hidden">
          {state.addTableColumnBefore.canExec && (
            <TableHandlePopoverItem
              className="relative min-w-[8rem] scroll-my-1 rounded px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-gray-100 dark:data-[focused]:bg-gray-800"
              onSelect={state.addTableColumnBefore.command}
            >
              <span>Insert Left</span>
            </TableHandlePopoverItem>
          )}
          {state.addTableColumnAfter.canExec && (
            <TableHandlePopoverItem
              className="relative min-w-[8rem] scroll-my-1 rounded px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-gray-100 dark:data-[focused]:bg-gray-800"
              onSelect={state.addTableColumnAfter.command}
            >
              <span>Insert Right</span>
            </TableHandlePopoverItem>
          )}
          {state.deleteCellSelection.canExec && (
            <TableHandlePopoverItem
              className="relative min-w-[8rem] scroll-my-1 rounded px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-gray-100 dark:data-[focused]:bg-gray-800"
              onSelect={state.deleteCellSelection.command}
            >
              <span>Clear Contents</span>
              <span className="text-xs tracking-widest text-gray-500 dark:text-gray-500">
                Del
              </span>
            </TableHandlePopoverItem>
          )}
          {state.deleteTableColumn.canExec && (
            <TableHandlePopoverItem
              className="relative min-w-[8rem] scroll-my-1 rounded px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-gray-100 dark:data-[focused]:bg-gray-800"
              onSelect={state.deleteTableColumn.command}
            >
              <span>Delete Column</span>
            </TableHandlePopoverItem>
          )}
        </TableHandlePopoverContent>
      </TableHandleColumnRoot>
      <TableHandleRowRoot className="h-[1.5em] w-[1.2em] translate-x-[80%] flex items-center box-border justify-center bg-white dark:bg-gray-950 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-500/50 dark:text-gray-500/50 border border-gray-200 dark:border-gray-800 border-solid p-0 overflow-hidden duration-150 transition-discrete transition data-[state=closed]:opacity-0 starting:opacity-0 opacity-100 data-[state=closed]:scale-95 starting:scale-95 scale-100">
        <TableHandleRowTrigger>
          <div className="i-lucide-grip-vertical h-5 w-5"></div>
        </TableHandleRowTrigger>
        <TableHandlePopoverContent className="relative block max-h-[25rem] min-w-[8rem] select-none overflow-auto whitespace-nowrap p-1 z-10 box-border rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg [&:not([data-state])]:hidden">
          {state.addTableRowAbove.canExec && (
            <TableHandlePopoverItem
              className="relative min-w-[8rem] scroll-my-1 rounded px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-gray-100 dark:data-[focused]:bg-gray-800"
              onSelect={state.addTableRowAbove.command}
            >
              <span>Insert Above</span>
            </TableHandlePopoverItem>
          )}
          {state.addTableRowBelow.canExec && (
            <TableHandlePopoverItem
              className="relative min-w-[8rem] scroll-my-1 rounded px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-gray-100 dark:data-[focused]:bg-gray-800"
              onSelect={state.addTableRowBelow.command}
            >
              <span>Insert Below</span>
            </TableHandlePopoverItem>
          )}
          {state.deleteCellSelection.canExec && (
            <TableHandlePopoverItem
              className="relative min-w-[8rem] scroll-my-1 rounded px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-gray-100 dark:data-[focused]:bg-gray-800"
              onSelect={state.deleteCellSelection.command}
            >
              <span>Clear Contents</span>
              <span className="text-xs tracking-widest text-gray-500 dark:text-gray-500">
                Del
              </span>
            </TableHandlePopoverItem>
          )}
          {state.deleteTableRow.canExec && (
            <TableHandlePopoverItem
              className="relative min-w-[8rem] scroll-my-1 rounded px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-gray-100 dark:data-[focused]:bg-gray-800"
              onSelect={state.deleteTableRow.command}
            >
              <span>Delete Row</span>
            </TableHandlePopoverItem>
          )}
        </TableHandlePopoverContent>
      </TableHandleRowRoot>
    </TableHandleRoot>
  )
}
