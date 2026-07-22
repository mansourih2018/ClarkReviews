# GEMINI.md — Clark Reviews
# Agent Instruction File

> Read this file before every task.
> When the user types `/write-review`, jump to **Section 10**.
> When building or editing UI, jump to **Section 4 & 5**.
> When writing any copy, read **Section 8** and all files in `references/`.

---

## 1. Project Identity

| | |
|---|---|
| **Site** | https://clarkreviews.com |
| **Owner** | Rachel Clark |
| **Niche** | Home & kitchen product reviews |
| **Revenue** | Amazon Associates + CJ Affiliate |
| **Methodology** | Research-based — specs, verified buyer data, public test data. No hands-on testing claims. |
| **No prices** | Never display prices, stock status, or retailer star ratings anywhere. |

**Categories:** `storage` · `organization` · `cleaning` · `air-fryers`

---

## 2. Tech Stack

| Tool | Choice |
|---|---|
| Framework | Next.js 16.2.x — App Router only |
| Language | **TypeScript** — all files `.ts` / `.tsx` |
| Bundler | Turbopack (default, no webpack config) |
| Styling | Tailwind CSS v4 — CSS-first config via `@theme` |
| Content | MDX via `next-mdx-remote` |
| Data | JSON files — `/data/products.json` |
| Analytics | Google Analytics 4 via `@next/third-parties` |
| Package manager | npm — never pnpm or yarn |
| Node.js | **v24.16.0** |
| Deployment | Hostinger Business — Managed Node.js — `output: 'standalone'` |

**Next.js 16 rules:**
- No `middleware.ts` — use `proxy.ts` if request interception is needed
- Use `revalidate` on review and category pages for ISR
- Use `use cache` on data-fetching functions in `src/lib/`

---

## 3. Project Structure

```
clarkreviews/
│
├── GEMINI.md                        ← this file
├── on-page-seo.md                   ← read before every review
├── keywords.csv                     ← keyword:volume:difficulty:intent:category:used
├── tsconfig.json
│
├── references/
│   ├── voice.md                     ← tone, style, banned phrases
│   ├── humour.md                    ← when and how Rachel uses humour
│   ├── opinions.md                  ← Rachel's stances — one per review max
│   ├── stats.md                     ← verified statistics — one per paragraph max
│   ├── stories.md                   ← anecdotes — one per review max
│   └── used-keywords.md             ← claimed keywords — never reuse as primary
│
├── src/
│   ├── app/
│   │   ├── layout.tsx               ← root layout, GA4, fonts
│   │   ├── page.tsx                 ← homepage: HeroBio + cards + SEO content
│   │   ├── sitemap.ts               ← auto-generates sitemap.xml
│   │   ├── robots.ts                ← generates robots.txt
│   │   ├── reviews/
│   │   │   ├── page.tsx             ← reviews archive
│   │   │   └── [slug]/page.tsx      ← individual review
│   │   ├── category/
│   │   │   └── [slug]/page.tsx      ← category hub
│   │   ├── about/page.tsx
│   │   └── affiliate-disclosure/
│   │       └── page.tsx             ← standalone FTC page, linked from every footer
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx           ← always links to /affiliate-disclosure
│   │   │   └── AffiliateDisclosure.tsx
│   │   ├── home/
│   │   │   ├── HeroBio.tsx          ← photo + name + bio + FTC line
│   │   │   └── ProductCard.tsx      ← image + name + 2 buttons
│   │   ├── review/
│   │   │   ├── TableOfContents.tsx
│   │   │   ├── QuickVerdict.tsx     ← rating badge + verdict + Check Price CTA
│   │   │   ├── RatingBreakdown.tsx  ← 5-criterion table, X.X / 10
│   │   │   ├── ProsCons.tsx
│   │   │   ├── BestFor.tsx          ← best for + wrong for
│   │   │   ├── ComparisonTable.tsx  ← min 2 alternatives
│   │   │   ├── Verdict.tsx          ← final recommendation + CTA
│   │   │   └── FAQ.tsx              ← accordion + FAQPage schema
│   │   └── shared/
│   │       ├── CheckPriceButton.tsx ← "Check Price on Amazon" — no price shown
│   │       ├── ReviewButton.tsx     ← "Read My Full Review" internal link
│   │       ├── Breadcrumbs.tsx      ← nav + BreadcrumbList schema
│   │       ├── AuthorByline.tsx     ← Rachel Clark + Person schema
│   │       └── StarRating.tsx       ← visual stars from numeric score
│   │
│   ├── lib/
│   │   ├── products.ts              ← getProducts(), getFeaturedProducts()
│   │   ├── reviews.ts               ← getAllReviews(), getReviewBySlug()
│   │   ├── categories.ts            ← getCategories(), getProductsByCategory()
│   │   └── schema.ts                ← all JSON-LD generators — never hand-write schema
│   │
│   ├── types/
│   │   └── index.ts                 ← shared TypeScript interfaces
│   │
│   └── styles/
│       └── globals.css              ← Tailwind @import + @theme tokens
│
├── content/reviews/                 ← one .mdx per review
│   └── _template.mdx
│
├── data/
│   └── products.json
│
├── public/
│   └── images/
│       ├── rachel-profile.webp      ← 800×800px square
│       ├── og/[slug].webp           ← 1200×630px — review hero + social sharing
│       └── products/[slug].webp     ← 600×600px square — homepage cards only
│
└── .env.local                       ← never commit to git
```

