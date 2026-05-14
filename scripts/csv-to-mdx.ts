#!/usr/bin/env node
/**
 * Webflow CMS CSV → MDX converter (calibrated for real i-trener.ru export)
 *
 * Usage:
 *   npx tsx scripts/csv-to-mdx.ts --type materials --input i-trener_backup/...csv
 *   npx tsx scripts/csv-to-mdx.ts --type interviews --input i-trener_backup/...csv
 *   npx tsx scripts/csv-to-mdx.ts --type experts --input i-trener_backup/...csv
 *
 * Webflow CSV columns (real export):
 *   materials:  Название, Slug, Published On, Краткое описание, Картинка, Содержание, Раздел, Автор
 *   interviews: ФИО, Slug, Published On, Звание / должность, Описание, Картинка, Видео, Раздел, Контент
 *   experts:    Name, Slug, Published On, Фото, Категория, Стаж работы тренером,
 *               Где и когда работал, Достижения, Спикер разделов,
 *               Ссылка на сайт / соцсети, Ссылка на сайт/соцсети 2
 */

import fs from "node:fs"
import path from "node:path"

// --- Column name mappings ---

const MATERIAL_COLUMNS = {
  title: ["Название", "Name", "Title"],
  slug: ["Slug", "slug"],
  category: ["Раздел", "Category", "Категория"],
  author: ["Автор", "Author"],
  date: ["Published On", "Created On", "Date"],
  excerpt: ["Краткое описание", "Short Description", "Описание", "Excerpt"],
  image: ["Картинка", "Main Image", "Image", "Thumbnail"],
  videoUrl: ["Видео", "Video URL", "VideoURL", "Video"],
  videoPlatform: ["Video Platform", "Platform"],
  featured: ["Featured", "Избранное"],
  body: ["Содержание", "Content", "Body"],
}

const INTERVIEW_COLUMNS = {
  // ФИО is used as both title and guest in Webflow export
  title: ["ФИО", "Name", "Title", "Название"],
  slug: ["Slug", "slug"],
  guest: ["ФИО", "Guest Name", "Guest", "Гость"],
  guestRole: ["Звание / должность", "Guest Role", "Role", "Должность"],
  date: ["Published On", "Created On", "Date"],
  excerpt: ["Описание", "Short Description", "Excerpt", "Description"],
  image: ["Картинка", "Image", "Thumbnail", "Photo", "Фото"],
  videoUrl: ["Видео", "Video URL", "VideoURL", "Video"],
  videoPlatform: ["Video Platform", "Platform"],
  featured: ["Featured", "Избранное"],
  body: ["Контент", "Content", "Body"],
}

const EXPERT_COLUMNS = {
  name: ["Name", "Full Name", "Имя", "ФИО"],
  slug: ["Slug", "slug"],
  // "Категория" in Webflow = role/title, not specialization
  role: ["Категория", "Role", "Position", "Должность"],
  // "Спикер разделов" = sections/specializations
  specializations: ["Спикер разделов", "Specializations", "Categories"],
  bio: ["Где и когда работал", "Bio", "Biography", "Биография"],
  achievements: ["Достижения"],
  tenure: ["Стаж работы тренером"],
  image: ["Фото", "Photo", "Image", "Avatar"],
  telegram: ["Telegram", "Telegram URL"],
  instagram: ["Instagram", "Instagram URL"],
  vk: ["VK", "VKontakte", "ВКонтакте"],
  linkedin: ["LinkedIn", "LinkedIn URL"],
  social1: ["Ссылка на сайт / соцсети"],
  social2: ["Ссылка на сайт/соцсети 2"],
}

