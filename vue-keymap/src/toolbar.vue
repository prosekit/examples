<script setup lang="ts">
import { ref, type PropType } from 'vue'
import Toggle from './toggle.vue'
import { useSubmitKeymap } from './use-submit-keymap'

let props = defineProps({
  onSubmit: {
    type: Function as PropType<(hotkey: string) => void>,
    required: true,
  },
})
const hotkey = ref<'Shift-Enter' | 'Enter'>('Shift-Enter')
useSubmitKeymap(hotkey, props.onSubmit)
</script>

<template>
  <div
    class="z-2 sticky top-0 box-border flex flex-wrap gap-1 bg-gray-100 p-2 dark:bg-zinc-900"
  >
    <Toggle
      :pressed="hotkey === 'Shift-Enter'"
      @click="() => (hotkey = 'Shift-Enter')"
    >
      <span class="mr-1">Submit with</span>
      <kbd>Shift + Enter</kbd>
    </Toggle>

    <Toggle :pressed="hotkey === 'Enter'" @click="() => (hotkey = 'Enter')">
      <span class="mr-1">Submit with</span>
      <kbd>Enter</kbd>
    </Toggle>
  </div>
</template>
