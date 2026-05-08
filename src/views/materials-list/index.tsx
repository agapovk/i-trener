import { CategoryFilter } from "@features/filter-by-category"
import { getAllMaterials } from "@shared/lib/mdx"

export async function MaterialsListView() {
  const materials = getAllMaterials()

  return (
    <main className="flex flex-col gap-8 px-4 py-12 max-w-7xl mx-auto w-full">
      <h1 className="text-5xl font-extrabold text-primary">Материалы</h1>
      <CategoryFilter materials={materials} />
    </main>
  )
}
