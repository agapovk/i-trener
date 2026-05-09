import { ExpertCard } from "@entities/expert"
import { getAllExperts } from "@shared/lib/mdx"

export async function ExpertsListView() {
  const experts = getAllExperts()

  return (
    <main className="flex flex-col gap-8 px-4 py-12 max-w-7xl mx-auto w-full">
      <h1 className="text-5xl font-extrabold text-primary">Эксперты</h1>
      {experts.length === 0 ? (
        <p className="text-muted">Эксперты пока не добавлены.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {experts.map((e) => (
            <ExpertCard key={e.frontmatter.slug} expert={e} />
          ))}
        </div>
      )}
    </main>
  )
}
