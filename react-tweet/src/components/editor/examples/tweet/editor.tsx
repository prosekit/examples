import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor, type Extension, type NodeJSON } from 'prosekit/core'
import { defineReactNodeView, ProseKit, useExtension } from 'prosekit/react'
import { useMemo, useState } from 'react'

import { sampleContent } from '../../sample/sample-doc-tweet'

import { defineExtension } from './extension'
import { MethodSelect } from './method-select'
import { TweetView } from './tweet-view'

interface EditorProps {
  initialContent?: NodeJSON
}

export default function Editor(props: EditorProps) {
  const defaultContent = props.initialContent ?? sampleContent
  const editor = useMemo(() => {
    return createEditor({ extension: defineExtension(), defaultContent })
  }, [defaultContent])

  const [method, setMethod] = useState<'basic' | 'advanced'>('basic')

  const reactTweetView: Extension | null = useMemo(() => {
    if (method === 'basic') {
      return null
    }
    return defineReactNodeView({
      name: 'tweet',
      component: TweetView,
    })
  }, [method])

  useExtension(reactTweetView, { editor })

  return (
    <ProseKit editor={editor}>
      <MethodSelect value={method} onChange={setMethod} />
      <div className="box-border h-full w-full min-h-36 overflow-y-hidden overflow-x-hidden rounded-md border border-solid border-gray-200 dark:border-gray-700 shadow-sm flex flex-col bg-white dark:bg-gray-950 text-black dark:text-white">
        <div className="relative w-full flex-1 box-border overflow-y-auto">
          <div
            ref={editor.mount}
            className="ProseMirror box-border min-h-full px-[max(4rem,calc(50%-20rem))] py-8 outline-hidden outline-0 [&_span[data-mention=user]]:text-blue-500 [&_span[data-mention=tag]]:text-violet-500"
          ></div>
        </div>
      </div>
    </ProseKit>
  )
}
