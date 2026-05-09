import { PARTNERS } from "@shared/config"

export function PartnersView() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-12">
      <div className="flex flex-col gap-3">
        <h1 className="font-extrabold text-5xl text-primary">Партнёры</h1>
        <p className="max-w-xl text-muted leading-relaxed">
          Организации, которые поддерживают развитие тренерского сообщества и платформу Я:Тренер.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {PARTNERS.map((partner) => (
          <div
            className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-6"
            key={partner.name}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-elevated">
              <span className="font-extrabold text-accent text-xl">{partner.name.charAt(0)}</span>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="font-extrabold text-lg text-primary">{partner.name}</h2>
              <p className="text-muted text-sm">{partner.description}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
