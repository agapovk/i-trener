import { CategoryFilter } from "@features/filter-by-category"
import { getAllMaterials } from "@shared/lib/mdx"

export function MaterialsListView() {
  const materials = getAllMaterials()

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-12">
      <h1 className="font-extrabold text-5xl text-primary">Материалы</h1>
      <CategoryFilter materials={materials} />
    </main>
  )
}
