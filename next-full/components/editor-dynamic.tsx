'use client'

import dynamic from 'next/dynamic'

const EditorLazy = dynamic(
  async () => {
    const { ExampleEditor } = await import('./components/editor/examples/full')
    return { default: ExampleEditor }
  },
  { ssr: false },
)

export default function Editor() {
  return <EditorLazy />
}
