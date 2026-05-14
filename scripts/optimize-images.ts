#!/usr/bin/env node
/**
 * Convert all images in public/images/ to WebP and update MDX references.
 *
 * Usage:
 *   npx tsx scripts/optimize-images.ts
 */

import fs from "node:fs"
import path from "node:path"
import sharp from "sharp"

const IMAGES_DIR = path.join(process.cwd(), "public", "images")
const CONTENT_DIRS = ["content/materials", "content/interviews", "content/experts"]
const CONVERTIBLE = new Set([".jpg", ".jpeg", ".png", ".JPG", ".JPEG", ".PNG"])
const WEBP_QUALITY = 82

async function convertImages(): Promise<{
  renamed: Map<string, string>
  saved: number
  errors: number
}> {
  const files = fs.readdirSync(IMAGES_DIR)
  const toConvert = files.filter((f) => CONVERTIBLE.has(path.extname(f)))

  console.log(`Converting ${toConvert.length} images to WebP (quality ${WEBP_QUALITY})...\n`)

  const renamed = new Map<string, string>()
  let saved = 0
  let errors = 0

  for (const filename of toConvert) {
    const src = path.join(IMAGES_DIR, filename)
    const newFilename = `${path.basename(filename, path.extname(filename))}.webp`
    const dest = path.join(IMAGES_DIR, newFilename)

    try {
      const { size: sizeBefore } = fs.statSync(src)
      await sharp(src).webp({ quality: WEBP_QUALITY }).toFile(dest)
      const { size: sizeAfter } = fs.statSync(dest)
      const diff = sizeBefore - sizeAfter
      const pct = Math.abs(Math.round((diff / sizeBefore) * 100))
      const sign = diff >= 0 ? "−" : "+"
      console.log(
        `  ✓ ${filename} → ${newFilename}  ${kb(sizeBefore)} → ${kb(sizeAfter)} (${sign}${pct}%)`,
      )
      saved += diff
      renamed.set(filename, newFilename)
    } catch (err) {
      console.error(`  ✗ ${filename} — ${(err as Error).message}`)
      errors++
    }
  }

  for (const [original] of renamed) {
    fs.unlinkSync(path.join(IMAGES_DIR, original))
  }

  return { renamed, saved, errors }
}

function rewriteMdx(renamed: Map<string, string>): number {
  let updatedFiles = 0

  for (const dir of CONTENT_DIRS) {
    const absDir = path.join(process.cwd(), dir)
    if (!fs.existsSync(absDir)) {
      continue
    }

    for (const f of fs.readdirSync(absDir)) {
      if (!f.endsWith(".mdx")) {
        continue
      }
      const filePath = path.join(absDir, f)
      const updated = rewriteFile(filePath, renamed)
      if (updated) {
        console.log(`  ✎ ${path.relative(process.cwd(), filePath)}`)
        updatedFiles++
      }
    }
  }

  return updatedFiles
}

function rewriteFile(filePath: string, renamed: Map<string, string>): boolean {
  let content = fs.readFileSync(filePath, "utf-8")
  let changed = false

  for (const [oldName, newName] of renamed) {
    const escaped = oldName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    const re = new RegExp(`/images/${escaped}`, "g")
    if (re.test(content)) {
      content = content.replace(new RegExp(`/images/${escaped}`, "g"), `/images/${newName}`)
      changed = true
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, "utf-8")
  }
  return changed
}

async function main() {
  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`Directory not found: ${IMAGES_DIR}`)
    process.exit(1)
  }

  const { renamed, saved, errors } = await convertImages()
  console.log(`\nTotal saved: ${kb(saved)}  (${errors} errors)\n`)

  const updatedFiles = rewriteMdx(renamed)
  console.log(`\nUpdated ${updatedFiles} MDX files.`)

  if (errors > 0) {
    process.exit(1)
  }
}

function kb(bytes: number) {
  return `${Math.round(bytes / 1024)}KB`
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
