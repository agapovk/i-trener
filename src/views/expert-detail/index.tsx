import { CATEGORY_LABELS } from "@shared/config"
import { getExpertBySlug } from "@shared/lib/mdx"
import { Prose } from "@shared/ui"
import { ExternalLink, Send, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"

interface ExpertDetailViewProps {
  slug: string
}

export async function ExpertDetailView({ slug }: ExpertDetailViewProps) {
  const expert = getExpertBySlug(slug)
  if (!expert) notFound()

  const { frontmatter: fm, content } = expert

  return (
    <main className="px-4 py-12 max-w-3xl mx-auto w-full flex flex-col gap-8">
      <Link href="/experts" className="text-sm text-accent hover:underline">
        ← Все эксперты
      </Link>

      <article className="flex flex-col gap-8">
        <header className="flex items-start gap-6">
          <div className="relative h-24 w-24 rounded-full bg-subtle overflow-hidden shrink-0">
            {fm.image ? (
              <Image src={fm.image} alt={fm.name} fill sizes="96px" className="object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <User className="h-8 w-8 text-muted" />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold text-primary leading-tight">{fm.name}</h1>
            <p className="text-muted">{fm.role}</p>
            <div className="flex flex-wrap gap-1.5">
              {fm.specializations.map((spec) => (
                <span
                  key={spec}
                  className="text-xs px-2.5 py-0.5 rounded-full bg-accent-dim text-accent"
                >
                  {CATEGORY_LABELS[spec]}
                </span>
              ))}
            </div>
          </div>
        </header>

        {fm.bio && <p className="text-secondary leading-relaxed">{fm.bio}</p>}

        {fm.social && (
          <div className="flex gap-4">
            {fm.social.telegram && (
              <a
                href={fm.social.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors"
              >
                <Send className="h-4 w-4" />
                Telegram
              </a>
            )}
            {fm.social.instagram && (
              <a
                href={fm.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                Instagram
              </a>
            )}
            {fm.social.vk && (
              <a
                href={fm.social.vk}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                VK
              </a>
            )}
          </div>
        )}

        {content.trim() && (
          <Prose>
            <MDXRemote source={content} />
          </Prose>
        )}
      </article>
    </main>
  )
}
