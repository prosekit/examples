import {
  TooltipPopup,
  TooltipPositioner,
  TooltipRoot,
  TooltipTrigger,
} from 'prosekit/solid/tooltip'
import type { JSX } from 'solid-js'

export default function Button(props: {
  pressed?: boolean
  disabled?: boolean
  onClick?: () => void
  tooltip?: string
  children: JSX.Element
}): JSX.Element {
  return (
    <TooltipRoot>
      <TooltipTrigger class="block">
        <button
          data-state={props.pressed ? 'on' : 'off'}
          disabled={props.disabled}
          onClick={props.onClick}
          onMouseDown={(event) => {
            // Prevent the editor from being blurred when the button is clicked
            event.preventDefault()
          }}
          class="outline-unset focus-visible:outline-unset flex items-center justify-center rounded-md p-2 font-medium transition focus-visible:ring-2 text-sm focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 disabled:pointer-events-none min-w-9 min-h-9 text-gray-900 dark:text-gray-50 disabled:text-gray-900/50 dark:disabled:text-gray-50/50 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 data-[state=on]:bg-gray-200 dark:data-[state=on]:bg-gray-700"
        >
          {props.children}
          {props.tooltip ? <span class="sr-only">{props.tooltip}</span> : null}
        </button>
      </TooltipTrigger>
      {props.tooltip ? (
        <TooltipPositioner class="block overflow-visible bg-transparent w-min h-min z-50 ease-out transition-transform duration-100 motion-reduce:transition-none">
          <TooltipPopup class="flex box-border origin-(--transform-origin) transition transition-discrete motion-reduce:transition-none duration-100 data-[state=closed]:duration-150 data-[state=closed]:opacity-0 starting:opacity-0 data-[state=closed]:scale-95 starting:scale-95 overflow-hidden rounded-md border border-solid bg-gray-900 dark:bg-gray-50 px-3 py-1.5 text-xs text-gray-50 dark:text-gray-900 shadow-xs text-nowrap">
            {props.tooltip}
          </TooltipPopup>
        </TooltipPositioner>
      ) : null}
    </TooltipRoot>
  )
}
