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
    <main className="flex flex-col gap-16 px-4 py-12 max-w-7xl mx-auto w-full">
      <section className="flex flex-col gap-6 py-8">
        <h1 className="text-5xl font-extrabold text-primary leading-tight">Я:Тренер</h1>
        <p className="text-xl text-secondary max-w-2xl">
          Медиаплатформа и база знаний для тренеров по футболу. Статьи, интервью и профили ведущих
          специалистов на русском языке.
        </p>
        <div className="flex gap-3 flex-wrap">
          <Link
            href="/materials"
            className="px-5 py-2.5 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors"
          >
            Материалы
          </Link>
          <Link
            href="/interviews"
            className="px-5 py-2.5 bg-subtle text-primary rounded-lg font-medium hover:bg-elevated transition-colors"
          >
            Интервью
          </Link>
          <Link
            href="/experts"
            className="px-5 py-2.5 bg-subtle text-primary rounded-lg font-medium hover:bg-elevated transition-colors"
          >
            Эксперты
          </Link>
        </div>
      </section>

      {materials.length > 0 && (
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-extrabold text-primary">Материалы</h2>
            <Link href="/materials" className="text-sm text-accent hover:underline">
              Все материалы →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map((m) => (
              <MaterialCard key={m.frontmatter.slug} material={m} />
            ))}
          </div>
        </section>
      )}

      {interviews.length > 0 && (
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-extrabold text-primary">Интервью</h2>
            <Link href="/interviews" className="text-sm text-accent hover:underline">
              Все интервью →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interviews.map((i) => (
              <InterviewCard key={i.frontmatter.slug} interview={i} />
            ))}
          </div>
        </section>
      )}

      {experts.length > 0 && (
        <section className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-extrabold text-primary">Эксперты</h2>
            <Link href="/experts" className="text-sm text-accent hover:underline">
              Все эксперты →
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            {experts.map((e) => (
              <ExpertCard key={e.frontmatter.slug} expert={e} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
