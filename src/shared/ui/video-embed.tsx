interface VideoEmbedProps {
  url: string
  title?: string
}

export function VideoEmbed({ url, title = "Video" }: VideoEmbedProps) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-subtle">
      <iframe
        src={url}
        title={title}
        className="absolute inset-0 h-full w-full"
        allowFullScreen
        allow="autoplay; encrypted-media"
      />
    </div>
  )
}
