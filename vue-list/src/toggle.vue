<script setup lang="ts">
import { defineProps, type Component } from 'vue'

const props = defineProps<{
  as?: string | Component
  pressed: Boolean
  disabled?: Boolean
  onClick?: VoidFunction
}>()
</script>

<template>
  <component
    :is="props.as || 'button'"
    :data-state="pressed ? 'on' : 'off'"
    :disabled="disabled ? true : undefined"
    @click="onClick"
    @mousedown.prevent
    class='outline-unset focus-visible:outline-unset inline-flex items-center justify-center rounded-md p-2 font-medium transition focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-300 disabled:pointer-events-none disabled:opacity-50 hover:disabled:opacity-50 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 data-[state=on]:bg-gray-200/60 dark:data-[state=on]:bg-gray-700/60'
  >
    <slot></slot>
  </component>
</template>
