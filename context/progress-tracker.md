# Progress Tracker

Обновлять этот файл при каждом изменении фазы, активной фичи или состояния имплементации.

---

## Текущая фаза

- **Phase 2 — Core Pages** — не начата

---

## Текущая цель

Реализовать основные страницы: главная, список материалов с фильтром, страница статьи, список и страница интервью, список и профиль эксперта.

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

Ничего. Phase 1 завершена, Phase 2 не начата.

---

## Следующие шаги

### ~~Phase 1 — Content Entities~~ ✅ (2026-05-08)
- [x] Валидация frontmatter — ручная, `src/shared/lib/mdx/validate.ts` (23 unit-теста)
- [x] Базовые entity-компоненты: MaterialCard, InterviewCard, ExpertCard
- [x] Тестовый MDX-контент: 3 материала, 3 интервью, 3 эксперта

### Phase 2 — Core Pages
- [ ] Главная страница (hero + сетка последних материалов)
- [ ] Список материалов с фильтром по категории
- [ ] Страница одной статьи (MDX рендер)
- [ ] Список интервью + страница интервью
- [ ] Список экспертов + профиль эксперта

### Phase 3 — Secondary Pages
- [ ] Страница категории
- [ ] Партнёры
- [ ] Контакты

### Phase 4 — Site Widgets
- [ ] site-header (навигация)
- [ ] site-footer (соцсети, партнёры)
- [ ] SEO-метаданные (Open Graph, sitemap.xml, robots.txt)

### Phase 5 — Migration
- [ ] Написать скрипт конвертации CSV → MDX (парсинг полей, генерация frontmatter, slug из заголовка)
- [ ] Прогнать скрипт по выгруженным CSV-файлам с Webflow
- [ ] Проверить качество сконвертированных MDX-файлов (frontmatter, видео-ссылки, изображения)
- [ ] Проверить все маршруты с реальным контентом

### Phase 6 — Launch
- [ ] Подключение домена i-trener.ru на Vercel
- [ ] Настройка env vars на Vercel
- [ ] Pagespeed 90+ по всем метрикам
- [ ] Финальная проверка всех страниц

---

## Открытые вопросы

- **Шрифты:** serif для заголовков? Playfair Display / PT Serif / другой? → Нужно решение до Phase 0
- **Акцентный цвет:** зелёный, синий или чисто чёрный? → До Phase 0
- **Тёмная тема в MVP:** нужна или defer? → Решить в Phase 4
- **Поиск:** Pagefind (статический) или Algolia? → Решить в Phase 4–5
- **Объём контента для миграции:** сколько статей, интервью? → Уточнить у пользователя

---

## Архитектурные решения

- FSD-структура в `src/`; `app/` — только routing shell.
- Контент в MDX-файлах в `content/` — нет базы данных в MVP.
- Vercel Hobby plan + custom domain i-trener.ru.
- pnpm как package manager, Biome для lint/format.
