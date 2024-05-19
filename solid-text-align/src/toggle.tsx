import type { ParentProps } from 'solid-js'

export default function Toggle({
  pressed,
  disabled,
  onClick,
  children,
}: ParentProps<{
  pressed: () => boolean
  disabled?: () => boolean
  onClick: () => void
}>) {
  return (
    <button
      data-state={pressed() ? 'on' : 'off'}
      disabled={disabled?.()}
      onClick={() => onClick()}
      onMouseDown={(event) => event.preventDefault()}
      class='outline-unset focus-visible:outline-unset flex items-center justify-center rounded-md p-2 font-medium transition focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:disabled:opacity-50 bg-transparent hover:bg-secondary data-[state=on]:bg-accent'
    >
      {children}
    </button>
  )
}
