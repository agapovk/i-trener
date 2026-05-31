# i-trener.ru — Knowledge Platform for Football Coaches

A modern content platform aggregating professional materials, interviews, and expert profiles for football coaches. Built with Next.js, TypeScript, and MDX for scalable, performant content delivery.

**Live:** [i-trener.ru](https://i-trener.ru)

---

## 🎯 Overview

**i-Trener** is a structured knowledge base serving the football coaching community with:
- **42+ educational materials** covering tactics, fitness, analytics, psychology
- **9 expert interviews** with professional coaches and specialists  
- **25+ expert profiles** with specializations and bio
- **Category-based navigation** (Management, Analytics, Youth Development, Goalkeeping, etc.)
- **Full-text search & filtering** for content discovery

Migrated from Webflow to a custom Next.js stack maintaining 100% content integrity and improving performance.

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js + TypeScript | App Router, static generation, type safety |
| **Styling** | Tailwind CSS v4 + shadcn/ui | Design system, dark mode, accessible components |
| **Content** | MDX + gray-matter | Structured frontmatter, reactive components in markdown |
| **Runtime** | React 19 + RSC | Server-side rendering by default, minimal client JS |
| **Linting** | Biome | Fast unified lint + format |
| **Testing** | Vitest | Unit tests for business logic |
| **Hosting** | Vercel | Zero-config deployment, edge caching |
| **Package Manager** | pnpm | Monorepo-ready, lockfile integrity |

---

## 🏗️ Architecture

### Feature-Sliced Design (FSD)

Code organized in layered slices with strict import direction:

```
src/
  views/        → Page-level components (mapped from Next.js routes)
  widgets/      → Reusable UI modules (header, footer, cards, grids)
  features/     → User interactions (filters, search, sharing)
  entities/     → Business objects (Material, Interview, Expert)
  shared/       → Framework-agnostic utilities and base UI
    lib/mdx/    → Content parsing, validation, metadata extraction
    config/     → Constants (categories, partners, navigation)
    ui/         → shadcn/ui + custom component primitives
```

**Key principle:** Every route in `app/` contains one line—a view import. All logic lives in `src/views/`.

### React Server Components by Default

- RSC for all pages → zero hydration overhead
- `"use client"` only for interactive features (theme toggle, filters)
- Server-side MDX rendering with `next-mdx-remote`
- Static generation with `generateStaticParams` + `generateMetadata`

### Content Model

**Sources of truth:** MDX files in `content/` with YAML frontmatter.

```yaml
---
title: Article Title
category: Fitness
author: Konstantin Agapov
date: 2025-01-15
excerpt: Brief description
image: /images/cover.jpg
---

# MDX content with embedded components
```

**Validation:** Strict TypeScript interfaces + runtime checks via `gray-matter` → prevents invalid content from building.

---

## 📦 Key Features

### ✅ Content Management
- **CSV-to-MDX converter** (`scripts/csv-to-mdx.ts`) — batch migrate from Webflow with field mapping
- **Image optimization** (`scripts/optimize-images.ts`) — local asset compression, responsive srcsets
- **Frontmatter validation** — 23 unit tests ensuring schema compliance

### ✅ SEO & Discoverability
- Dynamic `sitemap.xml` — all materials, interviews, experts, categories
- Open Graph metadata — optimized for social sharing
- Semantic HTML + proper heading hierarchy
- Mobile-optimized responsive design

### ✅ Code Quality
- **TypeScript strict mode** everywhere — no `any`, explicit types
- **Biome linting** — fast, zero-config setup
- **Pre-commit hooks** (Husky) — enforce checks before push
- **CI-ready** — `pnpm check`, `pnpm typecheck`, `pnpm build` all required to pass

### ✅ UX & Performance
- **Dark/light theme toggle** — persisted, respects system preference
- **Category filtering** — client-side with instant feedback
- **Responsive layout** — mobile-first, tablet + desktop optimized


