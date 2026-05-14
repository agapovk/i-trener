import { getInterviewBySlug } from "@shared/lib/mdx"
import { mdxComponents, Prose, VideoEmbed } from "@shared/ui"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"

interface InterviewDetailViewProps {
  slug: string
}

export function InterviewDetailView({ slug }: InterviewDetailViewProps) {
  const interview = getInterviewBySlug(slug)
  if (!interview) {
    notFound()
  }

  const { frontmatter: fm, content } = interview

  const formattedDate = new Date(fm.date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-10">
      <Link className="text-muted text-sm transition-colors hover:text-accent" href="/interviews">
        ← Интервью
      </Link>

      <article className="flex flex-col gap-8">
        <header className="flex flex-col gap-4 border-border-subtle border-b pb-8">
          <time className="font-mono text-muted text-xs" dateTime={fm.date}>
            {formattedDate}
          </time>
          <h1 className="font-extrabold text-4xl text-primary leading-tight">{fm.title}</h1>
          <div className="flex flex-col gap-0.5">
            <p className="font-semibold text-primary">{fm.guest}</p>
            {fm.guestRole && <p className="text-muted text-sm">{fm.guestRole}</p>}
          </div>
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
