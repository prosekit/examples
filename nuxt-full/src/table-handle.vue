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
      class="flex items-center box-border justify-center h-[1.2em] w-[1.5em] bg-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-500/50 dark:text-gray-500/50 translate-y-3 border border-gray-200 dark:border-gray-800 border-solid [&:not([data-state])]:hidden will-change-transform data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[state=open]:animate-duration-150 data-[state=closed]:animate-duration-200"
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
      class="flex items-center box-border justify-center h-[1.5em] w-[1.2em] bg-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-gray-500/50 dark:text-gray-500/50 translate-x-3 border border-gray-200 dark:border-gray-800 border-solid [&:not([data-state])]:hidden will-change-transform data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[state=open]:animate-duration-150 data-[state=closed]:animate-duration-200"
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
