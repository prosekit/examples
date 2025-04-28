<script lang="ts">
import 'prosekit/basic/style.css'
import 'prosekit/basic/typography.css'

import type { NodeJSON } from 'prosekit/core'
import {
  CommitRecorder,
  type Commit,
} from 'prosekit/extensions/commit'

import EditorDiff from './editor-diff.svelte'
import EditorMain from './editor-main.svelte'

let commits: { id: string; date: Date; commit: Commit }[] = []
let defaultContent: NodeJSON

const commitRecorder = new CommitRecorder()

function handleCommit() {
  const commit = commitRecorder.commit()
  if (!commit) return
  const id = Math.random().toString(36).slice(2, 9)
  commits = [{ id, date: new Date(), commit }, ...commits]
}

function handleRestore(id: string) {
  const index = commits.findIndex((commit) => commit.id === id)
  if (index === -1) return
  defaultContent = commits[index].commit.doc
  commits = commits.slice(index)
}
</script>

<div class="grid grid-cols-2 gap-2">
  <div class="flex flex-col gap-4">
    <div class="max-h-md">
      {#key defaultContent}
        <EditorMain {defaultContent} {commitRecorder} />
      {/key}
    </div>
    <button on:click={handleCommit} class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white dark:ring-offset-gray-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-0 bg-gray-900 dark:bg-gray-50 text-gray-50 dark:text-gray-900 hover:bg-gray-900/90 dark:hover:bg-gray-50/90 h-10 px-4 py-2">
      Save
    </button>
  </div>
  <div class="flex flex-col gap-4">
    {#each commits as commit (commit.id)}
      <div>
        <div class="max-h-md">
          <EditorDiff commit={commit.commit} />
        </div>
        <div class="w-full inline-flex justify-between p-1 text-sm">
          <span class="opacity-50">
            {commit.date.toLocaleTimeString()}
          </span>
          <button
            class="underline opacity-50 hover:opacity-100"
            on:click={() => handleRestore(commit.id)}
          >
            Restore
          </button>
        </div>
      </div>
    {/each}
  </div>
</div>
