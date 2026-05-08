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
    month: "long",
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
      <div className="relative aspect-video bg-subtle">
        {fm.image && (
          <Image
            src={fm.image}
            alt={fm.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover"
          />
        )}
        {fm.videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center">
            <PlayCircle className="h-8 w-8 text-accent opacity-80 group-hover:opacity-100 transition-opacity" />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-accent-dim text-accent shrink-0">
            {CATEGORY_LABELS[fm.category]}
          </span>
          <time dateTime={fm.date} className="text-xs font-mono text-muted truncate">
            {formattedDate}
          </time>
        </div>

        <h3 className="text-xl font-extrabold text-primary leading-tight line-clamp-2 group-hover:text-accent transition-colors">
          {fm.title}
        </h3>

        <p className="text-sm text-muted line-clamp-3">{fm.excerpt}</p>
      </div>
    </Link>
  )
}
