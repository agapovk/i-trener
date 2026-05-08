import fs from "node:fs"
import path from "node:path"
import type { Expert, ExpertFrontmatter } from "@entities/expert"
import matter from "gray-matter"

const CONTENT_DIR = path.join(process.cwd(), "content/experts")

function parseFrontmatter(raw: unknown): ExpertFrontmatter {
  const data = raw as Record<string, unknown>
  return {
    name: String(data.name ?? ""),
    slug: String(data.slug ?? ""),
    role: String(data.role ?? ""),
    specializations: Array.isArray(data.specializations)
      ? (data.specializations as ExpertFrontmatter["specializations"])
      : [],
    bio: String(data.bio ?? ""),
    image: data.image != null ? String(data.image) : undefined,
    social: data.social != null ? (data.social as ExpertFrontmatter["social"]) : undefined,
  }
}

export function getAllExperts(): Expert[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf8")
      const { data } = matter(raw)
      return { frontmatter: parseFrontmatter(data) }
    })
}

export function getExpertBySlug(slug: string): (Expert & { content: string }) | null {
  const filepath = path.join(CONTENT_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filepath)) return null
  const raw = fs.readFileSync(filepath, "utf8")
  const { data, content } = matter(raw)
  return { frontmatter: parseFrontmatter(data), content }
}
