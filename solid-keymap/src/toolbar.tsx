import { createSignal } from 'solid-js'

import Toggle from './toggle'
import { useSubmitKeymap } from './use-submit-keymap'

export default function Toolbar({
  onSubmit,
}: {
  onSubmit: (hotkey: string) => void
}) {
  const [hotkey, setHotkey] = createSignal<'Shift-Enter' | 'Enter'>(
    'Shift-Enter',
  )
  useSubmitKeymap(hotkey, onSubmit)

  return (
    <div class='z-2 sticky top-0 box-border flex flex-wrap gap-1 bg-gray-100 p-2 dark:bg-zinc-900 items-center'>
      <Toggle
        pressed={() => hotkey() === 'Shift-Enter'}
        onClick={() => setHotkey('Shift-Enter')}
      >
        <span class="mr-1">Submit with</span>
        <kbd>Shift + Enter</kbd>
      </Toggle>

      <Toggle
        pressed={() => hotkey() === 'Enter'}
        onClick={() => setHotkey('Enter')}
      >
        <span class="mr-1">Submit with</span>
        <kbd>Enter</kbd>
      </Toggle>
    </div>
  )
}
