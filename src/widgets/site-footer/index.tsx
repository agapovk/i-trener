import { CATEGORIES, CATEGORY_LABELS, NAV_ITEMS, PARTNERS, SOCIAL_LINKS } from "@shared/config"
import Link from "next/link"
import { VignetteLayer } from "@/shared/ui"

export function SiteFooter() {
  return (
    <footer className="relative mt-auto overflow-hidden border-border-subtle border-t bg-surface">
      <VignetteLayer />
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-8 py-8 md:grid-cols-3 md:gap-10 md:py-12 lg:grid-cols-5">
        <div className="flex flex-col gap-3 md:col-span-3 lg:col-span-2">
          <Link
            className="font-extrabold text-lg text-primary tracking-tight transition-colors hover:text-accent"
            href="/"
          >
            Я:Тренер
          </Link>
          <p className="hidden text-muted text-sm leading-relaxed md:flex">
            Медиаплатформа и база знаний для тренеров по футболу.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <a
              className="text-muted text-sm transition-colors hover:text-accent"
              href={SOCIAL_LINKS.telegram}
              rel="noopener noreferrer"
              target="_blank"
            >
              Telegram
            </a>
            <a
              className="text-muted text-sm transition-colors hover:text-accent"
              href={SOCIAL_LINKS.vk}
              rel="noopener noreferrer"
              target="_blank"
            >
              ВКонтакте
            </a>
            <a
              className="text-muted text-sm transition-colors hover:text-accent"
              href={SOCIAL_LINKS.instagram}
              rel="noopener noreferrer"
              target="_blank"
            >
              Instagram
            </a>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3 md:items-start">
          <span className="font-semibold text-faint text-xs uppercase tracking-widest">
            Разделы
          </span>
          {NAV_ITEMS.map(({ href, label }) => (
            <Link
              className="text-muted text-sm transition-colors hover:text-primary"
              href={href}
              key={href}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-semibold text-faint text-xs uppercase tracking-widest">
            Категории
          </span>
          {CATEGORIES.map((cat) => (
            <Link
              className="text-muted text-sm transition-colors hover:text-primary"
              href={`/categories/${cat}`}
              key={cat}
            >
              {CATEGORY_LABELS[cat]}
            </Link>
          ))}
        </div>

        <div className="flex flex-col items-end gap-3 self-end md:items-start md:self-auto">
          <span className="font-semibold text-faint text-xs uppercase tracking-widest">
            Партнёры
          </span>
          {PARTNERS.map((p) => (
            <span className="text-muted text-sm" key={p.name}>
              {p.name}
            </span>
          ))}
        </div>
      </div>

      <div className="border-border-subtle border-t">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <span className="text-muted text-xs">© {new Date().getFullYear()} Я:Тренер</span>
        </div>
      </div>
    </footer>
  )
}
