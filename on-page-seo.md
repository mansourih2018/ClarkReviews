# on-page-seo.md — Clark Reviews
# On-Page SEO Rules

> Read this file fully before writing or editing any review, page, or copy.
> Every rule is mandatory. When in doubt, be more specific, not less.

---

## 1. EEAT — The Core Ranking Signal

Google ranks content on **Experience, Expertise, Authoritativeness, Trustworthiness.**
On a research-based site, EEAT is demonstrated through methodology — not personal testing.

| Signal | How Clark Reviews demonstrates it |
|---|---|
| **Experience** | Cite the depth of research explicitly: "drawn from verified buyer reports," "based on manufacturer specs and return data." Name your sources. |
| **Expertise** | Use accurate product terminology. Reference real specs — dimensions, materials, wattage, capacity. No vague language. |
| **Authoritativeness** | Link to manufacturer spec sheets, Consumer Reports, RTINGS, or independent test labs. Author byline on every review. |
| **Trustworthiness** | FTC disclosure on every review. Minimum 2 real cons. Name who the product is wrong for. Use the site's own rating — never a retailer's. |

Rachel's research methodology is the EEAT differentiator.
Make it visible in the writing — not buried, not implied.

---

## 2. Title Tags

**Format:**
```
[Primary Keyword]: [Hook] (2026)
```

**Rules:**
- Keyword within the **first 60 characters**
- Total length: **50–60 characters** — Google truncates beyond this
- Current year in brackets — freshness signal
- No ALL CAPS · no exclamation marks
- Hook answers a real question or flags a genuine concern

**Good:**
```
Ninja AF101 Air Fryer Review: Worth It in 2026?          ← 51 chars
Best Under Bed Storage Containers: 7 Compared (2026)     ← 52 chars
Bissell Little Green Review: Does It Hold Up? (2026)     ← 53 chars
OXO Drawer Organizer Review: Is the Price Justified?     ← 52 chars
```

**Bad:**
```
Review of the Ninja AF101 Air Fryer                 ← keyword buried
Best Products for Your Kitchen in 2026              ← no keyword, too vague
Ninja Air Fryer — Amazing Results!                  ← exclamation mark, AI-tell
```

---

## 3. Meta Descriptions

**Rules:**
- Length: **140–155 characters**
- Include primary keyword naturally
- Direct benefit statement or answer to the searcher's intent
- End with a micro call-to-action
- Never copy the title tag
- Never open with "In this article..." or "This review covers..."
- Never include a price

**Good:**
```
Three weeks of buyer data and spec research on the Ninja AF101. Fast,
compact, easy to clean — but one flaw is hard to ignore. Read before buying.
```
*(147 characters)*

**Bad:**
```
This article reviews the Ninja AF101 Air Fryer. I will tell you the
pros and cons of this great product. Buy it here for only $99.
```

---

## 4. URL Structure

**Format:**
```
clarkreviews.com/reviews/[keyword-slug]
clarkreviews.com/category/[category-slug]
```

**Rules:**
- Lowercase · hyphens · no underscores
- Maximum 5 words in the slug
- Slug must contain the primary keyword
- No dates in review URLs
- No stop words ("a", "the", "and") unless part of the keyword

**Good:**
```
/reviews/ninja-af101-air-fryer-review
/reviews/best-under-bed-storage-containers
/reviews/bissell-little-green-review
/category/air-fryers
```

**Bad:**
```
/reviews/2026/01/my-ninja-air-fryer-review-honest-thoughts
/reviews/the-very-best-under-bed-storage-containers-i-found
```

---

## 5. Heading Structure

**Rules:**
- **One H1** per page — closely matches the title tag, does not copy it
- **H2s** — main review sections — use secondary keywords naturally
- **H3s** — sub-points within a section
- Never skip a heading level
- Headings must be self-explanatory in isolation

**Standard review heading pattern:**
```
H1:  [Product Name] Review: [Hook] (2026)
H2:  Quick Verdict
H2:  [Product Name] at a Glance
H2:  What Buyers Like About the [Product Name]       ← secondary keyword opportunity
H2:  Common Complaints Worth Knowing
H2:  Who Should Buy the [Product Name]
H2:  Who Should Skip It
H2:  [Product] vs [Alt 1] vs [Alt 2]: How It Compares
H2:  Final Verdict
H2:  Frequently Asked Questions
  H3:  [Question one]
  H3:  [Question two]
```

