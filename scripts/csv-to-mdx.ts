#!/usr/bin/env node
/**
 * Webflow CMS CSV → MDX converter
 *
 * Usage:
 *   npx tsx scripts/csv-to-mdx.ts --type materials --input path/to/materials.csv
 *   npx tsx scripts/csv-to-mdx.ts --type interviews --input path/to/interviews.csv
 *   npx tsx scripts/csv-to-mdx.ts --type experts --input path/to/experts.csv
 *
 * Webflow CSV column mapping (edit COLUMN_MAP below to match your export headers):
 *
 *   materials:  Name, Slug, Category, Author, Published On, Short Description, Main Image, Video URL
 *   interviews: Name, Slug, Guest Name, Guest Role, Published On, Short Description, Image, Video URL
 *   experts:    Name, Slug, Role, Specializations, Bio, Photo, Telegram, Instagram, VK, LinkedIn
 */

import fs from "node:fs"
import path from "node:path"

// --- Column name mappings (adjust to match your Webflow CSV headers) ---

const MATERIAL_COLUMNS = {
  title: ["Name", "Title", "Название"],
  slug: ["Slug", "slug"],
  category: ["Category", "Категория"],
  author: ["Author", "Автор"],
  date: ["Published On", "Date", "Дата", "Created On"],
  excerpt: ["Short Description", "Excerpt", "Description", "Описание"],
  image: ["Main Image", "Image", "Thumbnail", "Изображение"],
  videoUrl: ["Video URL", "VideoURL", "Video", "Видео"],
  videoPlatform: ["Video Platform", "Platform"],
  featured: ["Featured", "Избранное"],
}

const INTERVIEW_COLUMNS = {
  title: ["Name", "Title", "Название"],
  slug: ["Slug", "slug"],
  guest: ["Guest Name", "Guest", "Гость"],
  guestRole: ["Guest Role", "Role", "Должность"],
  date: ["Published On", "Date", "Дата", "Created On"],
  excerpt: ["Short Description", "Excerpt", "Description", "Описание"],
  image: ["Image", "Thumbnail", "Photo", "Фото"],
  videoUrl: ["Video URL", "VideoURL", "Video", "Видео"],
  videoPlatform: ["Video Platform", "Platform"],
  featured: ["Featured", "Избранное"],
}

const EXPERT_COLUMNS = {
  name: ["Name", "Full Name", "Имя"],
  slug: ["Slug", "slug"],
  role: ["Role", "Position", "Должность"],
  specializations: ["Specializations", "Categories", "Специализации"],
  bio: ["Bio", "Biography", "Биография"],
  image: ["Photo", "Image", "Avatar", "Фото"],
  telegram: ["Telegram", "Telegram URL"],
  instagram: ["Instagram", "Instagram URL"],
  vk: ["VK", "VKontakte", "ВКонтакте"],
  linkedin: ["LinkedIn", "LinkedIn URL"],
}

// --- Category slug mapping from Russian labels ---
const CATEGORY_MAP: Record<string, string> = {
  менеджмент: "management",
  management: "management",
  "профессиональный футбол": "professional-football",
  "professional football": "professional-football",
  "professional-football": "professional-football",
  "физическая подготовка": "physical-preparation",
  "physical preparation": "physical-preparation",
  "physical-preparation": "physical-preparation",
  вратари: "goalkeepers",
  goalkeepers: "goalkeepers",
  аналитика: "analytics",
  analytics: "analytics",
  "детско-юношеский футбол": "youth-football",
  "youth football": "youth-football",
  "youth-football": "youth-football",
  психология: "psychology",
  psychology: "psychology",
}

// --- Video platform detection ---
function detectPlatform(url: string): string | undefined {
  if (!url) {
    return
  }
  if (url.includes("vk.com") || url.includes("vkvideo")) {
    return "vkvideo"
  }
  if (url.includes("dzen.ru") || url.includes("zen.yandex")) {
    return "dzen"
  }
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    return "youtube"
  }
  return
}

// --- Slug generation ---
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[а-яё]/g, (ch) => {
      const map: Record<string, string> = {
        а: "a",
        б: "b",
        в: "v",
        г: "g",
        д: "d",
        е: "e",
        ё: "yo",
        ж: "zh",
        з: "z",
        и: "i",
        й: "y",
        к: "k",
        л: "l",
        м: "m",
        н: "n",
        о: "o",
        п: "p",
        р: "r",
        с: "s",
        т: "t",
        у: "u",
        ф: "f",
        х: "kh",
        ц: "ts",
        ч: "ch",
        ш: "sh",
        щ: "shch",
        ъ: "",
        ы: "y",
        ь: "",
        э: "e",
        ю: "yu",
        я: "ya",
      }
      return map[ch] ?? ch
    })
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

