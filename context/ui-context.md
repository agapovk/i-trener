# UI Context

## Направление

**Современный тёмный редакционный стиль** — тёмная тема как Visual Studio Dark, sans-шрифты с сильным весом для заголовков, sky-акцент. Читаемость и профессионализм без излишней «спортивности».

---

## Тема

**Тёмная тема — по умолчанию.** Светлая — опционально позже.

Все цвета — CSS custom properties в `globals.css`. Маппинг в Tailwind v4 через `@theme inline`.  
Компоненты используют только токены — без хардкода hex или raw Tailwind color классов.

### Тёмная тема (default) — VS Code Dark+

| Роль | CSS Variable | Hex | VS Code token |
|------|-------------|-----|---------------|
| Фон страницы | `--bg-base` | `#1e1e1e` | `editor.background` |
| Поверхность | `--bg-surface` | `#252526` | `sideBar.background` |
| Приподнятая поверхность | `--bg-elevated` | `#2d2d2d` | `editorWidget.background` |
| Тонкая поверхность | `--bg-subtle` | `#37373d` | `list.hoverBackground` |
| Граница по умолчанию | `--border-default` | `#454545` | `panel.border` |
| Тонкая граница | `--border-subtle` | `#333333` | separator |
| Основной текст | `--text-primary` | `#d4d4d4` | `editor.foreground` |
| Вторичный текст | `--text-secondary` | `#cccccc` | general text |
| Приглушённый текст | `--text-muted` | `#858585` | `editorLineNumber.foreground` |
| Слабый текст | `--text-faint` | `#4d4d4d` | |
| Акцент | `--accent-primary` | `#3794ff` | `textLink.foreground` |
| Акцент dim | `--accent-primary-dim` | `rgba(55, 148, 255, 0.12)` | |

### Светлая тема (опциональная)

| Роль | CSS Variable | Hex |
|------|-------------|-----|
| Фон страницы | `--bg-base` | `#f8fafc` |
| Поверхность | `--bg-surface` | `#ffffff` |
| Приподнятая поверхность | `--bg-elevated` | `#f1f5f9` |
| Тонкая поверхность | `--bg-subtle` | `#e2e8f0` |
| Граница по умолчанию | `--border-default` | `#cbd5e1` |
| Тонкая граница | `--border-subtle` | `#e2e8f0` |
| Основной текст | `--text-primary` | `#0f172a` |
| Вторичный текст | `--text-secondary` | `#334155` |
| Приглушённый текст | `--text-muted` | `#64748b` |
| Слабый текст | `--text-faint` | `#94a3b8` |
| Акцент | `--accent-primary` | `#0284c7` (sky-600) |
| Акцент dim | `--accent-primary-dim` | `rgba(2, 132, 199, 0.12)` |

### Семантические состояния (обе темы)

| Роль | CSS Variable | Hex | VS Code token |
|------|-------------|-----|---------------|
| Ошибка | `--state-error` | `#f44747` | `editorError.foreground` |
| Успех | `--state-success` | `#4ec9b0` | class/type color |
| Предупреждение | `--state-warning` | `#ce9178` | string color |

### Маппинг в Tailwind v4

```css
@theme inline {
  --color-base: var(--bg-base);
  --color-surface: var(--bg-surface);
  --color-elevated: var(--bg-elevated);
  --color-subtle: var(--bg-subtle);
  --color-border: var(--border-default);
  --color-border-subtle: var(--border-subtle);
  --color-primary: var(--text-primary);
  --color-secondary: var(--text-secondary);
  --color-muted: var(--text-muted);
  --color-faint: var(--text-faint);
  --color-accent: var(--accent-primary);
  --color-accent-dim: var(--accent-primary-dim);
}
```

Это генерирует классы: `bg-base`, `bg-surface`, `text-primary`, `text-muted`, `border-border`, `bg-accent` и т.д.

---

## Типографика

Только sans-serif шрифты. Заголовки — ExtraBold (800), текст — Regular (400) / Medium (500).

