<script setup lang="ts">
import { defineCodeBlockShikiji } from 'prosekit/extensions/code-block'
import { useExtension } from 'prosekit/vue'
import { bundledThemesInfo, type BundledTheme } from 'shikiji'
import { computed } from 'vue'

const theme = defineModel({ default: 'github-dark' })
const extension = computed(() => {
  return defineCodeBlockShikiji({ theme: theme.value as BundledTheme })
})
useExtension(extension)
</script>

<template>
  <label>Theme:</label>
  <select v-model="theme" class='outline-unset focus-visible:outline-unset inline-flex items-center justify-center rounded-md bg-transparent bg-transparent p-2 font-medium transition focus-visible:ring-2 focus-visible:ring-gray-950 disabled:pointer-events-none hover:opacity-90 disabled:opacity-50 hover:disabled:opacity-50 data-[state=on]:opacity-80 text-gray-500 data-[state=on]:text-black dark:text-gray-400 dark:data-[state=on]:text-white box-border bg-transparent data-[state=on]:bg-gray-400/20 hover:data-[state=off]:bg-gray-400/20 dark:data-[state=on]:bg-gray-700 dark:hover:data-[state=off]:bg-gray-700/80'>
    <option v-for="info of bundledThemesInfo" :key="info.id" :value="info.id">
      {{ info.id }}
    </option>
  </select>
</template>
