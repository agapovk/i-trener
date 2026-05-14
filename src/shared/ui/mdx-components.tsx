import Image from "next/image"

function MdxImage({ src, alt }: React.ImgHTMLAttributes<HTMLImageElement>) {
  if (!src) {
    return null
  }
  return (
    <span className="my-6 block overflow-hidden rounded-lg">
      <Image
        alt={alt || ""}
        height={0}
        sizes="(max-width: 768px) 100vw, 768px"
        src={src as string}
        style={{ height: "auto", width: "100%" }}
        width={0}
      />
    </span>
  )
}

export const mdxComponents = {
  img: MdxImage,
}
