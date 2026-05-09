import { ContactsView } from "@views/contacts"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Контакты",
  description: "Свяжитесь с командой Я:Тренер в социальных сетях",
}

export default function ContactsPage() {
  return <ContactsView />
}
