import fs from 'node:fs/promises'
import path from 'node:path'

type RegistryIndex = {
  items: RegistryIndexItem[]
}

type RegistryIndexItem = {
  name: string
  title?: string
  meta?: {
    story?: string
    framework?: string
  }
}

type RegistryFile = {
  path: string
  target: string
  content?: string
}

type RegistryItem = RegistryIndexItem & {
  files: RegistryFile[]
  registryDependencies?: string[]
}

const REGISTRY_URL = 'https://prosekit.dev/r'
const REGISTRY_INDEX_URL = `${REGISTRY_URL}/registry.json`

const __dirname = path.dirname(new URL(import.meta.url).pathname)
const ROOT = path.resolve(__dirname, '..')

const TEXT_FILE_EXTENSIONS = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.vue',
  '.svelte',
  '.json',
  '.txt',
  '.md',
  '.css',
  '.html',
  '.yaml',
  '.yml',
])

type FrameworkConfig = {
  template: string
  entryFile: string
  createEntryContent: (story: string) => string
}

const jsxEntry = (story: string) => `import { ExampleEditor } from './components/editor/examples/${story}'

export default function Editor() {
  return <ExampleEditor />
}
`

const FRAMEWORK_CONFIG: Record<string, FrameworkConfig> = {
  react: {
    template: 'react',
    entryFile: path.join('src', 'editor.tsx'),
    createEntryContent: jsxEntry,
  },
  preact: {
    template: 'preact',
    entryFile: path.join('src', 'editor.tsx'),
    createEntryContent: jsxEntry,
  },
  solid: {
    template: 'solid',
    entryFile: path.join('src', 'editor.tsx'),
    createEntryContent: jsxEntry,
  },
  svelte: {
    template: 'svelte',
    entryFile: path.join('src', 'editor.svelte'),
    createEntryContent: (story) => `<script lang=\"ts\">
import { ExampleEditor } from './components/editor/examples/${story}'
</script>

<ExampleEditor />
`,
  },
  vue: {
    template: 'vue',
    entryFile: path.join('src', 'editor.vue'),
    createEntryContent: (story) => `<script setup lang=\"ts\">
import { ExampleEditor } from './components/editor/examples/${story}'
</script>

<template>
  <ExampleEditor />
</template>
`,
  },
}

const registryCache = new Map<string, RegistryItem>()

type FileTransform = (
  relativePath: string,
  srcContent: string,
  destContent?: string,
) => string

