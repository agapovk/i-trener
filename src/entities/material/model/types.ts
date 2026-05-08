import type { Category, VideoPlatform } from "@shared/config"

export interface MaterialFrontmatter {
  title: string
  slug: string
  category: Category
  author: string
  date: string
  excerpt: string
  image?: string
  videoUrl?: string
  videoPlatform?: VideoPlatform
  featured?: boolean
}

export interface Material {
  frontmatter: MaterialFrontmatter
}
