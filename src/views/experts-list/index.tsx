import { getAllExperts } from "@shared/lib/mdx"
import { ExpertFilter } from "@/features/filter-by-category/ui/experts-filter"

export function ExpertsListView() {
  const experts = getAllExperts()

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-12">
      <h1 className="font-extrabold text-5xl text-primary">Эксперты</h1>
      <ExpertFilter experts={experts} />
    </main>
  )
}
