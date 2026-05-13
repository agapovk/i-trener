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
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-16 md:py-24">
          <div className="h-1 w-16 rounded-full bg-accent" />
          <h1 className="max-w-3xl font-extrabold text-5xl text-primary leading-none tracking-tight md:text-7xl">
            База знаний для
            <br />
            <span className="text-accent"> футбольных тренеров</span>
          </h1>
          <p className="max-w-xl text-muted text-xl leading-relaxed">
            Статьи, интервью и профили экспертов на русском языке.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section
        className="relative"
        style={{ borderBottom: "1px solid var(--border-subtle)", padding: "12px 0" }}
      >
        <NoiseLayer />
        <div className="scroll-x no-scrollbar mx-auto flex max-w-7xl items-center gap-4 overflow-auto px-4">
          <span className="whitespace-nowrap font-mono text-accent text-xs uppercase">
            Категории:
          </span>
          {CATEGORIES.map((cat) => (
            <Link
              className="whitespace-nowrap rounded-lg bg-elevated px-4 py-2 font-medium text-muted text-sm transition-opacity hover:opacity-90"
              href={`/categories/${cat}`}
              key={cat}
            >
              {CATEGORY_LABELS[cat]}
            </Link>
          ))}
        </div>
      </section>

      {/* Materials */}
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
