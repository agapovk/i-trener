import { NAV_ITEMS } from "@shared/config"
import Link from "next/link"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-border border-b bg-base/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-8 px-4">
        <Link
          className="flex shrink-0 items-center gap-2 font-extrabold text-primary text-xl tracking-tight transition-colors hover:text-accent"
          href="/"
        >
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            fill="currentColor"
            height="1em"
            viewBox="0 0 214 150"
            width="1.43em"
          >
            <path d="M209 0C211.761 2.57702e-07 214 2.23858 214 5V35C214 37.7614 211.761 40 209 40H169C155.5 40 150 47.7 150 78.5L149.923 78.3809C148.155 118.233 115.288 150 75 150C33.5786 150 0 116.421 0 75C0 33.5786 33.5786 0 75 0C75.2718 0 75.5433 0.00199789 75.8145 0.00488281C75.876 0.00263533 75.9379 0 76 0H209ZM75 45C58.4315 45 45 58.4315 45 75C45 91.5685 58.4315 105 75 105C91.5685 105 105 91.5685 105 75C105 58.4315 91.5685 45 75 45Z" />
          </svg>
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
        </nav>
      </div>
    </header>
  )
}
