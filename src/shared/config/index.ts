export type { Category, VideoPlatform } from "./categories"
export { CATEGORIES, CATEGORY_LABELS } from "./categories"

export const NAV_ITEMS = [
  { label: "Материалы", href: "/materials" },
  { label: "Интервью", href: "/interviews" },
  { label: "Эксперты", href: "/experts" },
] as const

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/itrener",
  telegram: "https://t.me/itrener",
  vk: "https://vk.com/itrener",
} as const
