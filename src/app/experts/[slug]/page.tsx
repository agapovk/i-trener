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
  const { name, bio, image } = expert.frontmatter
  return {
    title: name,
    description: bio,
    openGraph: {
      title: name,
      description: bio,
      type: "profile",
      ...(image ? { images: [{ url: image }] } : {}),
    },
  }
}

export default async function ExpertPage({ params }: Props) {
  const { slug } = await params
  return <ExpertDetailView slug={slug} />
}