---

## 4. Design Tokens

```css
/* src/styles/globals.css */
@import "tailwindcss";

@theme {
  --color-bg:            #FDF8F0;   /* cream — page background */
  --color-surface:       #FFFFFF;   /* white — cards, nav */
  --color-accent:        #C4622D;   /* terracotta — primary CTA */
  --color-accent-hover:  #A84F24;   /* terracotta dark — hover */
  --color-text-primary:  #2C1810;   /* dark brown — headings, body */
  --color-text-muted:    #6B4C3B;   /* medium brown — captions, meta */
  --color-border:        #E8D5C4;   /* warm beige — borders, dividers */
  --color-pro:           #4A7C3F;   /* muted green — pros */
  --color-con:           #B94040;   /* muted red — cons */
  --color-rating:        #D4842A;   /* amber — stars */
  --font-sans: "Inter", system-ui, sans-serif;
}
```

**Tailwind v4 usage:** `bg-bg`, `bg-surface`, `text-accent`, `border-border`, `text-text-primary`, etc.

**Buttons:**

```
Primary (Check Price on Amazon)
  bg-accent text-white rounded-full px-3 py-2 text-sm sm:px-6 sm:py-3 sm:text-base font-semibold
  hover:bg-accent-hover transition-colors duration-200

Secondary (Read My Full Review)
  bg-transparent border-2 border-accent text-accent rounded-full px-3 py-2 text-sm sm:px-6 sm:py-3 sm:text-base font-semibold
  hover:bg-accent hover:text-white transition-colors duration-200
```

**Responsive button labels (card layouts only):**

| Button | Mobile (<640 px) | Desktop (≥640 px) |
|---|---|---|
| Primary | "Check Price" | "Check Price on Amazon" |
| Secondary | "Full Review" | "Read My Full Review" |

This label shortening applies only in narrow card grids (e.g. `ProductCard`).
Review page components (`QuickVerdict`, `Verdict`) always use the full button text.

---

## 5. Page Architecture

### Homepage (`/`)

**Zone 1 — above the fold (link-in-bio)**
```
HeroBio
  rachel-profile.webp  →  circular, ~96px
  "Rachel Clark"       →  h1, font-bold
  "Honest home & kitchen reviews — no fluff, no hype."
  FTC line (small, muted):
  "I earn from qualifying purchases via Amazon Associates and CJ Affiliate."

ProductCard grid
  source: products.json where featured: true, sorted by featuredOrder
  columns: 2 mobile / 3 tablet / 4 desktop
  card: image → product name → [Read My Full Review] → [Check Price on Amazon]
```

