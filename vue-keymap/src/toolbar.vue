<script setup lang="ts">
import { ref } from 'vue'

import Button from './button.vue'
import { useSubmitKeymap } from './use-submit-keymap'

const emit = defineEmits<{
  submit: [hotkey: string]
}>()

const hotkey = ref<'Shift-Enter' | 'Enter'>('Shift-Enter')
useSubmitKeymap(hotkey, (hotkey) => emit('submit', hotkey))
</script>

<template>
  <div
    class="z-2 box-border border-zinc-200 dark:border-zinc-800 border-solid border-l-0 border-r-0 border-t-0 border-b flex flex-wrap gap-1 p-2 items-center"
  >
    <Button
      :pressed="hotkey === 'Shift-Enter'"
      @click="() => (hotkey = 'Shift-Enter')"
    >
      <span class="mr-1">Submit with</span>
      <kbd>Shift + Enter</kbd>
    </Button>

    <Button :pressed="hotkey === 'Enter'" @click="() => (hotkey = 'Enter')">
      <span class="mr-1">Submit with</span>
      <kbd>Enter</kbd>
    </Button>
  </div>
</template>
