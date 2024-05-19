import 'prosekit/basic/style.css'
import { defineBasicExtension } from 'prosekit/basic'
import {
  createEditor,
  jsonFromHTML,
  htmlFromNode,
  type NodeJSON,
} from 'prosekit/core'
import { ProseKit, useDocChange } from 'prosekit/react'
import { useCallback, useMemo, useState } from 'react'

export default function Editor() {
  const [key, setKey] = useState(1)
  const [defaultDoc, setDefaultDoc] = useState<NodeJSON | undefined>()
  const [records, setRecords] = useState<string[]>([])
  const [hasUnsavedChange, setHasUnsavedChange] = useState(false)

  const editor = useMemo(() => {
    const extension = defineBasicExtension()
    return createEditor({ extension, defaultDoc })
  }, [key, defaultDoc])

  const handleDocChange = useCallback(() => setHasUnsavedChange(true), [])
  useDocChange(handleDocChange, { editor })

  // Save the current document as a HTML string
  const handleSave = useCallback(() => {
    const record = htmlFromNode(editor.view.state.doc)
    setRecords((records) => [...records, record])
    setHasUnsavedChange(false)
  }, [editor])

  // Load a document from a HTML string
  const handleLoad = useCallback(
    (record: string) => {
      setDefaultDoc(jsonFromHTML(record, { schema: editor.schema }))
      setKey((key) => key + 1)
      setHasUnsavedChange(false)
    },
    [records, editor.schema],
  )

  return (
    <ProseKit editor={editor}>
      <div className="box-border h-full w-full min-h-32 overflow-y-auto overflow-x-hidden rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700">
        <button
          onClick={handleSave}
          disabled={!hasUnsavedChange}
          className="m-1 border border-solid bg-white px-2 py-1 text-sm text-black disabled:cursor-not-allowed disabled:text-gray-500"
        >
          {hasUnsavedChange ? 'Save' : 'No changes to save'}
        </button>
        <ul className="border-b border-t border-solid text-sm">
          {records.map((record, index) => (
            <li key={index} className="m-1 flex gap-2">
              <button
                className="border border-solid bg-white px-2 py-1 text-black"
                onClick={() => handleLoad(record)}
              >
                Load
              </button>
              <span className="flex-1 overflow-x-scroll p-2">
                <pre>{record}</pre>
              </span>
            </li>
          ))}
        </ul>
        <div ref={editor.mount} className="ProseMirror relative box-border min-h-full flex-1 overflow-auto bg-background px-[max(16px,_calc(50%-330px))] py-[16px] outline-none outline-0 [&_span[data-mention='user']]:text-blue-500 [&_span[data-mention='tag']]:text-violet-500 [&_pre]:text-white [&_pre]:bg-zinc-800"></div>
      </div>
    </ProseKit>
  )
}