**Zone 2 — below the fold (SEO)**
```
Latest Reviews   →  3 most recent MDX reviews
Browse by Category  →  category cards → /category/[slug]
See all reviews  →  /reviews
```

---

### Individual Review (`/reviews/[slug]`)

**Render in this exact order:**

```
1.  <Breadcrumbs />            Home › [Category] › [Product Name]
2.  <AffiliateDisclosure />
3.  <h1>                       matches title tag
4.  Hero Image                 ogImage — 1200×630 WebP, full-width, rounded
5.  <AuthorByline />           Rachel Clark — links to /about
6.  <TableOfContents />        anchor links to all H2s
7.  <QuickVerdict />           rating (X.X/10) + verdict badge + Check Price CTA
8.  <RatingBreakdown />        5-criterion scoring table
9.  Introduction               2–3 paragraphs, research-based, keyword in first 100 words
10. <ProsCons />
11. <BestFor />                best for + wrong for (both required)
12. <ComparisonTable />        min 2 alternatives
13. <Verdict />                final recommendation + Check Price CTA
14. <FAQ />                    min 4 questions + FAQPage schema
```

**Required JSON-LD on every review (via `src/lib/schema.ts`):**

| Schema type | Generator function |
|---|---|
| `Product` | `generateProductSchema()` |
| `Review` + `reviewRating` | `generateReviewSchema()` |
| `FAQPage` | built into `<FAQ />` |
| `BreadcrumbList` | built into `<Breadcrumbs />` |
| `Person` | built into `<AuthorByline />` |

**`reviewRating` always uses:** `bestRating: "10"`, `worstRating: "1"` — no `AggregateRating` (single editorial review per product)

---

### Other Pages

| Route | Purpose |
|---|---|
| `/reviews` | Archive — all reviews, filter by category, sorted by date desc |
| `/category/[slug]` | Hub — category H1 + description + review grid |
| `/about` | Rachel's full bio + link to /affiliate-disclosure |
| `/affiliate-disclosure` | Standalone FTC page — linked from every footer |

---

## 6. Data Schemas

### `data/products.json`

```json
{
  "products": [
    {
      "id": "string",
      "name": "string",
      "slug": "string",
      "category": "storage | organization | cleaning | air-fryers",
      "image": "/images/products/[slug].webp",
      "amazonUrl": "PASTE-SITESTRIPE-LINK-HERE",
      "cjUrl": "string | empty string",
      "featured": true,
      "featuredOrder": 1
    }
  ]
}
```

### MDX Frontmatter

```yaml
---
title: "Product Name Review: Hook (2026)"
slug: keyword-based-slug
date: YYYY-MM-DD
updatedDate: YYYY-MM-DD
category: air-fryers
excerpt: "Under 155 chars. Includes target keyword. Benefit statement."
targetKeyword: "exact keyword from keywords.csv"
secondaryKeywords:
  - "secondary keyword"
ogImage: "/images/og/[slug].webp"
product:
  name: "Full Product Name"
  image: "/images/products/[slug].webp"
  amazonUrl: "PASTE-SITESTRIPE-LINK-HERE"
  cjUrl: ""
rating:
  valueForMoney: 8.0
  buildQuality: 7.5
  performance: 8.5
  easeOfUse: 9.0
  design: 7.0
  overall: 8.0
pros:
  - "Specific, sourced pro"
cons:
  - "Specific, sourced con (minimum 2)"
bestFor:
  - "Specific use case"
wrongFor:
  - "Who should not buy this (minimum 1)"
compareProducts:
  - name: "Alternative One"
    slug: alternative-one-review
  - name: "Alternative Two"
    slug: alternative-two-review
verdict: "Buy | Skip | Wait for Sale"
faq:
  - question: "Main buying concern question?"
    answer: "Research-based answer citing specs or buyer data."
  - question: "Common use case question?"
    answer: "Research-based answer."
  - question: "Comparison question?"
    answer: "Research-based answer."
  - question: "Maintenance or longevity question?"
    answer: "Research-based answer."
featured: true
---
```