| Роль | Шрифт | Вес | Переменная | Применение |
|------|-------|-----|-----------|-----------|
| Заголовки | Geist Sans | 800 ExtraBold | `--font-sans` | H1–H3, hero, названия карточек |
| UI-текст | Geist Sans | 400–500 | `--font-sans` | Навигация, кнопки, метаданные, body |
| Моноширинный | Geist Mono | 400 | `--font-mono` | Даты, теги, если встречается код |

Оба шрифта — Vercel / Google Fonts, загружаются через `next/font/google`.

```tsx
// app/layout.tsx
import { Geist, Geist_Mono } from 'next/font/google'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' })
```

### Шкала заголовков

| Тег | Размер (desktop) | Вес | Применение |
|-----|-----------------|-----|-----------|
| H1 | `text-5xl` (48px) | 800 | Hero, заголовок страницы |
| H2 | `text-3xl` (30px) | 800 | Разделы страницы |
| H3 | `text-xl` (20px) | 700 | Заголовки карточек, подразделы |
| body | `text-base` (16px) | 400 | Основной текст |
| small | `text-sm` (14px) | 400 | Метаданные, подписи |

---

## Скругления

Современные, но сдержанные.

| Контекст | Класс |
|----------|-------|
| Бейджи / чипы / теги | `rounded-full` |
| Кнопки / поля | `rounded-lg` |
| Карточки | `rounded-xl` |
| Изображения в карточках | `rounded-lg` |

---

## Компонентная библиотека

shadcn/ui поверх Tailwind. Компоненты в `src/shared/ui/`.

**Правила:**
- Всегда `pnpm dlx shadcn@latest add <component>` — не писать вручную.
- Кастомные обёртки в `src/shared/ui/` только когда упрощают API проекта.
- Токены настраиваются в `globals.css`, не внутри компонентов.
- shadcn переменные (`--background`, `--foreground`, `--primary` и т.д.) маппятся на наши токены в `globals.css`.

---

## Layout Patterns

- **Desktop-first, responsive.** Основная аудитория — с десктопа.
- **Максимальная ширина контента:** `max-w-7xl` (1280px), центрирован.
- **Сетки контента.** CSS Grid: 3 колонки на desktop (`lg:grid-cols-3`), 2 на tablet (`md:grid-cols-2`), 1 на mobile.
- **Шапка (site-header).** Лого слева, навигация справа. Фиксированная (`sticky top-0`), фон `bg-surface` с `backdrop-blur`.
- **Подвал (site-footer).** Логотип + колонки навигации + соцсети + копирайт.
- **Боковая панель.** На страницах материалов — категории + последние справа на desktop, скрыта на mobile.
- **Hero на главной.** Большой H1 (ExtraBold) + подзаголовок + featured-карточка.
- **Карточки контента.** Превью (для видео — thumbnail) + категория-бейдж + заголовок + дата + excerpt.

---

## Карточки контента

```
┌─────────────────────────────┐
│  [превью / thumbnail 16:9]  │
│  ▶ иконка play для видео    │
├─────────────────────────────┤
│  [КАТЕГОРИЯ]        дата    │
│  Заголовок ExtraBold        │
│  Краткое описание text-muted│
└─────────────────────────────┘
```

Для видео-контента (материалы, интервью) — иконка play поверх thumbnail.

---

## Навигация

### Основная (site-header)
- Материалы
- Интервью
- Эксперты
- Категории (выпадающий список)

### Вторичная (site-footer)
- Партнёры
- Контакты
- Соцсети (Instagram, Telegram, VK)

---

## Иконки

Lucide React. Только stroke-иконки.

| Контекст | Размер |
|----------|--------|
| Inline в тексте | `h-4 w-4` |
| Кнопки / навигация | `h-5 w-5` |
| Play на карточке видео | `h-8 w-8` |
| Пустые состояния | `h-10 w-10` |

---

## Акцент sky

`#3794ff` (`textLink.foreground` из VS Code Dark+) — для тёмной темы. Используется для:
- Активных ссылок и hover-состояний
- Категория-бейджей (текст `text-accent` на фоне `bg-accent-dim`)
- Кнопок CTA
- Focus-ring (`ring-accent`)
