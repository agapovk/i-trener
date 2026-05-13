import type { Category } from "@shared/config"

export interface ExpertFrontmatter {
  bio: string
  image?: string
  name: string
  role: string
  slug: string
  social?: {
    telegram?: string
    instagram?: string
    vk?: string
    linkedin?: string
  }
  specializations: Category[]
}

export interface Expert {
  frontmatter: ExpertFrontmatter
}
