import { CATEGORIES, CATEGORY_LABELS, NAV_ITEMS, PARTNERS, SOCIAL_LINKS } from "@shared/config"
import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-border-subtle bg-surface mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="flex flex-col gap-3">
          <Link
            href="/"
            className="text-lg font-extrabold text-primary hover:text-accent transition-colors tracking-tight"
          >
            Я:Тренер
          </Link>
          <p className="text-sm text-muted leading-relaxed">
            Медиаплатформа и база знаний для тренеров по футболу.
          </p>
          <div className="flex items-center gap-4 pt-1">
            <a
              href={SOCIAL_LINKS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-accent transition-colors"
            >
              Telegram
            </a>
            <a
              href={SOCIAL_LINKS.vk}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-accent transition-colors"
            >
              ВКонтакте
            </a>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-accent transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold text-faint uppercase tracking-widest">
            Разделы
          </span>
          {NAV_ITEMS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-muted hover:text-primary transition-colors"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/partners"
            className="text-sm text-muted hover:text-primary transition-colors"
          >
            Партнёры
          </Link>
          <Link
            href="/contacts"
            className="text-sm text-muted hover:text-primary transition-colors"
          >
            Контакты
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold text-faint uppercase tracking-widest">
            Категории
          </span>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/categories/${cat}`}
              className="text-sm text-muted hover:text-primary transition-colors"
            >
              {CATEGORY_LABELS[cat]}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold text-faint uppercase tracking-widest">
            Партнёры
          </span>
          {PARTNERS.map((p) => (
            <span key={p.name} className="text-sm text-muted">
              {p.name}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <span className="text-xs text-faint">© {new Date().getFullYear()} Я:Тренер</span>
        </div>
      </div>
    </footer>
  )
}
