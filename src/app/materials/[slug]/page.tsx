import { getAllMaterials, getMaterialBySlug } from "@shared/lib/mdx"
import { MaterialDetailView } from "@views/material-detail"
import type { Metadata } from "next"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllMaterials().map((m) => ({ slug: m.frontmatter.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const material = getMaterialBySlug(slug)
  if (!material) return {}
  const { title, excerpt, image } = material.frontmatter
  return {
    title,
    description: excerpt,
    openGraph: {
      title,
      description: excerpt,
      type: "article",
      ...(image ? { images: [{ url: image }] } : {}),
    },
  }
}

export default async function MaterialPage({ params }: Props) {
  const { slug } = await params
  return <MaterialDetailView slug={slug} />
}
