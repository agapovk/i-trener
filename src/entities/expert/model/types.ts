import type { Category } from "@shared/config"

export interface ExpertFrontmatter {
  name: string
  slug: string
  role: string
  specializations: Category[]
  bio: string
  image?: string
  social?: {
    telegram?: string
    instagram?: string
    vk?: string
    linkedin?: string
  }
}

export interface Expert {
  frontmatter: ExpertFrontmatter
}
