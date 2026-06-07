export type { Category, VideoPlatform } from "./categories"
export { CATEGORIES, CATEGORY_LABELS } from "./categories"

import { Image, Send, Users } from "lucide-react"

export const SITE_URL = "https://i-trener.ru"

export const NAV_ITEMS = [
  { label: "Материалы", href: "/materials" },
  { label: "Интервью", href: "/interviews" },
  { label: "Эксперты", href: "/experts" },
  // { href: "/partners", label: "Партнёры" },
  { href: "/contacts", label: "Контакты" },
] as const

export const SOCIAL_LINKS = [
  {
    label: "Telegram",
    href: "https://t.me/itrenerru",
    description: "Новости и анонсы материалов",
    icon: Send,
  },
  {
    label: "ВКонтакте",
    href: "https://vk.com/i_trener_ru",
    description: "Сообщество тренеров",
    icon: Users,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/i.trener.ru",
    description: "Фото и короткие материалы",
    icon: Image,
  },
] as const

export const PARTNERS = [
  { name: "Mad-Sports", description: "Спортивное оборудование" },
  { name: "Tacticboard", description: "Тактические инструменты" },
  { name: "NatAdvance", description: "Спортивная одежда" },
  { name: "Sports.ru", description: "Медиапартнёр" },
  { name: "Authentic.Football", description: "Организация мероприятий" },
  { name: "Championat.Shop", description: "Мерч и настольные игры" },
] as const

export const HOMEPAGE_EXPERTS = [
  "averyanov-evgeniy",
  "shpilev-andrey",
  "galaktionov-mihail",
  "kafanov-vitaliy",
  "bulatov-sergey",
  "iskakov-murat",
]