// --- Category slug mapping (Webflow slugs → our Category type) ---
const CATEGORY_MAP: Record<string, string> = {
  management: "management",
  менеджмент: "management",
  "pro-football": "professional-football",
  "professional-football": "professional-football",
  "профессиональный футбол": "professional-football",
  conditioning: "physical-preparation",
  "physical-preparation": "physical-preparation",
  "физическая подготовка": "physical-preparation",
  goalkeeping: "goalkeepers",
  goalkeepers: "goalkeepers",
  вратари: "goalkeepers",
  analysis: "analytics",
  analytics: "analytics",
  аналитика: "analytics",
  "detskiy-futbol": "youth-football",
  "youth-football": "youth-football",
  "детско-юношеский футбол": "youth-football",
  psychology: "psychology",
  психология: "psychology",
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

// --- Detect social platform from URL ---
function detectSocialPlatform(url: string): { platform: string; url: string } | null {
  if (!url?.startsWith("http")) {
    return null
  }
  if (url.includes("t.me") || url.includes("telegram.me")) {
    return { platform: "telegram", url }
  }
  if (url.includes("instagram.com") || url.includes("instagr.am")) {
    return { platform: "instagram", url }
  }
  if (url.includes("vk.com")) {
    return { platform: "vk", url }
  }
  if (url.includes("linkedin.com")) {
    return { platform: "linkedin", url }
  }
  return null
}

// --- Extract iframe src from embed HTML ---
function extractIframeSrc(html: string): string | undefined {
  const match = html.match(/<iframe[^>]+src=["']([^"']+)["']/i)
  // Remove embedded whitespace/newlines from Webflow multi-line iframe attributes
  return match?.[1].replace(/[\s\n\t]+/g, "")
}

// --- HTML → Markdown ---
function htmlToMarkdown(html: string): string {
  if (!html) {
    return ""
  }

  let md = html

  // Extract and replace figure/image blocks before stripping tags
  md = md.replace(/<figure[^>]*>([\s\S]*?)<\/figure>/gi, (_, inner) => {
    const imgMatch = inner.match(/<img[^>]+src=["']([^"']+)["'][^>]*alt=["']([^"']*)["'][^>]*\/?>/)
    if (imgMatch) {
      return `\n![${imgMatch[2]}](${imgMatch[1]})\n`
    }
    const imgNoAlt = inner.match(/<img[^>]+src=["']([^"']+)["'][^>]*\/?>/)
    if (imgNoAlt) {
      return `\n![](${imgNoAlt[1]})\n`
    }
    return ""
  })

  // Remove embed blocks (iframe wrappers)
  md = md.replace(/<div[^>]*data-rt-embed[^>]*>[\s\S]*?<\/div>\s*<\/div>/gi, "")
  md = md.replace(/<div[^>]*class=["'][^"']*embed[^"']*["'][^>]*>[\s\S]*?<\/div>/gi, "")

  // Headings
  md = md.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, "\n# $1\n")
  md = md.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, "\n## $1\n")
  md = md.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, "\n### $1\n")
  md = md.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, "\n#### $1\n")

  // Inline formatting
  md = md.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, "**$1**")
  md = md.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, "**$1**")
  md = md.replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, "*$1*")
  md = md.replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, "*$1*")
  md = md.replace(/<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)")

  // Standalone img
  md = md.replace(/<img[^>]+src=["']([^"']+)["'][^>]*alt=["']([^"']*)["'][^>]*\/?>/gi, "![$2]($1)")
  md = md.replace(/<img[^>]+src=["']([^"']+)["'][^>]*\/?>/gi, "![]($1)")

  // Lists
  md = md.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, "- $1\n")
  md = md.replace(/<\/?[uo]l[^>]*>/gi, "\n")

  // Paragraphs and breaks
  md = md.replace(/<br\s*\/?>/gi, "\n")
  md = md.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, "$1\n\n")

  // Strip all remaining tags
  md = md.replace(/<[^>]+>/g, "")

  // Decode HTML entities
  md = md
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/‍/g, "") // zero-width joiner
    .replace(/­/g, "") // soft hyphen

  // Remove lines that contain no word characters (Latin or Cyrillic) — leftover punctuation
  md = md.replace(/^[^\wЀ-ӿ[!]+$/gm, "")

  // Collapse whitespace
  md = md.replace(/\n{3,}/g, "\n\n").trim()

  return md
}

