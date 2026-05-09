import { ExpertCard } from "@entities/expert"
import { InterviewCard } from "@entities/interview"
import { MaterialCard } from "@entities/material"
import { getAllExperts, getAllInterviews, getAllMaterials } from "@shared/lib/mdx"
import Link from "next/link"

export async function HomeView() {
  const materials = getAllMaterials().slice(0, 6)
  const interviews = getAllInterviews().slice(0, 3)
  const experts = getAllExperts().slice(0, 3)

  return (
    <main className="flex flex-col">
      {/* Hero */}
      <section className="border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 flex flex-col gap-6">
          <div className="w-16 h-1 bg-accent rounded-full" />
          <h1 className="text-5xl md:text-7xl font-extrabold text-primary leading-none tracking-tight max-w-3xl">
            База знаний для тренеров по футболу
          </h1>
          <p className="text-xl text-muted max-w-xl leading-relaxed">
            Статьи, интервью и профили экспертов на русском языке.
          </p>
          <div className="flex gap-3 flex-wrap pt-2">
            <Link
              href="/materials"
              className="px-6 py-2.5 bg-accent text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Материалы
            </Link>
            <Link
              href="/interviews"
              className="px-6 py-2.5 bg-elevated text-primary rounded-lg font-semibold text-sm border border-border hover:border-accent transition-colors"
            >
              Интервью
            </Link>
            <Link
              href="/experts"
              className="px-6 py-2.5 bg-elevated text-primary rounded-lg font-semibold text-sm border border-border hover:border-accent transition-colors"
            >
              Эксперты
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 w-full flex flex-col gap-16 py-16">
        {materials.length > 0 && (
          <section className="flex flex-col gap-6">
            <div className="flex items-baseline justify-between">
              <h2 className="text-2xl font-extrabold text-primary">Материалы</h2>
              <Link
                href="/materials"
                className="text-sm text-accent hover:underline underline-offset-4"
              >
                Все →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {materials.map((m) => (
                <MaterialCard key={m.frontmatter.slug} material={m} />
              ))}
            </div>
          </section>
        )}

        {interviews.length > 0 && (
          <section className="flex flex-col gap-6">
            <div className="flex items-baseline justify-between">
              <h2 className="text-2xl font-extrabold text-primary">Интервью</h2>
              <Link
                href="/interviews"
                className="text-sm text-accent hover:underline underline-offset-4"
              >
                Все →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {interviews.map((i) => (
                <InterviewCard key={i.frontmatter.slug} interview={i} />
              ))}
            </div>
          </section>
        )}

        {experts.length > 0 && (
          <section className="flex flex-col gap-6">
            <div className="flex items-baseline justify-between">
              <h2 className="text-2xl font-extrabold text-primary">Эксперты</h2>
              <Link
                href="/experts"
                className="text-sm text-accent hover:underline underline-offset-4"
              >
                Все →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {experts.map((e) => (
                <ExpertCard key={e.frontmatter.slug} expert={e} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
