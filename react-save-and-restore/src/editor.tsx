import 'prosekit/basic/style.css'

import { defineBasicExtension } from 'prosekit/basic'
import { createEditor, jsonFromNode } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useCallback, useMemo, useState } from 'react'

import EventHandlers from './event-handlers'

export default function Editor() {
  const [key, setKey] = useState(1)
  const [defaultDoc, setDefaultDoc] = useState<string | undefined>()
  const [records, setRecords] = useState<string[]>([])
  const [hasUnsavedChange, setHasUnsavedChange] = useState(false)

  const editor = useMemo(() => {
    const extension = defineBasicExtension()
    return createEditor({
      extension,
      defaultDoc: defaultDoc && JSON.parse(defaultDoc),
    })
  }, [key, defaultDoc])

  const onDocChange = useCallback(() => {
    setHasUnsavedChange(true)
  }, [])

  const onSave = useCallback(() => {
    const doc = JSON.stringify(jsonFromNode(editor.view.state.doc))
    setRecords((records) => [...records, doc])
    setHasUnsavedChange(false)
  }, [editor])

  const onLoad = useCallback(
    (record: string) => {
      setDefaultDoc(record)
      setKey((key) => key + 1)
      setHasUnsavedChange(false)
    },
    [records],
  )

  return (
    <ProseKit editor={editor}>
      <div>
        <button
          onClick={onSave}
          disabled={!hasUnsavedChange}
          className="my-2 border border-solid bg-white p-2 text-black disabled:cursor-not-allowed disabled:text-gray-500"
        >
          {hasUnsavedChange ? 'Save' : 'No Changes'}
        </button>
        <ul>
          {records.map((record, index) => (
            <li key={index} className="my-2 flex gap-2">
              <button
                className="border border-solid bg-white p-2 text-black disabled:text-gray-500"
                onClick={() => onLoad(record)}
              >
                Load
              </button>
              <span className="flex-1 overflow-x-scroll p-2">
                <pre>{record}</pre>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className='box-border h-full w-full overflow-y-auto overflow-x-hidden rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700'>
        <div ref={editor.mount} className='dark:bg-zinc-900 relative box-border min-h-full flex-1 overflow-auto bg-white px-[max(16px,_calc(50%-330px))] py-[16px] outline-none outline-0 [&_span[data-mention="user"]]:color-blue-500 [&_span[data-mention="tag"]]:color-violet-500 [&_pre]:color-white [&_pre]:bg-zinc-800'></div>
      </div>

      <EventHandlers onDocChange={onDocChange} />
    </ProseKit>
  )
}
