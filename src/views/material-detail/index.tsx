import { CATEGORY_LABELS } from "@shared/config"
import { getMaterialBySlug } from "@shared/lib/mdx"
import { Prose, VideoEmbed } from "@shared/ui"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"

interface MaterialDetailViewProps {
  slug: string
}

export async function MaterialDetailView({ slug }: MaterialDetailViewProps) {
  const material = getMaterialBySlug(slug)
  if (!material) notFound()

  const { frontmatter: fm, content } = material

  const formattedDate = new Date(fm.date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <main className="px-4 py-10 max-w-3xl mx-auto w-full flex flex-col gap-10">
      <Link href="/materials" className="text-sm text-muted hover:text-accent transition-colors">
        ← Материалы
      </Link>

      <article className="flex flex-col gap-8">
        <header className="flex flex-col gap-4 pb-8 border-b border-border-subtle">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent-dim text-accent">
              {CATEGORY_LABELS[fm.category]}
            </span>
            <time dateTime={fm.date} className="text-xs font-mono text-muted">
              {formattedDate}
            </time>
          </div>
          <h1 className="text-4xl font-extrabold text-primary leading-tight">{fm.title}</h1>
          <p className="text-sm text-muted">Автор: {fm.author}</p>
        </header>

        {fm.videoUrl && <VideoEmbed url={fm.videoUrl} title={fm.title} />}

        {content.trim() && (
          <Prose>
            <MDXRemote source={content} />
          </Prose>
        )}
      </article>
    </main>
  )
}
