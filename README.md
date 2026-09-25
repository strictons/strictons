# Strictons Hotel Guide Studio

Static website for Strictons, including the redesigned FAQ page. The project has no runtime dependencies and can be run locally with Node.js 18 or newer.

## Run locally

```bash
npm run dev
```

Then open [http://127.0.0.1:4173/faq.html](http://127.0.0.1:4173/faq.html).

To use a different port:

```bash
PORT=8080 npm run dev
```

## Check the site

```bash
npm run check
```

## Project structure

- `dist/` — publishable static site
- `dist/faq.html` — FAQ page content and structured data
- `dist/styles.css` — shared styles with FAQ styles scoped to the FAQ page
- `dist/script.js` — navigation and FAQ interaction
- `server.mjs` — dependency-free local development server

## GitHub

When the site is ready, create a repository on GitHub, add it as the remote, then commit and push this folder. No deployment is performed by the local server.
