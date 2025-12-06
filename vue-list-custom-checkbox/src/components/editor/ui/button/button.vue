<script setup lang="ts">
import {
  TooltipContent,
  TooltipRoot,
  TooltipTrigger,
} from 'prosekit/vue/tooltip'

const props = defineProps<{
  pressed?: boolean
  disabled?: boolean
  onClick?: () => void
  tooltip?: string
}>()
</script>

<template>
  <TooltipRoot>
    <TooltipTrigger class="block">
      <button
        :data-state="props.pressed ? 'on' : 'off'"
        :disabled="props.disabled"
        class="outline-unset focus-visible:outline-unset flex items-center justify-center rounded-md p-2 font-medium transition focus-visible:ring-2 text-sm focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 disabled:pointer-events-none min-w-9 min-h-9 text-gray-900 dark:text-gray-50 disabled:text-gray-900/50 dark:disabled:text-gray-50/50 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 data-[state=on]:bg-gray-200 dark:data-[state=on]:bg-gray-700"
        @click="props.onClick"
        @mousedown.prevent
      >
        <slot />
        <span v-if="props.tooltip" class="sr-only">{{ props.tooltip }}</span>
      </button>
    </TooltipTrigger>
    <TooltipContent
      v-if="props.tooltip"
      class="z-50 overflow-hidden rounded-md border border-solid bg-gray-900 dark:bg-gray-50 px-3 py-1.5 text-xs text-gray-50 dark:text-gray-900 shadow-xs [&:not([data-state])]:hidden will-change-transform motion-safe:data-[state=open]:animate-in motion-safe:data-[state=closed]:animate-out motion-safe:data-[state=open]:fade-in-0 motion-safe:data-[state=closed]:fade-out-0 motion-safe:data-[state=open]:zoom-in-95 motion-safe:data-[state=closed]:zoom-out-95 motion-safe:data-[state=open]:animate-duration-150 motion-safe:data-[state=closed]:animate-duration-200 motion-safe:data-[side=bottom]:slide-in-from-top-2 motion-safe:data-[side=bottom]:slide-out-to-top-2 motion-safe:data-[side=left]:slide-in-from-right-2 motion-safe:data-[side=left]:slide-out-to-right-2 motion-safe:data-[side=right]:slide-in-from-left-2 motion-safe:data-[side=right]:slide-out-to-left-2 motion-safe:data-[side=top]:slide-in-from-bottom-2 motion-safe:data-[side=top]:slide-out-to-bottom-2"
    >
      {{ props.tooltip }}
    </TooltipContent>
  </TooltipRoot>
</template>
