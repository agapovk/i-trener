import fs from "node:fs"
import path from "node:path"
import type { Material, MaterialFrontmatter } from "@entities/material"
import matter from "gray-matter"
import type { Expert } from "@/entities/expert"
import { getExpertBySlug } from "./experts"
import { optionalString, requireString, validateCategory, validateVideoPlatform } from "./validate"

const CONTENT_DIR = path.join(process.cwd(), "content/materials")

function parseFrontmatter(raw: unknown, filename: string): MaterialFrontmatter {
  const data = raw as Record<string, unknown>
  const ctx = `material:${filename}`
  return {
    title: requireString(data, "title", ctx),
    slug: requireString(data, "slug", ctx),
    category: validateCategory(data, "category", ctx),
    author: requireString(data, "author", ctx),
    date: requireString(data, "date", ctx),
    excerpt: requireString(data, "excerpt", ctx),
    image: optionalString(data, "image"),
    videoUrl: optionalString(data, "videoUrl"),
    videoPlatform: validateVideoPlatform(data, "videoPlatform", ctx),
    featured: data.featured == null ? undefined : Boolean(data.featured),
  }
}

export function getAllMaterials(): (Material & { expert: Expert | null })[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return []
  }
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf8")
      const { data, content } = matter(raw)
      return {
        frontmatter: parseFrontmatter(data, filename),
        content,
        expert: getExpertBySlug(data.author),
      }
    })
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1))
}

export function getMaterialBySlug(slug: string): (Material & { expert: Expert | null }) | null {
  const filepath = path.join(CONTENT_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filepath)) {
    return null
  }
  const raw = fs.readFileSync(filepath, "utf8")
  const { data, content } = matter(raw)
  return {
    frontmatter: parseFrontmatter(data, `${slug}.mdx`),
    content,
    expert: getExpertBySlug(data.author),
  }
}
export function getMaterialsByAuthor(slug: string): (Material & { expert: Expert | null })[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return []
  }

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => {
      const isMdxFile = f.endsWith(".mdx")
      if (!isMdxFile) {
        return false
      }
      const filePath = path.join(CONTENT_DIR, f)
      const raw = fs.readFileSync(filePath, "utf8")
      const { data } = matter(raw)
      const isCorrectAuthor = data.author === slug

      return isMdxFile && isCorrectAuthor
    })
    .map((filename) => {
      const filePath = path.join(CONTENT_DIR, filename)
      const raw = fs.readFileSync(filePath, "utf8")
      const { data, content } = matter(raw)

      return {
        frontmatter: parseFrontmatter(data, filename),
        content,
        expert: getExpertBySlug(data.author),
      }
    })
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1))
}
