# Conley Logistics LLC — Website

Production-ready marketing website for **Conley Logistics LLC**, a New Orleans courier and local delivery service.

## Overview

This is a fully static Next.js site with:

- Premium black-and-gold cinematic design
- All public pages and 10 service detail routes
- Multi-step quote request and contact forms
- Server-side SMTP email delivery (Nodemailer)
- Local SEO (metadata, JSON-LD, sitemap, robots)
- Accessibility and reduced-motion support
- No database, admin portal, CMS, or customer login

## Technology Stack

- **Next.js 16** (App Router)
- **TypeScript** (strict)
- **Tailwind CSS v4**
- **Framer Motion** + **GSAP** (selected sequences) + **Lenis** (smooth scroll)
- **React Hook Form** + **Zod**
- **Nodemailer** (SMTP)
- **Lucide React**, **Sonner**, **Swiper** (where used)

## Installation

```bash
npm install
cp .env.example .env.local
```

Edit `.env.local` with your SMTP credentials and site URL.

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Production Build

```bash
npm run typecheck
npm run lint
npm run build
npm start
```

## Environment Variables

Copy `.env.example` to `.env.local`:

| Variable | Description |
|----------|-------------|
| `SMTP_HOST` | SMTP server hostname |
| `SMTP_PORT` | SMTP port (587 recommended) |
| `SMTP_SECURE` | `true` for port 465, else `false` |
| `SMTP_USER` | SMTP username |
| `SMTP_PASS` | SMTP password or app password |
| `SMTP_FROM_NAME` | Sender display name |
| `SMTP_FROM_EMAIL` | From address (must be authorized on SMTP account) |
| `CONTACT_TO_EMAIL` | Business inbox (default: sconley9922@yahoo.com) |
| `NEXT_PUBLIC_SITE_URL` | Public site URL for SEO/canonical links |

**Never** expose SMTP credentials via `NEXT_PUBLIC_` variables.

### Gmail / Yahoo Setup (Examples)

- **Yahoo**: Enable two-step verification, generate an app password, use it as `SMTP_PASS`. Host: `smtp.mail.yahoo.com`, port `587`.
- **Gmail**: Use an app password with `smtp.gmail.com` on port `587`. The From address should match the authenticated account.

## Email Flow

### Contact form (`POST /api/contact`)

1. Validates input server-side (Zod + honeypot)
2. Sends HTML + plain-text email to `CONTACT_TO_EMAIL`
3. Sends acknowledgement to requester (`Conley Logistics LLC — Request Received`)
4. Sets `replyTo` to the requester's email

### Quote form (`POST /api/quote`)

1. Validates full quote payload
2. Generates reference number (`CL-...`)
3. Sends detailed quote email to business with reference, service, date, pickup/delivery
4. Sends acknowledgement with reference to requester
5. Returns reference number to the client on success

If SMTP is not configured, APIs return **503** with a clear message — forms never fake success.

## Rate Limiting

In-memory IP rate limiting (5 requests per 15 minutes per endpoint) is included for development/single-instance use.

**Production note**: Multi-instance or serverless deployments need a durable rate-limit provider (Redis, Upstash, etc.).

## Editing Content

Business information is centralized in typed data files:

| File | Contents |
|------|----------|
| `data/site.ts` | Name, phone, email, hours, navigation, legal notices |
| `data/services.ts` | All services and detail page content |
| `data/faqs.ts` | FAQ entries |
| `data/gallery.ts` | Gallery items and categories |
| `data/pricing.ts` | Pricing copy and factors |
| `data/images.ts` | Centralized image paths |

### Replace the logo

Place the official asset at:

```text
public/brand/conley-logistics-logo.png
```

Optional hooks (not included): `public/brand/favicon.ico`, `public/brand/og-image.png`

### Replace gallery / page images

Replace SVG placeholders in `public/images/placeholders/` and update `data/images.ts` when adding real photography. Label placeholders as **Service illustration** until authentic photos are supplied.

## Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/about` | About |
| `/services` | Services grid |
| `/services/[slug]` | Service detail (10 pages) |
| `/gallery` | Gallery with lightbox |
| `/pricing` | Pricing |
| `/contact` | Contact form |
| `/request-a-quote` | Multi-step quote form |
| `/sitemap.xml` | Sitemap |
| `/robots.txt` | Robots |

## Medical / Privacy Warning

Public forms include notices not to submit protected health information (PHI). Do not collect patient names, medical records, or test results through the website forms.

## Deployment

Build and deploy to any Node.js host (Vercel, Railway, VPS, etc.):

1. Set all environment variables in the hosting dashboard
2. Run `npm run build`
3. Start with `npm start` or the platform's Next.js preset

Set `NEXT_PUBLIC_SITE_URL` to your production domain for correct canonical URLs and Open Graph links.

## Content Still Needed from Client

- Real company photography (vehicles, operations, completed work)
- Confirmed delivery radius for surrounding areas
- Confirmed Sunday / emergency availability policy
- Exact handling capabilities (temperature, chain-of-custody, etc.)
- Compliance/certification evidence if claims are desired
- Physical address if it should be public
- Privacy policy and service terms
- Additional quote rules or restrictions

## License

Private — Conley Logistics LLC
