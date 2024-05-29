<script lang="ts">
import { writable } from 'svelte/store'
import Button from './button.svelte'
import { useSubmitKeymap } from './use-submit-keymap'

export let onSubmit: (hotkey: string) => void

const hotkey = writable<'Shift-Enter' | 'Enter'>('Shift-Enter')
useSubmitKeymap(hotkey, onSubmit)
</script>

<div class='z-2 sticky top-0 box-border flex flex-wrap gap-1 p-2 items-center bg-white dark:bg-neutral-900 border-zinc-200 dark:border-zinc-800 border-solid border-l-0 border-r-0 border-t-0 border-b'>
  <Button
    pressed={$hotkey === 'Shift-Enter'}
    onClick={() => ($hotkey = 'Shift-Enter')}
  >
    <span class="mr-1">Submit with</span>
    <kbd>Shift + Enter</kbd>
  </Button>

  <Button pressed={$hotkey === 'Enter'} onClick={() => ($hotkey = 'Enter')}>
    <span class="mr-1">Submit with</span>
    <kbd>Enter</kbd>
  </Button>
</div>
