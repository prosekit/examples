<script setup lang="ts">
import {
  TooltipContent,
  TooltipRoot,
  TooltipTrigger,
} from 'prosekit/vue/tooltip'

defineProps<{
  pressed?: Boolean
  disabled?: Boolean
  tooltip?: string
}>()

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <TooltipRoot>
    <TooltipTrigger class="block">
      <button
        :data-state="pressed ? 'on' : 'off'"
        :disabled="disabled ? true : undefined"
        class="outline-unset focus-visible:outline-unset flex items-center justify-center rounded-md p-2 font-medium transition focus-visible:ring-2 text-sm focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-300 disabled:pointer-events-none min-w-9 min-h-9 disabled:opacity-50 hover:disabled:opacity-50 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 data-[state=on]:bg-gray-200 dark:data-[state=on]:bg-gray-700"
        @click="() => emit('click')"
        @mousedown.prevent
      >
        <slot />
        <span v-if="tooltip" class="sr-only">{{ tooltip }}</span>
      </button>
    </TooltipTrigger>
    <TooltipContent
      v-if="tooltip"
      class="z-50 overflow-hidden rounded-md border border-solid bg-zinc-900 dark:bg-zinc-50 px-3 py-1.5 text-xs text-zinc-50 dark:text-zinc-900 shadow-sm [&:not([data-state])]:hidden will-change-transform data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[state=open]:animate-duration-150 data-[state=closed]:animate-duration-200 data-[side=bottom]:slide-in-from-top-2 data-[side=bottom]:slide-out-to-top-2 data-[side=left]:slide-in-from-right-2 data-[side=left]:slide-out-to-right-2 data-[side=right]:slide-in-from-left-2 data-[side=right]:slide-out-to-left-2 data-[side=top]:slide-in-from-bottom-2 data-[side=top]:slide-out-to-bottom-2"
    >
      {{ tooltip }}
    </TooltipContent>
  </TooltipRoot>
</template>