// --- CSV parser (handles quoted fields with commas) ---
function parseCSV(content: string): { headers: string[]; rows: Record<string, string>[] } {
  const lines = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n")
  if (lines.length === 0) {
    return { headers: [], rows: [] }
  }

  function parseLine(line: string): string[] {
    const fields: string[] = []
    let current = ""
    let inQuotes = false

    for (let i = 0; i < line.length; i++) {
      const ch = line[i]
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"'
          i++
        } else {
          inQuotes = !inQuotes
        }
      } else if (ch === "," && !inQuotes) {
        fields.push(current.trim())
        current = ""
      } else {
        current += ch
      }
    }
    fields.push(current.trim())
    return fields
  }

  const headers = parseLine(lines[0])
  const rows: Record<string, string>[] = []

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) {
      continue
    }
    const values = parseLine(line)
    const row: Record<string, string> = {}
    headers.forEach((h, idx) => {
      row[h] = values[idx] ?? ""
    })
    rows.push(row)
  }

  return { headers, rows }
}

// --- Find value by multiple possible column names ---
function pick(row: Record<string, string>, candidates: string[]): string {
  for (const key of candidates) {
    if (row[key] !== undefined && row[key] !== "") {
      return row[key]
    }
  }
  return ""
}

// --- ISO date normalization ---
function normalizeDate(raw: string): string {
  if (!raw) {
    return new Date().toISOString().slice(0, 10)
  }
  // already ISO
  if (/^\d{4}-\d{2}-\d{2}/.test(raw)) {
    return raw.slice(0, 10)
  }
  // DD.MM.YYYY
  const ddmmyyyy = raw.match(/^(\d{2})\.(\d{2})\.(\d{4})/)
  if (ddmmyyyy) {
    return `${ddmmyyyy[3]}-${ddmmyyyy[2]}-${ddmmyyyy[1]}`
  }
  // Try JS Date parse
  const d = new Date(raw)
  if (!Number.isNaN(d.getTime())) {
    return d.toISOString().slice(0, 10)
  }
  return new Date().toISOString().slice(0, 10)
}

