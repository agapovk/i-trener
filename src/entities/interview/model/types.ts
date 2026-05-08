import type { VideoPlatform } from "@shared/config"

export interface InterviewFrontmatter {
  title: string
  slug: string
  guest: string
  guestRole?: string
  date: string
  excerpt: string
  image?: string
  videoUrl?: string
  videoPlatform?: VideoPlatform
  featured?: boolean
}

export interface Interview {
  frontmatter: InterviewFrontmatter
}
