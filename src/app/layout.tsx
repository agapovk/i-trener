import { ThemeProvider } from "@shared/ui/theme-provider"
import { SiteFooter } from "@widgets/site-footer"
import { SiteHeader } from "@widgets/site-header"
import type { Metadata } from "next"
import { Geist, Geist_Mono, IBM_Plex_Sans } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"
import { cn } from "@/shared/lib/utils"

const geistHeading = Geist({ subsets: ["latin"], variable: "--font-heading" })

const ibmPlexSans = IBM_Plex_Sans({ subsets: ["latin"], variable: "--font-sans" })

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
    <html
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        ibmPlexSans.variable,
        geistHeading.variable,
      )}
      lang="ru"
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-base text-primary">
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          <SiteHeader />
          <div className="flex flex-1 flex-col">{children}</div>
          <SiteFooter />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
