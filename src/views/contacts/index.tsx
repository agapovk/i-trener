import { SOCIAL_LINKS } from "@shared/config"
import { ExternalLink, MessageCircle, Send, Users } from "lucide-react"

const socialChannels = [
  {
    label: "Telegram",
    href: SOCIAL_LINKS.telegram,
    icon: Send,
    description: "Новости и анонсы материалов",
  },
  {
    label: "ВКонтакте",
    href: SOCIAL_LINKS.vk,
    icon: Users,
    description: "Сообщество тренеров",
  },
  {
    label: "Instagram",
    href: SOCIAL_LINKS.instagram,
    icon: MessageCircle,
    description: "Фото и короткие материалы",
  },
] as const

export function ContactsView() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-12">
      <div className="flex flex-col gap-3">
        <h1 className="font-extrabold text-5xl text-primary">Контакты</h1>
        <p className="max-w-xl text-muted leading-relaxed">
          Свяжитесь с нами в социальных сетях или напишите напрямую.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <section className="flex flex-col gap-4">
          <h2 className="font-extrabold text-2xl text-primary">Социальные сети</h2>
          <div className="flex flex-col gap-3">
            {socialChannels.map(({ label, href, icon: Icon, description }) => (
              <a
                className="group flex items-center gap-4 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-accent"
                href={href}
                key={label}
                rel="noopener noreferrer"
                target="_blank"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-elevated transition-colors group-hover:bg-accent-dim">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="font-semibold text-primary transition-colors group-hover:text-accent">
                    {label}
                  </span>
                  <span className="text-muted text-sm">{description}</span>
                </div>
                <ExternalLink className="h-4 w-4 shrink-0 text-faint transition-colors group-hover:text-accent" />
              </a>
            ))}
          </div>
        </section>

        {/* <section className="flex flex-col gap-4">
          <h2 className="font-extrabold text-2xl text-primary">Сотрудничество</h2>
          <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-6">
            <p className="text-muted leading-relaxed">
              По вопросам партнёрства, размещения материалов и сотрудничества пишите нам в Telegram.
            </p>
            <a
              className="inline-flex w-fit items-center gap-2 rounded-lg bg-accent px-5 py-2.5 font-semibold text-sm text-white transition-opacity hover:opacity-90"
              href={SOCIAL_LINKS.telegram}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Send className="h-4 w-4" />
              Написать в Telegram
            </a>
          </div>
        </section> */}
      </div>
    </main>
  )
}
