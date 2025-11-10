import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/react'
import { useMemo } from 'react'

import { defaultContent } from '../../sample/sample-doc-full'
import { sampleUploader } from '../../sample/sample-uploader'
import { tags } from '../../sample/tag-data'
import { users } from '../../sample/user-data'
import { BlockHandle } from '../../ui/block-handle'
import { DropIndicator } from '../../ui/drop-indicator'
import { InlineMenu } from '../../ui/inline-menu'
import { SlashMenu } from '../../ui/slash-menu'
import { TableHandle } from '../../ui/table-handle'
import { TagMenu } from '../../ui/tag-menu'
import { Toolbar } from '../../ui/toolbar'
import { UserMenu } from '../../ui/user-menu'

import { defineExtension } from './extension'

export default function Editor() {
  const editor = useMemo(() => {
    const extension = defineExtension()
    return createEditor({ extension, defaultContent })
  }, [])

  return (
    <ProseKit editor={editor}>
      <div className="box-border h-full w-full min-h-36 overflow-y-hidden overflow-x-hidden rounded-md border border-solid border-gray-200 dark:border-gray-700 shadow-sm flex flex-col bg-white dark:bg-gray-950 text-black dark:text-white">
        <Toolbar uploader={sampleUploader} />
        <div className="relative w-full flex-1 box-border overflow-y-auto">
          <div
            ref={editor.mount}
            className="ProseMirror box-border min-h-full px-[max(4rem,calc(50%-20rem))] py-8 outline-hidden outline-0 [&_span[data-mention=user]]:text-blue-500 [&_span[data-mention=tag]]:text-violet-500"
          ></div>
          <InlineMenu />
          <SlashMenu />
          <UserMenu users={users} />
          <TagMenu tags={tags} />
          <BlockHandle />
          <TableHandle />
          <DropIndicator />
        </div>
      </div>
    </ProseKit>
  )
}