**Rating:** overall = average of 5 criteria, rounded to 1 decimal.
Each criterion scored 0–10 based on: manufacturer specs + verified buyer data.

| Criterion | Data source |
|---|---|
| Value for Money | Market pricing vs comparable products |
| Build Quality | Manufacturer specs + buyer durability reports |
| Performance | Spec sheet + buyer consensus on core function |
| Ease of Use | Product manual + buyer setup/maintenance complaints |
| Design | Dimensions, aesthetics, real-home fit |

---

## 7. TypeScript Conventions

```typescript
// src/types/index.ts — define all shared interfaces here

export interface Product {
  id: string
  name: string
  slug: string
  category: Category
  image: string
  amazonUrl: string
  cjUrl: string
  featured: boolean
  featuredOrder: number
}

export interface Rating {
  valueForMoney: number
  buildQuality: number
  performance: number
  easeOfUse: number
  design: number
  overall: number
}

export interface ReviewFrontmatter {
  title: string
  slug: string
  date: string
  updatedDate: string
  category: Category
  excerpt: string
  targetKeyword: string
  secondaryKeywords: string[]
  ogImage: string
  product: {
    name: string
    image: string
    amazonUrl: string
    cjUrl: string
  }
  rating: Rating
  pros: string[]
  cons: string[]
  bestFor: string[]
  wrongFor: string[]
  compareProducts: { name: string; slug: string }[]
  verdict: 'Buy' | 'Skip' | 'Wait for Sale'
  faq: { question: string; answer: string }[]
  featured: boolean
}

export type Category = 'storage' | 'organization' | 'cleaning' | 'air-fryers'
```

**Rules:**
- All interfaces defined in `src/types/index.ts`
- Named exports for all components: `export function ProductCard(...)`
- No `any` types
- Props typed inline using imported interfaces
- Data fetching in `page.tsx` files only — components receive typed props

---

## 8. Writing Rules

Read `references/voice.md` before writing any copy. These are the hard rules.

### Research-based framing — strictly enforced

| Write this | Never write this |
|---|---|
| "Specs show the basket holds 4 quarts" | "I found the basket fits plenty of food" |
| "Verified buyers report the handle loosens" | "In my testing, the handle felt flimsy" |
| "The manufacturer states the coating is PFOA-free" | "When I used it, the coating seemed fine" |
| "Return data suggests motor issues at 18 months" | "After a few weeks of use, I noticed problems" |

### Banned phrases — never use
`unlock` · `leverage` · `seamless` · `game-changer` · `dive into` · `delve into` ·
`in today's fast-paced world` · `it's worth noting` · `at the end of the day` ·
`revolutionary` · `cutting-edge` · `best-in-class` · `state-of-the-art` ·
`amazing` · `incredible` · `look no further` · `when it comes to`

**No exclamation marks. No emojis.**

### Per-review limits

| Element | Rule |
|---|---|
| Anecdotes | 1 max — from `references/stories.md` only, never invented |
| Opinions | 1 max — from `references/opinions.md` only, must cite a number |
| Stats | 1 per paragraph max — from `references/stats.md` only, never rounded or invented |
| Cons | 2 minimum — specific and sourced, not vague |
| Wrong-for personas | 1 minimum |
| Comparison alternatives | 2 minimum |
| Internal links | 3–5 |
| External links | 2–3 — authoritative, non-affiliate sources only |

### No prices — ever
No price, no "from $X", no "under $50", no stock status, no retailer star count.
CTA is always: **"Check Price on Amazon"**

---

## 9. Author Profile

