export type { Category, VideoPlatform } from "./categories"
export { CATEGORIES, CATEGORY_LABELS } from "./categories"

export const SITE_URL = "https://i-trener.ru"

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

export const PARTNERS = [
  { name: "Mad-Sports", description: "Спортивное оборудование" },
  { name: "Tacticboard", description: "Тактические инструменты" },
  { name: "NatAdvance", description: "Спортивная одежда" },
  { name: "Sports.ru", description: "Медиапартнёр" },
  { name: "Authentic.Football", description: "Организация мероприятий" },
  { name: "Championat.Shop", description: "Мерч и настольные игры" },
] as const
