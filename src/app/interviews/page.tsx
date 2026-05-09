import { InterviewsListView } from "@views/interviews-list"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Интервью",
  description: "Интервью с тренерами и специалистами по футболу",
}

export default function InterviewsPage() {
  return <InterviewsListView />
}
