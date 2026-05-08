import { describe, expect, it } from "vitest"
import {
  optionalString,
  requireString,
  validateCategories,
  validateCategory,
  validateVideoPlatform,
} from "./validate"

describe("requireString", () => {
  it("returns the string value for a valid field", () => {
    expect(requireString({ title: "Hello" }, "title", "test")).toBe("Hello")
  })

  it("coerces non-string values to string", () => {
    expect(requireString({ count: 42 }, "count", "test")).toBe("42")
  })

  it("throws when field is missing", () => {
    expect(() => requireString({}, "title", "test")).toThrow(/required field "title"/)
  })

  it("throws when field is null", () => {
    expect(() => requireString({ title: null }, "title", "test")).toThrow()
  })

  it("throws when field is empty string", () => {
    expect(() => requireString({ title: "" }, "title", "test")).toThrow()
  })

  it("throws when field is whitespace only", () => {
    expect(() => requireString({ title: "   " }, "title", "test")).toThrow()
  })

  it("includes context in error message", () => {
    expect(() => requireString({}, "title", "material:test.mdx")).toThrow(/material:test\.mdx/)
  })
})

describe("optionalString", () => {
  it("returns the string value when present", () => {
    expect(optionalString({ image: "/img/photo.jpg" }, "image")).toBe("/img/photo.jpg")
  })

  it("returns undefined when field is missing", () => {
    expect(optionalString({}, "image")).toBeUndefined()
  })

  it("returns undefined when field is null", () => {
    expect(optionalString({ image: null }, "image")).toBeUndefined()
  })

  it("coerces non-string values to string", () => {
    expect(optionalString({ count: 5 }, "count")).toBe("5")
  })
})

describe("validateCategory", () => {
  it("accepts a valid category", () => {
    expect(validateCategory({ category: "management" }, "category", "test")).toBe("management")
  })

  it("accepts all defined categories", () => {
    const validCategories = [
      "management",
      "professional-football",
      "physical-preparation",
      "goalkeepers",
      "analytics",
      "youth-football",
      "psychology",
    ]
    for (const cat of validCategories) {
      expect(validateCategory({ category: cat }, "category", "test")).toBe(cat)
    }
  })

  it("throws for an unknown category", () => {
    expect(() => validateCategory({ category: "unknown" }, "category", "test")).toThrow(
      /invalid value for "category"/,
    )
  })

  it("throws when field is missing", () => {
    expect(() => validateCategory({}, "category", "test")).toThrow()
  })
})

describe("validateCategories", () => {
  it("returns an array of valid categories", () => {
    const result = validateCategories({ specs: ["management", "analytics"] }, "specs", "test")
    expect(result).toEqual(["management", "analytics"])
  })

  it("throws when field is not an array", () => {
    expect(() => validateCategories({ specs: "management" }, "specs", "test")).toThrow(
      /must be a non-empty array/,
    )
  })

  it("throws when array is empty", () => {
    expect(() => validateCategories({ specs: [] }, "specs", "test")).toThrow(
      /must be a non-empty array/,
    )
  })

  it("throws when an element is invalid", () => {
    expect(() => validateCategories({ specs: ["management", "invalid"] }, "specs", "test")).toThrow(
      /invalid category/,
    )
  })
})

describe("validateVideoPlatform", () => {
  it("returns undefined when field is missing", () => {
    expect(validateVideoPlatform({}, "videoPlatform", "test")).toBeUndefined()
  })

  it("returns undefined when field is null", () => {
    expect(validateVideoPlatform({ videoPlatform: null }, "videoPlatform", "test")).toBeUndefined()
  })

  it("accepts valid platforms", () => {
    expect(validateVideoPlatform({ videoPlatform: "youtube" }, "videoPlatform", "test")).toBe(
      "youtube",
    )
    expect(validateVideoPlatform({ videoPlatform: "vkvideo" }, "videoPlatform", "test")).toBe(
      "vkvideo",
    )
    expect(validateVideoPlatform({ videoPlatform: "dzen" }, "videoPlatform", "test")).toBe("dzen")
  })

  it("throws for an unknown platform", () => {
    expect(() =>
      validateVideoPlatform({ videoPlatform: "tiktok" }, "videoPlatform", "test"),
    ).toThrow(/invalid value for "videoPlatform"/)
  })
})
