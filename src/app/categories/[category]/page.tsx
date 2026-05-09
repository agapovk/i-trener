import { CATEGORIES, CATEGORY_LABELS, type Category } from "@shared/config"
import { CategoryView } from "@views/category"
import type { Metadata } from "next"

type Props = {
  params: Promise<{ category: string }>
}

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const label = CATEGORY_LABELS[category as Category] ?? category
  return {
    title: label,
    description: `Материалы по теме: ${label}`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  return <CategoryView category={category} />
}
