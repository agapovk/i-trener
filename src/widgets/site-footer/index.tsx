import { CATEGORIES, CATEGORY_LABELS, NAV_ITEMS, PARTNERS, SOCIAL_LINKS } from "@shared/config"
import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="mt-auto border-border-subtle border-t bg-surface">
      <div className="mx-auto max-w-7xl gap-10 px-4 py-12 md:grid-cols-4">
        <div className="flex flex-col gap-3">
          <Link
            className="font-extrabold text-lg text-primary tracking-tight transition-colors hover:text-accent"
            href="/"
          >
            Я:Тренер
          </Link>
          <p className="text-muted text-sm leading-relaxed">
            Медиаплатформа и база знаний для тренеров по футболу.
          </p>
          <div className="flex items-center gap-4 pt-1">
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

        <div className="flex flex-col gap-3">
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
          <Link
            className="text-muted text-sm transition-colors hover:text-primary"
            href="/partners"
          >
            Партнёры
          </Link>
          <Link
            className="text-muted text-sm transition-colors hover:text-primary"
            href="/contacts"
          >
            Контакты
          </Link>
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

        <div className="flex flex-col gap-3">
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
          <span className="text-faint text-xs">© {new Date().getFullYear()} Я:Тренер</span>
        </div>
      </div>
    </footer>
  )
}
