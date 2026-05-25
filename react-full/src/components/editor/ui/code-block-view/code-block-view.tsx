'use client'

import { renderMermaidSVG, THEMES } from 'beautiful-mermaid'
import {
  isCodeBlockPreviewHiddenDecoration,
  shikiBundledLanguagesInfo,
  type CodeBlockAttrs,
} from 'prosekit/extensions/code-block'
import { TextSelection } from 'prosekit/pm/state'
import type { ReactNodeViewProps } from 'prosekit/react'
import { useMemo, useRef } from 'react'

export default function CodeBlockView(props: ReactNodeViewProps) {
  const attrs = props.node.attrs as CodeBlockAttrs
  const language = attrs.language || ''
  const hidePreview = props.decorations.some(isCodeBlockPreviewHiddenDecoration)
  const preRef = useRef<HTMLElement | null>(null)

  const showMermaidPreview = !hidePreview && language === 'mermaid'

  const setLanguage = (language: string) => {
    const attrs: CodeBlockAttrs = { language }
    props.setAttrs(attrs)
  }

  const focusSource = (event: React.MouseEvent | React.KeyboardEvent) => {
    event.preventDefault()
    const pos = props.getPos()
    if (typeof pos !== 'number') return
    const { state, dispatch } = props.view
    const selection = TextSelection.near(state.doc.resolve(pos + 1), 1)
    dispatch(state.tr.setSelection(selection))
    props.view.focus()
    preRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }

  const code = props.node.textContent

  const mermaidPreview = useMemo(() => {
    if (language !== 'mermaid') return { svg: null, error: null }
    try {
      return { svg: renderMermaidSVG(code, THEMES['tokyo-night']), error: null }
    } catch (err) {
      return {
        svg: null,
        error: err instanceof Error ? err : new Error(String(err)),
      }
    }
  }, [code, language])

  return (
    <>
      <div
        className="relative mx-2 top-3 h-0 select-none overflow-visible text-xs data-preview:hidden"
        contentEditable={false}
        data-preview={showMermaidPreview ? '' : undefined}
      >
        <select
          aria-label="Code block language"
          className="outline-unset focus:outline-unset relative box-border w-auto cursor-pointer select-none appearance-none rounded-sm border-none bg-transparent px-2 py-1 text-xs transition text-(--prosemirror-highlight) opacity-0 hover:opacity-80 [div[data-node-view-root]:hover_&]:opacity-50 hover:[div[data-node-view-root]:hover_&]:opacity-80"
          onChange={(event) => setLanguage(event.target.value)}
          value={language}
        >
          <option value="">Plain Text</option>
          {shikiBundledLanguagesInfo.map((info) => (
            <option key={info.id} value={info.id}>
              {info.name}
            </option>
          ))}
        </select>
      </div>
      <pre
        ref={(element) => {
          props.contentRef(element)
          preRef.current = element
        }}
        className="data-preview:hidden"
        data-preview={showMermaidPreview ? '' : undefined}
        data-language={language}
      ></pre>
      {showMermaidPreview && (
        <div
          aria-label="Edit source"
          className="block py-2 overflow-auto"
          contentEditable={false}
          onMouseDown={focusSource}
        >
          {mermaidPreview.error ? (
            <pre>{mermaidPreview.error.message}</pre>
          ) : null}
          {mermaidPreview.svg ? (
            <div dangerouslySetInnerHTML={{ __html: mermaidPreview.svg }}></div>
          ) : null}
        </div>
      )}
    </>
  )
}
