import { InterviewCard } from "@entities/interview"
import { getAllInterviews } from "@shared/lib/mdx"

export async function InterviewsListView() {
  const interviews = getAllInterviews()

  return (
    <main className="flex flex-col gap-8 px-4 py-12 max-w-7xl mx-auto w-full">
      <h1 className="text-5xl font-extrabold text-primary">Интервью</h1>
      {interviews.length === 0 ? (
        <p className="text-muted">Интервью пока не добавлены.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interviews.map((i) => (
            <InterviewCard key={i.frontmatter.slug} interview={i} />
          ))}
        </div>
      )}
    </main>
  )
}
