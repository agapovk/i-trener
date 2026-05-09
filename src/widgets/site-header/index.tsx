import { NAV_ITEMS } from "@shared/config"
import Link from "next/link"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-border-subtle border-b bg-base/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-8 px-4">
        <Link
          className="shrink-0 font-extrabold text-lg text-primary tracking-tight transition-colors hover:text-accent"
          href="/"
        >
          Я:Тренер
        </Link>

        <nav className="flex items-center gap-6">
          {NAV_ITEMS.map(({ href, label }) => (
            <Link
              className="text-muted text-sm transition-colors hover:text-primary"
              href={href}
              key={href}
            >
              {label}
            </Link>
          ))}

          {/* <div className="relative group">
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
          </div> */}
        </nav>
      </div>
    </header>
  )
}
