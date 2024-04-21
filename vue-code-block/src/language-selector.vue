<script setup lang="ts">
import { shikiBundledLanguagesInfo } from 'prosekit/extensions/code-block'

const props = defineProps<{
  language?: string
  setLanguage: (language: string) => void
}>()

const handleChange = (event: Event) => {
  props.setLanguage((event.target as HTMLSelectElement).value)
}
</script>

<template>
  <div className='relative left-2 top-3 h-0 select-none overflow-visible' contenteditable="false">
    <select
      className='outline-unset focus:outline-unset relative box-border w-auto cursor-pointer select-none appearance-none rounded border-none bg-transparent px-2 py-1 text-xs transition text-white opacity-0 hover:opacity-80 [div[data-node-view-root]:hover_&]:opacity-50 [div[data-node-view-root]:hover_&]:hover:opacity-80'
      @change="handleChange"
      :value="props.language || ''"
    >
      <option value="">Plain Text</option>
      <option
        v-for="info of shikiBundledLanguagesInfo"
        :key="info.id"
        :value="info.id"
      >
        {{ info.name }}
      </option>
    </select>
  </div>
</template>
