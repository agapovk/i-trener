import { CATEGORIES, CATEGORY_LABELS, NAV_ITEMS, SOCIAL_LINKS } from "@shared/config"
import Link from "next/link"
import { NoiseLayer, VignetteLayer } from "@/shared/ui"

export function SiteFooter() {
  return (
    <footer className="relative mt-auto grid overflow-hidden border-border-subtle border-t bg-surface">
      <VignetteLayer />
      <NoiseLayer />

      <div className="border-border-subtle border-b">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-4">
          <div className="flex justify-between gap-3">
            <Link
              className="font-extrabold text-faint text-lg tracking-tight transition-colors hover:text-primary"
              href="/"
            >
              Я:Тренер
            </Link>
            <div className="flex items-center gap-5">
              {SOCIAL_LINKS.map((social) => (
                <a
                  className="text-muted text-xs transition-colors hover:text-accent sm:text-sm"
                  href={social.href}
                  key={social.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full bg-background/10 px-4 py-8">
        <div className="flex justify-between gap-8">
          <div className="flex min-w-[45%] flex-col gap-2 text-right">
            <span className="pb-3 font-semibold text-xs uppercase tracking-widest">Категории</span>
            {CATEGORIES.map((cat) => (
              <Link
                className="text-muted text-xs transition-colors hover:text-primary sm:text-sm"
                href={`/categories/${cat}`}
                key={cat}
              >
                {CATEGORY_LABELS[cat]}
              </Link>
            ))}
          </div>

          <div className="flex min-w-[45%] flex-col gap-2">
            <span className="pb-3 font-semibold text-xs uppercase tracking-widest">Разделы</span>
            {NAV_ITEMS.map(({ href, label }) => (
              <Link
                className="text-muted text-xs transition-colors hover:text-primary sm:text-sm"
                href={href}
                key={href}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-border-subtle border-t">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <span className="text-muted text-xs">2022-{new Date().getFullYear()} © Я:Тренер</span>
        </div>
      </div>
    </footer>
  )
}
