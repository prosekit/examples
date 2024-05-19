<script setup lang="ts">
import { BlockDragHandle, BlockPopover } from 'prosekit/vue/block-handle'
</script>

<template>
  <BlockPopover class="flex items-center box-border justify-center my-[0.5em] h-[1.5em] w-[1.2em] hover:bg-secondary rounded text-muted-foreground/50 transition will-change-transform data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[state=open]:animate-duration-150 data-[state=closed]:animate-duration-200">
    <BlockDragHandle>
      <div class="i-lucide-grip-vertical h-5 w-5"></div>
    </BlockDragHandle>
  </BlockPopover>
</template>