// --- YAML string escape ---
function yamlStr(value: string): string {
  if (!value) {
    return '""'
  }
  if (/[:#[\]{}&*!|>'"%@`,]/.test(value) || value.includes("\n")) {
    return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`
  }
  return value
}

// --- Frontmatter builders ---

function buildMaterialFrontmatter(row: Record<string, string>): string {
  const title = pick(row, MATERIAL_COLUMNS.title)
  const rawSlug = pick(row, MATERIAL_COLUMNS.slug)
  const slug = rawSlug || slugify(title)
  const rawCategory = pick(row, MATERIAL_COLUMNS.category).toLowerCase().trim()
  const category = CATEGORY_MAP[rawCategory] ?? "management"
  const author = pick(row, MATERIAL_COLUMNS.author) || "Редакция"
  const date = normalizeDate(pick(row, MATERIAL_COLUMNS.date))
  const excerpt = pick(row, MATERIAL_COLUMNS.excerpt)
  const image = pick(row, MATERIAL_COLUMNS.image)
  const videoUrl = pick(row, MATERIAL_COLUMNS.videoUrl)
  const platform = pick(row, MATERIAL_COLUMNS.videoPlatform) || detectPlatform(videoUrl)
  const featured = pick(row, MATERIAL_COLUMNS.featured).toLowerCase() === "true"

  const lines = [
    "---",
    `title: ${yamlStr(title)}`,
    `slug: ${slug}`,
    `category: ${category}`,
    `author: ${yamlStr(author)}`,
    `date: "${date}"`,
    `excerpt: ${yamlStr(excerpt)}`,
  ]
  if (image) {
    lines.push(`image: ${yamlStr(image)}`)
  }
  if (videoUrl) {
    lines.push(`videoUrl: ${yamlStr(videoUrl)}`)
  }
  if (platform) {
    lines.push(`videoPlatform: ${platform}`)
  }
  if (featured) {
    lines.push("featured: true")
  }
  lines.push("---")
  return lines.join("\n")
}

function buildInterviewFrontmatter(row: Record<string, string>): string {
  const title = pick(row, INTERVIEW_COLUMNS.title)
  const rawSlug = pick(row, INTERVIEW_COLUMNS.slug)
  const slug = rawSlug || slugify(title)
  const guest = pick(row, INTERVIEW_COLUMNS.guest)
  const guestRole = pick(row, INTERVIEW_COLUMNS.guestRole)
  const date = normalizeDate(pick(row, INTERVIEW_COLUMNS.date))
  const excerpt = pick(row, INTERVIEW_COLUMNS.excerpt)
  const image = pick(row, INTERVIEW_COLUMNS.image)
  const videoUrl = pick(row, INTERVIEW_COLUMNS.videoUrl)
  const platform = pick(row, INTERVIEW_COLUMNS.videoPlatform) || detectPlatform(videoUrl)
  const featured = pick(row, INTERVIEW_COLUMNS.featured).toLowerCase() === "true"

  const lines = ["---", `title: ${yamlStr(title)}`, `slug: ${slug}`, `guest: ${yamlStr(guest)}`]
  if (guestRole) {
    lines.push(`guestRole: ${yamlStr(guestRole)}`)
  }
  lines.push(`date: "${date}"`)
  lines.push(`excerpt: ${yamlStr(excerpt)}`)
  if (image) {
    lines.push(`image: ${yamlStr(image)}`)
  }
  if (videoUrl) {
    lines.push(`videoUrl: ${yamlStr(videoUrl)}`)
  }
  if (platform) {
    lines.push(`videoPlatform: ${platform}`)
  }
  if (featured) {
    lines.push("featured: true")
  }
  lines.push("---")
  return lines.join("\n")
}

function buildExpertFrontmatter(row: Record<string, string>): string {
  const name = pick(row, EXPERT_COLUMNS.name)
  const rawSlug = pick(row, EXPERT_COLUMNS.slug)
  const slug = rawSlug || slugify(name)
  const role = pick(row, EXPERT_COLUMNS.role)
  const rawSpecs = pick(row, EXPERT_COLUMNS.specializations)
  const specializations = rawSpecs
    .split(/[,;|]/)
    .map((s) => CATEGORY_MAP[s.trim().toLowerCase()] ?? s.trim())
    .filter(Boolean)
  const bio = pick(row, EXPERT_COLUMNS.bio)
  const image = pick(row, EXPERT_COLUMNS.image)
  const telegram = pick(row, EXPERT_COLUMNS.telegram)
  const instagram = pick(row, EXPERT_COLUMNS.instagram)
  const vk = pick(row, EXPERT_COLUMNS.vk)
  const linkedin = pick(row, EXPERT_COLUMNS.linkedin)

  const hasSocial = telegram || instagram || vk || linkedin

  const lines = [
    "---",
    `name: ${yamlStr(name)}`,
    `slug: ${slug}`,
    `role: ${yamlStr(role)}`,
    "specializations:",
    ...specializations.map((s) => `  - ${s}`),
    `bio: ${yamlStr(bio)}`,
  ]
  if (image) {
    lines.push(`image: ${yamlStr(image)}`)
  }
  if (hasSocial) {
    lines.push("social:")
    if (telegram) {
      lines.push(`  telegram: ${yamlStr(telegram)}`)
    }
    if (instagram) {
      lines.push(`  instagram: ${yamlStr(instagram)}`)
    }
    if (vk) {
      lines.push(`  vk: ${yamlStr(vk)}`)
    }
    if (linkedin) {
      lines.push(`  linkedin: ${yamlStr(linkedin)}`)
    }
  }
  lines.push("---")
  return lines.join("\n")
}

// --- Main ---

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: temporary function
function main() {
  const args = process.argv.slice(2)
  const typeIdx = args.indexOf("--type")
  const inputIdx = args.indexOf("--input")

  if (typeIdx === -1 || inputIdx === -1) {
    console.error(
      "Usage: npx tsx scripts/csv-to-mdx.ts --type <materials|interviews|experts> --input <file.csv>",
    )
    process.exit(1)
  }

  const type = args[typeIdx + 1] as "materials" | "interviews" | "experts"
  const inputFile = args[inputIdx + 1]

  if (!["materials", "interviews", "experts"].includes(type)) {
    console.error(`Unknown type: ${type}. Must be materials, interviews, or experts.`)
    process.exit(1)
  }

  if (!fs.existsSync(inputFile)) {
    console.error(`Input file not found: ${inputFile}`)
    process.exit(1)
  }

  const content = fs.readFileSync(inputFile, "utf-8")
  const { rows } = parseCSV(content)

  const outDir = path.join(process.cwd(), "content", type)
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }

  let written = 0
  let skipped = 0

  for (const row of rows) {
    let frontmatter: string
    let slug: string

    if (type === "materials") {
      const title = pick(row, MATERIAL_COLUMNS.title)
      if (!title) {
        skipped++
        continue
      }
      slug = pick(row, MATERIAL_COLUMNS.slug) || slugify(title)
      frontmatter = buildMaterialFrontmatter(row)
    } else if (type === "interviews") {
      const title = pick(row, INTERVIEW_COLUMNS.title)
      if (!title) {
        skipped++
        continue
      }
      slug = pick(row, INTERVIEW_COLUMNS.slug) || slugify(title)
      frontmatter = buildInterviewFrontmatter(row)
    } else {
      const name = pick(row, EXPERT_COLUMNS.name)
      if (!name) {
        skipped++
        continue
      }
      slug = pick(row, EXPERT_COLUMNS.slug) || slugify(name)
      frontmatter = buildExpertFrontmatter(row)
    }

    const outPath = path.join(outDir, `${slug}.mdx`)
    fs.writeFileSync(outPath, `${frontmatter}\n`)
    console.log(`  ✓ ${slug}.mdx`)
    written++
  }

  console.log(`\nDone: ${written} files written, ${skipped} rows skipped.`)
  console.log(`Output: content/${type}/`)
}

main()
