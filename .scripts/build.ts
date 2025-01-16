import fs from 'node:fs/promises'
import path from 'node:path'
import { replaceThemes } from './replace-themes'

const __dirname = path.dirname(new URL(import.meta.url).pathname)
const ROOT = path.resolve(__dirname, '..')
const PROSEKIT_DIR = path.join(ROOT, '.temp', 'prosekit')

async function isDirectory(path: string) {
  try {
    return (await fs.stat(path)).isDirectory()
  } catch (error) {
    return false
  }
}

async function isTextFile(filePath: string) {
  try {
    const stat = await fs.stat(filePath)
    if (!stat.isFile()) {
      return false
    }

    const textFileExtensions = [
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
    ]
    const ext = path.extname(filePath).toLowerCase()

    if (textFileExtensions.includes(ext)) {
      return true
    }

    return false
  } catch (error) {
    return false
  }
}

async function isBinaryFile(filePath: string) {
  return !(await isTextFile(filePath)) && !(await isDirectory(filePath))
}

// Copy all files from src to dest
async function syncDir(
  src: string,
  dest: string,
  transform?: (
    fileName: string,
    srcContent: string,
    destContent?: string,
  ) => string,
) {
  // If `src` doesn't exist, skip
  if (!(await isDirectory(src))) {
    return
  }

  console.log(
    'Syncing',
    path.relative(ROOT, src),
    'to',
    path.relative(ROOT, dest),
  )

  const files = await fs.readdir(src, { recursive: true })
  for (const file of files) {
    const srcFile = path.join(src, file)
    const destFile = path.join(dest, file)

    // Check if srcFile is a directory
    if (await isDirectory(srcFile)) {
      continue
    }

    if (await isBinaryFile(srcFile)) {
      await fs.mkdir(path.dirname(destFile), { recursive: true })
      await fs.copyFile(srcFile, destFile)
      continue
    }

    const srcContent = await fs.readFile(srcFile, 'utf-8')
    let destContent: string | undefined
    try {
      destContent = await fs.readFile(destFile, 'utf-8')
    } catch (error) {
      if (error.code !== 'ENOENT') throw error
      // File doesn't exist, which is fine
    }
    const newContent = transform?.(file, srcContent, destContent) ?? srcContent
    await fs.mkdir(path.dirname(destFile), { recursive: true })
    await fs.writeFile(destFile, newContent)
  }
}

function mergeJsonRecursive(a: any, b: any): any {
  if (a === undefined) return b
  if (b === undefined) return a

  if (a && b && typeof a === 'object' && typeof b === 'object') {
    const keys = new Set([...Object.keys(a), ...Object.keys(b)])
    const result = {}
    for (const key of Array.from(keys).sort()) {
      result[key] = mergeJsonRecursive(a[key], b[key])
    }
    return result
  }
  return b
}

function transform(file: string, srcContent: string, destContent?: string) {
  if (file.endsWith('package.json') && destContent) {
    const srcJson = JSON.parse(srcContent)
    const destJson = JSON.parse(destContent || '{}')
    return JSON.stringify(mergeJsonRecursive(destJson, srcJson), null, 2)
  }

  return replaceThemes(srcContent)
}

async function updatePackageJsonName(dir: string, name: string) {
  const filePath = path.join(dir, 'package.json')
  const text = await fs.readFile(filePath, 'utf-8')
  const json = JSON.parse(text)
  json.name = name
  await fs.writeFile(filePath, JSON.stringify(json, null, 2))
}

async function writeReadme(dir: string) {
  const filePath = path.join(dir, 'README.md')
  const name = path.basename(dir)

  const text = `# ${name}

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
  await fs.writeFile(filePath, text)
}

async function copyExample(
  framework: string,
  story: string,
  template: string,
  dest: string,
  srcDir: string = 'src',
) {
  const sourceDir = path.join(
    PROSEKIT_DIR,
    'playground',
    'src',
    'examples',
    framework,
    story,
  )
  const templateDir = path.join(ROOT, '.templates', 'template-' + template)
  const overrideDir = path.join(ROOT, '.overrides', template + '-' + story)
  const destDir = path.join(ROOT, dest)

  await syncDir(templateDir, destDir)
  await syncDir(sourceDir, path.join(destDir, srcDir), transform)
  await syncDir(overrideDir, destDir, transform)

  await updatePackageJsonName(destDir, `example-${dest}`)
  await writeReadme(dest)
}

async function main() {
  const frameworks = [
    'lit',
    'preact',
    'react',
    'solid',
    'svelte',
    'vanilla',
    'vue',
  ]

  const dirs = await fs.readdir(ROOT)
  for (const dir of dirs) {
    if (frameworks.some((framework) => dir.startsWith(framework))) {
      await fs.rm(path.join(ROOT, dir), { recursive: true, force: true })
    }
  }

  // Copy frameworks
  for (const framework of frameworks) {
    // Find example dir under PROSEKIT_DIR/playground/examples/${framework}
    const storiesDir = path.join(
      PROSEKIT_DIR,
      'playground',
      'src',
      'examples',
      framework,
    )
    for (const story of await fs.readdir(storiesDir)) {
      if (!(await isDirectory(path.join(storiesDir, story)))) continue
      await copyExample(framework, story, framework, `${framework}-${story}`)
    }
  }

  // Copy other examples
  await copyExample('vue', 'full', 'nuxt', 'nuxt-full')
  await copyExample('react', 'full', 'next', 'next-full')
  await copyExample('svelte', 'full', 'sveltekit', 'sveltekit-full', 'src/lib')
}

main()
