export type VideoPlatform = "vkvideo" | "dzen" | "youtube"

export const CATEGORIES = [
  "professional-football",
  "goalkeepers",
  "physical-preparation",
  "analytics",
  "management",
  "youth-football",
  "psychology",
] as const

export type Category = (typeof CATEGORIES)[number]

export const CATEGORY_LABELS: Record<Category, string> = {
  management: "Менеджмент",
  "professional-football": "Профессиональный футбол",
  "physical-preparation": "Физическая подготовка",
  goalkeepers: "Вратари",
  analytics: "Аналитика",
  "youth-football": "Детско-юношеский футбол",
  psychology: "Психология",
}
