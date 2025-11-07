import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'

type RegistryIndex = {
  items: RegistryIndexItem[]
}

type RegistryIndexItem = {
  name: string
  title?: string
  dependencies?: string[]
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
const LOG_PREFIX = '[fetch-examples]'

type FrameworkConfig = {
  template: string
  entryFile: string
  createEntryContent: (story: string) => string
}

const jsxEntry = (
  story: string,
) => `import { ExampleEditor } from './components/editor/examples/${story}'

export default function Editor() {
  return <ExampleEditor />
}
`

const reactEntry = (
  story: string,
) => `import { ExampleEditor } from './components/editor/examples/${story}'

export default function App() {
  return <ExampleEditor />
}
`

const nextEntry = (story: string) => `'use client'

import { ExampleEditor } from './components/editor/examples/${story}'

export default function Editor() {
  return <ExampleEditor />
}
`
const createSvelteEntry =
  (componentsPath: string) => (story: string) => `<script lang=\"ts\">
import { ExampleEditor } from '${componentsPath}/${story}'
</script>

<ExampleEditor />
`

const createVueEntry =
  (componentsPath: string) => (story: string) => `<script setup lang=\"ts\">
import { ExampleEditor } from '${componentsPath}/${story}'
</script>

<template>
  <ExampleEditor />
</template>
`

const svelteEntry = createSvelteEntry('./components/editor/examples')
const svelteKitEntry = createSvelteEntry('../components/editor/examples')
const vueEntry = createVueEntry('./components/editor/examples')

const NEXT_FRAMEWORK_CONFIG: FrameworkConfig = {
  template: 'next',
  entryFile: path.join('src', 'editor.tsx'),
  createEntryContent: nextEntry,
}

const NUXT_FRAMEWORK_CONFIG: FrameworkConfig = {
  template: 'nuxt',
  entryFile: path.join('src', 'editor.vue'),
  createEntryContent: vueEntry,
}

const SVELTEKIT_FRAMEWORK_CONFIG: FrameworkConfig = {
  template: 'sveltekit',
  entryFile: path.join('src', 'lib', 'editor.svelte'),
  createEntryContent: svelteKitEntry,
}

const FRAMEWORK_CONFIG: Record<string, FrameworkConfig> = {
  react: {
    template: 'react',
    entryFile: path.join('src', 'app.tsx'),
    createEntryContent: reactEntry,
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
    createEntryContent: svelteEntry,
  },
  vue: {
    template: 'vue',
    entryFile: path.join('src', 'App.vue'),
    createEntryContent: vueEntry,
  },
  next: NEXT_FRAMEWORK_CONFIG,
  nuxt: NUXT_FRAMEWORK_CONFIG,
  sveltekit: SVELTEKIT_FRAMEWORK_CONFIG,
}

type DerivedExampleConfig = {
  sourceName: string
  destName: string
  config: FrameworkConfig
}

const DERIVED_EXAMPLES: DerivedExampleConfig[] = [
  {
    sourceName: 'react-example-full',
    destName: 'next-full',
    config: NEXT_FRAMEWORK_CONFIG,
  },
  {
    sourceName: 'vue-example-full',
    destName: 'nuxt-full',
    config: NUXT_FRAMEWORK_CONFIG,
  },
  {
    sourceName: 'svelte-example-full',
    destName: 'sveltekit-full',
    config: SVELTEKIT_FRAMEWORK_CONFIG,
  },
]

function info(message: string) {
  console.log(`${LOG_PREFIX} ${message}`)
}

function warn(message: string) {
  console.warn(`${LOG_PREFIX} ${message}`)
}

function formatError(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  return String(error)
}

function memoize<Args extends any[], Result>(
  fn: (...args: Args) => Promise<Result>,
) {
  const cache = new Map<string, Promise<Result>>()

  return async (...args: Args): Promise<Result> => {
    const key = JSON.stringify(args)
    if (!cache.has(key)) {
      cache.set(
        key,
        fn(...args).catch((error) => {
          cache.delete(key)
          throw error
        }),
      )
    }
    return cache.get(key)!
  }
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
    )
  }
  return (await response.json()) as T
}

const fetchRegistryItem = memoize(async function fetchRegistryItem(
  identifier: string,
): Promise<RegistryItem> {
  const url = identifier.startsWith('http')
    ? identifier
    : `${REGISTRY_URL}/${identifier.replace(/^https?:\/\//, '').replace(/\.json$/, '')}.json`

  let item: RegistryItem
  try {
    item = await fetchJson<RegistryItem>(url)
  } catch (error) {
    warn(`Failed to fetch registry item ${identifier}: ${formatError(error)}`)
    throw error
  }
  return item
})

