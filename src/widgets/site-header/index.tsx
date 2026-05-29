import { NAV_ITEMS } from "@shared/config"
import { ThemeToggle } from "@shared/ui/theme-toggle"
import Link from "next/link"
import { MobileNav } from "./mobile-nav"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-border border-b bg-base/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4">
        <Link
          className="flex shrink-0 items-center gap-2 font-extrabold text-primary text-xl tracking-tight transition-colors hover:text-accent"
          href="/"
        >
          Я:Тренер
        </Link>

        <nav className="hidden w-full flex-1 items-center justify-end gap-6 md:flex">
          {NAV_ITEMS.map(({ href, label }) => (
            <Link
              className="text-muted text-sm transition-colors hover:text-primary"
              href={href}
              key={href}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
