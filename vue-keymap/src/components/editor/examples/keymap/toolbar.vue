<script setup lang="ts">
import { ref } from 'vue'

import { Button } from '../../ui/button'

import { useSubmitKeymap } from './use-submit-keymap'

const props = defineProps<{
  onSubmit: (hotkey: string) => void
}>()

const hotkey = ref<'Shift-Enter' | 'Enter'>('Shift-Enter')

useSubmitKeymap(hotkey, props.onSubmit)

function setHotkey(value: 'Shift-Enter' | 'Enter') {
  hotkey.value = value
}
</script>

<template>
  <div class="z-2 box-border border-gray-200 dark:border-gray-800 border-solid border-l-0 border-r-0 border-t-0 border-b flex flex-wrap gap-1 p-2 items-center">
    <Button
      :pressed="hotkey === 'Shift-Enter'"
      @click="setHotkey('Shift-Enter')"
    >
      <span class="mr-1">Submit with</span>
      <kbd>Shift + Enter</kbd>
    </Button>

    <Button
      :pressed="hotkey === 'Enter'"
      @click="setHotkey('Enter')"
    >
      <span class="mr-1">Submit with</span>
      <kbd>Enter</kbd>
    </Button>
  </div>
</template>