async function collectRegistryFiles(
  item: RegistryItem,
): Promise<RegistryFile[]> {
  const queue: RegistryItem[] = [item]
  const visited = new Set<string>()
  const files = new Map<string, RegistryFile>()

  while (queue.length > 0) {
    const current = queue.shift()!
    assert(current.name, 'Encountered registry item without a name')
    if (visited.has(current.name)) {
      continue
    }
    visited.add(current.name)

    if (!current.files?.length) {
      warn(`Registry item ${current.name} provides no files.`)
    }

    for (const file of current.files || []) {
      const target = file.target
      assert(
        target,
        `File ${file.path ?? '(unknown)'} in ${current.name} is missing a target path`,
      )
      assert(
        !files.has(target),
        `Duplicate target detected for ${target} while processing ${current.name}`,
      )
      if (typeof file.content !== 'string') {
        warn(`Missing inline content for ${file.path || target}`)
        assert(
          typeof file.content === 'string',
          `Missing inline content for ${file.path || target}`,
        )
      }
      files.set(target, file)
    }

    for (const dep of current.registryDependencies || []) {
      try {
        const depItem = await fetchRegistryItem(dep)
        if (depItem) {
          queue.push(depItem)
        }
      } catch (error) {
        warn(
          `Failed to fetch dependency ${dep} for ${current.name}: ${formatError(error)}`,
        )
        throw error
      }
    }
  }

  return Array.from(files.values())
}

async function writeRegistryFiles(destDir: string, files: RegistryFile[]) {
  for (const file of files) {
    const destFile = path.join(destDir, 'src', file.target)
    await fs.mkdir(path.dirname(destFile), { recursive: true })
    assert(
      typeof file.content === 'string',
      `Cannot write ${file.target}: missing file content`,
    )
    await fs.writeFile(destFile, file.content as string, 'utf-8')
  }
}

async function isDirectory(dir: string) {
  try {
    return (await fs.stat(dir)).isDirectory()
  } catch {
    return false
  }
}

async function copyDir(src: string, dest: string) {
  const exists = await isDirectory(src)
  assert(
    exists,
    `Expected directory not found: ${path.relative(ROOT, src) || src}`,
  )

  await fs.mkdir(dest, { recursive: true })
  const entries = await fs.readdir(src, { withFileTypes: true })

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath)
    } else if (entry.isFile()) {
      await fs.copyFile(srcPath, destPath)
    }
  }
}

async function readPackageJson(filePath: string) {
  try {
    const text = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(text)
  } catch {
    return undefined
  }
}

function mergePackageSections(
  target: Record<string, any>,
  source?: Record<string, any>,
) {
  if (!source) return
  for (const key of ['dependencies', 'devDependencies', 'peerDependencies']) {
    if (!source[key]) continue
    target[key] = { ...(source[key] || {}), ...(target[key] || {}) }
  }
}

async function preservePackageDependencies(
  destDir: string,
  previousPackage?: any,
) {
  if (!previousPackage) return
  const pkgPath = path.join(destDir, 'package.json')
  const pkg = await readPackageJson(pkgPath)
  if (!pkg) return
  mergePackageSections(pkg, previousPackage)
  await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
}

async function ensurePackageDependency(
  dir: string,
  name: string,
  section: 'dependencies' | 'devDependencies' = 'dependencies',
) {
  const pkgPath = path.join(dir, 'package.json')
  const pkg = await readPackageJson(pkgPath)
  if (!pkg) return
  const deps = { ...(pkg[section] || {}) }
  if (deps[name]) {
    return
  }

  info(
    `Installing missing ${section.slice(0, -3)} dependency ${name} in ${path.relative(ROOT, dir)}`,
  )
  try {
    await runCommand('bun', ['add', name], { cwd: dir })
  } catch (error) {
    warn(
      `Failed to add ${name} in ${path.relative(ROOT, dir)}: ${formatError(error)}`,
    )
    throw error
  }
  await cleanupInstallArtifacts(dir)
}

async function patchLoroExample(destDir: string) {
  await ensurePackageDependency(destDir, 'vite-plugin-wasm', 'devDependencies')

  const viteConfigPath = path.join(destDir, 'vite.config.ts')
  let viteConfig: string
  try {
    viteConfig = await fs.readFile(viteConfigPath, 'utf-8')
  } catch {
    warn(
      `vite.config.ts not found for ${path.relative(ROOT, destDir)}; cannot apply wasm plugin patch`,
    )
    return
  }

  let updated = false
  if (!viteConfig.includes("'vite-plugin-wasm'")) {
    viteConfig = `import wasm from 'vite-plugin-wasm'\n` + viteConfig
    updated = true
  }

  if (!viteConfig.includes('wasm()')) {
    if (viteConfig.includes('react(), tailwindcss()')) {
      viteConfig = viteConfig.replace(
        'react(), tailwindcss()',
        'react(), wasm(), tailwindcss()',
      )
      updated = true
    } else {
      warn(
        `Unable to inject wasm plugin into vite.config.ts for ${path.relative(ROOT, destDir)}`,
      )
    }
  }

  if (updated) {
    await fs.writeFile(viteConfigPath, viteConfig)
  }
}

async function patchYjsExample(destDir: string) {
  for (const dep of ['y-prosemirror', 'yjs']) {
    await ensurePackageDependency(destDir, dep)
  }
}

async function applyExamplePatches(item: RegistryIndexItem, destDir: string) {
  const story = item.meta?.story
  if (story === 'loro') {
    await patchLoroExample(destDir)
  } else if (story === 'yjs') {
    await patchYjsExample(destDir)
  }
}

