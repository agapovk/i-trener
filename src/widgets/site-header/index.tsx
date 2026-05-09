import { CATEGORIES, CATEGORY_LABELS, NAV_ITEMS } from "@shared/config"
import Link from "next/link"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-base/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-8">
        <Link
          href="/"
          className="text-lg font-extrabold text-primary hover:text-accent transition-colors tracking-tight shrink-0"
        >
          Я:Тренер
        </Link>

        <nav className="flex items-center gap-6">
          {NAV_ITEMS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-muted hover:text-primary transition-colors"
            >
              {label}
            </Link>
          ))}

          <div className="relative group">
            <button
              type="button"
              className="text-sm text-muted hover:text-primary transition-colors flex items-center gap-1"
            >
              Категории
              <svg
                className="h-3 w-3 opacity-60"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <title>Открыть категории</title>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute right-0 top-full pt-2 hidden group-hover:block z-50">
              <div className="bg-elevated border border-border rounded-xl shadow-lg py-1 min-w-52">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat}
                    href={`/categories/${cat}`}
                    className="block px-4 py-2 text-sm text-muted hover:text-primary hover:bg-subtle transition-colors"
                  >
                    {CATEGORY_LABELS[cat]}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
