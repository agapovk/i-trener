import { MaterialCard } from "@entities/material"
import { CATEGORIES, CATEGORY_LABELS, type Category } from "@shared/config"
import { getAllMaterials } from "@shared/lib/mdx"
import Link from "next/link"
import { notFound } from "next/navigation"

interface Props {
  category: string
}

export function CategoryView({ category }: Props) {
  if (!CATEGORIES.includes(category as Category)) {
    notFound()
  }

  const cat = category as Category
  const materials = getAllMaterials().filter((m) => m.frontmatter.category === cat)
  const label = CATEGORY_LABELS[cat]

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-12">
      <Link className="text-accent text-sm underline-offset-4 hover:underline" href="/materials">
        ← Все материалы
      </Link>

      <div className="flex flex-col gap-2">
        <span className="inline-flex w-fit rounded-full bg-accent-dim px-2.5 py-0.5 font-medium text-accent text-sm">
          Категория
        </span>
        <h1 className="font-extrabold text-5xl text-primary">{label}</h1>
        <p className="text-muted text-sm">{materials.length} материалов</p>
      </div>

      {materials.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {materials.map((m) => (
            <MaterialCard key={m.frontmatter.slug} material={m} />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-muted">В этой категории пока нет материалов.</p>
      )}
    </main>
  )
}
