import Toggle from './toggle'
import { useReadonly } from './use-readonly'

export default function Toolbar() {
  const { readonly, setReadonly } = useReadonly()

  return (
    <div className='z-2 sticky top-0 box-border flex flex-wrap gap-1 bg-gray-100 p-2 dark:bg-zinc-900 items-center'>
      <Toggle pressed={readonly} onClick={() => setReadonly(true)}>
        Readonly
      </Toggle>

      <Toggle pressed={!readonly} onClick={() => setReadonly(false)}>
        Editable
      </Toggle>
    </div>
  )
}
