<script setup lang="ts">
import { shikiBundledLanguagesInfo } from 'prosekit/extensions/code-block'

const language = defineModel<string>()
</script>

<template>
  <div
    class="relative left-2 top-3 h-0 select-none overflow-visible"
    contenteditable="false"
  >
    <select
      v-model="language"
      class="outline-unset focus:outline-unset relative box-border w-auto cursor-pointer select-none appearance-none rounded border-none bg-transparent px-2 py-1 text-xs transition text-white opacity-0 hover:opacity-80 [div[data-node-view-root]:hover_&]:opacity-50 [div[data-node-view-root]:hover_&]:hover:opacity-80"
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
