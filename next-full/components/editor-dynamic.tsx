'use client'

import dynamic from 'next/dynamic'

const EditorLazy = dynamic(() => import('./components/editor/examples/full').then(mod => { default: mod.ExampleEditor }), { ssr: false })

export default function Editor() {
  return <EditorLazy />
}
