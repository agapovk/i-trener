# Progress Tracker

Обновлять этот файл при каждом изменении фазы, активной фичи или состояния имплементации.

---

## Текущая фаза

- **chore/fix-ui** — завершена (2026-05-13)
- **Phase 6 — Launch** — не начата

---

## Текущая цель

Подключить домен i-trener.ru на Vercel, прогнать csv-to-mdx по реальным данным Webflow, проверить Pagespeed.

---

## Завершено

- [x] Изучена структура текущего сайта i-trener.ru (Webflow)
- [x] Созданы context-файлы: project-overview, architecture-context, ui-context, code-standards, ai-workflow-rules, progress-tracker
- [x] **Phase 0 — Foundation** (2026-05-08)
  - [x] Next.js 16.2.6 + TypeScript + Tailwind v4 + App Router + `src/`
  - [x] Biome 2.4.14 (lint + format) — `pnpm check` / `pnpm fix`
  - [x] Vitest 4.1.5 — `pnpm test` / `pnpm test:watch`
  - [x] FSD-структура: `src/{views,widgets,features,entities,shared}`
  - [x] `content/{materials,interviews,experts}/`
  - [x] `src/shared/lib/mdx/` — функции getAllMaterials/Interviews/Experts + getBySlug
  - [x] Tailwind v4 токены в `globals.css` (VS Code Dark+ тема по умолчанию)
  - [x] Path aliases: `@shared/*`, `@entities/*`, `@features/*`, `@widgets/*`, `@views/*`
  - [x] shadcn/ui инициализирован (style: base-nova), компоненты в `src/shared/ui/`
  - [x] `pnpm check` + `pnpm typecheck` + `pnpm build` — всё зелёное

---

## В прогрессе

Ничего. chore/fix-ui завершена, Phase 6 (Launch) не начата.

---

## Следующие шаги

### ~~Phase 1 — Content Entities~~ ✅ (2026-05-08)
- [x] Валидация frontmatter — ручная, `src/shared/lib/mdx/validate.ts` (23 unit-теста)
- [x] Базовые entity-компоненты: MaterialCard, InterviewCard, ExpertCard
- [x] Тестовый MDX-контент: 3 материала, 3 интервью, 3 эксперта

### ~~Phase 2 — Core Pages~~ ✅ (2026-05-08)
- [x] Главная страница (hero + сетки материалов, интервью, экспертов)
- [x] Список материалов с клиентским фильтром по категории (`features/filter-by-category`)
- [x] Страница одной статьи (MDX рендер + VideoEmbed)
- [x] Список интервью + страница интервью (MDX рендер + VideoEmbed)
- [x] Список экспертов + профиль эксперта (bio, соцсети, MDX)
- [x] `shared/ui/VideoEmbed`, `shared/ui/Prose` — переиспользуемые компоненты
- [x] `generateStaticParams` + `generateMetadata` для всех динамических маршрутов
- [x] 16 статических страниц, `pnpm check` + `pnpm typecheck` + `pnpm build` зелёные

### ~~Phase 3 — Secondary Pages~~ ✅ (2026-05-09)
- [x] Страница категории (`/categories/[category]`) — фильтрация материалов по категории, `notFound()` для несуществующих slug
- [x] Партнёры (`/partners/`) — статическая страница, данные в `shared/config`
- [x] Контакты (`/contacts/`) — соцсети и форма сотрудничества с `SOCIAL_LINKS`
- [x] `PARTNERS` добавлены в `shared/config/index.ts`
- [x] Footer добавлен в `app/layout.tsx`: разделы, категории, партнёры, соцсети, копирайт
- [x] 25 статических страниц, `pnpm check` + `pnpm typecheck` + `pnpm build` зелёные

### ~~Phase 4+5 — Widgets + SEO + Migration~~ ✅ (2026-05-09)
- [x] `src/widgets/site-header/` — шапка с лого, навигацией и dropdown Категорий
- [x] `src/widgets/site-footer/` — подвал с 4 колонками: лого+соцсети, разделы, категории, партнёры
- [x] `app/layout.tsx` — использует `SiteHeader` / `SiteFooter`, добавлены base OG-метаданные и `metadataBase`
- [x] `app/sitemap.ts` — динамический sitemap.xml по всем маршрутам (materials, interviews, experts, categories)
- [x] `app/robots.ts` — robots.txt, указывает на `/sitemap.xml`
- [x] OG-метаданные (`openGraph`) добавлены в `generateMetadata` для materials, interviews, experts
- [x] `SITE_URL` добавлен в `shared/config/index.ts`
- [x] `scripts/csv-to-mdx.ts` — конвертер Webflow CSV → MDX, запуск: `npx tsx scripts/csv-to-mdx.ts --type <materials|interviews|experts> --input <file.csv>`
- [x] 27 статических страниц + `/sitemap.xml` + `/robots.txt`, pnpm check + typecheck + build зелёные
- [x] Прогнать скрипт по реальным CSV-файлам из Webflow (ветка feat/import-real-content, 2026-05-14)
  - 42 материала, 9 интервью, 25 экспертов (5 archived/draft пропущено)
  - Скрипт обновлён: новый CSV-парсер для Webflow (multiline + bare quotes в HTML), маппинги реальных колонок
- [ ] Проверить все маршруты с реальным контентом

### ~~chore/fix-ui — UI overhaul~~ ✅ (2026-05-13)
- [x] `globals.css` — CSS-переменные shadcn переписаны на OKLCH; добавлен блок `.dark` с полной тёмной палитрой
- [x] `layout.tsx` — подключены шрифты IBM Plex Sans (body) и Geist (heading) через `next/font/google`
- [x] `shared/ui/bg-layers.tsx` — текстурные компоненты: GridDotsLayer, HatchLayer, ScanLinesLayer, CrosshatchLayer, GridLinesLayer
- [x] `shared/ui/noise-layer.tsx` — SVG-шум компоненты: NoiseLayer, CoarseNoiseLayer, TurbulenceLayer, MarbleLayer, StaticLayer, CloudLayer, VignetteLayer
- [x] `shared/ui/button.tsx` — обновлён под новую дизайн-систему
- [x] `shared/config/index.ts` — исправлены URL соцсетей (instagram, telegram, vk)
- [x] `site-header` / `site-footer` — рефакторинг под новые токены
- [x] `public/whistle.svg`, `public/wh2.svg` — добавлены SVG-ассеты
- [x] `pnpm check` + `pnpm typecheck` + `pnpm build` — зелёные

### Phase 6 — Launch
- [ ] Подключение домена i-trener.ru на Vercel
- [ ] Настройка env vars на Vercel
- [ ] Pagespeed 90+ по всем метрикам
- [ ] Финальная проверка всех страниц1

---

## Архитектурные решения

- FSD-структура в `src/`; `app/` — только routing shell.
- Контент в MDX-файлах в `content/` — нет базы данных в MVP.
- Vercel Hobby plan + custom domain i-trener.ru.
- pnpm как package manager, Biome для lint/format.
