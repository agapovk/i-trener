# Architecture Context

## Stack

| Слой | Технология | Роль |
|------|-----------|------|
| Framework | Next.js 15 + TypeScript | App Router, SSG/ISR, API routes |
| Styling | Tailwind CSS v4 + shadcn/ui | Компоненты и токены |
| Content | MDX + gray-matter | Контент в файлах, frontmatter как метаданные |
| MDX runtime | next-mdx-remote | Рендер MDX на сервере |
| Hosting | Vercel Hobby (free tier) | Деплой, CDN, custom domain i-trener.ru |
| Package manager | pnpm | |
| Linting | Biome | lint + format |
| Tests | Vitest | Unit-тесты чистой логики |

---

## Routes

| Route | View | Описание |
|-------|------|----------|
| `/` | home | Hero + последние материалы всех типов |
| `/materials/` | materials-list | Все статьи, фильтр по категории |
| `/materials/[slug]` | material-detail | Статья (MDX) |
| `/interviews/` | interviews-list | Все интервью |
| `/interviews/[slug]` | interview-detail | Интервью (MDX) |
| `/experts/` | experts-list | Каталог экспертов |
| `/experts/[slug]` | expert-detail | Профиль эксперта (MDX) |
| `/categories/[slug]` | category | Материалы по категории |
| `/partners/` | partners | Партнёрские страницы |
| `/contacts/` | contacts | Контактная страница |

---

## Структура проекта

Проект следует **Feature-Sliced Design (FSD)**. `app/` только маршрутизация — каждый маршрут рендерит один компонент из `src/views/`. Весь продуктовый код живёт в `src/`.

```
app/                              — Next.js App Router (routing shell only)
  page.tsx                        → src/views/home
  materials/
    page.tsx                      → src/views/materials-list
    [slug]/page.tsx               → src/views/material-detail
  interviews/
    page.tsx                      → src/views/interviews-list
    [slug]/page.tsx               → src/views/interview-detail
  experts/
    page.tsx                      → src/views/experts-list
    [slug]/page.tsx               → src/views/expert-detail
  categories/
    [category]/page.tsx           → src/views/category
  partners/page.tsx               → src/views/partners
  contacts/page.tsx               → src/views/contacts
src/
  views/                          — FSD: Pages layer (переименовано, нет конфликта с Next.js)
    home/
    materials-list/
    material-detail/
    interviews-list/
    interview-detail/
    experts-list/
    expert-detail/
    category/
    partners/
    contacts/

  widgets/                        — Крупные самодостаточные UI-блоки
    site-header/                  — Шапка с навигацией
    site-footer/                  — Подвал с соцсетями и партнёрами
    content-grid/                 — Сетка карточек контента
    content-sidebar/              — Боковая панель (категории, последние)
    expert-card/                  — Карточка эксперта
    article-card/                 — Карточка материала/интервью

  features/                       — Пользовательские взаимодействия
    filter-by-category/           — Переключение фильтра категорий
    search-content/               — Поиск по контенту (Pagefind или client-side)
    share-article/                — Кнопки «Поделиться»

  entities/                       — Бизнес-объекты
    material/
      model/                      — TypeScript типы, функции чтения MDX
      ui/                         — MaterialCard, MaterialMeta
    interview/
      model/
      ui/                         — InterviewCard
    expert/
      model/
      ui/                         — ExpertCard, ExpertBadge

  shared/                         — Независимая от фреймворка основа
    ui/                           — shadcn/ui компоненты + кастомные базовые
    lib/                          — Утилиты (cn, форматирование дат, slug)
      mdx/                        — Парсинг MDX, получение списков и контента
    config/                       — Константы (CATEGORIES, SOCIAL_LINKS, NAV_ITEMS)

content/                          — MDX-файлы (источник истины для контента)
  materials/                      — *.mdx статьи
  interviews/                     — *.mdx интервью
  experts/                        — *.mdx профили экспертов
public/                           — Статические файлы (изображения, og-картинки)
```

---

## FSD Import Rules

Модули могут импортировать только из слоёв **строго ниже**. Порядок сверху вниз:

```
views → widgets → features → entities → shared
```

- Слайсы одного слоя не импортируют друг друга.
- Каждый слайс экспортирует публичный API через `index.ts`.
- `app/` и `shared/` слайсов не имеют — их сегменты импортируют внутри слоя свободно.

---

## Content Model

### Frontmatter типов контента

**Material** (`content/materials/*.mdx`):
```typescript
type VideoPlatform = 'vkvideo' | 'dzen' | 'youtube'

interface MaterialFrontmatter {
  title: string
  slug: string
  category: Category
  author: string
  date: string          // ISO 8601
  excerpt: string
  image?: string        // превью-картинка (путь в /public или внешний URL)
  videoUrl?: string     // embed URL видео (VK Video, Dzen, YouTube)
  videoPlatform?: VideoPlatform
  featured?: boolean
}
// Тело MDX — опциональный текст под видео (описание, тезисы)
```

**Interview** (`content/interviews/*.mdx`):
```typescript
interface InterviewFrontmatter {
  title: string
  slug: string
  guest: string
  guestRole?: string
  date: string
  excerpt: string
  image?: string        // превью гостя или кадр из видео
  videoUrl?: string     // embed URL видео-интервью
  videoPlatform?: VideoPlatform
  featured?: boolean
}
// Тело MDX — опциональный краткий анонс или ключевые тезисы
```

**Expert** (`content/experts/*.mdx`):
```typescript
interface ExpertFrontmatter {
  name: string
  slug: string
  role: string
  specializations: Category[]
  bio: string
  image?: string
  social?: {
    telegram?: string
    instagram?: string
    vk?: string
    linkedin?: string
  }
}
```

---

## Content Reading Model

- Весь контент — статические MDX-файлы в `content/`.
- `src/shared/lib/mdx/` предоставляет функции: `getAllMaterials()`, `getMaterialBySlug()`, `getAllInterviews()`, `getInterviewBySlug()`, `getAllExperts()`, `getExpertBySlug()`.
- Функции используют `fs` + `gray-matter` для чтения frontmatter и `next-mdx-remote/rsc` для рендера.
- Все маршруты — React Server Components (RSC), данные читаются на сервере.
- `generateStaticParams` + `generateMetadata` для каждого динамического маршрута.

---

## Deployment Model

- Vercel Hobby plan: деплой из GitHub, автодеплой по push в `main`.
- Custom domain: i-trener.ru подключается через Vercel DNS settings (бесплатно на Hobby).
- ISR (Incremental Static Regeneration): при добавлении контента через git → push → автодеплой.
- Нет базы данных — все данные в файлах.

---

## Инварианты

1. Всё чтение контента происходит на сервере (RSC) — никаких client-side fetch для MDX.
2. `app/` route files содержат только параметры маршрута и один импорт из `views/` — никакой логики.
3. Контент управляется только через файлы в `content/` — никаких inline данных в коде.
4. TypeScript strict mode везде.
