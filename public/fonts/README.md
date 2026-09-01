# Fonts

Self-hosted brand fonts live here and are served from `/fonts/…`.

## Needed: Graveur Display (Bold)

The Strictons wordmark in the header/menu is set in **Graveur Display Bold**
(`--font-display`). The font file is **not** committed to this repo (licensed
font; add it from the brand's font vendor account).

Drop this file into this folder, keeping the exact name:

| File                         | Notes                                      |
| ---------------------------- | ------------------------------------------ |
| `graveur-display-bold.woff2` | the only format needed for target browsers |

(If you also want a `.woff` fallback for legacy browsers, add
`graveur-display-bold.woff` here and a second `url(...) format('woff')` to the
`@font-face` in `src/styles/global.css`.)

Then:

1. Uncomment the `<link rel="preload" href="/fonts/graveur-display-bold.woff2" …>`
   in `src/components/BaseHead.astro`.
2. That's it. The `@font-face` (in `src/styles/global.css`) and the
   `--font-display` token already point at these paths.

Until the file is added, the wordmark falls back to the serif stack defined on
`--font-display` and everything still works.

## Adding the real brand serif later

`--font-serif` (hero headline, menu links) is still a system stack. Swap it the
same way: add the `.woff2` here, add an `@font-face`, repoint `--font-serif` in
`src/styles/global.css`, and add a matching preload.
