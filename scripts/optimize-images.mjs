import { readdir, stat, unlink } from 'node:fs/promises'
import { join, parse } from 'node:path'
import sharp from 'sharp'

const dir = 'public/img'
const extensions = new Set(['.jpg', '.jpeg'])
const files = (await readdir(dir)).filter((name) => extensions.has(parse(name).ext.toLowerCase()))

let savedBytes = 0

for (const name of files) {
  const input = join(dir, name)
  const output = join(dir, `${parse(name).name}.webp`)
  const before = (await stat(input)).size
  await sharp(input, { failOn: 'none' })
    .rotate()
    .resize(1920, 1920, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(output)
  const after = (await stat(output)).size
  savedBytes += before - after
  await unlink(input)
  console.log(`${name} → ${parse(name).name}.webp  (${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB)`)
}

console.log(`Total: ${(savedBytes / 1024 / 1024).toFixed(2)} MB saved`)
