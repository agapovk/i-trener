import fs from "node:fs"
import path from "node:path"
import type { Material, MaterialFrontmatter } from "@entities/material"
import matter from "gray-matter"

const CONTENT_DIR = path.join(process.cwd(), "content/materials")

function parseFrontmatter(raw: unknown): MaterialFrontmatter {
  const data = raw as Record<string, unknown>
  return {
    title: String(data.title ?? ""),
    slug: String(data.slug ?? ""),
    category: data.category as MaterialFrontmatter["category"],
    author: String(data.author ?? ""),
    date: String(data.date ?? ""),
    excerpt: String(data.excerpt ?? ""),
    image: data.image != null ? String(data.image) : undefined,
    videoUrl: data.videoUrl != null ? String(data.videoUrl) : undefined,
    videoPlatform: data.videoPlatform as MaterialFrontmatter["videoPlatform"],
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
      return { frontmatter: parseFrontmatter(data) }
    })
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1))
}

export function getMaterialBySlug(slug: string): (Material & { content: string }) | null {
  const filepath = path.join(CONTENT_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filepath)) return null
  const raw = fs.readFileSync(filepath, "utf8")
  const { data, content } = matter(raw)
  return { frontmatter: parseFrontmatter(data), content }
}
