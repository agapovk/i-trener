import type { Expert } from "@entities/expert"
import { CATEGORY_LABELS } from "@shared/config"
import { cn } from "@shared/lib"
import { User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ExpertCardProps {
  expert: Expert
  className?: string
}

export function ExpertCard({ expert, className }: ExpertCardProps) {
  const { frontmatter: fm } = expert

  return (
    <Link
      href={`/experts/${fm.slug}`}
      className={cn(
        "group flex items-center gap-4 p-4 bg-surface rounded-xl border border-border",
        "hover:border-accent transition-colors duration-200",
        className,
      )}
    >
      <div className="relative h-14 w-14 rounded-full bg-elevated overflow-hidden shrink-0 border border-border">
        {fm.image ? (
          <Image src={fm.image} alt={fm.name} fill sizes="56px" className="object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <User className="h-5 w-5 text-muted" />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5 min-w-0 flex-1">
        <div>
          <h3 className="text-sm font-extrabold text-primary leading-tight group-hover:text-accent transition-colors truncate">
            {fm.name}
          </h3>
          <p className="text-xs text-muted truncate">{fm.role}</p>
        </div>
        <div className="flex flex-wrap gap-1">
          {fm.specializations.slice(0, 2).map((spec) => (
            <span
              key={spec}
              className="text-xs px-1.5 py-0.5 rounded-full bg-accent-dim text-accent"
            >
              {CATEGORY_LABELS[spec]}
            </span>
          ))}
          {fm.specializations.length > 2 && (
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-subtle text-faint">
              +{fm.specializations.length - 2}
            </span>
          )}
        </div>
      </div>

      <span className="text-muted text-sm shrink-0 group-hover:text-accent transition-colors">
        →
      </span>
    </Link>
  )
}
