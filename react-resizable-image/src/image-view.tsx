import { clsx } from 'prosekit/core'
import { type ReactNodeViewProps } from 'prosekit/react'
import { ResizableHandle, ResizableRoot } from 'prosekit/react/resizable'
import { useState } from 'react'

import type { ImageAttrs } from './extension'

export default function ImageView(props: ReactNodeViewProps) {
  const attrs = props.node.attrs as ImageAttrs
  const [aspectRatio, setAspectRatio] = useState<number | undefined>()

  return (
    <ResizableRoot
      width={attrs.width ?? undefined}
      height={attrs.height ?? undefined}
      aspectRatio={aspectRatio}
      onSizeChangeEnd={(attrs) => props.setAttrs(attrs satisfies ImageAttrs)}
      className={clsx(
        'relative block max-h-[600px] max-w-full',
        (!aspectRatio || aspectRatio <= 1) && 'min-h-[100px]',
        (!aspectRatio || aspectRatio >= 1) && 'min-w-[100px]',
      )}
    >
      <img
        src={attrs.src ?? ''}
        onLoad={(event) => {
          const img = event.target as HTMLImageElement
          const aspectRatio = img.naturalWidth / img.naturalHeight
          if (aspectRatio && Number.isFinite(aspectRatio)) {
            setAspectRatio(aspectRatio)
          }
        }}
        className="h-full w-full object-contain"
      />
      <ResizableHandle
        className="absolute bottom-0 right-0 rounded mb-1.5 mr-1.5 p-0.5 transition bg-gray-900/30 active:bg-gray-800/60 text-white/50 active:text-white/80 active:translate-x-0.5 active:translate-y-0.5 opacity-0 hover:opacity-100 [prosekit-resizable:hover_&]:opacity-100 [prosekit-resizable[data-resizing]_&]:opacity-100"
        position="bottom-right"
      >
        <div className="i-lucide-arrow-down-right h-4 w-4"></div>
      </ResizableHandle>
    </ResizableRoot>
  )
}
