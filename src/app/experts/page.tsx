import { ExpertsListView } from "@views/experts-list"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Эксперты",
  description: "Каталог экспертов платформы Я:Тренер",
}

export default function ExpertsPage() {
  return <ExpertsListView />
}
