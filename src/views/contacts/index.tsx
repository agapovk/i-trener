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
    <main className="flex flex-col gap-12 px-4 py-12 max-w-7xl mx-auto w-full">
      <div className="flex flex-col gap-3">
        <h1 className="text-5xl font-extrabold text-primary">Контакты</h1>
        <p className="text-muted max-w-xl leading-relaxed">
          Свяжитесь с нами в социальных сетях или напишите напрямую.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-extrabold text-primary">Социальные сети</h2>
          <div className="flex flex-col gap-3">
            {socialChannels.map(({ label, href, icon: Icon, description }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 bg-surface rounded-xl border border-border hover:border-accent transition-colors"
              >
                <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-elevated flex items-center justify-center group-hover:bg-accent-dim transition-colors">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                  <span className="font-semibold text-primary group-hover:text-accent transition-colors">
                    {label}
                  </span>
                  <span className="text-sm text-muted">{description}</span>
                </div>
                <ExternalLink className="h-4 w-4 text-faint group-hover:text-accent transition-colors flex-shrink-0" />
              </a>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-extrabold text-primary">Сотрудничество</h2>
          <div className="p-6 bg-surface rounded-xl border border-border flex flex-col gap-4">
            <p className="text-muted leading-relaxed">
              По вопросам партнёрства, размещения материалов и сотрудничества пишите нам в Telegram.
            </p>
            <a
              href={SOCIAL_LINKS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity w-fit"
            >
              <Send className="h-4 w-4" />
              Написать в Telegram
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}
