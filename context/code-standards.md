# Code Standards

## Общее

- Модули — маленькие и единственной ответственности.
- Исправляй корневую причину, не добавляй workaround'ы.
- Не смешивай несвязанные задачи в одном компоненте или слайсе.
- Соблюдай границы слоёв из `architecture-context.md`.

---

## Команды

Запускать после каждого изменения:

```bash
pnpm check       # Biome lint + format check
pnpm typecheck   # TypeScript type check (tsc --noEmit)
pnpm test        # Vitest run (CI mode)
```

Для автоисправления:

```bash
pnpm fix         # Biome lint + format auto-fix
```

Другие:

```bash
pnpm dev           # Next.js dev server
pnpm build         # Production build
pnpm test:watch    # Vitest watch mode
```

Никогда не коммитить с ошибками `check`, `typecheck`, `build`.

---

## TypeScript

- Strict mode обязателен везде.
- Избегай `any`; используй явные интерфейсы или узкие типы.
- `interface` — для объектных контрактов; `type` — для union и алиасов.
- Типы frontmatter выводи из схемы в `src/shared/lib/mdx/types.ts` — не дублируй.
- Валидируй frontmatter при чтении MDX (gray-matter возвращает `unknown`).

---

## Next.js

- По умолчанию — React Server Components (RSC). `"use client"` только где нужен browser state или event handlers.
- `app/` route files содержат только один импорт из `src/views/` — никакой логики, никакого JSX кроме рендера view.
- `generateStaticParams` + `generateMetadata` для каждого динамического маршрута.
- `app/api/` не используется в MVP — сайт полностью статический.

---

## Feature-Sliced Design

Правила слоёв и направление импортов — в `architecture-context.md`. В коде:

- Импортируй слайсы только через их `index.ts` — никогда не лезь во внутренние файлы.
- `entities/` содержит доменные типы и пассивный UI; никакой пользовательской логики взаимодействия.
- `features/` содержит пользовательские взаимодействия; никакого layout или page-level.
- `shared/lib/mdx/` — единственный модуль, читающий файловую систему напрямую.

---

## Стилизация

Имена токенов определены в `ui-context.md`. В коде:

- Используй Tailwind-классы, маппированные на токены (`bg-base`, `text-primary`, `border-default` и т.д.) — никаких raw-color классов или hex.
- Никаких магических чисел для отступов — только Tailwind spacing scale.

---

## Контент (MDX)

- Функции чтения MDX живут в `src/shared/lib/mdx/`.
- `getAllX()` — список всех материалов типа X (frontmatter без body).
- `getXBySlug(slug)` — полный контент + frontmatter.
- Валидировать frontmatter при чтении — не доверять сырым данным из файла.
- Slug = имя файла без `.mdx`.

---

## Тестирование

- Vitest с `environment: "node"` и `globals: false` — `describe/it/expect` импортировать явно.
- Тесты рядом с модулем: `src/**/<module>.test.ts`.
- Покрывать: парсинг/валидацию frontmatter, утилиты (форматирование дат, slug), чистую логику.
- UI-компоненты и RSC не unit-тестируются — проверяются вручную.

---

## Организация файлов

Каждый FSD-слайс содержит только нужные сегменты:

```
{slice}/
  ui/        — React-компоненты (presentational)
  model/     — Типы, функции получения данных, бизнес-логика
  index.ts   — Публичный API (единственная точка импорта)
```

Имена файлов — по ответственности (`material-card.tsx`, не `components.tsx`). Сегментную папку создавать только если в ней больше одного файла.
