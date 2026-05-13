interface VideoEmbedProps {
  title?: string
  url: string
}

export function VideoEmbed({ url, title = "Video" }: VideoEmbedProps) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-subtle">
      <iframe
        allow="autoplay; encrypted-media"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
        src={url}
        title={title}
      />
    </div>
  )
}
