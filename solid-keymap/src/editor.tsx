import 'prosekit/basic/style.css'

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
      <div class='box-border h-full max-h-[500px] w-full overflow-y-auto overflow-x-hidden rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700'>
        <Toolbar onSubmit={pushSubmition} />
        <div ref={editor.mount} class='dark:bg-dark relative box-border min-h-full flex-1 overflow-auto bg-white px-[max(16px,_calc(50%-330px))] py-[16px] outline-none outline-0 [&_span[data-mention="user"]]:color-blue-500 [&_span[data-mention="tag"]]:color-violet-500 [&_pre]:bg-slate-100'></div>
      </div>
      <fieldset class="mt-4 border">
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
