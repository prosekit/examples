import { clsx } from 'prosekit/core'
import { defineSearchQuery } from 'prosekit/extensions/search'
import { useEditor, useExtension } from 'prosekit/react'
import { useMemo, useState } from 'react'

import Button from './button'
import type { EditorExtension } from './extension'

export default function Search({ onClose }: { onClose?: VoidFunction }) {
  const [showReplace, setShowReplace] = useState(false)
  const toggleReplace = () => setShowReplace((value) => !value)

  const [searchText, setSearchText] = useState('')
  const [replaceText, setReplaceText] = useState('')

  const extension = useMemo(() => {
    if (!searchText) {
      return null
    }
    return defineSearchQuery({ search: searchText, replace: replaceText })
  }, [searchText, replaceText])

  useExtension(extension)

  const editor = useEditor<EditorExtension>()

  const isEnter = (event: React.KeyboardEvent) => {
    return (
      event.key === 'Enter' &&
      !event.shiftKey &&
      !event.metaKey &&
      !event.altKey &&
      !event.ctrlKey &&
      !event.nativeEvent.isComposing
    )
  }

  const isShiftEnter = (event: React.KeyboardEvent) => {
    return (
      event.key === 'Enter' &&
      event.shiftKey &&
      !event.metaKey &&
      !event.altKey &&
      !event.ctrlKey &&
      !event.nativeEvent.isComposing
    )
  }

  const handleSearchKeyDown = (event: React.KeyboardEvent) => {
    if (isEnter(event)) {
      event.preventDefault()
      editor.commands.findNext()
    } else if (isShiftEnter(event)) {
      event.preventDefault()
      editor.commands.findPrev()
    }
  }

  const handleReplaceKeyDown = (event: React.KeyboardEvent) => {
    if (isEnter(event)) {
      event.preventDefault()
      editor.commands.replaceNext()
    } else if (isShiftEnter(event)) {
      event.preventDefault()
      editor.commands.replaceAll()
    }
  }

  return (
    <div className='z-2 box-border border-zinc-200 dark:border-zinc-800 border-solid border-l-0 border-r-0 border-t-0 border-b grid grid-cols-[min-content_1fr_min-content] gap-2 p-2'>
      <Button tooltip="Toggle Replace" onClick={toggleReplace}>
        <span
          className={clsx(
            'i-lucide-chevron-right h-5 w-5',
            showReplace
              ? 'rotate-90 transition-transform'
              : 'transition-transform',
          )}
        />
      </Button>
      <input
        placeholder="Search"
        type="text"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        onKeyDown={handleSearchKeyDown}
        className='flex h-9 rounded-md w-full bg-white dark:bg-neutral-900 px-3 py-2 text-sm placeholder:text-zinc-500 dark:placeholder:text-zinc-500 transition border box-border border-zinc-200 dark:border-zinc-800 border-solid ring-0 ring-transparent focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-300 focus-visible:ring-offset-0 outline-none focus-visible:outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50 col-start-2'
      />
      <div className='flex items-center justify-between gap-1'>
        <Button
          tooltip="Previous (Shift Enter)"
          onClick={editor.commands.findPrev}
        >
          <span className='i-lucide-arrow-left h-5 w-5' />
        </Button>
        <Button tooltip="Next (Enter)" onClick={editor.commands.findNext}>
          <span className='i-lucide-arrow-right h-5 w-5' />
        </Button>
        <Button tooltip="Close" onClick={onClose}>
          <span className='i-lucide-x h-5 w-5' />
        </Button>
      </div>
      {showReplace && (
        <input
          placeholder="Replace"
          type="text"
          value={replaceText}
          onChange={(event) => setReplaceText(event.target.value)}
          onKeyDown={handleReplaceKeyDown}
          className='flex h-9 rounded-md w-full bg-white dark:bg-neutral-900 px-3 py-2 text-sm placeholder:text-zinc-500 dark:placeholder:text-zinc-500 transition border box-border border-zinc-200 dark:border-zinc-800 border-solid ring-0 ring-transparent focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-300 focus-visible:ring-offset-0 outline-none focus-visible:outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50 col-start-2'
        />
      )}
      {showReplace && (
        <div className='flex items-center justify-between gap-1'>
          <Button
            tooltip="Replace (Enter)"
            onClick={editor.commands.replaceNext}
          >
            Replace
          </Button>
          <Button
            tooltip="Replace All (Shift Enter)"
            onClick={editor.commands.replaceAll}
          >
            All
          </Button>
        </div>
      )}
    </div>
  )
}
