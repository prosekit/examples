import {
  defineBaseKeymap,
  defineDoc,
  defineParagraph,
  defineText,
  union,
} from 'prosekit/core'
import { defineDropCursor } from 'prosekit/extensions/drop-cursor'
import { defineImage } from 'prosekit/extensions/image'

export function defineExtension() {
  return union(
    defineBaseKeymap(),
    defineDoc(),
    defineText(),
    defineParagraph(),
    defineImage(),
    defineDropCursor({
      color: false,
      width: 4,
      class: 'transition-all bg-blue-500',
    }),
  )
}

export type EditorExtension = ReturnType<typeof defineExtension>
