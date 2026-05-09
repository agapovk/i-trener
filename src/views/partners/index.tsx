import { PARTNERS } from "@shared/config"

export function PartnersView() {
  return (
    <main className="flex flex-col gap-12 px-4 py-12 max-w-7xl mx-auto w-full">
      <div className="flex flex-col gap-3">
        <h1 className="text-5xl font-extrabold text-primary">Партнёры</h1>
        <p className="text-muted max-w-xl leading-relaxed">
          Организации, которые поддерживают развитие тренерского сообщества и платформу Я:Тренер.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {PARTNERS.map((partner) => (
          <div
            key={partner.name}
            className="flex flex-col gap-3 p-6 bg-surface rounded-xl border border-border"
          >
            <div className="h-12 w-12 rounded-lg bg-elevated flex items-center justify-center">
              <span className="text-xl font-extrabold text-accent">{partner.name.charAt(0)}</span>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-extrabold text-primary">{partner.name}</h2>
              <p className="text-sm text-muted">{partner.description}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
