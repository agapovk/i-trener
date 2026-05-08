import { MaterialsListView } from "@views/materials-list"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Материалы",
  description: "Образовательные статьи для тренеров по футболу",
}

export default function MaterialsPage() {
  return <MaterialsListView />
}
