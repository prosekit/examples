
import Button from './button'
import { useReadonly } from './use-readonly'

export default function Toolbar() {
  const { getReadonly, setReadonly } = useReadonly()

  return (
    <div class='z-2 sticky top-0 box-border flex flex-wrap gap-1 p-2 items-center bg-white dark:bg-neutral-900 border-zinc-200 dark:border-zinc-800 border-solid border-l-0 border-r-0 border-t-0 border-b'>
      <Button
        pressed={getReadonly}
        disabled={() => !true}
        onClick={() => setReadonly(true)}
      >
        Readonly
      </Button>

      <Button
        pressed={() => !getReadonly()}
        disabled={() => !true}
        onClick={() => setReadonly(false)}
      >
        Editable
      </Button>
    </div>
  )
}
