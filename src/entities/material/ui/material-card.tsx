import type { Material } from "@entities/material"
import { CATEGORY_LABELS } from "@shared/config"
import { cn } from "@shared/lib"
import { PlayCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Expert } from "@/entities/expert"

interface MaterialCardProps {
  className?: string
  material: Material & { expert: Expert | null }
}

export function MaterialCard({ material, className }: MaterialCardProps) {
  const { frontmatter: fm, expert } = material

  const formattedDate = new Date(fm.date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  })

  return (
    <Link
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-border bg-surface",
        "transition-colors duration-200 hover:border-accent",
        className,
      )}
      href={`/materials/${fm.slug}`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-elevated">
        {fm.image ? (
          <Image
            alt={fm.title}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            src={fm.image}
          />
        ) : (
          <div className="absolute inset-0 flex items-end bg-linear-to-br from-elevated via-subtle to-elevated p-4">
            <span className="font-mono text-faint text-xs uppercase tracking-widest">
              {CATEGORY_LABELS[fm.category]}
            </span>
          </div>
        )}
        {fm.videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-base/20">
            <div className="rounded-full bg-base/60 p-2 backdrop-blur-sm">
              <PlayCircle className="h-8 w-8 text-accent" />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="shrink-0 rounded-full bg-accent-dim px-2 py-0.5 font-medium text-accent text-xs">
            {CATEGORY_LABELS[fm.category]}
          </span>
          <p className="truncate font-mono text-faint text-xs">{formattedDate}</p>
        </div>

        <h3 className="line-clamp-2 font-extrabold text-lg text-primary leading-snug transition-colors group-hover:text-accent">
          {fm.title}
        </h3>

        {/* <p className="line-clamp-2 text-muted text-sm leading-relaxed">{fm.excerpt}</p> */}

        <div className="mt-auto border-border-subtle border-t pt-2">
          <span className="text-faint text-xs">{expert?.frontmatter.name ?? fm.author}</span>
        </div>
      </div>
    </Link>
  )
}
