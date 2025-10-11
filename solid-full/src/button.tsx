import {
  TooltipContent,
  TooltipRoot,
  TooltipTrigger,
} from 'prosekit/solid/tooltip'
import type { ParentProps } from 'solid-js'
import { Show } from 'solid-js'

export default function Button(
  props: ParentProps<{
    pressed: () => boolean
    disabled?: () => boolean
    onClick?: () => void
    tooltip?: string
  }>,
) {
  return (
    <TooltipRoot>
      <TooltipTrigger class="block">
        <button
          data-state={props.pressed() ? 'on' : 'off'}
          disabled={props.disabled?.()}
          onClick={() => props.onClick?.()}
          onMouseDown={(event) => event.preventDefault()}
          class="outline-unset focus-visible:outline-unset flex items-center justify-center rounded-md p-2 font-medium transition focus-visible:ring-2 text-sm focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 disabled:pointer-events-none min-w-9 min-h-9 text-gray-900 dark:text-gray-50 disabled:text-gray-900/50 dark:disabled:text-gray-50/50 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 data-[state=on]:bg-gray-200 dark:data-[state=on]:bg-gray-700"
        >
          {props.children}
          <Show when={props.tooltip}>
            <span class="sr-only">{props.tooltip}</span>
          </Show>
        </button>
      </TooltipTrigger>
      <Show when={props.tooltip}>
        <TooltipContent class="z-50 overflow-hidden rounded-md border border-solid bg-gray-900 dark:bg-gray-50 px-3 py-1.5 text-xs text-gray-50 dark:text-gray-900 shadow-xs [&:not([data-state])]:hidden will-change-transform data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[state=open]:animate-duration-150 data-[state=closed]:animate-duration-200 data-[side=bottom]:slide-in-from-top-2 data-[side=bottom]:slide-out-to-top-2 data-[side=left]:slide-in-from-right-2 data-[side=left]:slide-out-to-right-2 data-[side=right]:slide-in-from-left-2 data-[side=right]:slide-out-to-left-2 data-[side=top]:slide-in-from-bottom-2 data-[side=top]:slide-out-to-bottom-2">
          {props.tooltip}
        </TooltipContent>
      </Show>
    </TooltipRoot>
  )
}