// --- HTML → plain text (for bio, excerpt) ---
function htmlToText(html: string): string {
  if (!html) {
    return ""
  }
  return html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, "$1 ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/‍/g, "")
    .replace(/\s+/g, " ")
    .trim()
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

// --- CSV parser (handles multiline fields and Webflow's unescaped quotes in HTML) ---
//
// Webflow CSV does NOT consistently escape double-quotes inside HTML fields (e.g. iframe
// attributes use bare `"` rather than `""`). Standard RFC 4180 would fail here.
// Strategy: inside a quoted field, `"` ends the field ONLY when followed by `,`, `\r`,
// `\n`, or EOF. Any other `"` is treated as a literal character.
function parseCSV(content: string): { headers: string[]; rows: Record<string, string>[] } {
  const src = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n")
  const len = src.length
  let pos = 0

  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: RFC 4180 + Webflow quirk handling
  function parseField(): string {
    if (src[pos] !== '"') {
      // Unquoted field: read until comma or newline
      const start = pos
      while (pos < len && src[pos] !== "," && src[pos] !== "\n") {
        pos++
      }
      return src.slice(start, pos).trim()
    }
    // Quoted field
    pos++ // skip opening quote
    let field = ""
    while (pos < len) {
      const ch = src[pos]
      if (ch === '"') {
        if (src[pos + 1] === '"') {
          // Escaped double-quote per RFC 4180
          field += '"'
          pos += 2
        } else if (src[pos + 1] === "," || src[pos + 1] === "\n" || pos + 1 >= len) {
          // Closing quote: end of field
          pos++
          break
        } else {
          // Bare `"` inside HTML (Webflow quirk): treat as literal
          field += '"'
          pos++
        }
      } else {
        field += ch
        pos++
      }
    }
    return field.trim()
  }

  function parseRecord(): string[] | null {
    // Skip blank lines
    while (pos < len && src[pos] === "\n") {
      pos++
    }
    if (pos >= len) {
      return null
    }
    const fields: string[] = []
    while (pos < len && src[pos] !== "\n") {
      fields.push(parseField())
      if (pos < len && src[pos] === ",") {
        pos++ // skip comma between fields
      }
    }
    if (pos < len && src[pos] === "\n") {
      pos++ // skip record-ending newline
    }
    return fields
  }

  const headerFields = parseRecord()
  if (!headerFields) {
    return { headers: [], rows: [] }
  }
  const headers = headerFields

  const rows: Record<string, string>[] = []
  while (pos < len) {
    const fields = parseRecord()
    if (!fields || fields.every((f) => !f)) {
      continue
    }
    const row: Record<string, string> = {}
    headers.forEach((h, idx) => {
      row[h] = fields[idx] ?? ""
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
  if (/^\d{4}-\d{2}-\d{2}/.test(raw)) {
    return raw.slice(0, 10)
  }
  const ddmmyyyy = raw.match(/^(\d{2})\.(\d{2})\.(\d{4})/)
  if (ddmmyyyy) {
    return `${ddmmyyyy[3]}-${ddmmyyyy[2]}-${ddmmyyyy[1]}`
  }
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
  const trimmed = value.trim()
  if (!trimmed) {
    return '""'
  }
  // Always use double-quoted style for safety with Cyrillic + special chars
  return `"${trimmed.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n")}"`
}

// --- Frontmatter builders ---

function buildMaterialFrontmatter(row: Record<string, string>): { fm: string; body: string } {
  const title = pick(row, MATERIAL_COLUMNS.title)
  const rawSlug = pick(row, MATERIAL_COLUMNS.slug)
  const slug = rawSlug || slugify(title)
  const rawCategory = pick(row, MATERIAL_COLUMNS.category).toLowerCase().trim()
  const category = CATEGORY_MAP[rawCategory] ?? "management"
  const author = pick(row, MATERIAL_COLUMNS.author) || "Редакция"
  const date = normalizeDate(pick(row, MATERIAL_COLUMNS.date))
  const rawExcerpt = pick(row, MATERIAL_COLUMNS.excerpt)
  const excerpt = htmlToText(rawExcerpt)
  const image = pick(row, MATERIAL_COLUMNS.image)
  const rawBody = pick(row, MATERIAL_COLUMNS.body)

  // Check for video inside body
  let videoUrl = pick(row, MATERIAL_COLUMNS.videoUrl)
  if (!videoUrl && rawBody) {
    videoUrl = extractIframeSrc(rawBody) ?? ""
  }
  const platform = pick(row, MATERIAL_COLUMNS.videoPlatform) || detectPlatform(videoUrl)
  const featured = pick(row, MATERIAL_COLUMNS.featured).toLowerCase() === "true"

  const body = htmlToMarkdown(rawBody)

  const lines = [
    "---",
    `title: ${yamlStr(title)}`,
    `slug: ${slug}`,
    `category: ${category}`,
    `author: ${yamlStr(author)}`,
    `date: "${date}"`,
    `excerpt: ${yamlStr(excerpt || title)}`,
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

  return { fm: lines.join("\n"), body }
}

function buildInterviewFrontmatter(row: Record<string, string>): {
  fm: string
  body: string
  slug: string
} {
  const guest = pick(row, INTERVIEW_COLUMNS.guest)
  const title = guest // interview title = guest full name
  const rawSlug = pick(row, INTERVIEW_COLUMNS.slug)
  const slug = rawSlug || slugify(guest)
  const guestRole = htmlToText(pick(row, INTERVIEW_COLUMNS.guestRole))
  const date = normalizeDate(pick(row, INTERVIEW_COLUMNS.date))
  const rawExcerpt = pick(row, INTERVIEW_COLUMNS.excerpt)
  const excerpt = htmlToText(rawExcerpt)
  const image = pick(row, INTERVIEW_COLUMNS.image)
  const rawBody = pick(row, INTERVIEW_COLUMNS.body)

  let videoUrl = pick(row, INTERVIEW_COLUMNS.videoUrl)
  if (!videoUrl && rawBody) {
    videoUrl = extractIframeSrc(rawBody) ?? ""
  }
  const platform = pick(row, INTERVIEW_COLUMNS.videoPlatform) || detectPlatform(videoUrl)
  const featured = pick(row, INTERVIEW_COLUMNS.featured).toLowerCase() === "true"

  const body = htmlToMarkdown(rawBody)

  const lines = ["---", `title: ${yamlStr(title)}`, `slug: ${slug}`, `guest: ${yamlStr(guest)}`]
  if (guestRole) {
    lines.push(`guestRole: ${yamlStr(guestRole)}`)
  }
  lines.push(`date: "${date}"`)
  lines.push(`excerpt: ${yamlStr(excerpt || guest)}`)
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

  return { fm: lines.join("\n"), body, slug }
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: data mapping function
function buildExpertFrontmatter(row: Record<string, string>): {
  fm: string
  body: string
  slug: string
} {
  const name = pick(row, EXPERT_COLUMNS.name)
  const rawSlug = pick(row, EXPERT_COLUMNS.slug)
  const slug = rawSlug || slugify(name)
  // Strip leading "Категория " prefix that Webflow sometimes includes in cell values
  const role = htmlToText(pick(row, EXPERT_COLUMNS.role)).replace(/^Категория\s+/i, "") || "Тренер"
  const image = pick(row, EXPERT_COLUMNS.image)

  // Specializations from "Спикер разделов" (comma/semicolon separated Webflow slugs)
  const rawSpecs = pick(row, EXPERT_COLUMNS.specializations)
  const specializations = rawSpecs
    .split(/[,;|]/)
    .map((s) => CATEGORY_MAP[s.trim().toLowerCase()] ?? "")
    .filter(Boolean)

  // Bio: combine work history + achievements, strip HTML
  const workHistory = htmlToText(pick(row, EXPERT_COLUMNS.bio))
  const achievements = htmlToText(pick(row, EXPERT_COLUMNS.achievements))
  const tenure = pick(row, EXPERT_COLUMNS.tenure)

  let bio = ""
  if (tenure) {
    bio += `Стаж: ${tenure}. `
  }
  if (workHistory) {
    bio += workHistory
  }
  if (achievements) {
    bio += ` ${achievements}`
  }
  bio = bio.trim().replace(/\s+/g, " ")

  // Social links: detect from generic URL fields
  const socialRaw: Record<string, string> = {}
  for (const field of [
    pick(row, EXPERT_COLUMNS.telegram),
    pick(row, EXPERT_COLUMNS.instagram),
    pick(row, EXPERT_COLUMNS.vk),
    pick(row, EXPERT_COLUMNS.linkedin),
    pick(row, EXPERT_COLUMNS.social1),
    pick(row, EXPERT_COLUMNS.social2),
  ]) {
    if (!field) {
      continue
    }
    const detected = detectSocialPlatform(field)
    if (detected && !socialRaw[detected.platform]) {
      socialRaw[detected.platform] = detected.url
    }
  }

  const hasSocial = Object.keys(socialRaw).length > 0

  const lines = [
    "---",
    `name: ${yamlStr(name)}`,
    `slug: ${slug}`,
    `role: ${yamlStr(role)}`,
    "specializations:",
    ...(specializations.length > 0 ? specializations.map((s) => `  - ${s}`) : ["  - management"]),
    `bio: ${yamlStr(bio || name)}`,
  ]
  if (image) {
    lines.push(`image: ${yamlStr(image)}`)
  }
  if (hasSocial) {
    lines.push("social:")
    for (const [platform, url] of Object.entries(socialRaw)) {
      lines.push(`  ${platform}: ${yamlStr(url)}`)
    }
  }
  lines.push("---")

  // Body: quotes from Webflow (Футбол это, Тренер это, etc.)
  const quotes: string[] = []
  for (const field of [
    "Футбол это",
    "Тренер это",
    "Тренировочный процесс это",
    "Игра это",
    "Команда это",
  ]) {
    const val = htmlToText(row[field] ?? "")
    if (val) {
      quotes.push(`**${field}:** ${val}`)
    }
  }
  const body = quotes.length > 0 ? quotes.join("\n\n") : ""

  return { fm: lines.join("\n"), body, slug }
}

// --- Main ---

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: CLI entry point
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
    // Skip archived or draft items
    if (row.Archived === "true" || row.Draft === "true") {
      skipped++
      continue
    }

    let fileContent: string
    let slug: string

    if (type === "materials") {
      const title = pick(row, MATERIAL_COLUMNS.title)
      if (!title) {
        skipped++
        continue
      }
      slug = pick(row, MATERIAL_COLUMNS.slug) || slugify(title)
      const { fm, body } = buildMaterialFrontmatter(row)
      fileContent = body ? `${fm}\n\n${body}\n` : `${fm}\n`
    } else if (type === "interviews") {
      const guest = pick(row, INTERVIEW_COLUMNS.guest)
      if (!guest) {
        skipped++
        continue
      }
      const result = buildInterviewFrontmatter(row)
      slug = result.slug
      fileContent = result.body ? `${result.fm}\n\n${result.body}\n` : `${result.fm}\n`
    } else {
      const name = pick(row, EXPERT_COLUMNS.name)
      if (!name) {
        skipped++
        continue
      }
      const result = buildExpertFrontmatter(row)
      slug = result.slug
      fileContent = result.body ? `${result.fm}\n\n${result.body}\n` : `${result.fm}\n`
    }

    const outPath = path.join(outDir, `${slug}.mdx`)
    fs.writeFileSync(outPath, fileContent)
    console.log(`  ✓ ${slug}.mdx`)
    written++
  }

  console.log(`\nDone: ${written} files written, ${skipped} rows skipped.`)
  console.log(`Output: content/${type}/`)
}

main()
