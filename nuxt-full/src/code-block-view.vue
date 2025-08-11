<script setup lang="ts">
import type { CodeBlockAttrs } from 'prosekit/extensions/code-block'
import { shikiBundledLanguagesInfo } from 'prosekit/extensions/code-block'
import type { VueNodeViewProps } from 'prosekit/vue'
import { computed } from 'vue'

const props = defineProps<VueNodeViewProps>()

const language = computed({
  get() {
    const attrs = props.node.value.attrs as CodeBlockAttrs
    return attrs.language || ''
  },
  set(language: string) {
    const attrs: CodeBlockAttrs = { language }
    props.setAttrs(attrs)
  },
})
</script>

<template>
  <div
    class="relative mx-2 top-3 h-0 select-none overflow-visible text-xs"
    contenteditable="false"
  >
    <select
      v-model="language"
      class="outline-unset focus:outline-unset relative box-border w-auto cursor-pointer select-none appearance-none rounded-sm border-none bg-transparent px-2 py-1 text-xs transition text-(--prosemirror-highlight) opacity-0 hover:opacity-80 [div[data-node-view-root]:hover_&]:opacity-50 hover:[div[data-node-view-root]:hover_&]:opacity-80"
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
  <pre :ref="props.contentRef" :data-language="language" />
</template>
