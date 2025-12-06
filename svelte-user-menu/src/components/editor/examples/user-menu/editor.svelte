<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/svelte'

import { tags } from '../../sample/tag-data'
import { users } from '../../sample/user-data'
import { TagMenu } from '../../ui/tag-menu'
import { UserMenu } from '../../ui/user-menu'

import { defineExtension } from './extension'

const extension = defineExtension()
const editor = createEditor({ extension })
</script>

<ProseKit {editor}>
  <div class="box-border h-full w-full min-h-36 overflow-y-hidden overflow-x-hidden rounded-md border border-solid border-gray-200 dark:border-gray-700 shadow-sm flex flex-col bg-white dark:bg-gray-950 text-black dark:text-white">
    <div class="relative w-full flex-1 box-border overflow-y-auto">
      <div {@attach editor.mount} class="ProseMirror box-border min-h-full px-[max(4rem,calc(50%-20rem))] py-8 outline-hidden outline-0 [&_span[data-mention=user]]:text-blue-500 [&_span[data-mention=tag]]:text-violet-500"></div>
      <UserMenu {users} />
      <TagMenu {tags} />
    </div>
  </div>
</ProseKit>
