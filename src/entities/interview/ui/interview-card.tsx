import type { Interview } from "@entities/interview"
import { cn } from "@shared/lib"
import { PlayCircle, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface InterviewCardProps {
  interview: Interview
  className?: string
}

export function InterviewCard({ interview, className }: InterviewCardProps) {
  const { frontmatter: fm } = interview

  const formattedDate = new Date(fm.date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <Link
      href={`/interviews/${fm.slug}`}
      className={cn(
        "group flex flex-col bg-surface rounded-xl overflow-hidden border border-border",
        "hover:border-accent transition-colors duration-200",
        className,
      )}
    >
      <div className="relative aspect-video bg-subtle">
        {fm.image ? (
          <Image
            src={fm.image}
            alt={fm.guest}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <User className="h-10 w-10 text-faint" />
          </div>
        )}
        {fm.videoUrl && (
          <div className="absolute inset-0 flex items-center justify-center">
            <PlayCircle className="h-8 w-8 text-accent opacity-80 group-hover:opacity-100 transition-opacity" />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-primary truncate">{fm.guest}</span>
            {fm.guestRole && <span className="text-xs text-muted truncate">{fm.guestRole}</span>}
          </div>
          <time dateTime={fm.date} className="text-xs font-mono text-muted shrink-0">
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
