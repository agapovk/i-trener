import fs from "node:fs"
import path from "node:path"
import type { Expert, ExpertFrontmatter } from "@entities/expert"
import matter from "gray-matter"
import type { Category } from "@/shared/config"
import { optionalString, requireString } from "./validate"

const CONTENT_DIR = path.join(process.cwd(), "content/experts")

function parseFrontmatter(raw: unknown, filename: string): ExpertFrontmatter {
  const data = raw as Record<string, unknown>
  const ctx = `expert:${filename}`
  return {
    name: requireString(data, "name", ctx),
    slug: requireString(data, "slug", ctx),
    role: requireString(data, "role", ctx),
    specialization: requireString(data, "specialization", ctx) as Category,
    bio: requireString(data, "bio", ctx),
    image: optionalString(data, "image"),
    social: data.social == null ? undefined : (data.social as ExpertFrontmatter["social"]),
  }
}

export function getAllExperts(): Expert[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return []
  }
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf8")
      const { data, content } = matter(raw)
      return { frontmatter: parseFrontmatter(data, filename), content }
    })
}

export function getExpertBySlug(slug: string): Expert | null {
  const filepath = path.join(CONTENT_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filepath)) {
    return null
  }
  const raw = fs.readFileSync(filepath, "utf8")
  const { data, content } = matter(raw)
  return {
    frontmatter: parseFrontmatter(data, `${slug}.mdx`),
    content,
  }
}
