import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const requiredFiles = [
  "dist/index.html",
  "dist/faq.html",
  "dist/styles.css",
  "dist/script.js"
];

await Promise.all(requiredFiles.map((file) => access(resolve(file))));

const faq = await readFile(resolve("dist/faq.html"), "utf8");
const home = await readFile(resolve("dist/index.html"), "utf8");
const styles = await readFile(resolve("dist/styles.css"), "utf8");
const script = await readFile(resolve("dist/script.js"), "utf8");
const sharedPages = await Promise.all(
  ["contact", "faq", "for-business", "how-it-works", "live-version", "privacy", "terms"].map((page) =>
    readFile(resolve(`dist/${page}.html`), "utf8")
  )
);

const assertions = [
  [home.includes("vc_h264") && home.includes('autoplay muted loop playsinline preload="auto"'), "Hero video uses a browser-compatible, eager-loading source"],
  [script.includes("playHeroVideo") && script.includes("heroVideo.play()"), "Hero video playback is started explicitly"],
  [faq.includes('type="application/ld+json"'), "FAQ structured data is present"],
  [faq.match(/class="faq-question"/g)?.length === 23, "All 23 FAQ questions are present"],
  [faq.match(/aria-expanded="false"/g)?.length === 24, "FAQ rows and menu start collapsed"],
  [styles.includes("prefers-reduced-motion"), "Reduced-motion styles are present"],
  [script.includes("faqQuestions.forEach") && styles.includes(".faq-item.is-open .faq-answer"), "Accordion behaviour is present"],
  [sharedPages.every((page) => page.includes('class="site-footer__top"')), "All internal pages use the full shared footer"],
  [styles.includes(".legal-header.is-scrolled::before"), "Internal pages use the sticky glass header treatment"]
];

for (const [passed, message] of assertions) {
  if (!passed) throw new Error(`Check failed: ${message}`);
  console.log(`✓ ${message}`);
}
