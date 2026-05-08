import { getInterviewBySlug } from "@shared/lib/mdx"
import { Prose, VideoEmbed } from "@shared/ui"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"

interface InterviewDetailViewProps {
  slug: string
}

export async function InterviewDetailView({ slug }: InterviewDetailViewProps) {
  const interview = getInterviewBySlug(slug)
  if (!interview) notFound()

  const { frontmatter: fm, content } = interview

  const formattedDate = new Date(fm.date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <main className="px-4 py-10 max-w-3xl mx-auto w-full flex flex-col gap-10">
      <Link href="/interviews" className="text-sm text-muted hover:text-accent transition-colors">
        ← Интервью
      </Link>

      <article className="flex flex-col gap-8">
        <header className="flex flex-col gap-4 pb-8 border-b border-border-subtle">
          <time dateTime={fm.date} className="text-xs font-mono text-muted">
            {formattedDate}
          </time>
          <h1 className="text-4xl font-extrabold text-primary leading-tight">{fm.title}</h1>
          <div className="flex flex-col gap-0.5">
            <p className="font-semibold text-primary">{fm.guest}</p>
            {fm.guestRole && <p className="text-sm text-muted">{fm.guestRole}</p>}
          </div>
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
