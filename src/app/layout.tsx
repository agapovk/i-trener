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
      </body>
    </html>
  )
}
