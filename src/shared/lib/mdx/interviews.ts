import fs from "node:fs"
import path from "node:path"
import type { Interview, InterviewFrontmatter } from "@entities/interview"
import matter from "gray-matter"
import { optionalString, requireString, validateVideoPlatform } from "./validate"

const CONTENT_DIR = path.join(process.cwd(), "content/interviews")

function parseFrontmatter(raw: unknown, filename: string): InterviewFrontmatter {
  const data = raw as Record<string, unknown>
  const ctx = `interview:${filename}`
  return {
    title: requireString(data, "title", ctx),
    slug: requireString(data, "slug", ctx),
    guest: requireString(data, "guest", ctx),
    guestRole: optionalString(data, "guestRole"),
    date: requireString(data, "date", ctx),
    excerpt: requireString(data, "excerpt", ctx),
    image: optionalString(data, "image"),
    videoUrl: optionalString(data, "videoUrl"),
    videoPlatform: validateVideoPlatform(data, "videoPlatform", ctx),
    featured: data.featured == null ? undefined : Boolean(data.featured),
  }
}

export function getAllInterviews(): Interview[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return []
  }
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

export function getInterviewBySlug(slug: string): (Interview & { content: string }) | null {
  const filepath = path.join(CONTENT_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filepath)) {
    return null
  }
  const raw = fs.readFileSync(filepath, "utf8")
  const { data, content } = matter(raw)
  return { frontmatter: parseFrontmatter(data, `${slug}.mdx`), content }
}
