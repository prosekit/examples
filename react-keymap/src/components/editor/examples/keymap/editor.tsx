import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useCallback, useMemo, useState } from 'react'

import { defineExtension } from './extension'
import Toolbar from './toolbar'

export default function Editor() {
  const editor = useMemo(() => {
    const extension = defineExtension()
    return createEditor({ extension })
  }, [])

  const [submissions, setSubmissions] = useState<string[]>([])

  const pushSubmission = useCallback(
    (hotkey: string) => {
      const docString = JSON.stringify(editor.getDocJSON())
      const submission = `${new Date().toISOString()}\t${hotkey}\n${docString}`
      setSubmissions((prev) => [...prev, submission])
    },
    [editor],
  )

  return (
    <ProseKit editor={editor}>
      <div className="box-border h-full w-full min-h-36 overflow-y-hidden overflow-x-hidden rounded-md border border-solid border-gray-200 dark:border-gray-700 shadow-sm flex flex-col bg-white dark:bg-gray-950 text-black dark:text-white">
        <Toolbar onSubmit={pushSubmission} />
        <div className="relative w-full flex-1 box-border overflow-y-auto">
          <div
            ref={editor.mount}
            className="ProseMirror box-border min-h-full px-[max(4rem,calc(50%-20rem))] py-8 outline-hidden outline-0 [&_span[data-mention=user]]:text-blue-500 [&_span[data-mention=tag]]:text-violet-500"
          ></div>
        </div>
      </div>
      <fieldset className="mt-4 box-border flex max-w-full w-full overflow-x-auto border p-4 rounded-md shadow-sm min-w-0">
        <legend>Submit Records</legend>
        <ol>
          {submissions.map((submission, index) => (
            <li key={index}>
              <pre>{submission}</pre>
            </li>
          ))}
        </ol>
        {submissions.length === 0 && <div>No submissions yet</div>}
      </fieldset>
    </ProseKit>
  )
}
