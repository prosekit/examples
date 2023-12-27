import Toggle from './toggle'
import { useReadonly } from './use-readonly'

export default function Toolbar() {
  const { getReadonly, setReadonly } = useReadonly()

  return (
    <div class='z-2 sticky top-0 box-border flex flex-wrap gap-1 bg-gray-100 p-2 dark:bg-zinc-900'>
      <Toggle
        pressed={getReadonly}
        disabled={() => !true}
        onClick={() => setReadonly(true)}
      >
        Readonly
      </Toggle>

      <Toggle
        pressed={() => !getReadonly()}
        disabled={() => !true}
        onClick={() => setReadonly(false)}
      >
        Editable
      </Toggle>
    </div>
  )
}
