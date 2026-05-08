import { getAllExperts, getExpertBySlug } from "@shared/lib/mdx"
import { ExpertDetailView } from "@views/expert-detail"
import type { Metadata } from "next"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllExperts().map((e) => ({ slug: e.frontmatter.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const expert = getExpertBySlug(slug)
  if (!expert) return {}
  return {
    title: expert.frontmatter.name,
    description: expert.frontmatter.bio,
  }
}

export default async function ExpertPage({ params }: Props) {
  const { slug } = await params
  return <ExpertDetailView slug={slug} />
}