---

## 6. Keyword Placement

**Primary keyword must appear in all of these:**
- [ ] Title tag — within first 60 characters
- [ ] Meta description — naturally, not forced
- [ ] H1 heading
- [ ] First 100 words of the introduction
- [ ] At least one H2 heading
- [ ] Main product image alt text
- [ ] URL slug

**Density:** 3–5 natural mentions per review.
Anything above 5 reads as stuffing — Google penalises it.

**Secondary keywords:**
Use in H2/H3 headings or once in body text where they fit.
If they don't fit naturally, leave them out.

---

## 7. Internal Linking

**Requirement: 3–5 internal links per review.**

| Rule | |
|---|---|
| Anchor text | Descriptive — never "click here" or "read more" |
| Placement | Natural within body text — not dumped at the bottom |
| Targets | Related reviews + category hub pages |

**Good anchor text:**
```
"my full Cosori air fryer review"
"the best storage bins for pantry organisation"
"all cleaning product reviews"
```

**Bad anchor text:**
```
"click here"  ·  "read more"  ·  "this article"  ·  "here"
```

---

## 8. External Linking

**Requirement: 2–3 external links per review.**

**Acceptable sources:**
- Manufacturer spec sheets and product pages
- Consumer Reports, RTINGS, Wirecutter (for independent test data)
- Academic studies or government safety databases
- Industry standards bodies

**Never link to:**
- Other affiliate review sites
- Competitor blogs
- Any site that earns from the same product recommendations

**Attributes on external editorial links:**
```tsx
<a href={url} target="_blank" rel="noopener">
```
Note: external editorial links do **not** use `nofollow`.
Affiliate links use `nofollow noopener sponsored` — see Section 12 of GEMINI.md.

---

## 9. Images

**Format:** WebP only. No JPEG, no PNG in final output.

### Image types and usage

| Image | Size | Location | Used for |
|---|---|---|---|
| Product image | 600×600px square | `/public/images/products/[slug].webp` | Homepage cards only |
| Featured / OG image | 1200×630px | `/public/images/og/[slug].webp` | Review page hero + Open Graph + Twitter Card |
| Profile photo | 800×800px square | `/public/images/rachel-profile.webp` | HeroBio component |

The **featured image doubles as the OG image** — one file, two uses.
Rachel creates it using the Clark Reviews Canva template.
AI-generated images are for lifestyle/context only — never to represent the actual product.

### File naming
```
Good:  ninja-af101-air-fryer-review.webp
Bad:   IMG_093421.webp  ·  image1.webp  ·  product.webp
```

### Alt text
```
Good:  alt="Ninja AF101 air fryer basket open showing non-stick interior"
Good:  alt="OXO drawer organiser in kitchen cabinet with sorted utensils"
Bad:   alt="air fryer"
Bad:   alt="product image"
Bad:   alt=""              ← never empty on content images
```

### Technical
- Always use Next.js `<Image />` — never `<img>`
- `next.config.ts` must include `images: { formats: ['image/webp'] }`
- Images compressed before adding to `/public/` — target under 150KB

---

## 10. Required Schema (every review page)

All schema generated via `src/lib/schema.ts`. Never write JSON-LD by hand.

| Schema | Generator | What it enables |
|---|---|---|
| `Product` | `generateProductSchema()` | Product identity in Google |
| `Review` + `reviewRating` | `generateReviewSchema()` | Star rating in search results |
| `FAQPage` | built into `<FAQ />` | FAQ rich results |
| `BreadcrumbList` | built into `<Breadcrumbs />` | Breadcrumb trail in SERP |
| `Person` | built into `<AuthorByline />` | Author authority signal |

**`reviewRating` always uses:** `bestRating: "10"`, `worstRating: "1"` — no `AggregateRating` (single editorial review per product)

**No prices in schema** — no `price`, no `priceCurrency`, no `offers` block.

---

## 11. Open Graph & Twitter Card

Set via Next.js Metadata API in each `[slug]/page.tsx`.

