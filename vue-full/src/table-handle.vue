<script setup lang="ts">
import { useEditor } from 'prosekit/vue'
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
} from 'prosekit/vue/table-handle'

import type { EditorExtension } from './extension'

const editor = useEditor<EditorExtension>({ update: true })
</script>

<template>
  <TableHandleRoot class="contents">
    <TableHandleDragPreview />
    <TableHandleDropIndicator />
    <TableHandleColumnRoot
      class="h-[1.2em] w-[1.5em] translate-y-[80%] flex items-center box-border justify-center bg-white dark:bg-gray-950 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-500/50 dark:text-gray-500/50 border border-gray-200 dark:border-gray-800 border-solid p-0 overflow-hidden duration-150 transition-discrete transition data-[state=closed]:opacity-0 starting:opacity-0 opacity-100 data-[state=closed]:scale-95 starting:scale-95 scale-100"
    >
      <TableHandleColumnTrigger>
        <div class="i-lucide-grip-horizontal h-5 w-5"></div>
      </TableHandleColumnTrigger>
      <TableHandlePopoverContent
        class="relative block max-h-[25rem] min-w-[8rem] select-none overflow-auto whitespace-nowrap p-1 z-10 box-border rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg [&:not([data-state])]:hidden"
      >
        <TableHandlePopoverItem
          v-if="editor.commands.addTableColumnBefore.canExec()"
          class="relative min-w-[8rem] scroll-my-1 rounded px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-gray-100 dark:data-[focused]:bg-gray-800"
          @select="editor.commands.addTableColumnBefore"
        >
          <span>Insert Left</span>
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          v-if="editor.commands.addTableColumnAfter.canExec()"
          class="relative min-w-[8rem] scroll-my-1 rounded px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-gray-100 dark:data-[focused]:bg-gray-800"
          @select="editor.commands.addTableColumnAfter"
        >
          <span>Insert Right</span>
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          v-if="editor.commands.deleteCellSelection.canExec()"
          class="relative min-w-[8rem] scroll-my-1 rounded px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-gray-100 dark:data-[focused]:bg-gray-800"
          @select="editor.commands.deleteCellSelection"
        >
          <span>Clear Contents</span>
          <span
            class="text-xs tracking-widest text-gray-500 dark:text-gray-500"
          >
            Del
          </span>
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          v-if="editor.commands.deleteTableColumn.canExec()"
          class="relative min-w-[8rem] scroll-my-1 rounded px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-gray-100 dark:data-[focused]:bg-gray-800"
          @select="editor.commands.deleteTableColumn"
        >
          <span>Delete Column</span>
        </TableHandlePopoverItem>
      </TableHandlePopoverContent>
    </TableHandleColumnRoot>
    <TableHandleRowRoot
      class="h-[1.5em] w-[1.2em] translate-x-[80%] flex items-center box-border justify-center bg-white dark:bg-gray-950 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-500/50 dark:text-gray-500/50 border border-gray-200 dark:border-gray-800 border-solid p-0 overflow-hidden duration-150 transition-discrete transition data-[state=closed]:opacity-0 starting:opacity-0 opacity-100 data-[state=closed]:scale-95 starting:scale-95 scale-100"
    >
      <TableHandleRowTrigger>
        <div class="i-lucide-grip-vertical h-5 w-5"></div>
      </TableHandleRowTrigger>
      <TableHandlePopoverContent
        class="relative block max-h-[25rem] min-w-[8rem] select-none overflow-auto whitespace-nowrap p-1 z-10 box-border rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-lg [&:not([data-state])]:hidden"
      >
        <TableHandlePopoverItem
          v-if="editor.commands.addTableRowAbove.canExec()"
          class="relative min-w-[8rem] scroll-my-1 rounded px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-gray-100 dark:data-[focused]:bg-gray-800"
          @select="editor.commands.addTableRowAbove"
        >
          <span>Insert Above</span>
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          v-if="editor.commands.addTableRowBelow.canExec()"
          class="relative min-w-[8rem] scroll-my-1 rounded px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-gray-100 dark:data-[focused]:bg-gray-800"
          @select="editor.commands.addTableRowBelow"
        >
          <span>Insert Below</span>
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          v-if="editor.commands.deleteCellSelection.canExec()"
          class="relative min-w-[8rem] scroll-my-1 rounded px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-gray-100 dark:data-[focused]:bg-gray-800"
          @select="editor.commands.deleteCellSelection"
        >
          <span>Clear Contents</span>
          <span
            class="text-xs tracking-widest text-gray-500 dark:text-gray-500"
          >
            Del
          </span>
        </TableHandlePopoverItem>
        <TableHandlePopoverItem
          v-if="editor.commands.deleteTableRow.canExec()"
          class="relative min-w-[8rem] scroll-my-1 rounded px-3 py-1.5 flex items-center justify-between gap-8 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 hover:data-[disabled=true]:opacity-50 box-border cursor-default select-none whitespace-nowrap outline-none data-[focused]:bg-gray-100 dark:data-[focused]:bg-gray-800"
          @select="editor.commands.deleteTableRow"
        >
          <span>Delete Row</span>
        </TableHandlePopoverItem>
      </TableHandlePopoverContent>
    </TableHandleRowRoot>
  </TableHandleRoot>
</template>
