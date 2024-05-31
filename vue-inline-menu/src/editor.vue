<script setup lang="ts">
import 'prosekit/basic/style.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import { ref, watchPostEffect } from 'vue'
import { defineExtension } from './extension'
import InlineMenu from './inline-menu.vue'

const defaultHTML =
  '<p><b>Try to select some text</b></p>' +
  '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet nec ullamcorper sit amet risus. Nam aliquam sem et tortor consequat id porta. Interdum posuere lorem ipsum dolor sit amet. Lectus sit amet est placerat in egestas erat. Egestas sed tempus urna et pharetra pharetra. Sit amet cursus sit amet dictum sit amet. Porttitor leo a diam sollicitudin. Tellus orci ac auctor augue. Tellus in hac habitasse platea dictumst vestibulum. At elementum eu facilisis sed odio morbi. Dolor magna eget est lorem ipsum. Et malesuada fames ac turpis egestas. Arcu risus quis varius quam quisque id diam. Purus viverra accumsan in nisl nisi scelerisque eu ultrices. Ut tortor pretium viverra suspendisse potenti nullam ac tortor vitae.</p>'.repeat(
    10,
  )

const editor = createEditor({ extension: defineExtension(), defaultHTML })

const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect(() => editor.mount(editorRef.value))
</script>

<template>
  <ProseKit :editor="editor">
    <div class='box-border h-full w-full min-h-36 overflow-y-hidden overflow-x-hidden rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700 flex flex-col bg-white dark:bg-neutral-900'>
      <div class='relative w-full flex-1 box-border overflow-y-scroll'>
        <div
          ref="editorRef"
          spellcheck="false"
          class='ProseMirror box-border min-h-full px-[max(40px,_calc(50%-330px))] py-[24px] outline-none outline-0 [&_span[data-mention="user"]]:text-blue-500 [&_span[data-mention="tag"]]:text-violet-500 [&_pre]:text-white [&_pre]:bg-zinc-800'
        ></div>
        <InlineMenu />
      </div>
    </div>
  </ProseKit>
</template>
