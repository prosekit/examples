
import Toggle from './toggle'
import { useReadonly } from './use-readonly'

export default function Toolbar() {
  const { readonly, setReadonly } = useReadonly()

  return (
    <div className='z-2 sticky top-0 box-border flex flex-wrap gap-1 p-2 items-center bg-background border-border border-solid border-l-0 border-r-0 border-t-0 border-b'>
      <Toggle pressed={readonly} onClick={() => setReadonly(true)}>
        Readonly
      </Toggle>

      <Toggle pressed={!readonly} onClick={() => setReadonly(false)}>
        Editable
      </Toggle>
    </div>
  )
}
