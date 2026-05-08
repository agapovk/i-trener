import fs from "node:fs"
import path from "node:path"
import type { Material, MaterialFrontmatter } from "@entities/material"
import matter from "gray-matter"
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
    featured: data.featured != null ? Boolean(data.featured) : undefined,
  }
}

export function getAllMaterials(): Material[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf8")
      const { data } = matter(raw)
      return { frontmatter: parseFrontmatter(data, filename) }
    })
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1))
}

export function getMaterialBySlug(slug: string): (Material & { content: string }) | null {
  const filepath = path.join(CONTENT_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filepath)) return null
  const raw = fs.readFileSync(filepath, "utf8")
  const { data, content } = matter(raw)
  return { frontmatter: parseFrontmatter(data, `${slug}.mdx`), content }
}
