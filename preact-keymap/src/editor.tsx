import 'prosekit/basic/style.css'

import { useMemo, useState, useCallback } from 'preact/hooks'
import { createEditor, jsonFromNode } from 'prosekit/core'
import { ProseKit } from 'prosekit/preact'

import { defineExtension } from './extension'
import Toolbar from './toolbar'

export default function Editor() {
  const editor = useMemo(() => {
    return createEditor({ extension: defineExtension() })
  }, [])

  const [submitions, setSubmitions] = useState<string[]>([])

  const pushSubmition = useCallback(
    (hotkey: string) => {
      const doc = editor.view.state.doc
      const docString = JSON.stringify(jsonFromNode(doc))
      const submition = `${new Date().toISOString()}\t${hotkey}\n${docString}`
      setSubmitions((submitions) => [...submitions, submition])
    },
    [editor],
  )

  return (
    <ProseKit editor={editor}>
      <div className='box-border h-full w-full min-h-32 overflow-y-auto overflow-x-hidden rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700'>
        <div className='relative flex min-h-full w-full flex-col'>
          <Toolbar onSubmit={pushSubmition} />
          <div ref={editor.mount} className='relative box-border min-h-full flex-1 overflow-auto bg-white dark:bg-neutral-900 px-[max(16px,_calc(50%-330px))] py-[16px] outline-none outline-0 [&_span[data-mention="user"]]:color-blue-500 [&_span[data-mention="tag"]]:color-violet-500 [&_pre]:color-white [&_pre]:bg-zinc-800'></div>
        </div>
      </div>
      <fieldset className="mt-4 border">
        <legend>Submit Records</legend>
        <ol>
          {submitions.map((submition, index) => (
            <li key={index}>
              <pre>{submition}</pre>
            </li>
          ))}
        </ol>
        {submitions.length === 0 && <div>No submitions yet</div>}
      </fieldset>
    </ProseKit>
  )
}