type RunCommandOptions = {
  cwd?: string
}

async function runCommand(
  command: string,
  args: string[],
  options: RunCommandOptions = {},
) {
  await new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: options.cwd ?? ROOT,
      stdio: 'inherit',
      env: process.env,
    })
    child.on('error', reject)
    child.on('exit', (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(
          new Error(
            `Command failed: ${command} ${args.join(' ')} (code ${code})`,
          ),
        )
      }
    })
  })
}

async function cleanupInstallArtifacts(dir: string) {
  await fs.rm(path.join(dir, 'node_modules'), { recursive: true, force: true })
  await fs.rm(path.join(dir, 'bun.lockb'), { force: true })
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

async function installMissingDependencies(dir: string, deps?: string[]) {
  if (!deps?.length) return

  const pkgPath = path.join(dir, 'package.json')
  const pkgRaw = await fs.readFile(pkgPath, 'utf-8')
  const pkg = JSON.parse(pkgRaw)
  const existing = new Set([
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ])

  const missing = deps.filter((dep) => !existing.has(dep))
  if (missing.length === 0) return

  info(
    `Installing missing dependencies for ${path.relative(ROOT, dir)}: ${missing.join(', ')}`,
  )

  try {
    await runCommand('bun', ['add', ...missing], { cwd: dir })
  } catch (error) {
    warn(`bun add failed in ${path.relative(ROOT, dir)}: ${formatError(error)}`)
    throw error
  }
  await cleanupInstallArtifacts(dir)
}

function shouldBuild(item: RegistryIndexItem): boolean {
  const story = item.meta?.story?.trim()
  const framework = item.meta?.framework?.trim()
  if (!story) {
    warn(`Skipping ${item.name}: missing meta.story`)
    return false
  }
  if (!framework) {
    warn(`Skipping ${item.name}: missing meta.framework`)
    return false
  }
  if (!FRAMEWORK_CONFIG[framework]) {
    warn(`Skipping ${item.name}: unsupported framework "${framework}"`)
    return false
  }
  return true
}

type BuildOverrides = {
  destName?: string
  config?: FrameworkConfig
}

async function buildExample(
  item: RegistryIndexItem,
  overrides?: BuildOverrides,
) {
  const framework = item.meta?.framework!
  const story = item.meta?.story!
  const config = overrides?.config ?? FRAMEWORK_CONFIG[framework]
  assert(
    config,
    `No framework configuration for ${framework}; cannot build ${item.name}`,
  )
  const destName = overrides?.destName ?? `${framework}-${story}`
  const destDir = path.join(ROOT, destName)

  info(`Building ${destName} (${item.name})`)

  const destSrcDir = path.join(destDir, 'src')
  await fs.rm(destSrcDir, { recursive: true, force: true })

  const templateDir = path.join(
    ROOT,
    '.templates',
    `template-${config.template}`,
  )
  const previousPackage = await readPackageJson(
    path.join(destDir, 'package.json'),
  )
  await copyDir(templateDir, destDir)
  await preservePackageDependencies(destDir, previousPackage)

  const registryItem = await fetchRegistryItem(item.name)
  const files = await collectRegistryFiles(registryItem)
  await writeRegistryFiles(destDir, files)
  assert(
    files.length > 0,
    `Registry item ${item.name} returned no files to write`,
  )

  const entryPath = path.join(destDir, config.entryFile)
  await fs.mkdir(path.dirname(entryPath), { recursive: true })
  await fs.writeFile(entryPath, config.createEntryContent(story))

  await applyExamplePatches(item, destDir)
  await installMissingDependencies(destDir, registryItem.dependencies)
  await updatePackageJsonName(destDir, `example-${destName}`)
  await writeReadme(destDir)
  await writeGitignore(destDir)
}

async function buildDerivedExamples(registry: RegistryIndex) {
  for (const derived of DERIVED_EXAMPLES) {
    const source = registry.items.find(
      (item) => item.name === derived.sourceName,
    )
    assert(
      source,
      `Cannot build ${derived.destName} example: ${derived.sourceName} not found in registry.`,
    )

    assert(
      shouldBuild(source),
      `Cannot build ${derived.destName} example: ${derived.sourceName} missing story/framework metadata.`,
    )

    await buildExample(source, {
      destName: derived.destName,
      config: derived.config,
    })
  }
}

async function main() {
  const registry = await fetchJson<RegistryIndex>(REGISTRY_INDEX_URL)
  const items = registry.items.filter((item) => shouldBuild(item))

  assert(
    items.length > 0,
    'No examples with valid story/framework metadata were found in the registry.',
  )

  info(`Building ${items.length} examples from the registry`)
  let hasErrors = false
  for (const item of items) {
    try {
      await buildExample(item)
    } catch (error) {
      hasErrors = true
      warn(`Failed to build ${item.name}: ${formatError(error)}`)
    }
  }

  if (hasErrors) {
    throw new Error(
      'One or more examples failed. Check warnings above for details.',
    )
  }

  await buildDerivedExamples(registry)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
