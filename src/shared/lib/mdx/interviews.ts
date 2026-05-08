import fs from "node:fs"
import path from "node:path"
import type { Interview, InterviewFrontmatter } from "@entities/interview"
import matter from "gray-matter"

const CONTENT_DIR = path.join(process.cwd(), "content/interviews")

function parseFrontmatter(raw: unknown): InterviewFrontmatter {
  const data = raw as Record<string, unknown>
  return {
    title: String(data.title ?? ""),
    slug: String(data.slug ?? ""),
    guest: String(data.guest ?? ""),
    guestRole: data.guestRole != null ? String(data.guestRole) : undefined,
    date: String(data.date ?? ""),
    excerpt: String(data.excerpt ?? ""),
    image: data.image != null ? String(data.image) : undefined,
    videoUrl: data.videoUrl != null ? String(data.videoUrl) : undefined,
    videoPlatform: data.videoPlatform as InterviewFrontmatter["videoPlatform"],
    featured: data.featured != null ? Boolean(data.featured) : undefined,
  }
}

export function getAllInterviews(): Interview[] {
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

export function getInterviewBySlug(slug: string): (Interview & { content: string }) | null {
  const filepath = path.join(CONTENT_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filepath)) return null
  const raw = fs.readFileSync(filepath, "utf8")
  const { data, content } = matter(raw)
  return { frontmatter: parseFrontmatter(data), content }
}
