import 'prosekit/basic/style.css'

import { createEditor, type NodeJSON } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

import { defineExtension } from './extension'
import Toolbar from './toolbar'

export default function Editor() {
  const editor = useMemo(() => {
    const extension = defineExtension()
    return createEditor({ extension, defaultDoc })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div className="box-border h-full max-h-[500px] w-full overflow-y-auto overflow-x-hidden rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700">
        <div className="relative flex min-h-full w-full flex-col">
          <Toolbar />
          <div
            ref={editor.mount}
            className='dark:bg-dark relative box-border min-h-full flex-1 overflow-auto bg-white px-[max(16px,_calc(50%-330px))] py-[16px] outline-none outline-0 [&_span[data-mention="user"]]:color-blue-500 [&_span[data-mention="tag"]]:color-violet-500 [&_pre]:bg-slate-100'
          ></div>
        </div>
      </div>
    </ProseKit>
  )
}

const js = `async function main() {\n  while (true) {\n    await sleep();\n    await eat();\n    await code('JavaScript!');\n  }\n}`
const py = `async def main():\n    while True:\n        await sleep()\n        await eat()\n        await code("Python!")`
const go = `func main() {\n\tfor {\n\t\tsleep()\n\t\teat()\n\t\tcode("Go!")\n\t}\n}`

const defaultDoc: NodeJSON = {
  type: 'doc',
  content: [
    {
      type: 'codeBlock',
      attrs: { language: 'javascript' },
      content: [{ type: 'text', text: js }],
    },
    {
      type: 'codeBlock',
      attrs: { language: 'python' },
      content: [{ type: 'text', text: py }],
    },
    {
      type: 'codeBlock',
      attrs: { language: 'go' },
      content: [{ type: 'text', text: go }],
    },
  ],
}
