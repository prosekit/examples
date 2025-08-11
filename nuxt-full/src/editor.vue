<script setup lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import { ref, watchPostEffect } from 'vue'

import BlockHandle from './block-handle.vue'
import { DEFAULT_CONTENT } from './default-content-full'
import { defineExtension } from './extension'
import InlineMenu from './inline-menu.vue'
import SlashMenu from './slash-menu.vue'
import TableHandle from './table-handle.vue'
import TagMenu from './tag-menu.vue'
import Toolbar from './toolbar.vue'
import UserMenu from './user-menu.vue'

const editor = createEditor({
  extension: defineExtension(),
  defaultContent: DEFAULT_CONTENT,
})
const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect((onCleanup) => {
  editor.mount(editorRef.value)
  onCleanup(() => editor.unmount())
})
</script>

<template>
  <ProseKit :editor="editor">
    <div
      class="box-border h-full w-full min-h-36 overflow-y-hidden overflow-x-hidden rounded-md border border-solid border-gray-200 dark:border-gray-700 shadow-sm flex flex-col bg-white dark:bg-gray-950 color-black dark:color-white"
    >
      <Toolbar />
      <div class="relative w-full flex-1 box-border overflow-y-scroll">
        <div
          ref="editorRef"
          class="ProseMirror box-border min-h-full px-[max(4rem,calc(50%-20rem))] py-8 outline-hidden outline-0 [&_span[data-mention=user]]:text-blue-500 [&_span[data-mention=tag]]:text-violet-500"
        />
        <InlineMenu />
        <SlashMenu />
        <UserMenu />
        <TagMenu />
        <BlockHandle />
        <TableHandle />
      </div>
    </div>
  </ProseKit>
</template>
