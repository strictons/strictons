# strictons.com

Marketing / informational site for **Strictons**. Companion to the digital guide
app at [guide.strictons.com](https://guide.strictons.com), which lives in a
separate repository and has its own deployment. **This repo contains no app
logic** — it is purely static marketing content.

Built with [Astro](https://astro.build/) (static output, ~1 KB of client JS for
the nav menu and nothing else), TypeScript, and Tailwind CSS v4.

> **Status:** structure / shell only. Every page is placeholder content. Real
> copy, imagery, and branding come later and will follow the brand direction of
> the guide app.

---

## Requirements

- Node.js 20+ (the CI/dev environment here uses a current LTS/latest release)
- npm

## Getting started

```bash
npm install
npm run dev
```

Dev server runs at `http://localhost:4321`.

## Scripts

| Script                 | What it does                                  |
| ---------------------- | --------------------------------------------- |
| `npm run dev`          | Start the local dev server                    |
| `npm run build`        | Static build to `dist/`                       |
| `npm run preview`      | Serve the built `dist/` locally               |
| `npm run check`        | `astro check` — type-check `.astro` / `.ts`   |
| `npm run lint`         | `oxlint` over the source                      |
| `npm run format`       | Prettier write                                |
| `npm run format:check` | Prettier check (CI-friendly)                  |
| `npm run lighthouse`   | Build, then run Lighthouse CI against `dist/` |

## Project structure

```
public/                 Static assets served as-is
  favicon.svg           TODO(brand): placeholder mark
  fonts/                Self-hosted brand fonts — see public/fonts/README.md
  robots.txt            Full crawl allowed, incl. AI crawlers
  llms.txt              AI-visibility summary (llmstxt.org convention)
  og-default.png        TODO(brand): placeholder 1200x630 social image
src/
  assets/               Images processed by Astro's <Image> (optimized at build)
    strictons-logo.png  Brand lion mark (see "Logo" below)
  components/
    BaseHead.astro      Reusable SEO / OG / Twitter meta pattern
    Header.astro        Logo lockup + hamburger + full-screen overlay menu
    Hero.astro          Home-page full-viewport hero (linen column | artwork)
    Footer.astro        Simple footer (also carries the full nav link list)
  layouts/
    BaseLayout.astro    HTML shell: <head> + header + <main> + footer
  pages/                One file per route (see below)
  styles/global.css     Tailwind entry + @font-face + font tokens
  consts.ts             Site identity, nav links, SEO defaults
astro.config.mjs        site origin, sitemap integration, image service
vercel.json             Deploy config for this project (see Deployment)
.lighthouserc.json      Lighthouse CI thresholds
```

### Navigation

The header is just the logo lockup + a hamburger button, at every breakpoint
([`Header.astro`](src/components/Header.astro)). Opening it:

1. A **curtain** (`#primary-nav`) drops from above the viewport — slow to start,
   accelerating into the finish. Its background is `bg-artwork-blend`, a gradient
   mixed from colours sampled out of the painting.
2. The logo + hamburger stay pinned on top; the hamburger **morphs into an X**.
3. Once the curtain lands, the links (`.nav-reveal`) **fade + rise** into view.

The menu lists everything except Home (the logo links home) with no item numbers.
All the motion is CSS in `global.css`, keyed off `data-open` / `data-nav-open`
attributes and `aria-expanded`; `prefers-reduced-motion` collapses it.

Progressive enhancement:

- A small inline `<script>` toggles those attributes and handles `Escape`, focus
  trap (spanning the header) + restore, `aria-expanded`, and scroll-lock. It's
  the only client JS the site ships.
- Without JS, a `<noscript>` style renders the links as a plain inline list and
  hides the toggle. The footer also carries every nav link.

### Logo

`src/assets/strictons-logo.png` is a trimmed, transparent, single-colour (black)
lion mark, **mirrored to face left**, derived from the supplied
`strictons-logo.svg` (a 660 KB Canva export that wrapped a raster PNG + a baked
white background — not usable as-is in the header). It renders black on light
headers and is flipped to white with a CSS `invert` filter over dark surfaces
(mobile hero, open menu). Replace it with a proper vector mark when one exists;
keep the transparent, single-colour, tightly-cropped, left-facing shape.

The wordmark next to it is **"Graveur Display" Bold** (`--font-display`) — the
font file still needs to be added, see [`public/fonts/README.md`](public/fonts/README.md).

### Routes

| URL             | File                           |
| --------------- | ------------------------------ |
| `/`             | `src/pages/index.astro`        |
| `/for-hotels`   | `src/pages/for-hotels.astro`   |
| `/for-business` | `src/pages/for-business.astro` |
| `/faq`          | `src/pages/faq.astro`          |
| `/contact`      | `src/pages/contact.astro`      |
| `404`           | `src/pages/404.astro`          |

## Adding a page

1. Create `src/pages/<slug>.astro`.
2. Wrap content in `<BaseLayout title="…" description="…">`.
3. Use a single `<h1>` and semantic sections.
4. Add the route to `NAV_LINKS` in `src/consts.ts` if it belongs in the nav.
5. It is picked up by `sitemap-index.xml` automatically on the next build.

Per-page `<head>` extras (JSON-LD, extra preloads) go in the `head` slot:

```astro
<BaseLayout title="…">
  <script
    type="application/ld+json"
    slot="head"
    set:html={JSON.stringify(data)}
  />
  …
</BaseLayout>
```

## SEO

- **Titles / descriptions** — props on `<BaseLayout>` (forwarded to `BaseHead`).
- **Open Graph + Twitter cards** — templated in `src/components/BaseHead.astro`;
  defaults from `SITE` in `src/consts.ts`.
- **Canonical URLs** — emitted on every page from `Astro.site` + pathname.
- **Sitemap** — `@astrojs/sitemap`, output at `/sitemap-index.xml`.
- **robots.txt** — `public/robots.txt`, full crawl, references the sitemap.
- **Structured data** — Organization JSON-LD scaffolded on the homepage
  (`src/pages/index.astro`); placeholder values, mechanism is wired up.

## AI visibility

- `public/llms.txt` — summary + key links per the
  [llms.txt](https://llmstxt.org/) convention (placeholder copy).
- `robots.txt` explicitly allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended,
  and other AI crawlers.
- All page content is server-rendered static HTML — no content hidden behind
  client JS or interaction, so non-JS crawlers read the real page.

## Performance

- Every route is statically generated at build time. The only client JS is the
  ~1 KB nav-menu toggle in `Header.astro`.
- Images go through Astro's `<Image>` component (Sharp) for automatic
  optimization + responsive `srcset`. See the pattern in `src/components/Hero.astro`.
- **Fonts:** `--font-sans` / `--font-serif` are system stacks (no network cost).
  `--font-display` (the wordmark) points at "Graveur Display" via an `@font-face`
  with `font-display: swap` — the file needs adding, see
  [`public/fonts/README.md`](public/fonts/README.md); until then it falls back to
  serif. When it's added, uncomment the preload in `src/components/BaseHead.astro`.

### Lighthouse CI

Config in `.lighthouserc.json`. Run locally:

```bash
npm run lighthouse
```

This builds the site and runs Lighthouse against `dist/`, asserting minimum
scores for performance / a11y / SEO / best-practices. Wire the same command into
CI (GitHub Actions: `treosh/lighthouse-ci-action`, or `lhci autorun` directly)
to track scores as real content lands.

## Deployment

**Target: Vercel**, its own project, domain `strictons.com`.

- This is a **separate Vercel project** from the guide app. Do not point it at,
  or copy deployment settings from, the `guide.strictons.com` repo.
- `vercel.json` here sets the Astro framework preset, `dist/` output, clean URLs,
  no trailing slashes, long-cache headers for hashed `/_astro/` assets, and basic
  security headers.
- Vercel auto-detects Astro; no adapter is needed for static output.

Setup: create a new Vercel project from this repo, add the `strictons.com` domain
to it, deploy.

## TODO markers (where things plug in later)

- `TODO(brand)` — favicon, OG image, colors, social handles; replace the raster
  lion mark with a vector one.
- `TODO(fonts)` — add `public/fonts/graveur-display-bold.woff2` (see
  `public/fonts/README.md`); swap `--font-serif` for the real brand serif.
- `TODO(forms)` — contact form backend (`src/pages/contact.astro`); currently a
  disabled static placeholder.
- `TODO(analytics)` — analytics loader (`src/components/Footer.astro`); none loaded.
- `TODO(content)` — real copy on every page; FAQ Q&A structure + FAQPage JSON-LD.

## Linting / formatting

- `oxlint` (`.oxlintrc.json`) for `.ts` / `.js`.
- Prettier (`.prettierrc.json`) with `prettier-plugin-astro` and
  `prettier-plugin-tailwindcss` (class sorting).
