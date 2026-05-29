export type { Category, VideoPlatform } from "./categories"
export { CATEGORIES, CATEGORY_LABELS } from "./categories"

export const SITE_URL = "https://i-trener.ru"

export const NAV_ITEMS = [
  { label: "Материалы", href: "/materials" },
  { label: "Интервью", href: "/interviews" },
  { label: "Эксперты", href: "/experts" },
  { href: "/partners", label: "Партнёры" },
  { href: "/contacts", label: "Контакты" },
] as const

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/i.trener.ru",
  telegram: "https://t.me/itrenerru",
  vk: "https://vk.com/i_trener_ru",
} as const

export const PARTNERS = [
  { name: "Mad-Sports", description: "Спортивное оборудование" },
  { name: "Tacticboard", description: "Тактические инструменты" },
  { name: "NatAdvance", description: "Спортивная одежда" },
  { name: "Sports.ru", description: "Медиапартнёр" },
  { name: "Authentic.Football", description: "Организация мероприятий" },
  { name: "Championat.Shop", description: "Мерч и настольные игры" },
] as const
