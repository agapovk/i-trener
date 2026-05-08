import type { Material } from "@entities/material"
import { CATEGORY_LABELS } from "@shared/config"
import { cn } from "@shared/lib"
import { PlayCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface MaterialCardProps {
  material: Material
  className?: string
}

export function MaterialCard({ material, className }: MaterialCardProps) {
  const { frontmatter: fm } = material

  const formattedDate = new Date(fm.date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

  return (
    <Link
      href={`/materials/${fm.slug}`}
      className={cn(
        "group flex flex-col bg-surface rounded-xl overflow-hidden border border-border",
        "hover:border-accent transition-colors duration-200",
        className,
      )}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-elevated overflow-hidden">
        {fm.image ? (
          <Image
            src={fm.image}
            alt={fm.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-end p-4 bg-linear-to-br from-elevated via-subtle to-elevated">
            <span className="text-xs font-mono text-faint uppercase tracking-widest">
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
      <div className="flex flex-col gap-3 p-4 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-accent-dim text-accent shrink-0">
            {CATEGORY_LABELS[fm.category]}
          </span>
          <time dateTime={fm.date} className="text-xs font-mono text-faint truncate">
            {formattedDate}
          </time>
        </div>

        <h3 className="text-lg font-extrabold text-primary leading-snug line-clamp-2 group-hover:text-accent transition-colors">
          {fm.title}
        </h3>

        <p className="text-sm text-muted line-clamp-2 leading-relaxed">{fm.excerpt}</p>

        <div className="mt-auto pt-2 border-t border-border-subtle">
          <span className="text-xs text-faint">{fm.author}</span>
        </div>
      </div>
    </Link>
  )
}
