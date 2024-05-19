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
    <div class='z-2 sticky top-0 box-border flex flex-wrap gap-1 p-2 items-center bg-background border-border border-solid border-l-0 border-r-0 border-t-0 border-b'>
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