function isTextFilePath(filePath: string) {
  const ext = path.extname(filePath).toLowerCase()
  return TEXT_FILE_EXTENSIONS.has(ext)
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`)
  }
  return (await response.json()) as T
}

async function fetchRegistryItem(identifier: string): Promise<RegistryItem> {
  const url = identifier.startsWith('http')
    ? identifier
    : `${REGISTRY_URL}/${identifier.replace(/^https?:\/\//, '').replace(/\.json$/, '')}.json`

  if (registryCache.has(url)) {
    return registryCache.get(url)!
  }

  const item = await fetchJson<RegistryItem>(url)
  registryCache.set(url, item)
  if (item.name) {
    registryCache.set(item.name, item)
  }
  return item
}

async function collectRegistryFiles(item: RegistryItem): Promise<RegistryFile[]> {
  const queue: RegistryItem[] = [item]
  const visited = new Set<string>()
  const files = new Map<string, RegistryFile>()

  while (queue.length > 0) {
    const current = queue.shift()!
    if (!current.name || visited.has(current.name)) {
      continue
    }
    visited.add(current.name)

    for (const file of current.files || []) {
      if (!file.target) continue
      if (files.has(file.target)) continue
      if (typeof file.content !== 'string') {
        throw new Error(`Missing inline content for ${file.path || file.target}`)
      }
      files.set(file.target, file)
    }

    for (const dep of current.registryDependencies || []) {
      const depItem = await fetchRegistryItem(dep)
      if (depItem) {
        queue.push(depItem)
      }
    }
  }

  return Array.from(files.values())
}

async function writeRegistryFiles(destDir: string, files: RegistryFile[]) {
  for (const file of files) {
    const destFile = path.join(destDir, 'src', file.target)
    await fs.mkdir(path.dirname(destFile), { recursive: true })
    await fs.writeFile(destFile, file.content!, 'utf-8')
  }
}

async function isDirectory(dir: string) {
  try {
    return (await fs.stat(dir)).isDirectory()
  } catch {
    return false
  }
}

async function copyDirWithTransform(
  src: string,
  dest: string,
  transform?: FileTransform,
  relativePrefix = '',
) {
  if (!(await isDirectory(src))) {
    return
  }

  await fs.mkdir(dest, { recursive: true })
  const entries = await fs.readdir(src, { withFileTypes: true })

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    const relativePath = relativePrefix ? path.join(relativePrefix, entry.name) : entry.name

    if (entry.isDirectory()) {
      await copyDirWithTransform(srcPath, destPath, transform, relativePath)
      continue
    }

    if (!entry.isFile()) {
      continue
    }

    await fs.mkdir(path.dirname(destPath), { recursive: true })

    if (!isTextFilePath(srcPath)) {
      await fs.copyFile(srcPath, destPath)
      continue
    }

    const srcContent = await fs.readFile(srcPath, 'utf-8')
    let destContent: string | undefined
    try {
      destContent = await fs.readFile(destPath, 'utf-8')
    } catch {
      // Ignore missing file
    }

    const finalContent = transform?.(relativePath, srcContent, destContent) ?? srcContent
    await fs.writeFile(destPath, finalContent, 'utf-8')
  }
}

async function writeReadme(dir: string) {
  const name = path.basename(dir)
  const readme = `# ${name}

A [ProseKit](https://prosekit.dev) example.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/prosekit/examples/tree/master/${name})
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/prosekit/examples/tree/master/${name})

Run the example locally with:

\`\`\`bash
npx degit prosekit/examples/${name} ${name}
cd ${name}
npm install
npm run dev
\`\`\`
`
  await fs.writeFile(path.join(dir, 'README.md'), readme)
}

async function writeGitignore(dir: string) {
  const content = `node_modules
dist
.next
.svelte-kit
`
  await fs.writeFile(path.join(dir, '.gitignore'), content)
}

async function updatePackageJsonName(dir: string, name: string) {
  const pkgPath = path.join(dir, 'package.json')
  const pkgRaw = await fs.readFile(pkgPath, 'utf-8')
  const pkg = JSON.parse(pkgRaw)
  pkg.name = name
  await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
}

function mergeJsonRecursive(a: any, b: any): any {
  if (a === undefined) return b
  if (b === undefined) return a

  if (a && b && typeof a === 'object' && typeof b === 'object') {
    const keys = new Set([...Object.keys(a), ...Object.keys(b)])
    const result: Record<string, any> = {}
    for (const key of keys) {
      result[key] = mergeJsonRecursive(a[key], b[key])
    }
    return result
  }

  return b
}

function mergePackageJson(destContent: string | undefined, srcContent: string) {
  const destJson = destContent ? JSON.parse(destContent) : {}
  const srcJson = JSON.parse(srcContent)
  return JSON.stringify(mergeJsonRecursive(destJson, srcJson), null, 2) + '\n'
}

const PACKAGE_JSON_TRANSFORM: FileTransform = (relativePath, srcContent, destContent) => {
  if (relativePath.endsWith('package.json') && destContent) {
    return mergePackageJson(destContent, srcContent)
  }
  return srcContent
}

function shouldBuild(item: RegistryIndexItem, filters: string[]): boolean {
  const story = item.meta?.story?.trim()
  const framework = item.meta?.framework?.trim()
  if (!story || !framework) return false
  if (!FRAMEWORK_CONFIG[framework]) return false

  if (filters.length === 0) return true

  const slug = `${framework}-${story}`
  return filters.includes(item.name) || filters.includes(slug) || filters.includes(story)
}

async function buildExample(item: RegistryIndexItem) {
  const framework = item.meta?.framework!
  const story = item.meta?.story!
  const config = FRAMEWORK_CONFIG[framework]
  const destName = `${framework}-${story}`
  const destDir = path.join(ROOT, destName)

  console.log(`\nBuilding ${destName} (${item.name})`)

  await fs.rm(destDir, { recursive: true, force: true })

  const templateDir = path.join(ROOT, '.templates', `template-${config.template}`)
  await copyDirWithTransform(templateDir, destDir)

  const registryItem = await fetchRegistryItem(item.name)
  const files = await collectRegistryFiles(registryItem)
  await writeRegistryFiles(destDir, files)

  const entryPath = path.join(destDir, config.entryFile)
  await fs.mkdir(path.dirname(entryPath), { recursive: true })
  await fs.writeFile(entryPath, config.createEntryContent(story))

  const overrideDir = path.join(ROOT, '.overrides', destName)
  await copyDirWithTransform(overrideDir, destDir, PACKAGE_JSON_TRANSFORM)

  await updatePackageJsonName(destDir, `example-${destName}`)
  await writeReadme(destDir)
  await writeGitignore(destDir)
}

async function main() {
  const filters = process.argv.slice(2)
  const registry = await fetchJson<RegistryIndex>(REGISTRY_INDEX_URL)
  const items = registry.items.filter((item) => shouldBuild(item, filters))

  if (items.length === 0) {
    console.log('No matching examples found.')
    return
  }

  for (const item of items) {
    await buildExample(item)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