```
Name:  Rachel Clark
URL:   https://clarkreviews.com/about

Full bio (About page):
"I'm Rachel Clark, and Clark Reviews is where I write about home, kitchen,
and home-improvement products without the marketing fluff. Every review here
starts with the spec sheet and the manufacturer claims, then goes through
every verified buyer complaint and return reason I can find before I'll
recommend it. If a product doesn't hold up to that, I'll tell you, and I'll
tell you why. I'm not interested in being your trusted tech-savvy friend —
I'm interested in you not wasting money on something that breaks in a month."

Homepage bio (HeroBio component):
Line 1:  "Honest home & kitchen reviews — no fluff, no hype."
FTC line (small, muted, below product cards):
         "I earn from qualifying purchases via Amazon Associates and CJ Affiliate."
```

---

## 10. `/write-review` Skill

**Trigger:** `/write-review "[Product Name]"`
Amazon URL is no longer passed at trigger time — amazonUrl is set to PASTE-SITESTRIPE-LINK-HERE in Step 7, and Rachel replaces it with a real SiteStripe OneLink after generating one manually.

Execute every step in order. Do not skip any.

---

**Step 1 — Load references**
Read all of these before writing a single word:
- `@references/voice.md`
- `@references/humour.md`
- `@references/opinions.md`
- `@references/stories.md`
- `@references/stats.md`

---

**Step 2 — Check used keywords**
Open `@references/used-keywords.md`.
Note every keyword already claimed for this product's category.
Do not reuse any of them as a primary target.

---

**Step 3 — Select target keyword**
Open `@keywords.csv`. Filter by category.
Select the highest-volume unused keyword (`used=false`) that fits this product.
If volume ties, prefer lower difficulty.
Update `keywords.csv`: set `used=true` for selected keyword.

---

**Step 4 — Read SEO rules**
Open `@on-page-seo.md`. Read fully. Apply every rule.

---

**Step 5 — Research the product**
Gather from public sources before writing:
- Manufacturer spec sheet (dimensions, materials, wattage, capacity, warranty)
- Amazon listing: verified buyer reviews, Q&A, common complaints, return reasons
- Independent test data if available (Consumer Reports, RTINGS, etc.)
- 2 genuine alternatives with names and available review slugs

Flag any spec that cannot be verified rather than assuming.

---

**Step 6 — Calculate rating**
Score each criterion 0–10 from research data:
- `valueForMoney` — vs comparable products at similar price point
- `buildQuality` — materials + verified buyer durability reports
- `performance` — core function per specs + buyer consensus
- `easeOfUse` — setup + maintenance + learning curve from manual + complaints
- `design` — dimensions + aesthetics + real-home fit

`overall` = sum ÷ 5, rounded to 1 decimal.

---

**Step 7 — Generate frontmatter**
Fill every field per the schema in Section 6:
- `slug` — from target keyword, lowercase, hyphens, max 5 words
- `title` — keyword in first 60 chars, hook, year in brackets (Strictly check title character count to ensure it is between 50–60 characters total to prevent search engine truncation; do not just estimate)
- `excerpt` — under 155 chars, includes keyword, benefit statement
- `ogImage` — `/images/og/[slug].webp` (Rachel creates this file)
- `rating` — all five criteria + overall
- `amazonUrl` — must be left as a clear placeholder like `"PASTE-SITESTRIPE-LINK-HERE"` (Rachel manually generates the real amzn.to OneLink through her Amazon Associates account)

---

**Step 8 — Write review body**

The MDX file contains **frontmatter + prose only**. No imports. No component tags.
All structured sections (QuickVerdict, RatingBreakdown, ProsCons, BestFor,
ComparisonTable, Verdict, FAQ) are rendered by `src/app/reviews/[slug]/page.tsx`
directly from frontmatter data — never written into the MDX body.

**MDX body structure:**
```mdx
## Introduction
[2–3 paragraphs. Opens with the problem this product solves.
Research-based framing only. Target keyword in first 100 words.]

[Additional prose sections as needed — comparison analysis,
who should buy/skip, detailed feature discussion. Use ## H2
headings for each section. Internal and external links placed
naturally throughout the prose.]
```

