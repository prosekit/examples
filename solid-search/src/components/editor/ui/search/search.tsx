import {
  defineSearchQuery,
  type SearchCommandsExtension,
} from 'prosekit/extensions/search'
import { useEditor, useExtension } from 'prosekit/solid'
import { createMemo, createSignal, type JSX } from 'solid-js'

import { Button } from '../button'

export default function Search(props: { onClose?: VoidFunction }): JSX.Element {
  const [showReplace, setShowReplace] = createSignal(false)
  const toggleReplace = () => setShowReplace((value) => !value)

  const [searchText, setSearchText] = createSignal('')
  const [replaceText, setReplaceText] = createSignal('')

  const extension = createMemo(() => {
    if (!searchText()) {
      return null
    }
    return defineSearchQuery({ search: searchText(), replace: replaceText() })
  })

  useExtension(extension)

  const editor = useEditor<SearchCommandsExtension>({ update: true })

  const handleSearchKeyDown = (event: KeyboardEvent) => {
    if (isEnter(event)) {
      event.preventDefault()
      editor().commands.findNext()
    } else if (isShiftEnter(event)) {
      event.preventDefault()
      editor().commands.findPrev()
    }
  }

  const handleReplaceKeyDown = (event: KeyboardEvent) => {
    if (isEnter(event)) {
      event.preventDefault()
      editor().commands.replaceNext()
    } else if (isShiftEnter(event)) {
      event.preventDefault()
      editor().commands.replaceAll()
    }
  }

  return (
    <div class="z-2 box-border border-gray-200 dark:border-gray-800 border-solid border-l-0 border-r-0 border-t-0 border-b grid grid-cols-[min-content_1fr_min-content] gap-2 p-2">
      <Button tooltip="Toggle Replace" onClick={toggleReplace}>
        <span
          attr:data-rotate={showReplace() ? '' : undefined}
          class="i-lucide-chevron-right size-5 block transition-transform data-rotate:rotate-90"
        />
      </Button>
      <input
        placeholder="Search"
        type="text"
        value={searchText()}
        onInput={(event) => setSearchText(event.currentTarget.value)}
        onKeyDown={handleSearchKeyDown}
        class="flex h-9 rounded-md w-full bg-white dark:bg-gray-950 px-3 py-2 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-500 transition border box-border border-gray-200 dark:border-gray-800 border-solid ring-0 ring-transparent focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-0 outline-hidden focus-visible:outline-hidden file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50 col-start-2"
      />
      <div class="flex items-center justify-between gap-1">
        <Button
          tooltip="Previous (Shift Enter)"
          onClick={() => editor().commands.findPrev()}
        >
          <span class="i-lucide-arrow-left size-5 block" />
        </Button>
        <Button
          tooltip="Next (Enter)"
          onClick={() => editor().commands.findNext()}
        >
          <span class="i-lucide-arrow-right size-5 block" />
        </Button>
        <Button tooltip="Close" onClick={() => props.onClose?.()}>
          <span class="i-lucide-x size-5 block" />
        </Button>
      </div>
      {showReplace() && (
        <input
          placeholder="Replace"
          type="text"
          value={replaceText()}
          onInput={(event) => setReplaceText(event.currentTarget.value)}
          onKeyDown={handleReplaceKeyDown}
          class="flex h-9 rounded-md w-full bg-white dark:bg-gray-950 px-3 py-2 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-500 transition border box-border border-gray-200 dark:border-gray-800 border-solid ring-0 ring-transparent focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-0 outline-hidden focus-visible:outline-hidden file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50 col-start-2"
        />
      )}
      {showReplace() && (
        <div class="flex items-center justify-between gap-1">
          <Button
            tooltip="Replace (Enter)"
            onClick={() => editor().commands.replaceNext()}
          >
            Replace
          </Button>
          <Button
            tooltip="Replace All (Shift Enter)"
            onClick={() => editor().commands.replaceAll()}
          >
            All
          </Button>
        </div>
      )}
    </div>
  )
}

function isEnter(event: KeyboardEvent) {
  return (
    event.key === 'Enter' &&
    !event.shiftKey &&
    !event.metaKey &&
    !event.altKey &&
    !event.ctrlKey &&
    !event.isComposing
  )
}

function isShiftEnter(event: KeyboardEvent) {
  return (
    event.key === 'Enter' &&
    event.shiftKey &&
    !event.metaKey &&
    !event.altKey &&
    !event.ctrlKey &&
    !event.isComposing
  )
}
