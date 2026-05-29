import { ExpertCard } from "@entities/expert"
import { InterviewCard } from "@entities/interview"
import { MaterialCard } from "@entities/material"
import { getAllExperts, getAllInterviews, getAllMaterials } from "@shared/lib/mdx"
import Link from "next/link"
import { CATEGORIES, CATEGORY_LABELS } from "@/shared/config"
import { NoiseLayer } from "@/shared/ui"

export function HomeView() {
  const materials = getAllMaterials().slice(0, 6)
  const interviews = getAllInterviews().slice(0, 3)
  const experts = getAllExperts().slice(0, 3)

  return (
    <main className="flex flex-col">
      {/* Hero */}
      <section className="relative border-border-subtle border-b">
        <NoiseLayer />
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 md:gap-6 md:py-16 lg:py-24">
          <div className="h-1 w-16 rounded-full bg-accent" />
          <h1 className="max-w-3xl font-extrabold text-4xl text-primary leading-none tracking-tight md:text-5xl lg:text-7xl">
            База знаний для
            <br />
            <span className="text-accent"> футбольных тренеров</span>
          </h1>
          <p className="max-w-xl text-muted leading-relaxed md:text-xl">
            Статьи, интервью и профили экспертов на русском языке.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="relative border-border-subtle border-b">
        <NoiseLayer />
        <div className="relative">
          <div className="no-scrollbar mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-3 md:gap-4 md:py-3">
            <span className="whitespace-nowrap font-mono text-accent text-xs uppercase">
              Категории:
            </span>
            {CATEGORIES.map((cat) => (
              <Link
                className="whitespace-nowrap rounded-lg border border-border bg-subtle px-3 py-1.5 font-medium text-secondary text-xs transition-colors hover:border-accent hover:text-accent md:px-4 md:py-2 md:text-sm"
                href={`/categories/${cat}`}
                key={cat}
              >
                {CATEGORY_LABELS[cat]}
              </Link>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-linear-to-l from-base to-transparent md:hidden" />
        </div>
      </section>

      {/* Materials */}
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-10 md:gap-16 md:py-16">
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

        {/* Interviews */}
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

        {/* Experts */}
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