**What goes where:**

| Data | Location |
|---|---|
| Rating scores, pros, cons, bestFor, wrongFor, faq | YAML frontmatter |
| Introduction + all prose paragraphs | MDX body |
| Structured components (QuickVerdict, ProsCons, FAQ, etc.) | `page.tsx` — reads frontmatter |

**Checklist before saving:**
- [ ] 1,200 words minimum — target 1,500–2,000
- [ ] Target keyword appears 3–5 times naturally
- [ ] Minimum 2 specific cons
- [ ] Minimum 1 wrong-for persona named
- [ ] Minimum 2 alternatives in ComparisonTable
- [ ] 3–5 internal links with descriptive anchor text
- [ ] 2–3 external links to authoritative non-affiliate sources
- [ ] Max 1 anecdote (from stories.md), max 1 opinion (from opinions.md)
- [ ] No prices, no stock status, no retailer ratings
- [ ] No hands-on testing language
- [ ] No banned phrases, no exclamation marks

**Content images — insert after writing the prose:**

After the review body is complete, insert 3 content images using standard
Markdown image syntax at natural section breaks. No imports needed — the
`img` override in `src/lib/reviews.ts` (`MdxImage` component) renders all
Markdown images as optimised Next.js `<Image />` automatically.

Default placements:
1. After **"What Buyers Like"** section (before "Common Complaints")
2. After **"Common Complaints"** section (before "Who Should Buy")
3. After **"Who Should Buy"** section (before "Who Should Skip It")

Use the file paths and alt text from **Step 13's image brief** for the same
review, so paths always match between the MDX body and the brief Rachel uses
to create the actual files.

```mdx
![Descriptive alt text matching Step 13 brief](/images/og/[slug]-[descriptor].webp)
```

Rules:
- One image per insertion point — never stack multiple images together
- Alt text must be descriptive and specific to the image content
- All content images use `/images/og/[slug]-[descriptor].webp` paths
- AI-generated lifestyle/context images only — never represent the actual product

---

**Step 9 — Save review file**
```
content/reviews/[slug].mdx
```

---

**Step 10 — Update product catalog**
If product is not in `data/products.json`, append:
```json
{
  "id": "[slug]",
  "name": "[Product Name]",
  "slug": "[slug]",
  "category": "[category]",
  "image": "/images/products/[slug].webp",
  "amazonUrl": "[url]",
  "cjUrl": "",
  "featured": true,
  "featuredOrder": [next number]
}
```

---

**Step 11 — Update used keywords**
Append to `references/used-keywords.md` under the correct category:
```
- `[keyword]` → content/reviews/[slug].mdx
```
Add row to the usage log table (date · keyword · file · category).

---

**Step 12 — Confirm completion**
```
✅ File:     content/reviews/[slug].mdx
✅ Keyword:  [keyword] (volume: X · difficulty: X)
✅ Rating:   X.X / 10
✅ Catalog:  added / already existed
```

---

**Step 13 — Output image brief**

```
── IMAGE BRIEF ──────────────────────────────────────────────

PRODUCT IMAGE  →  /public/images/products/[slug].webp
  Size:    600×600px square
  Source:  [manufacturer press kit URL or Amazon listing URL]
  Use:     Homepage product cards only

FEATURED / OG IMAGE  →  /public/images/og/[slug].webp
  Size:    1200×630px
  Use:     Review page hero + social sharing (Open Graph / Twitter Card)
  Canva:   Product photo centered · terracotta bar bottom ·
           "[Product Name]" in Inter Bold · "clarkreviews.com" bottom right

CONTENT IMAGE 1
  File:    /public/images/og/[slug]-[descriptor].webp
  Prompt:  [Adobe Firefly / Midjourney prompt for lifestyle context image]

CONTENT IMAGE 2
  File:    /public/images/og/[slug]-[descriptor].webp
  Prompt:  [prompt]

CONTENT IMAGE 3 (if needed)
  File:    /public/images/og/[slug]-[descriptor].webp
  Prompt:  [prompt]

⚠️  AI prompts are for lifestyle/context images only.
    Never use AI to represent the actual product appearance.
─────────────────────────────────────────────────────────────
```

