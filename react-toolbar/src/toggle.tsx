import type { ElementType, HTMLAttributes, ReactNode } from 'react'

export default function Toggle({
  as,
  pressed,
  disabled,
  onClick,
  children,
}: {
  as?: ElementType<HTMLAttributes<HTMLElement>>
  pressed: boolean
  disabled?: boolean
  onClick?: VoidFunction
  children: ReactNode
}) {
  const Component = as ?? 'button'
  return (
    <Component
      data-state={pressed ? 'on' : 'off'}
      disabled={disabled}
      onClick={() => onClick?.()}
      onMouseDown={(event) => event.preventDefault()}
      className='outline-unset focus-visible:outline-unset inline-flex items-center justify-center rounded-md p-2 font-medium transition focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-300 disabled:pointer-events-none disabled:opacity-50 hover:disabled:opacity-50 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 data-[state=on]:bg-gray-200/60 dark:data-[state=on]:bg-gray-700/60'
    >
      {children}
    </Component>
  )
}
