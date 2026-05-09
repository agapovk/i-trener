import { getAllInterviews, getInterviewBySlug } from "@shared/lib/mdx"
import { InterviewDetailView } from "@views/interview-detail"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllInterviews().map((i) => ({ slug: i.frontmatter.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const interview = getInterviewBySlug(slug)
  if (!interview) {
    return {}
  }
  const { title, excerpt, image } = interview.frontmatter
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

export default async function InterviewPage({ params }: Props) {
  const { slug } = await params
  return <InterviewDetailView slug={slug} />
}
