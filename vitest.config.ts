import path from "node:path"
import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    environment: "node",
    globals: false,
    include: ["src/**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@shared": path.resolve(import.meta.dirname, "./src/shared"),
      "@entities": path.resolve(import.meta.dirname, "./src/entities"),
      "@features": path.resolve(import.meta.dirname, "./src/features"),
      "@widgets": path.resolve(import.meta.dirname, "./src/widgets"),
      "@views": path.resolve(import.meta.dirname, "./src/views"),
    },
  },
})
