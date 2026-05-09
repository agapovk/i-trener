import { SiteFooter } from "@widgets/site-footer"
import { SiteHeader } from "@widgets/site-header"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const SITE_URL = "https://i-trener.ru"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Я:Тренер",
    template: "%s | Я:Тренер",
  },
  description: "Медиаплатформа и база знаний для тренеров по футболу",
  openGraph: {
    siteName: "Я:Тренер",
    locale: "ru_RU",
    type: "website",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} lang="ru">
      <body className="flex min-h-full flex-col bg-base text-primary">
        <SiteHeader />
        <div className="flex flex-1 flex-col">{children}</div>
        <SiteFooter />
      </body>
    </html>
  )
}
