import type { LinkAttrs } from 'prosekit/extensions/link'
import type { EditorState } from 'prosekit/pm/state'
import { useEditor } from 'prosekit/react'
import { InlinePopover } from 'prosekit/react/inline-popover'
import { useState } from 'react'

import type { EditorExtension } from './extension'
import Toggle from './toggle'

export default function InlineMenu() {
  const editor = useEditor<EditorExtension>({ update: true })

  const [linkMenuOpen, setLinkMenuOpen] = useState(false)
  const toggleLinkMenuOpen = () => setLinkMenuOpen((open) => !open)

  const getCurrentLink = (state: EditorState): string | undefined => {
    const { $from } = state.selection
    const marks = $from.marksAcross($from)
    if (!marks) {
      return
    }
    for (const mark of marks) {
      if (mark.type.name === 'link') {
        return (mark.attrs as LinkAttrs).href
      }
    }
  }

  const handleLinkUpdate = (href?: string) => {
    if (href) {
      editor.commands.addLink({ href })
    } else {
      editor.commands.removeLink()
    }

    setLinkMenuOpen(false)
    editor.focus()
  }

  return (
    <>
      <InlinePopover
        className='z-10 box-border border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-neutral-900 shadow-lg relative flex min-w-[120px] space-x-1 overflow-auto whitespace-nowrap rounded-md p-1'
        onOpenChange={(open) => {
          if (!open) {
            setLinkMenuOpen(false)
          }
        }}
      >
        <Toggle
          pressed={editor.marks.bold.isActive()}
          disabled={!editor.commands.toggleBold.canApply()}
          onClick={() => editor.commands.toggleBold()}
        >
          <div className='i-lucide-bold h-5 w-5'></div>
        </Toggle>

        <Toggle
          pressed={editor.marks.italic.isActive()}
          disabled={!editor.commands.toggleItalic.canApply()}
          onClick={() => editor.commands.toggleItalic()}
        >
          <div className='i-lucide-italic h-5 w-5'></div>
        </Toggle>

        <Toggle
          pressed={editor.marks.underline.isActive()}
          disabled={!editor.commands.toggleUnderline.canApply()}
          onClick={() => editor.commands.toggleUnderline()}
        >
          <div className='i-lucide-underline h-5 w-5'></div>
        </Toggle>

        <Toggle
          pressed={editor.marks.strike.isActive()}
          disabled={!editor.commands.toggleStrike.canApply()}
          onClick={() => editor.commands.toggleStrike()}
        >
          <div className='i-lucide-strikethrough h-5 w-5'></div>
        </Toggle>

        <Toggle
          pressed={editor.marks.code.isActive()}
          disabled={!editor.commands.toggleCode.canApply()}
          onClick={() => editor.commands.toggleCode()}
        >
          <div className='i-lucide-code h-5 w-5'></div>
        </Toggle>

        {editor.commands.addLink.canApply({ href: '' }) && (
          <Toggle
            pressed={editor.marks.link.isActive()}
            onClick={() => {
              editor.commands.expandLink()
              toggleLinkMenuOpen()
            }}
          >
            <div className='i-lucide-link h-5 w-5'></div>
          </Toggle>
        )}
      </InlinePopover>

      <InlinePopover
        className='z-10 box-border border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-neutral-900 shadow-lg relative flex flex-col w-xs rounded-lg p-4 gap-y-2 items-stretch'
        placement={'bottom'}
        open={linkMenuOpen}
        onOpenChange={setLinkMenuOpen}
      >
        {linkMenuOpen && (
          <form
            onSubmit={(event) => {
              event.preventDefault()
              const target = event.target as HTMLFormElement | null
              const href = target?.querySelector('input')?.value?.trim()
              handleLinkUpdate(href)
            }}
          >
            <input
              placeholder="Paste the link..."
              defaultValue={getCurrentLink(editor.state)}
              className='flex h-10 rounded-md w-full bg-white dark:bg-neutral-900 px-3 py-2 text-sm placeholder:text-zinc-500 dark:text-zinc-500 transition border box-border border-zinc-200 dark:border-zinc-800 border-solid ring-0 ring-transparent focus-visible:ring-2 focus-visible:ring-zinc-900 dark:ring-zinc-300 focus-visible:ring-offset-0 outline-none focus-visible:outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50'
            ></input>
          </form>
        )}
        {editor.marks.link.isActive() && (
          <button
            onClick={() => handleLinkUpdate()}
            onMouseDown={(event) => event.preventDefault()}
            className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white dark:ring-offset-neutral-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:ring-zinc-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-zinc-900 text-zinc-50 dark:text-zinc-900 hover:bg-zinc-900 dark:bg-zinc-50/90 h-9 px-3'
          >
            Remove link
          </button>
        )}
      </InlinePopover>
    </>
  )
}
