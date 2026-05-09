import { PartnersView } from "@views/partners"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Партнёры",
  description: "Организации, поддерживающие платформу Я:Тренер",
}

export default function PartnersPage() {
  return <PartnersView />
}
