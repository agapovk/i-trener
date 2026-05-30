"use client"

import { CATEGORIES, CATEGORY_LABELS, type Category } from "@shared/config"
import { cn } from "@shared/lib"
import { useState } from "react"
import { type Expert, ExpertCard } from "@/entities/expert"

interface ExpertFilterProps {
  experts: Expert[]
}

export function ExpertFilter({ experts }: ExpertFilterProps) {
  const [active, setActive] = useState<Category | null>(null)

  const usedCategories = CATEGORIES.filter((c) =>
    experts.some((e) => e.frontmatter.specialization === c),
  )

  const filtered = active ? experts.filter((e) => e.frontmatter.specialization === active) : experts

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
        <p className="text-muted">Эксперты пока не добавлены.</p>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((e) => (
            <ExpertCard expert={e} key={e.frontmatter.slug} />
          ))}
        </div>
      )}
    </div>
  )
}
