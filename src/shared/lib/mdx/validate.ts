import { CATEGORIES, type Category, type VideoPlatform } from "@shared/config"

const VIDEO_PLATFORMS: readonly VideoPlatform[] = ["vkvideo", "dzen", "youtube"]

export function requireString(
  data: Record<string, unknown>,
  field: string,
  context: string,
): string {
  const val = data[field]
  if (val == null || String(val).trim() === "") {
    throw new Error(`[${context}] required field "${field}" is missing or empty`)
  }
  return String(val)
}

export function optionalString(data: Record<string, unknown>, field: string): string | undefined {
  const val = data[field]
  return val == null ? undefined : String(val)
}

export function validateCategory(
  data: Record<string, unknown>,
  field: string,
  context: string,
): Category {
  const val = data[field]
  if (!CATEGORIES.includes(val as Category)) {
    throw new Error(
      `[${context}] invalid value for "${field}": "${val}". Must be one of: ${CATEGORIES.join(", ")}`,
    )
  }
  return val as Category
}

export function validateCategories(
  data: Record<string, unknown>,
  field: string,
  context: string,
): Category[] {
  const val = data[field]
  if (!Array.isArray(val) || val.length === 0) {
    throw new Error(`[${context}] field "${field}" must be a non-empty array`)
  }
  return val.map((item, i) => {
    if (!CATEGORIES.includes(item as Category)) {
      throw new Error(
        `[${context}] invalid category at "${field}[${i}]": "${item}". Must be one of: ${CATEGORIES.join(", ")}`,
      )
    }
    return item as Category
  })
}

export function validateVideoPlatform(
  data: Record<string, unknown>,
  field: string,
  context: string,
): VideoPlatform | undefined {
  const val = data[field]
  if (val == null) {
    return
  }
  if (!VIDEO_PLATFORMS.includes(val as VideoPlatform)) {
    throw new Error(
      `[${context}] invalid value for "${field}": "${val}". Must be one of: ${VIDEO_PLATFORMS.join(", ")}`,
    )
  }
  return val as VideoPlatform
}
