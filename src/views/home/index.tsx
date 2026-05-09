import { ExpertCard } from "@entities/expert"
import { InterviewCard } from "@entities/interview"
import { MaterialCard } from "@entities/material"
import { getAllExperts, getAllInterviews, getAllMaterials } from "@shared/lib/mdx"
import Link from "next/link"

export function HomeView() {
  const materials = getAllMaterials().slice(0, 6)
  const interviews = getAllInterviews().slice(0, 3)
  const experts = getAllExperts().slice(0, 3)

  return (
    <main className="flex flex-col">
      {/* Hero */}
      <section className="border-border-subtle border-b">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-16 md:py-24">
          <div className="h-1 w-16 rounded-full bg-accent" />
          <h1 className="max-w-3xl font-extrabold text-5xl text-primary leading-none tracking-tight md:text-7xl">
            База знаний для тренеров по футболу
          </h1>
          <p className="max-w-xl text-muted text-xl leading-relaxed">
            Статьи, интервью и профили экспертов на русском языке.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              className="rounded-lg bg-accent px-6 py-2.5 font-semibold text-sm text-white transition-opacity hover:opacity-90"
              href="/materials"
            >
              Материалы
            </Link>
            <Link
              className="rounded-lg border border-border bg-elevated px-6 py-2.5 font-semibold text-primary text-sm transition-colors hover:border-accent"
              href="/interviews"
            >
              Интервью
            </Link>
            <Link
              className="rounded-lg border border-border bg-elevated px-6 py-2.5 font-semibold text-primary text-sm transition-colors hover:border-accent"
              href="/experts"
            >
              Эксперты
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-4 py-16">
        {materials.length > 0 && (
          <section className="flex flex-col gap-6">
            <div className="flex items-baseline justify-between">
              <h2 className="font-extrabold text-2xl text-primary">Материалы</h2>
              <Link
                className="text-accent text-sm underline-offset-4 hover:underline"
                href="/materials"
              >
                Все →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {materials.map((m) => (
                <MaterialCard key={m.frontmatter.slug} material={m} />
              ))}
            </div>
          </section>
        )}

        {interviews.length > 0 && (
          <section className="flex flex-col gap-6">
            <div className="flex items-baseline justify-between">
              <h2 className="font-extrabold text-2xl text-primary">Интервью</h2>
              <Link
                className="text-accent text-sm underline-offset-4 hover:underline"
                href="/interviews"
              >
                Все →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {interviews.map((i) => (
                <InterviewCard interview={i} key={i.frontmatter.slug} />
              ))}
            </div>
          </section>
        )}

        {experts.length > 0 && (
          <section className="flex flex-col gap-6">
            <div className="flex items-baseline justify-between">
              <h2 className="font-extrabold text-2xl text-primary">Эксперты</h2>
              <Link
                className="text-accent text-sm underline-offset-4 hover:underline"
                href="/experts"
              >
                Все →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {experts.map((e) => (
                <ExpertCard expert={e} key={e.frontmatter.slug} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
