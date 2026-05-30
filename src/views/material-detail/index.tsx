import { CATEGORY_LABELS } from "@shared/config"
import { getMaterialBySlug } from "@shared/lib/mdx"
import { mdxComponents, Prose, VideoEmbed } from "@shared/ui"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"

interface MaterialDetailViewProps {
  slug: string
}

export function MaterialDetailView({ slug }: MaterialDetailViewProps) {
  const material = getMaterialBySlug(slug)
  if (!material) {
    notFound()
  }

  const { frontmatter: fm, content, expert } = material

  const formattedDate = new Date(fm.date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-10">
      <Link className="text-muted text-sm transition-colors hover:text-accent" href="/materials">
        ← Материалы
      </Link>

      <article className="flex flex-col gap-8">
        <header className="flex flex-col gap-4 border-border-subtle border-b pb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-accent-dim px-2.5 py-1 font-medium text-accent text-xs">
              {CATEGORY_LABELS[fm.category]}
            </span>
            <time className="font-mono text-muted text-xs" dateTime={fm.date}>
              {formattedDate}
            </time>
          </div>
          <h1 className="font-extrabold text-4xl text-primary leading-tight">{fm.title}</h1>
          <Link className="text-muted text-sm hover:text-accent" href={`/experts/${fm.author}`}>
            Автор: {expert?.frontmatter.name}
          </Link>
        </header>

        {fm.videoUrl && <VideoEmbed title={fm.title} url={fm.videoUrl} />}

        {content.trim() && (
          <Prose>
            <MDXRemote components={mdxComponents} source={content} />
          </Prose>
        )}
      </article>
    </main>
  )
}
