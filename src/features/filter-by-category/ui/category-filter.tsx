"use client"

import type { Material } from "@entities/material"
import { MaterialCard } from "@entities/material"
import { CATEGORIES, CATEGORY_LABELS } from "@shared/config"
import { cn } from "@shared/lib"
import { useState } from "react"

interface CategoryFilterProps {
  materials: Material[]
}

export function CategoryFilter({ materials }: CategoryFilterProps) {
  const [active, setActive] = useState<string | null>(null)

  const usedCategories = CATEGORIES.filter((c) =>
    materials.some((m) => m.frontmatter.category === c),
  )

  const filtered = active ? materials.filter((m) => m.frontmatter.category === active) : materials

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-2">
        <button
          className={cn(
            "rounded-full px-4 py-1.5 font-medium text-sm transition-colors",
            active === null ? "bg-accent text-white" : "bg-subtle text-muted hover:text-primary",
          )}
          onClick={() => setActive(null)}
          type="button"
        >
          Все
        </button>
        {usedCategories.map((cat) => (
          <button
            className={cn(
              "rounded-full px-4 py-1.5 font-medium text-sm transition-colors",
              active === cat ? "bg-accent text-white" : "bg-subtle text-muted hover:text-primary",
            )}
            key={cat}
            onClick={() => setActive(active === cat ? null : cat)}
            type="button"
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted text-sm">Материалов не найдено.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m) => (
            <MaterialCard key={m.frontmatter.slug} material={m} />
          ))}
        </div>
      )}
    </div>
  )
}
