import { DropIndicator as BaseDropIndicator } from 'prosekit/solid/drop-indicator'
import type { JSX } from 'solid-js'

export default function DropIndicator(): JSX.Element {
  return <BaseDropIndicator class="z-50 transition-all bg-blue-500" />
}
