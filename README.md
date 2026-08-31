# strictons.com

Marketing / informational site for **Strictons**. Companion to the digital guide
app at [guide.strictons.com](https://guide.strictons.com), which lives in a
separate repository and has its own deployment. **This repo contains no app
logic** — it is purely static marketing content.

Built with [Astro](https://astro.build/) (static output, zero client JS by
default), TypeScript, and Tailwind CSS v4.

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
  robots.txt            Full crawl allowed, incl. AI crawlers
  llms.txt              AI-visibility summary (llmstxt.org convention)
  og-default.png        TODO(brand): placeholder 1200x630 social image
src/
  assets/               Images processed by Astro's <Image> (optimized at build)
  components/
    BaseHead.astro      Reusable SEO / OG / Twitter meta pattern
    Header.astro        Primary nav + logo placeholder
    Footer.astro        Simple footer
  layouts/
    BaseLayout.astro    HTML shell: <head> + header + <main> + footer
  pages/                One file per route (see below)
  styles/global.css     Tailwind entry + font TODO spot
  consts.ts             Site identity, nav links, SEO defaults
astro.config.mjs        site origin, sitemap integration, image service
vercel.json             Deploy config for this project (see Deployment)
.lighthouserc.json      Lighthouse CI thresholds
```

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

- Every route is statically generated at build time; no client JS is shipped
  unless a component explicitly opts in.
- Images go through Astro's `<Image>` component (Sharp) for automatic
  optimization + responsive `srcset`. See the pattern in `src/pages/index.astro`.
- **Fonts:** currently the system font stack (no network cost). When brand fonts
  are chosen, follow the `TODO(fonts)` notes in `src/styles/global.css` and
  `src/components/BaseHead.astro` — self-host, preload the critical weight, and
  set `font-display: swap`.

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

- `TODO(brand)` — logo, favicon, OG image, colors, fonts, social handles.
- `TODO(fonts)` — self-hosted font setup (`global.css`, `BaseHead.astro`).
- `TODO(forms)` — contact form backend (`src/pages/contact.astro`); currently a
  disabled static placeholder.
- `TODO(analytics)` — analytics loader (`src/components/Footer.astro`); none loaded.
- `TODO(content)` — real copy on every page; FAQ Q&A structure + FAQPage JSON-LD.

## Linting / formatting

- `oxlint` (`.oxlintrc.json`) for `.ts` / `.js`.
- Prettier (`.prettierrc.json`) with `prettier-plugin-astro` and
  `prettier-plugin-tailwindcss` (class sorting).
