# AIvoorU — Project Context

## What is this?

AIvoorU is an AI consultancy & implementation service for freelancers (ZZP'ers) and small businesses (MKB) in the Netherlands. This repo is the marketing website at **aivoorjou.nu**.

- **Brand name:** AIvoorU
- **Domain:** aivoorjou.nu
- **Email:** info@aivooru.nu (different domain from website)
- **Founder:** Marius (solo developer)

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------| 
| Framework | Next.js (App Router) | 16.x |
| UI | React | 19.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| i18n | next-intl | 4.x |
| Animations | Framer Motion | 12.x |
| 3D (unused) | Three.js + R3F + Drei | Installed, reserved for future |
| Scheduling | @calcom/embed-react | 1.x (free plan) |
| Hosting | Vercel | Production only, auto-deploy on push to master |
| Analytics | Vercel Analytics | — |

## Architecture

Single-page site with locale-based routing (`/nl`, `/en`). Default locale is Dutch.

```
src/
├── app/
│   ├── layout.tsx              # Root layout (metadataBase)
│   ├── robots.ts               # robots.txt
│   ├── sitemap.ts              # Sitemap (nl + en)
│   ├── globals.css             # Theme, custom CSS
│   └── [locale]/
│       ├── layout.tsx          # Metadata, fonts, header, JSON-LD
│       ├── page.tsx            # Homepage sections
│       └── opengraph-image.tsx # Locale-aware OG image (edge)
├── components/
│   ├── JsonLd.tsx              # Schema.org (Organization, Service, FAQ)
│   ├── v10/                    # Page section components (Header, Hero, PainPoints, etc.)
│   └── ui/                     # Reusable animation components
├── i18n/
│   ├── routing.ts              # Locale config (nl, en)
│   └── request.ts              # Translation loading
├── lib/
│   └── utils.ts                # cn() class utility
└── middleware.ts                # Locale routing
messages/
├── nl.json                     # Dutch translations
└── en.json                     # English translations
```

## Page Sections (in order)

Hero → PainPoints → UseCaseShowcase → HowIWork → About → CTABanner → FAQ → Footer

All section components are in `src/components/v10/` and are client components using `useTranslations()`.

## Key Conventions

- **Translations:** All user-facing text lives in `messages/{locale}.json`. Top-level `meta` key is used by layout metadata; all content is under `v10.*` namespace.
- **Brand name:** Always "AIvoorU" (not "AIvoorjou" — that's only the domain).
- **Fonts:** Poppins (headings, 600-700) + Inter (body, 300-600), loaded via `next/font/google`.
- **Colors:** teal (#0EA5E9), violet (#8B5CF6), navy (#0F172A), slate (#64748B), ice (#F0F9FF) — defined in globals.css `@theme`.
- **Animations:** Framer Motion with `useReducedMotion()` support. Key patterns: blur-fade on scroll, word-fade-in, shimmer buttons.
- **No API routes** — this is a static marketing site.
- **No tests** — not planned.

## SEO Setup

- Next.js Metadata API for titles, descriptions, OG tags, Twitter cards
- hreflang alternates for nl/en
- JSON-LD: ProfessionalService + Service + FAQPage schemas
- Sitemap at `/sitemap.xml`
- robots.txt allows all, disallows `/api/`

## Deployment

- **Git:** Push to `master` → Vercel auto-deploys
- **No staging/preview environment**
- **No CI/CD** beyond Vercel
- **No error monitoring** (no Sentry)
- **Google Search Console:** Not yet set up

## Security Headers (next.config.ts)

- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Strict-Transport-Security (HSTS, 1 year)
- No CSP (intentional)

## Performance

- Target: Green Core Web Vitals scores
- Static generation for both locales
- OG image runs on edge runtime

## Notes

- Some `ui/` components (device-mockup, conversation-player, timeline-moment, prompt-grid, etc.) are not used by v10 but kept for potential future use
- Three.js deps installed but unused — reserved for future 3D features
- Many `.env` keys (Twilio, SERPAPI, Google Maps, etc.) are legacy from another project, not used by this site

## Cal.com Integration

Embedded in CTABanner via `@calcom/embed-react`. Booking link: `marius-ai-voor-u-zff3jy/30min`. Free plan, 30-minute slots, month view, 24h clock, light theme.
