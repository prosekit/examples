<script setup lang="ts">
import {
  defineCodeBlockShiki,
  shikiBundledThemesInfo,
  type ShikiBundledTheme,
} from 'prosekit/extensions/code-block'
import { useExtension } from 'prosekit/vue'
import { computed } from 'vue'

const theme = defineModel({ default: 'github-dark' })
const extension = computed(() => {
  return defineCodeBlockShiki({ themes: [theme.value as ShikiBundledTheme] })
})
useExtension(extension)
</script>

<template>
  <label>Theme:</label>
  <select v-model="theme" class="outline-unset focus-visible:outline-unset flex items-center justify-center rounded-md p-2 font-medium transition focus-visible:ring-2 focus-visible:ring-zinc-900 dark:ring-zinc-300 disabled:pointer-events-none disabled:opacity-50 hover:disabled:opacity-50 bg-transparent hover:bg-zinc-100 data-[state=on]:bg-gray-200 dark:bg-gray-700/60">
    <option
      v-for="info of shikiBundledThemesInfo"
      :key="info.id"
      :value="info.id"
    >
      {{ info.id }}
    </option>
  </select>
</template>