---

## 11. SEO Quick Reference

> Full rules in `@on-page-seo.md`. This is a fast-check summary only.

| Rule | Requirement |
|---|---|
| Title format | `"[Keyword]: [Hook] (2026)"` — keyword in first 60 chars |
| Meta description | Under 155 chars · includes keyword · benefit statement |
| H1 | One per page · closely matches title tag |
| Word count | 1,200 min · target 1,500–2,000 |
| Keyword density | 3–5 natural mentions |
| Internal links | 3–5 with descriptive anchor text |
| External links | 2–3 authoritative non-affiliate sources |
| Images | WebP only · descriptive alt text · Next.js `<Image />` |
| OG image | 1200×630 WebP at `/images/og/[slug].webp` |
| Schema | Product · Review + reviewRating · FAQPage · BreadcrumbList · Person |
| Canonical | Set via Next.js Metadata API on every page |
| Prices | Never displayed — "Check Price on Amazon" only |

---

## 12. Affiliate & FTC Rules

**Link format:**
```
Amazon:  Amazon SiteStripe OneLink short link (amzn.to/...) — generated manually by Rachel per product via Amazon Associates SiteStripe, never constructed by the agent. Handles regional redirects automatically via OneLink.
CJ:      CJ-generated deep link (from CJ dashboard)
```

**All affiliate links:**
```tsx
<a href={url} target="_blank" rel="nofollow noopener sponsored">
  Check Price on Amazon
</a>
```

**Disclosure placement — all mandatory:**

| Page | Placement |
|---|---|
| Homepage | FTC line below product cards (in HeroBio) |
| Every review | `<AffiliateDisclosure />` before all content |
| Footer | Every page, always — links to `/affiliate-disclosure` |
| `/affiliate-disclosure` | Full statement — standalone page |

**Disclosure text:**
```
As an Amazon Associate and CJ Affiliate partner, I earn from qualifying
purchases. This means I may receive a small commission if you click my
links and buy something — at no extra cost to you. I only recommend
products I've genuinely researched and believe in.
```

---

## 13. Deployment

**`next.config.ts`:**
```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    formats: ['image/webp'],
  },
}

export default nextConfig
```

**Hostinger settings:**
```
Build command:   npm run build
Start command:   npm run start
Node.js version: 24.16.0
```

**Environment variables (Hostinger dashboard + `.env.local`):**
```
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://clarkreviews.com
```

**Pre-deploy checklist:**
- [ ] `output: 'standalone'` in `next.config.ts`
- [ ] All env vars set in Hostinger dashboard
- [ ] `npm run build` passes with zero errors
- [ ] No `middleware.ts` — use `proxy.ts` if needed

---

## 14. Pre-Launch Checklist

| Item | Location | Status |
|---|---|---|
| Profile photo | `public/images/rachel-profile.webp` — 800×800 square | ⬜ |
| Amazon SiteStripe OneLinks | Generate manually via Associates, paste into reviews + products.json | ⬜ |
| GA4 Measurement ID | `.env.local` + Hostinger dashboard | ⬜ |
| Writing voice | `references/voice.md` | ✅ |
| Humour style | `references/humour.md` | ⬜ |
| Opinions | `references/opinions.md` | ⬜ |
| Stories | `references/stories.md` | ⬜ |
| Keywords | `keywords.csv` | ✅ verify volumes with SEMrush/Ahrefs |
| SEO rules | `on-page-seo.md` | ✅ |
| Stats | `references/stats.md` | ✅ |
| First review OG image | `public/images/og/[slug].webp` — 1200×630 | ⬜ per review |
| First product image | `public/images/products/[slug].webp` — 600×600 | ⬜ per review |
