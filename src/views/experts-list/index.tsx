import { ExpertCard } from "@entities/expert"
import { getAllExperts } from "@shared/lib/mdx"

export function ExpertsListView() {
  const experts = getAllExperts()

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-12">
      <h1 className="font-extrabold text-5xl text-primary">Эксперты</h1>
      {experts.length === 0 ? (
        <p className="text-muted">Эксперты пока не добавлены.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {experts.map((e) => (
            <ExpertCard expert={e} key={e.frontmatter.slug} />
          ))}
        </div>
      )}
    </main>
  )
}
