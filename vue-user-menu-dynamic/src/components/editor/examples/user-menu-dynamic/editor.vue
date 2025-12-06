<script setup lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'

import { defineExtension } from './extension'
import UserMenuDynamic from './user-menu-dynamic.vue'

const extension = defineExtension()
const editor = createEditor({ extension })
</script>

<template>
  <ProseKit :editor="editor">
    <div
      class="box-border h-full w-full min-h-36 overflow-y-hidden overflow-x-hidden rounded-md border border-solid border-gray-200 dark:border-gray-700 shadow-sm flex flex-col bg-white dark:bg-gray-950 text-black dark:text-white"
    >
      <div class="relative w-full flex-1 box-border overflow-y-auto">
        <div
          :ref="(el) => editor.mount(el as HTMLElement | null)"
          class="ProseMirror box-border min-h-full px-[max(4rem,calc(50%-20rem))] py-8 outline-hidden outline-0 [&_span[data-mention=user]]:text-blue-500 [&_span[data-mention=tag]]:text-violet-500"
        ></div>
        <UserMenuDynamic />
      </div>
    </div>
  </ProseKit>
</template>
