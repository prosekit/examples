import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor, jsonFromNode } from 'prosekit/core'
import { ProseKit } from 'prosekit/solid'
import { createSignal } from 'solid-js'

import { defineExtension } from './extension'
import Toolbar from './toolbar'

export default function Editor() {
  const editor = createEditor({ extension: defineExtension() })

  const [submitions, setSubmitions] = createSignal<string[]>([])

  const pushSubmition = (hotkey: string) => {
    const doc = editor.view.state.doc
    const docString = JSON.stringify(jsonFromNode(doc))
    const submition = `${new Date().toISOString()}\t${hotkey}\n${docString}`
    setSubmitions((submitions) => [...submitions, submition])
  }

  return (
    <ProseKit editor={editor}>
      <div class="box-border h-full w-full min-h-36 overflow-y-hidden overflow-x-hidden rounded-md border border-solid border-gray-200 dark:border-gray-700 shadow flex flex-col bg-white dark:bg-gray-950 color-black dark:color-white">
        <Toolbar onSubmit={pushSubmition} />
        <div class="relative w-full flex-1 box-border overflow-y-scroll">
          <div
            ref={editor.mount}
            class="ProseMirror box-border min-h-full px-[max(4rem,_calc(50%-20rem))] py-8 outline-none outline-0 [&_span[data-mention=user]]:text-blue-500 [&_span[data-mention=tag]]:text-violet-500"
          ></div>
        </div>
      </div>
      <fieldset class="mt-4 box-border flex max-w-full w-full overflow-x-auto border p-4 rounded-md shadow min-w-0">
        <legend>Submit Records</legend>
        <ol>
          {submitions().map((submition) => (
            <li>
              <pre>{submition}</pre>
            </li>
          ))}
        </ol>
        {submitions().length === 0 && <div>No submitions yet</div>}
      </fieldset>
    </ProseKit>
  )
}
