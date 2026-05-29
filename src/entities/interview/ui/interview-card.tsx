import type { Interview } from "@entities/interview"
import { cn } from "@shared/lib"
import { PlayCircle, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface InterviewCardProps {
  className?: string
  interview: Interview
}

export function InterviewCard({ interview, className }: InterviewCardProps) {
  const { frontmatter: fm } = interview

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
      href={`/interviews/${fm.slug}`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-elevated">
        {fm.image ? (
          <Image
            alt={fm.guest}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            src={fm.image}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-elevated via-subtle to-elevated">
            <User className="h-10 w-10 text-faint" />
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
          <div className="flex min-w-0 flex-col">
            <span className="truncate font-semibold text-primary text-sm">{fm.guest}</span>
            {fm.guestRole && <span className="truncate text-muted text-xs">{fm.guestRole}</span>}
          </div>
          <p className="truncate font-mono text-faint text-xs">{formattedDate}</p>
        </div>

        {/* <h3 className="line-clamp-2 font-extrabold text-lg text-primary leading-snug transition-colors group-hover:text-accent">
          {fm.title}
        </h3> */}

        {/* <p className="line-clamp-2 text-muted text-sm leading-relaxed">{fm.excerpt}</p> */}
      </div>
    </Link>
  )
}
