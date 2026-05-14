"use client"

import { useState } from "react"

interface VideoEmbedProps {
  title?: string
  url: string
}

function toEmbedUrl(url: string): string {
  try {
    const u = new URL(url)
    // Already an embed URL
    if (u.pathname.startsWith("/embed/")) {
      return url
    }
    // youtu.be/VIDEO_ID
    if (u.hostname === "youtu.be") {
      return `https://www.youtube.com/embed${u.pathname}`
    }
    // youtube.com/watch?v=VIDEO_ID
    const videoId = u.searchParams.get("v")
    if ((u.hostname === "www.youtube.com" || u.hostname === "youtube.com") && videoId) {
      return `https://www.youtube.com/embed/${videoId}`
    }
  } catch {
    // not a valid URL, return as-is
  }
  return url
}

export function VideoEmbed({ url, title = "Video" }: VideoEmbedProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-subtle">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-accent" />
        </div>
      )}
      {/* biome-ignore lint: onLoad is a resource event, not a user interaction */}
      <iframe
        allow="autoplay; encrypted-media"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
        onLoad={() => setLoaded(true)}
        src={toEmbedUrl(url)}
        title={title}
      />
    </div>
  )
}
