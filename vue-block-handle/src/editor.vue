<script setup lang="ts">
import 'prosekit/basic/style.css'

import { createEditor } from 'prosekit/core'
import { ProseKit } from 'prosekit/vue'
import { ref, watchPostEffect } from 'vue'

import BlockHandle from './block-handle.vue'
import { defineExtension } from './extension'

const defaultContent = `
<h1>Heading Level 1</h1>
<p>This is a paragraph under heading level 1. Markdown allows you to write text easily with simple syntax.</p>
<h2>Heading Level 2</h2>
<p>Here's a paragraph under heading level 2 with <strong>bold text</strong>, <em>italic text</em>, and a <a href="https://www.openai.com">link to OpenAI</a>.</p>
<h3>Heading Level 3</h3>
<p>This paragraph is under heading level 3. You can also include <code>inline code</code> for small snippets of code.</p>
<blockquote>
  <p>Blockquote: This is a blockquote example.</p>
  <blockquote>
    <p>Nested Blockquote: You can nest blockquotes to represent different levels of quoted text.</p>
  </blockquote>
</blockquote>
<p>Another paragraph after the blockquote to demonstrate spacing.</p>
<h3>Lists</h3>
<h4>Unordered List</h4>
<ul>
  <li>Item 1</li>
  <li>Item 2
    <ul>
      <li>Subitem 2.1</li>
      <li>Subitem 2.2</li>
    </ul>
  </li>
</ul>
<h4>Ordered List</h4>
<ol>
  <li>First item</li>
  <li>Second item
    <ol>
      <li>Subitem 2.1</li>
      <li>Subitem 2.2</li>
    </ol>
  </li>
</ol>
<h3>Code Block</h3>
<p>You can also include code blocks:</p>
<pre data-language="python"><code>def hello_world():
    print("Hello, world!")
</code></pre>
<p>This is a paragraph after a horizontal rule.</p>

`

const editor = createEditor({ extension: defineExtension(), defaultContent })

const editorRef = ref<HTMLDivElement | null>(null)
watchPostEffect((onCleanup) => {
  editor.mount(editorRef.value)
  onCleanup(() => editor.unmount())
})
</script>

<template>
  <ProseKit :editor="editor">
    <div
      class="box-border h-full w-full min-h-36 overflow-y-hidden overflow-x-hidden rounded-md border border-solid border-gray-200 shadow dark:border-zinc-700 flex flex-col bg-white dark:bg-neutral-900"
    >
      <div class="relative w-full flex-1 box-border overflow-y-scroll">
        <div
          ref="editorRef"
          spellcheck="false"
          class="ProseMirror box-border min-h-full px-[max(4rem,_calc(50%-20rem))] py-8 outline-none outline-0 [&_span[data-mention=&quot;user&quot;]]:text-blue-500 [&_span[data-mention=&quot;tag&quot;]]:text-violet-500"
        />
      </div>
      <BlockHandle></BlockHandle>
    </div>
  </ProseKit>
</template>
