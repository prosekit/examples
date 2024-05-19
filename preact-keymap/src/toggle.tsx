import type { ComponentChild } from 'preact'

export default function Toggle({
  pressed,
  disabled,
  onClick,
  children,
}: {
  pressed: boolean
  disabled?: boolean
  onClick: VoidFunction
  children: ComponentChild
}) {
  return (
    <button
      data-state={pressed ? 'on' : 'off'}
      disabled={disabled}
      onClick={() => onClick()}
      onMouseDown={(event) => event.preventDefault()}
      class='outline-unset focus-visible:outline-unset flex items-center justify-center rounded-md p-2 font-medium transition focus-visible:ring-2 focus-visible:ring-zinc-900 dark:ring-zinc-300 disabled:pointer-events-none disabled:opacity-50 hover:disabled:opacity-50 bg-transparent hover:bg-zinc-100 data-[state=on]:bg-gray-200 dark:bg-gray-700'
    >
      {children}
    </button>
  )
}
