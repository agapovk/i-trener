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
  return {
    title: material.frontmatter.title,
    description: material.frontmatter.excerpt,
  }
}

export default async function MaterialPage({ params }: Props) {
  const { slug } = await params
  return <MaterialDetailView slug={slug} />
}
