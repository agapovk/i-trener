import type { VideoPlatform } from "@shared/config"

export interface InterviewFrontmatter {
  date: string
  excerpt: string
  featured?: boolean
  guest: string
  guestRole?: string
  image?: string
  slug: string
  title: string
  videoPlatform?: VideoPlatform
  videoUrl?: string
}

export interface Interview {
  frontmatter: InterviewFrontmatter
}
