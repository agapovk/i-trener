import type { Category, VideoPlatform } from "@shared/config"

export interface MaterialFrontmatter {
  author: string
  category: Category
  date: string
  excerpt: string
  featured?: boolean
  image?: string
  slug: string
  title: string
  videoPlatform?: VideoPlatform
  videoUrl?: string
}

export interface Material {
  frontmatter: MaterialFrontmatter
}
