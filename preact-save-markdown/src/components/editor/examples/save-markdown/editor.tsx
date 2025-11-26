import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { useCallback, useMemo, useState } from 'preact/hooks'
import { defineBasicExtension } from 'prosekit/basic'
import { createEditor, jsonFromHTML } from 'prosekit/core'
import { ProseKit, useDocChange } from 'prosekit/preact'

import { htmlFromMarkdown, markdownFromHTML } from './markdown'

export default function Editor() {
  // A list of saved documents, stored as Markdown strings
  const [records, setRecords] = useState<string[]>([])
  // Whether there are unsaved changes
  const [hasUnsavedChange, setHasUnsavedChange] = useState(false)
  // A key to force a re-render of the editor
  const [key, setKey] = useState(1)

  const editor = useMemo(() => {
    const extension = defineBasicExtension()
    return createEditor({ extension })
  }, [])

  const handleDocChange = useCallback(() => setHasUnsavedChange(true), [])
  useDocChange(handleDocChange, { editor })

  const handleSave = useCallback(() => {
    const html = editor.getDocHTML()
    const record = markdownFromHTML(html)
    setRecords((prev) => [...prev, record])
    setHasUnsavedChange(false)
  }, [editor])

  const handleLoad = useCallback(
    (record: string) => {
      const html = htmlFromMarkdown(record)
      editor.setContent(jsonFromHTML(html, { schema: editor.schema }))
      setHasUnsavedChange(false)
      setKey((prev) => prev + 1)
    },
    [editor],
  )

  return (
    <div className="box-border h-full w-full min-h-36 overflow-y-hidden overflow-x-hidden rounded-md border border-solid border-gray-200 dark:border-gray-700 shadow-sm flex flex-col bg-white dark:bg-gray-950 text-black dark:text-white">
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
      <ProseKit editor={editor} key={key}>
        <div className="relative w-full flex-1 box-border overflow-y-auto">
          <div
            ref={editor.mount}
            className="ProseMirror box-border min-h-full px-[max(4rem,calc(50%-20rem))] py-8 outline-hidden outline-0 [&_span[data-mention=user]]:text-blue-500 [&_span[data-mention=tag]]:text-violet-500"
          ></div>
        </div>
      </ProseKit>
    </div>
  )
}
