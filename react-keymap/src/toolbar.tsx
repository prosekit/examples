import { useState } from 'react'

import Button from './button'
import { useSubmitKeymap } from './use-submit-keymap'

export default function Toolbar({
  onSubmit,
}: {
  onSubmit: (hotkey: string) => void
}) {
  const [hotkey, setHotkey] = useState<'Shift-Enter' | 'Enter'>('Shift-Enter')
  useSubmitKeymap(hotkey, onSubmit)

  return (
    <div className='z-2 sticky top-0 box-border flex flex-wrap gap-1 p-2 items-center bg-white dark:bg-neutral-900 border-zinc-200 dark:border-zinc-800 border-solid border-l-0 border-r-0 border-t-0 border-b'>
      <Button
        pressed={hotkey === 'Shift-Enter'}
        onClick={() => setHotkey('Shift-Enter')}
      >
        <span className="mr-1">Submit with</span>
        <kbd>Shift + Enter</kbd>
      </Button>

      <Button pressed={hotkey === 'Enter'} onClick={() => setHotkey('Enter')}>
        <span className="mr-1">Submit with</span>
        <kbd>Enter</kbd>
      </Button>
    </div>
  )
}
