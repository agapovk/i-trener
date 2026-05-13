import { InterviewCard } from "@entities/interview"
import { getAllInterviews } from "@shared/lib/mdx"

export function InterviewsListView() {
  const interviews = getAllInterviews()

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-12">
      <h1 className="font-extrabold text-5xl text-primary">Интервью</h1>
      {interviews.length === 0 ? (
        <p className="text-muted">Интервью пока не добавлены.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {interviews.map((i) => (
            <InterviewCard interview={i} key={i.frontmatter.slug} />
          ))}
        </div>
      )}
    </main>
  )
}
