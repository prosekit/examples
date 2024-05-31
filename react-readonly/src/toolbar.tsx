
import Button from './button'
import { useReadonly } from './use-readonly'

export default function Toolbar() {
  const { readonly, setReadonly } = useReadonly()

  return (
    <div className='z-2 box-border border-zinc-200 dark:border-zinc-800 border-solid border-l-0 border-r-0 border-t-0 border-b flex flex-wrap gap-1 p-2 items-center'>
      <Button pressed={readonly} onClick={() => setReadonly(true)}>
        Readonly
      </Button>

      <Button pressed={!readonly} onClick={() => setReadonly(false)}>
        Editable
      </Button>
    </div>
  )
}
