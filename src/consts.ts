/**
 * Site-wide constants. Single source of truth for identity, nav, and SEO
 * defaults so new pages only supply page-specific fields.
 */

export const SITE = {
  name: 'Strictons',

  /**
   * Canonical production origin (no trailing slash).
   * Keep in sync with `site` in astro.config.mjs.
   */
  url: 'https://strictons.com',

  /** Default meta description. Per-page descriptions override this. */
  description:
    'Strictons builds digital guides for hotels and businesses. This is the marketing and information site for the Strictons digital guide platform.',

  /** Contact address (also used in structured data + llms.txt). */
  email: 'guides@strictons.com',

  /**
   * Fallback Open Graph / Twitter card image (absolute path from site root).
   * TODO(brand): replace public/og-default.png with a real 1200x630 asset.
   */
  defaultOgImage: '/og-default.png',

  /** TODO(brand): set the real handle once brand social accounts exist. */
  twitterHandle: '@strictons',

  locale: 'en_US',
} as const;

/** Primary navigation, shown in the header's full-screen menu. */
export const NAV_LINKS = [
  { href: '/for-hotels', label: 'For Hotels' },
  { href: '/for-business', label: 'For Business' },
  { href: '/faq', label: 'FAQs' },
  { href: '/contact', label: 'Contact' },
] as const;

/**
 * Copyright line. Shown in the slim footer on inner pages, and at the bottom of
 * the hero on desktop home (hidden on mobile home). Year is fixed at build time.
 */
export const COPYRIGHT = `© ${new Date().getFullYear()} ${SITE.name} · All rights reserved`;
