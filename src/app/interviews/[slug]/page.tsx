import { getAllInterviews, getInterviewBySlug } from "@shared/lib/mdx"
import { InterviewDetailView } from "@views/interview-detail"
import type { Metadata } from "next"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllInterviews().map((i) => ({ slug: i.frontmatter.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const interview = getInterviewBySlug(slug)
  if (!interview) return {}
  return {
    title: interview.frontmatter.title,
    description: interview.frontmatter.excerpt,
  }
}

export default async function InterviewPage({ params }: Props) {
  const { slug } = await params
  return <InterviewDetailView slug={slug} />
}
