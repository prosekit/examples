import 'prosekit/basic/style.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

import { defineExtension } from './extension'
import InlineMenu from './inline-menu'

const defaultHTML =
  '<p><b>Try to select some text</b></p>' +
  '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet nec ullamcorper sit amet risus. Nam aliquam sem et tortor consequat id porta. Interdum posuere lorem ipsum dolor sit amet. Lectus sit amet est placerat in egestas erat. Egestas sed tempus urna et pharetra pharetra. Sit amet cursus sit amet dictum sit amet. Porttitor leo a diam sollicitudin. Tellus orci ac auctor augue. Tellus in hac habitasse platea dictumst vestibulum. At elementum eu facilisis sed odio morbi. Dolor magna eget est lorem ipsum. Et malesuada fames ac turpis egestas. Arcu risus quis varius quam quisque id diam. Purus viverra accumsan in nisl nisi scelerisque eu ultrices. Ut tortor pretium viverra suspendisse potenti nullam ac tortor vitae.</p>'.repeat(
    10,
  )

export default function Editor() {
  const editor = useMemo(() => {
    return createEditor({ extension: defineExtension(), defaultHTML })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div className='box-border h-full w-full overflow-y-auto overflow-x-hidden rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700'>
        <div className='relative flex min-h-full w-full flex-col'>
          <div
            ref={editor.mount}
            spellCheck={false}
            className='dark:bg-zinc-900 relative box-border min-h-full flex-1 overflow-auto bg-white dark:bg-neutral-900 px-[max(16px,_calc(50%-330px))] py-[16px] outline-none outline-0 [&_span[data-mention="user"]]:color-blue-500 [&_span[data-mention="tag"]]:color-violet-500 [&_pre]:color-white [&_pre]:bg-zinc-800'
          ></div>
          <InlineMenu />
        </div>
      </div>
    </ProseKit>
  )
}
