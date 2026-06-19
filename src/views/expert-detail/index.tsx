import { CATEGORY_LABELS } from "@shared/config"
import { getExpertBySlug } from "@shared/lib/mdx"
import { mdxComponents, NoiseLayer, Prose } from "@shared/ui"
import { ExternalLink, Send, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import { MaterialCard } from "@/entities/material"
import { getMaterialsByAuthor } from "@/shared/lib/mdx"

interface ExpertDetailViewProps {
  slug: string
}

export function ExpertDetailView({ slug }: ExpertDetailViewProps) {
  const expert = getExpertBySlug(slug)
  if (!expert) {
    notFound()
  }

  const { frontmatter: fm, content } = expert
  const materials = getMaterialsByAuthor(slug)

  return (
    <main className="flex flex-col gap-8">
      <div className="relative overflow-hidden border-border-subtle border-b md:pb-8">
        <NoiseLayer />
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8">
          <Link className="text-muted text-sm transition-colors hover:text-accent" href="/experts">
            ← Эксперты
          </Link>
          <div className="flex flex-col items-center gap-6 md:flex-row md:gap-8">
            <div className="relative h-64 w-64 shrink-0 overflow-hidden rounded-full border border-border bg-elevated">
              {fm.image ? (
                <Image
                  alt={fm.name}
                  className="objject-top object-cover"
                  fill
                  loading="eager"
                  sizes="256px"
                  src={fm.image}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <User className="h-8 w-8 text-muted" />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2 text-center md:text-start">
              <h1 className="font-extrabold text-2xl text-primary leading-tight md:text-4xl">
                {fm.name}
              </h1>
              <p className="text-muted">{fm.role}</p>
              <p>{CATEGORY_LABELS[fm.specialization]}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-10">
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

        {materials.length !== 0 && (
          <div className="grid gap-5 border-border-subtle border-t pt-8">
            <h2 className="font-extrabold text-2xl text-primary">Материалы</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {materials.map((m) => (
                <MaterialCard key={m.frontmatter.slug} material={m} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
