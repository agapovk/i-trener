import { MaterialCard } from "@entities/material"
import { CATEGORIES, CATEGORY_LABELS, type Category } from "@shared/config"
import { getAllMaterials } from "@shared/lib/mdx"
import Link from "next/link"
import { notFound } from "next/navigation"

interface Props {
  category: string
}

export function CategoryView({ category }: Props) {
  if (!CATEGORIES.includes(category as Category)) notFound()

  const cat = category as Category
  const materials = getAllMaterials().filter((m) => m.frontmatter.category === cat)
  const label = CATEGORY_LABELS[cat]

  return (
    <main className="flex flex-col gap-8 px-4 py-12 max-w-7xl mx-auto w-full">
      <Link href="/materials" className="text-sm text-accent hover:underline underline-offset-4">
        ← Все материалы
      </Link>

      <div className="flex flex-col gap-2">
        <span className="inline-flex px-2.5 py-0.5 rounded-full bg-accent-dim text-accent text-sm font-medium w-fit">
          Категория
        </span>
        <h1 className="text-5xl font-extrabold text-primary">{label}</h1>
        <p className="text-muted text-sm">{materials.length} материалов</p>
      </div>

      {materials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {materials.map((m) => (
            <MaterialCard key={m.frontmatter.slug} material={m} />
          ))}
        </div>
      ) : (
        <p className="text-muted py-16 text-center">В этой категории пока нет материалов.</p>
      )}
    </main>
  )
}
