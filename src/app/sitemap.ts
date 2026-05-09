import { CATEGORIES, SITE_URL } from "@shared/config"
import { getAllExperts, getAllInterviews, getAllMaterials } from "@shared/lib/mdx"
import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const materials = getAllMaterials().map((m) => ({
    url: `${SITE_URL}/materials/${m.frontmatter.slug}`,
    lastModified: new Date(m.frontmatter.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const interviews = getAllInterviews().map((i) => ({
    url: `${SITE_URL}/interviews/${i.frontmatter.slug}`,
    lastModified: new Date(i.frontmatter.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const experts = getAllExperts().map((e) => ({
    url: `${SITE_URL}/experts/${e.frontmatter.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  const categories = CATEGORIES.map((cat) => ({
    url: `${SITE_URL}/categories/${cat}`,
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }))

  return [
    { url: SITE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/materials`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/interviews`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/experts`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/partners`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/contacts`, changeFrequency: "yearly", priority: 0.3 },
    ...materials,
    ...interviews,
    ...experts,
    ...categories,
  ]
}
