'use client'

import type { Editor } from 'prosekit/core'
import type { TableExtension } from 'prosekit/extensions/table'
import { useEditorDerivedValue } from 'prosekit/react'
import { MenuItem, MenuPopup, MenuPositioner } from 'prosekit/react/menu'
import {
  TableHandleColumnMenuRoot,
  TableHandleColumnMenuTrigger,
  TableHandleColumnPopup,
  TableHandleColumnPositioner,
  TableHandleDragPreview,
  TableHandleDropIndicator,
  TableHandleRoot,
  TableHandleRowMenuRoot,
  TableHandleRowMenuTrigger,
  TableHandleRowPopup,
  TableHandleRowPositioner,
} from 'prosekit/react/table-handle'

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

export default function TableHandle(props: Props) {
  const state = useEditorDerivedValue(getTableHandleState)

  return (
    <TableHandleRoot>
      <TableHandleDragPreview />
      <TableHandleDropIndicator />
      <TableHandleColumnPositioner className="block overflow-visible bg-transparent w-min h-min z-50 motion-safe:ease-out motion-safe:transition-transform motion-safe:duration-100">
        <TableHandleColumnPopup className="translate-y-[50%] flex box-border motion-safe:duration-100 data-[state=closed]:motion-safe:duration-150 motion-safe:transition-discrete motion-safe:transition-all data-[state=closed]:opacity-0 starting:opacity-0 opacity-100 data-[state=closed]:scale-95 starting:scale-95 scale-100">
          <TableHandleColumnMenuRoot>
            <TableHandleColumnMenuTrigger className="h-4.5 w-6 flex items-center box-border justify-center bg-white dark:bg-gray-950 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-sm text-gray-500/50 dark:text-gray-400/50 border border-gray-200 dark:border-gray-800 border-solid p-0 transition-colors overflow-clip">
              <div className="i-lucide-grip-horizontal size-5 min-h-5 min-w-5 block"></div>
            </TableHandleColumnMenuTrigger>
            <MenuPositioner className="overflow-visible bg-transparent">
              <MenuPopup className="box-border data-[state=closed]:motion-safe:duration-150 motion-safe:transition-discrete motion-safe:transition-all data-[state=closed]:opacity-0 starting:opacity-0 opacity-100 data-[state=closed]:scale-95 starting:scale-95 scale-100 motion-safe:duration-40 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg relative flex flex-col max-h-100 min-w-32 select-none overflow-auto whitespace-nowrap p-1 outline-none">
                {state.addTableColumnBefore.canExec && (
                  <MenuItem
                    className="relative min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 data-danger:text-red-500 box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800"
                    onSelect={state.addTableColumnBefore.command}
                  >
                    <span>Insert Left</span>
                  </MenuItem>
                )}
                {state.addTableColumnAfter.canExec && (
                  <MenuItem
                    className="relative min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 data-danger:text-red-500 box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800"
                    onSelect={state.addTableColumnAfter.command}
                  >
                    <span>Insert Right</span>
                  </MenuItem>
                )}
                {state.deleteCellSelection.canExec && (
                  <MenuItem
                    className="relative min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 data-danger:text-red-500 box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800"
                    onSelect={state.deleteCellSelection.command}
                  >
                    <span>Clear Contents</span>
                    <span className="text-xs tracking-widest text-gray-500 dark:text-gray-500">
                      Del
                    </span>
                  </MenuItem>
                )}
                {state.deleteTableColumn.canExec && (
                  <MenuItem
                    className="relative min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 data-danger:text-red-500 box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800"
                    onSelect={state.deleteTableColumn.command}
                  >
                    <span>Delete Column</span>
                  </MenuItem>
                )}
                {state.deleteTable.canExec && (
                  <MenuItem
                    className="relative min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 data-danger:text-red-500 box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800"
                    data-danger=""
                    onSelect={state.deleteTable.command}
                  >
                    <span>Delete Table</span>
                  </MenuItem>
                )}
              </MenuPopup>
            </MenuPositioner>
          </TableHandleColumnMenuRoot>
        </TableHandleColumnPopup>
      </TableHandleColumnPositioner>
      <TableHandleRowPositioner
        placement={props.dir === 'rtl' ? 'right' : 'left'}
        className="block overflow-visible bg-transparent w-min h-min z-50 motion-safe:ease-out motion-safe:transition-transform motion-safe:duration-100"
      >
        <TableHandleRowPopup className="ltr:translate-x-[50%] rtl:translate-x-[-50%] flex box-border motion-safe:duration-100 data-[state=closed]:motion-safe:duration-150 motion-safe:transition-discrete motion-safe:transition-all data-[state=closed]:opacity-0 starting:opacity-0 opacity-100 data-[state=closed]:scale-95 starting:scale-95 scale-100">
          <TableHandleRowMenuRoot>
            <TableHandleRowMenuTrigger className="h-6 w-4.5 flex items-center box-border justify-center bg-white dark:bg-gray-950 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-sm text-gray-500/50 dark:text-gray-400/50 border border-gray-200 dark:border-gray-800 border-solid p-0 transition-colors overflow-clip">
              <div className="i-lucide-grip-vertical size-5 min-h-5 min-w-5 block"></div>
            </TableHandleRowMenuTrigger>
            <MenuPositioner className="overflow-visible bg-transparent">
              <MenuPopup className="box-border data-[state=closed]:motion-safe:duration-150 motion-safe:transition-discrete motion-safe:transition-all data-[state=closed]:opacity-0 starting:opacity-0 opacity-100 data-[state=closed]:scale-95 starting:scale-95 scale-100 motion-safe:duration-40 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg relative flex flex-col max-h-100 min-w-32 select-none overflow-auto whitespace-nowrap p-1 outline-none">
                {state.addTableRowAbove.canExec && (
                  <MenuItem
                    className="relative min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 data-danger:text-red-500 box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800"
                    onSelect={state.addTableRowAbove.command}
                  >
                    <span>Insert Above</span>
                  </MenuItem>
                )}
                {state.addTableRowBelow.canExec && (
                  <MenuItem
                    className="relative min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 data-danger:text-red-500 box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800"
                    onSelect={state.addTableRowBelow.command}
                  >
                    <span>Insert Below</span>
                  </MenuItem>
                )}
                {state.deleteCellSelection.canExec && (
                  <MenuItem
                    className="relative min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 data-danger:text-red-500 box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800"
                    onSelect={state.deleteCellSelection.command}
                  >
                    <span>Clear Contents</span>
                    <span className="text-xs tracking-widest text-gray-500 dark:text-gray-500">
                      Del
                    </span>
                  </MenuItem>
                )}
                {state.deleteTableRow.canExec && (
                  <MenuItem
                    className="relative min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 data-danger:text-red-500 box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800"
                    onSelect={state.deleteTableRow.command}
                  >
                    <span>Delete Row</span>
                  </MenuItem>
                )}
                {state.deleteTable.canExec && (
                  <MenuItem
                    className="relative min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 data-danger:text-red-500 box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800"
                    data-danger=""
                    onSelect={state.deleteTable.command}
                  >
                    <span>Delete Table</span>
                  </MenuItem>
                )}
              </MenuPopup>
            </MenuPositioner>
          </TableHandleRowMenuRoot>
        </TableHandleRowPopup>
      </TableHandleRowPositioner>
    </TableHandleRoot>
  )
}
