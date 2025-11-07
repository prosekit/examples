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
  // Relative to example directory root
  destDir: string
  // Relative to example directory root
  entryFile: string
  createEntryContent: (story: string) => string
}

const jsxEntry = (
  story: string,
) => `import { ExampleEditor } from './components/editor/examples/${story}'

export default function App() {
  return <ExampleEditor />
}
`

const nextEntry = (story: string) => `'use client'

import dynamic from 'next/dynamic'

const EditorLazy = dynamic(async () => {
  const { ExampleEditor} = await import('./components/editor/examples/${story}')
  return { default: ExampleEditor }
}, { ssr: false })

export default function Editor() {
  return <EditorLazy />
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

const FRAMEWORK_CONFIG = {
  react: {
    template: 'react',
    destDir: 'src',
    entryFile: 'src/App.tsx',
    createEntryContent: jsxEntry,
  },
  preact: {
    template: 'preact',
    destDir: 'src',
    entryFile: 'src/App.tsx',
    createEntryContent: jsxEntry,
  },
  solid: {
    template: 'solid',
    destDir: 'src',
    entryFile: 'src/App.tsx',
    createEntryContent: jsxEntry,
  },
  svelte: {
    template: 'svelte',
    destDir: 'src',
    entryFile: 'src/App.svelte',
    createEntryContent: svelteEntry,
  },
  vue: {
    template: 'vue',
    destDir: 'src',
    entryFile: 'src/App.vue',
    createEntryContent: vueEntry,
  },
  next: {
    template: 'next',
    destDir: '.',
    entryFile: 'components/editor-dynamic.tsx',
    createEntryContent: nextEntry,
  },
  nuxt: {
    template: 'nuxt',
    destDir: 'src',
    entryFile: 'src/editor.vue',
    createEntryContent: vueEntry,
  },
  sveltekit: {
    template: 'sveltekit',
    destDir: 'src',
    entryFile: 'src/lib/App.svelte',
    createEntryContent: svelteKitEntry,
  },
} as const satisfies Record<string, FrameworkConfig>

type FrameworkName = keyof typeof FRAMEWORK_CONFIG

type DerivedExampleConfig = {
  sourceName: string
  destName: string
  config: FrameworkConfig
}

type DependencySpecifier = {
  name: string
  version?: string
}

const DERIVED_EXAMPLES: DerivedExampleConfig[] = [
  deriveExample('react-example-full', 'next-full', 'next'),
  deriveExample('vue-example-full', 'nuxt-full', 'nuxt'),
  deriveExample('svelte-example-full', 'sveltekit-full', 'sveltekit'),
]

function deriveExample(
  sourceName: string,
  destName: string,
  framework: FrameworkName,
): DerivedExampleConfig {
  return {
    sourceName,
    destName,
    config: FRAMEWORK_CONFIG[framework],
  }
}

function hasFrameworkConfig(framework?: string): framework is FrameworkName {
  return !!framework && framework in FRAMEWORK_CONFIG
}

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
  const files = new Map<string, RegistryFile>()
  const visited = new Set<string>()

  await collectFilesRecursively(item, files, visited)

  return Array.from(files.values())
}

async function collectFilesRecursively(
  item: RegistryItem,
  files: Map<string, RegistryFile>,
  visited: Set<string>,
) {
  assert(item.name, 'Encountered registry item without a name')
  if (visited.has(item.name)) {
    return
  }
  visited.add(item.name)

  for (const dep of item.registryDependencies || []) {
    try {
      const depItem = await fetchRegistryItem(dep)
      await collectFilesRecursively(depItem, files, visited)
    } catch (error) {
      warn(
        `Failed to fetch dependency ${dep} for ${item.name}: ${formatError(error)}`,
      )
      throw error
    }
  }

  if (!item.files?.length) {
    warn(`Registry item ${item.name} provides no files.`)
    return
  }

  for (const file of item.files) {
    const target = file.target
    assert(
      target,
      `File ${file.path ?? '(unknown)'} in ${item.name} is missing a target path`,
    )
    if (typeof file.content !== 'string') {
      warn(`Missing inline content for ${file.path || target}`)
      assert(
        typeof file.content === 'string',
        `Missing inline content for ${file.path || target}`,
      )
    }
    if (files.has(target)) {
      info(`Overriding ${target} with definition from ${item.name}`)
    }
    files.set(target, file)
  }
}

async function writeRegistryFiles(destDir: string, files: RegistryFile[]) {
  for (const file of files) {
    const destFile = path.join(destDir, file.target)
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
    target[key] = { ...(target[key] || {}), ...(source[key] || {}) }
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

function parseDependencySpecifier(
  input: string,
): DependencySpecifier | undefined {
  const trimmed = input?.trim()
  if (!trimmed) return undefined
  const atIndex = trimmed.lastIndexOf('@')

  if (atIndex <= 0) {
    return { name: trimmed }
  }

  const name = trimmed.slice(0, atIndex)
  const version = trimmed.slice(atIndex + 1).trim()

  if (!version) {
    return { name }
  }

  return { name, version }
}

function isDependencySpecifier(
  spec: DependencySpecifier | undefined,
): spec is DependencySpecifier {
  return !!spec?.name
}

function normalizeVersionSpecifier(version: string) {
  const trimmed = version.trim()
  if (!trimmed) return trimmed

  if (
    trimmed === 'latest' ||
    /^[~^<>=*]/.test(trimmed) ||
    /^(file:|git\+|https?:|link:|workspace:)/.test(trimmed)
  ) {
    return trimmed
  }

  return `^${trimmed}`
}

async function ensureDependencies(
  dir: string,
  specs: DependencySpecifier[],
  section: 'dependencies' | 'devDependencies' = 'dependencies',
) {
  if (!specs.length) return

  const pkgPath = path.join(dir, 'package.json')
  const pkg = await readPackageJson(pkgPath)
  if (!pkg) return

  let changed = false

  for (const spec of specs) {
    const name = spec.name?.trim()
    if (!name) continue
    if (pkg[section]?.[name]) {
      continue
    }

    let version = spec.version?.trim()
    if (!version) {
      try {
        version = await resolveLatestPackageVersion(name)
      } catch (error) {
        warn(
          `Failed to resolve version for ${name} in ${path.relative(ROOT, dir)}: ${formatError(error)}`,
        )
        throw error
      }
    }

    const versionSpec = normalizeVersionSpecifier(version)
    info(
      `Recording missing ${section} dependency ${name}@${versionSpec} in ${path.relative(ROOT, dir)}`,
    )

    pkg[section] = {
      ...(pkg[section] || {}),
      [name]: versionSpec,
    }
    changed = true
  }

  if (changed) {
    await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
  }
}

async function ensurePackageDependency(
  dir: string,
  name: string,
  section: 'dependencies' | 'devDependencies' = 'dependencies',
) {
  await ensureDependencies(dir, [{ name }], section)
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

async function runCommandCapture(
  command: string,
  args: string[],
  options: RunCommandOptions = {},
) {
  return await new Promise<string>((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: options.cwd ?? ROOT,
      env: process.env,
      stdio: ['ignore', 'pipe', 'pipe'],
    })

    let stdout = ''
    let stderr = ''

    child.stdout?.on('data', (chunk) => {
      stdout += chunk.toString()
    })

    child.stderr?.on('data', (chunk) => {
      stderr += chunk.toString()
    })

    child.on('error', reject)
    child.on('exit', (code) => {
      if (code === 0) {
        resolve(stdout.trim())
      } else {
        const message = `Command failed: ${command} ${args.join(' ')} (code ${code}) ${stderr.trim()}`
        reject(new Error(message))
      }
    })
  })
}

const resolveLatestPackageVersion = memoize(
  async function resolveLatestPackageVersion(name: string): Promise<string> {
    const raw = await runCommandCapture('npm', [
      'info',
      name,
      'version',
      '--json',
    ])

    if (!raw) {
      throw new Error(`npm info returned empty response for ${name}`)
    }

    let parsed: unknown
    try {
      parsed = JSON.parse(raw)
    } catch (error) {
      throw new Error(
        `Unable to parse npm info response for ${name}: ${formatError(error)}`,
      )
    }

    const toVersionString = (value: unknown) =>
      typeof value === 'string' && value.trim() ? value.trim() : undefined

    const direct = toVersionString(parsed)
    if (direct) {
      return direct
    }

    if (Array.isArray(parsed) && parsed.length > 0) {
      for (let i = parsed.length - 1; i >= 0; i -= 1) {
        const fromArray = toVersionString(parsed[i])
        if (fromArray) {
          return fromArray
        }
      }
    }

    if (typeof parsed === 'object' && parsed !== null) {
      const version = toVersionString((parsed as { version?: unknown }).version)
      if (version) {
        return version
      }
    }

    throw new Error(`npm info response for ${name} did not include a version`)
  },
)

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

  const specs = deps
    .map((dep) => parseDependencySpecifier(dep))
    .filter(isDependencySpecifier)

  await ensureDependencies(dir, specs)
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
  if (!hasFrameworkConfig(framework)) {
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
  const framework = item.meta?.framework?.trim()
  const story = item.meta?.story?.trim()
  assert(story, `Registry item ${item.name} is missing a story`)
  if (!hasFrameworkConfig(framework)) {
    throw new Error(
      `No framework configuration for ${framework || '(unknown)'}; cannot build ${item.name}`,
    )
  }
  const config = overrides?.config ?? FRAMEWORK_CONFIG[framework]
  const destName = overrides?.destName ?? `${framework}-${story}`
  const destDir = path.join(ROOT, destName)

  info(`Building ${destName} (${item.name})`)

  const previousPackage = await readPackageJson(
    path.join(destDir, 'package.json'),
  )
  await fs.rm(destDir, { recursive: true, force: true })

  const templateDir = path.join(
    ROOT,
    '.templates',
    `template-${config.template}`,
  )
  await copyDir(templateDir, destDir)
  await preservePackageDependencies(destDir, previousPackage)

  const registryItem = await fetchRegistryItem(item.name)
  const files = await collectRegistryFiles(registryItem)
  await writeRegistryFiles(path.join(destDir, config.destDir), files)
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