```ts
export const metadata: Metadata = {
  title: '[title tag]',
  description: '[meta description]',
  alternates: {
    canonical: `https://clarkreviews.com/reviews/${slug}`,
  },
  openGraph: {
    title: '[title tag]',
    description: '[meta description]',
    url: `https://clarkreviews.com/reviews/${slug}`,
    siteName: 'Clark Reviews',
    images: [
      {
        url: `https://clarkreviews.com/images/og/${slug}.webp`,
        width: 1200,
        height: 630,
        alt: `${productName} review — Clark Reviews`,
      },
    ],
    type: 'article',
    publishedTime: date,
    modifiedTime: updatedDate,
    authors: ['https://clarkreviews.com/about'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '[title tag]',
    description: '[meta description]',
    images: [`https://clarkreviews.com/images/og/${slug}.webp`],
  },
}
```

**OG image rules:**
- 1200×630px WebP — text and key content kept within the central 1000×500px safe zone
- Avoid text too close to edges — platforms crop on mobile
- Same file used as the review page hero image

---

## 12. Content Quality

### Length
- **Minimum:** 1,200 words
- **Target:** 1,500–2,000 words
- **Ideal:** within 20% of the word count of the SERP top-3 for the target keyword
- FAQ section (300–400 words) counts toward the total

### Readability
- Paragraphs: 2–4 sentences maximum
- Flesch Reading Ease target: **60–70**
- One idea per paragraph
- No passive voice where avoidable

### Honesty requirements
- Minimum **2 genuine, specific cons** — vague cons ("not cheap") do not count
- Name **at least 1 persona who should not buy** the product
- Verdict must reflect the data — use "Skip" or "Wait for Sale" when warranted

### No prices — ever
No price, no "from $X", no "under $50", no stock status, no retailer star count.
Sole CTA: **"Check Price on Amazon"**
This keeps the static build accurate indefinitely — no stale price data in HTML.

---

## 13. Table of Contents

**Required on every review.**
Placed immediately after `<AffiliateDisclosure />`, before `<QuickVerdict />`.
The `<TableOfContents />` component reads H2 headings and generates anchor links automatically.
Do not hand-code the TOC.

---

## 14. FAQ Section

**Required on every review.** Minimum 4 questions. Maximum 8.

| Position | Question type |
|---|---|
| Q1 | Main buying concern ("Is the [Product] worth it?") |
| Q2 | Common use case ("Can the [Product] do X?") |
| Q3 | Comparison ("[Product] vs [Alternative] — which is better?") |
| Q4 | Maintenance or longevity ("How do you clean the [Product]?") |
| Q5–8 | Long-tail keyword variants from `keywords.csv` |

**Answer format:** 2–4 complete sentences. No vague answers.
`<FAQ />` generates `FAQPage` JSON-LD automatically — do not add schema manually.

---

## 15. Affiliate Disclosure

**Placement — all mandatory:**

| Location | Requirement |
|---|---|
| Every review page | `<AffiliateDisclosure />` before all content |
| Homepage | FTC line below product cards (in HeroBio) |
| Footer | Every page, always — links to `/affiliate-disclosure` |
| `/affiliate-disclosure` | Standalone page with full statement |

**Disclosure text:**
```
As an Amazon Associate and CJ Affiliate partner, I earn from qualifying
purchases. This means I may receive a small commission if you click my
links and buy something — at no extra cost to you. I only recommend
products I've genuinely researched and believe in.
```

---

## 16. Canonical Tags

Set on every page via Next.js Metadata API:
```ts
alternates: {
  canonical: `https://clarkreviews.com/reviews/${slug}`,
}
```

Never publish two reviews targeting the same primary keyword.
If a URL changes, implement a 301 redirect from the old URL.

---

## 17. Sitemap & Robots

- `src/app/sitemap.ts` — auto-generates `/sitemap.xml`
- Include: homepage · all review pages · all category pages · `/about` · `/affiliate-disclosure`
- `src/app/robots.ts` — generates `/robots.txt`
- Allow all crawlers on all public pages
- Never block CSS or JS files

---

## 18. Annual Review Checklist

Run once per year on every published review:

- [ ] Update year in title tag and meta description
- [ ] Update `updatedDate` in MDX frontmatter
- [ ] Verify Amazon link is still active (products get discontinued)
- [ ] Check for new competing products to add to ComparisonTable
- [ ] Verify all cited specs and statistics are still accurate
- [ ] Check for new long-tail keywords to target in FAQ
- [ ] Confirm OG image still reflects the current product
- [ ] Check word count vs current SERP top-3 — update if significantly outpaced
