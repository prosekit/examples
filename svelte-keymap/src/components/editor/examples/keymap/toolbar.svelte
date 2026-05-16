<script lang="ts">
import { useKeymap } from 'prosekit/svelte'
import { toStore } from 'svelte/store'

import { Button } from '../../ui/button'

interface Props {
  onSubmit: (hotkey: string) => void
}

const props: Props = $props()

let hotkey = $state<'Shift-Enter' | 'Enter'>('Shift-Enter')

const keymap = $derived({
  [hotkey]: () => {
    props.onSubmit(hotkey)
    return true
  },
})

useKeymap(toStore(() => keymap))

function setHotkey(value: 'Shift-Enter' | 'Enter') {
  hotkey = value
}
</script>

<div class="z-2 box-border border-gray-200 dark:border-gray-800 border-solid border-l-0 border-r-0 border-t-0 border-b flex flex-wrap gap-1 p-2 items-center">
  <Button
    pressed={hotkey === 'Shift-Enter'}
    onClick={() => setHotkey('Shift-Enter')}
  >
    <span class="mr-1">Submit with</span>
    <kbd>Shift + Enter</kbd>
  </Button>

  <Button
    pressed={hotkey === 'Enter'}
    onClick={() => setHotkey('Enter')}
  >
    <span class="mr-1">Submit with</span>
    <kbd>Enter</kbd>
  </Button>
</div>
