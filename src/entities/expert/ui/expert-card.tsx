import type { Expert } from "@entities/expert"
import { CATEGORY_LABELS } from "@shared/config"
import { cn } from "@shared/lib"
import { User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ExpertCardProps {
  className?: string
  expert: Expert
}

export function ExpertCard({ expert, className }: ExpertCardProps) {
  const { frontmatter: fm } = expert

  return (
    <Link
      className={cn(
        "group flex items-center gap-4 rounded-xl border border-border bg-surface p-4",
        "transition-colors duration-200 hover:border-accent",
        className,
      )}
      href={`/experts/${fm.slug}`}
    >
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-border bg-elevated">
        {fm.image ? (
          <Image alt={fm.name} className="object-cover" fill sizes="56px" src={fm.image} />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <User className="h-5 w-5 text-muted" />
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div>
          <h3 className="truncate font-extrabold text-primary text-sm leading-tight transition-colors group-hover:text-accent">
            {fm.name}
          </h3>
          <p className="truncate text-muted text-xs">{fm.role}</p>
        </div>
        <div className="flex flex-wrap gap-1">
          {fm.specializations.slice(0, 2).map((spec) => (
            <span
              className="rounded-full bg-accent-dim px-1.5 py-0.5 text-accent text-xs"
              key={spec}
            >
              {CATEGORY_LABELS[spec]}
            </span>
          ))}
          {fm.specializations.length > 2 && (
            <span className="rounded-full bg-subtle px-1.5 py-0.5 text-faint text-xs">
              +{fm.specializations.length - 2}
            </span>
          )}
        </div>
      </div>

      <span className="shrink-0 text-muted text-sm transition-colors group-hover:text-accent">
        →
      </span>
    </Link>
  )
}
