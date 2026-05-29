import { CATEGORY_LABELS } from "@shared/config"
import { getExpertBySlug } from "@shared/lib/mdx"
import { mdxComponents, Prose } from "@shared/ui"
import { ExternalLink, Send, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"

interface ExpertDetailViewProps {
  slug: string
}

export function ExpertDetailView({ slug }: ExpertDetailViewProps) {
  const expert = getExpertBySlug(slug)
  if (!expert) {
    notFound()
  }

  const { frontmatter: fm, content } = expert

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-10">
      <Link className="text-muted text-sm transition-colors hover:text-accent" href="/experts">
        ← Эксперты
      </Link>

      <article className="flex flex-col gap-8">
        <header className="flex items-start gap-6 border-border-subtle border-b pb-8">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border border-border bg-elevated">
            {fm.image ? (
              <Image alt={fm.name} className="object-cover" fill sizes="96px" src={fm.image} />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <User className="h-8 w-8 text-muted" />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="font-extrabold text-4xl text-primary leading-tight">{fm.name}</h1>
            <p className="text-muted">{fm.role}</p>
            <div className="flex flex-wrap gap-1.5">{CATEGORY_LABELS[fm.specialization]}</div>
          </div>
        </header>

        {fm.bio && <p className="text-secondary leading-relaxed">{fm.bio}</p>}

        {fm.social && (
          <div className="flex gap-4">
            {fm.social.telegram && (
              <a
                className="flex items-center gap-1.5 text-muted text-sm transition-colors hover:text-accent"
                href={fm.social.telegram}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Send className="h-4 w-4" />
                Telegram
              </a>
            )}
            {fm.social.instagram && (
              <a
                className="flex items-center gap-1.5 text-muted text-sm transition-colors hover:text-accent"
                href={fm.social.instagram}
                rel="noopener noreferrer"
                target="_blank"
              >
                <ExternalLink className="h-4 w-4" />
                Instagram
              </a>
            )}
            {fm.social.vk && (
              <a
                className="flex items-center gap-1.5 text-muted text-sm transition-colors hover:text-accent"
                href={fm.social.vk}
                rel="noopener noreferrer"
                target="_blank"
              >
                <ExternalLink className="h-4 w-4" />
                VK
              </a>
            )}
          </div>
        )}

        {content.trim() && (
          <Prose>
            <MDXRemote components={mdxComponents} source={content} />
          </Prose>
        )}
      </article>
    </main>
  )
}
