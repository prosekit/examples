<script lang="ts">
import type { Editor } from 'prosekit/core'
import type { TableExtension } from 'prosekit/extensions/table'
import { useEditorDerivedValue } from 'prosekit/svelte'
import { MenuItem, MenuPopup, MenuPositioner } from 'prosekit/svelte/menu'
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
} from 'prosekit/svelte/table-handle'

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

const props: Props = $props()

const state = useEditorDerivedValue(getTableHandleState)
</script>

<TableHandleRoot>
  <TableHandleDragPreview />
  <TableHandleDropIndicator />
  <TableHandleColumnPositioner class="block overflow-visible w-min h-min z-50 ease-out transition-transform duration-100 motion-reduce:transition-none">
    <TableHandleColumnPopup class="translate-y-[50%] flex box-border origin-(--transform-origin) transition-[opacity,scale] transition-discrete motion-reduce:transition-none duration-100 data-[state=closed]:duration-150 data-[state=closed]:opacity-0 starting:opacity-0 data-[state=closed]:scale-95 starting:scale-95">
      <TableHandleColumnMenuRoot>
        <TableHandleColumnMenuTrigger class="h-4.5 w-6 flex items-center box-border justify-center bg-[canvas] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-sm text-gray-500/50 dark:text-gray-400/50 border border-gray-200 dark:border-gray-800 border-solid p-0 transition-colors overflow-clip">
          <div class="i-lucide-grip-horizontal size-5 min-h-5 min-w-5 block"></div>
        </TableHandleColumnMenuTrigger>
        <MenuPositioner class="block overflow-visible w-min h-min z-50 ease-out transition-transform duration-100 motion-reduce:transition-none">
          <MenuPopup class="box-border origin-(--transform-origin) transition-[opacity,scale] transition-discrete motion-reduce:transition-none data-[state=closed]:duration-150 data-[state=closed]:opacity-0 starting:opacity-0 data-[state=closed]:scale-95 starting:scale-95 duration-40 rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg bg-[canvas] relative flex flex-col max-h-100 min-w-32 select-none overflow-auto whitespace-nowrap p-1 outline-none">
            {#if $state.addTableColumnBefore.canExec}
              <MenuItem
                class="relative min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 data-danger:text-red-500 box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800"
                onSelect={$state.addTableColumnBefore.command}
              >
                <span>Insert Left</span>
              </MenuItem>
            {/if}
            {#if $state.addTableColumnAfter.canExec}
              <MenuItem
                class="relative min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 data-danger:text-red-500 box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800"
                onSelect={$state.addTableColumnAfter.command}
              >
                <span>Insert Right</span>
              </MenuItem>
            {/if}
            {#if $state.deleteCellSelection.canExec}
              <MenuItem
                class="relative min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 data-danger:text-red-500 box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800"
                onSelect={$state.deleteCellSelection.command}
              >
                <span>Clear Contents</span>
                <span class="text-xs tracking-widest text-gray-500 dark:text-gray-500">Del</span>
              </MenuItem>
            {/if}
            {#if $state.deleteTableColumn.canExec}
              <MenuItem
                class="relative min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 data-danger:text-red-500 box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800"
                onSelect={$state.deleteTableColumn.command}
              >
                <span>Delete Column</span>
              </MenuItem>
            {/if}
            {#if $state.deleteTable.canExec}
              <MenuItem
                class="relative min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 data-danger:text-red-500 box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800"
                data-danger=""
                onSelect={$state.deleteTable.command}
              >
                <span>Delete Table</span>
              </MenuItem>
            {/if}
          </MenuPopup>
        </MenuPositioner>
      </TableHandleColumnMenuRoot>
    </TableHandleColumnPopup>
  </TableHandleColumnPositioner>
  <TableHandleRowPositioner
    placement={props.dir === 'rtl' ? 'right' : 'left'}
    class="block overflow-visible w-min h-min z-50 ease-out transition-transform duration-100 motion-reduce:transition-none"
  >
    <TableHandleRowPopup class="ltr:translate-x-[50%] rtl:translate-x-[-50%] flex box-border origin-(--transform-origin) transition-[opacity,scale] transition-discrete motion-reduce:transition-none duration-100 data-[state=closed]:duration-150 data-[state=closed]:opacity-0 starting:opacity-0 data-[state=closed]:scale-95 starting:scale-95">
      <TableHandleRowMenuRoot>
        <TableHandleRowMenuTrigger class="h-6 w-4.5 flex items-center box-border justify-center bg-[canvas] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-sm text-gray-500/50 dark:text-gray-400/50 border border-gray-200 dark:border-gray-800 border-solid p-0 transition-colors overflow-clip">
          <div class="i-lucide-grip-vertical size-5 min-h-5 min-w-5 block"></div>
        </TableHandleRowMenuTrigger>
        <MenuPositioner class="block overflow-visible w-min h-min z-50 ease-out transition-transform duration-100 motion-reduce:transition-none">
          <MenuPopup class="box-border origin-(--transform-origin) transition-[opacity,scale] transition-discrete motion-reduce:transition-none data-[state=closed]:duration-150 data-[state=closed]:opacity-0 starting:opacity-0 data-[state=closed]:scale-95 starting:scale-95 duration-40 rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg bg-[canvas] relative flex flex-col max-h-100 min-w-32 select-none overflow-auto whitespace-nowrap p-1 outline-none">
            {#if $state.addTableRowAbove.canExec}
              <MenuItem
                class="relative min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 data-danger:text-red-500 box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800"
                onSelect={$state.addTableRowAbove.command}
              >
                <span>Insert Above</span>
              </MenuItem>
            {/if}
            {#if $state.addTableRowBelow.canExec}
              <MenuItem
                class="relative min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 data-danger:text-red-500 box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800"
                onSelect={$state.addTableRowBelow.command}
              >
                <span>Insert Below</span>
              </MenuItem>
            {/if}
            {#if $state.deleteCellSelection.canExec}
              <MenuItem
                class="relative min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 data-danger:text-red-500 box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800"
                onSelect={$state.deleteCellSelection.command}
              >
                <span>Clear Contents</span>
                <span class="text-xs tracking-widest text-gray-500 dark:text-gray-500">Del</span>
              </MenuItem>
            {/if}
            {#if $state.deleteTableRow.canExec}
              <MenuItem
                class="relative min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 data-danger:text-red-500 box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800"
                onSelect={$state.deleteTableRow.command}
              >
                <span>Delete Row</span>
              </MenuItem>
            {/if}
            {#if $state.deleteTable.canExec}
              <MenuItem
                class="relative min-w-32 scroll-my-1 rounded-sm px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 data-danger:text-red-500 box-border cursor-default select-none whitespace-nowrap outline-hidden data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800"
                data-danger=""
                onSelect={$state.deleteTable.command}
              >
                <span>Delete Table</span>
              </MenuItem>
            {/if}
          </MenuPopup>
        </MenuPositioner>
      </TableHandleRowMenuRoot>
    </TableHandleRowPopup>
  </TableHandleRowPositioner>
</TableHandleRoot>
