import { CATEGORIES, CATEGORY_LABELS, PARTNERS, SOCIAL_LINKS } from "@shared/config"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Link from "next/link"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Я:Тренер",
    template: "%s | Я:Тренер",
  },
  description: "Медиаплатформа и база знаний для тренеров по футболу",
}

const NAV_LINKS = [
  { href: "/materials", label: "Материалы" },
  { href: "/interviews", label: "Интервью" },
  { href: "/experts", label: "Эксперты" },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-base text-primary">
        <header className="sticky top-0 z-50 border-b border-border-subtle bg-base/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link
              href="/"
              className="text-lg font-extrabold text-primary hover:text-accent transition-colors tracking-tight"
            >
              Я:Тренер
            </Link>
            <nav className="flex items-center gap-6">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-muted hover:text-primary transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <div className="flex flex-col flex-1">{children}</div>

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
              {NAV_LINKS.map(({ href, label }) => (
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
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
              <span className="text-xs text-faint">© {new Date().getFullYear()} Я:Тренер</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
