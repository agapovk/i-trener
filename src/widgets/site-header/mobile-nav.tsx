"use client"

import { NAV_ITEMS } from "@shared/config"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { NoiseLayer } from "@/shared/ui"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) {
      return
    }
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
      }
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <>
      <button
        aria-label="Открыть меню"
        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:text-primary md:hidden"
        onClick={() => setOpen(true)}
        type="button"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <div className="fade-in slide-in-from-top-2 fixed inset-0 z-60 flex min-h-dvh animate-in flex-col bg-base duration-200 md:hidden">
          <div className="flex h-14 shrink-0 items-center justify-end px-4">
            <button
              aria-label="Закрыть меню"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted transition-colors hover:text-primary"
              onClick={() => setOpen(false)}
              type="button"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="relative flex flex-1 flex-col items-center gap-4 bg-base px-6 pt-10 pb-20">
            {NAV_ITEMS.map(({ href, label }, i) => (
              <Link
                className="fade-in slide-in-from-bottom-6 w-full max-w-sm animate-in rounded-xl px-6 py-4 text-center font-extrabold text-3xl text-primary transition-colors hover:text-accent"
                href={href}
                key={href}
                onClick={() => setOpen(false)}
                style={{
                  animationDelay: `${100 + i * 60}ms`,
                  animationDuration: "400ms",
                  animationFillMode: "both",
                }}
              >
                {label}
              </Link>
            ))}
            <NoiseLayer />
          </nav>
        </div>
      )}
    </>
  )
}
