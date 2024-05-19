
import Toggle from './toggle'
import { useReadonly } from './use-readonly'

export default function Toolbar() {
  const { getReadonly, setReadonly } = useReadonly()

  return (
    <div class="z-2 sticky top-0 box-border flex flex-wrap gap-1 p-2 items-center bg-background border-border border-solid border-l-0 border-r-0 border-t-0 border-b">
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
