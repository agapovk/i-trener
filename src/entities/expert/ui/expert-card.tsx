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
      <div className="relative h-16 w-16 rounded-full bg-subtle overflow-hidden shrink-0">
        {fm.image ? (
          <Image src={fm.image} alt={fm.name} fill sizes="64px" className="object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <User className="h-6 w-6 text-muted" />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5 min-w-0">
        <div>
          <h3 className="text-base font-extrabold text-primary leading-tight group-hover:text-accent transition-colors truncate">
            {fm.name}
          </h3>
          <p className="text-sm text-muted truncate">{fm.role}</p>
        </div>

        <div className="flex flex-wrap gap-1">
          {fm.specializations.map((spec) => (
            <span key={spec} className="text-xs px-2 py-0.5 rounded-full bg-accent-dim text-accent">
              {CATEGORY_LABELS[spec]}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
