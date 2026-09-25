document.documentElement.classList.add("js");

const trigger = document.querySelector(".menu-trigger");
if (trigger && !document.querySelector("#site-menu")) {
  const menuElement = document.createElement("aside");
  menuElement.className = "site-menu";
  menuElement.id = "site-menu";
  menuElement.setAttribute("aria-hidden", "true");
  menuElement.innerHTML = `
    <nav class="site-menu__nav" aria-label="Main navigation">
      <ol>
        <li><a href="./why.html">Why</a></li>
        <li><a href="./how-it-works.html">How It Works</a></li>
        <li><a href="./for-business.html">For Business</a></li>
        <li><a href="./live-version.html">Digital Guides</a></li>
        <li><a href="./faq.html">FAQ</a></li>
        <li><a href="./contact.html">Contact</a></li>
      </ol>
    </nav>`;
  document.body.append(menuElement);
}

const menu = document.querySelector("#site-menu");
const triggerLabel = trigger.querySelector(".menu-trigger__label");
const menuLinks = [...menu.querySelectorAll("a")];
const heroVideo = document.querySelector(".hero__video");
const stickyHeader = document.querySelector(".home-page .site-header, .legal-header");

let scrollPosition = 0;

triggerLabel.classList.add("menu-trigger__label--menu");
const closeLabel = document.createElement("span");
closeLabel.className = "menu-trigger__label menu-trigger__label--close";
closeLabel.textContent = "Close.";
trigger.append(closeLabel);

if (stickyHeader) {
  let headerFrame;

  function updateStickyHeader() {
    headerFrame = undefined;
    stickyHeader.classList.toggle("is-scrolled", window.scrollY > 12);
  }

  function requestStickyHeaderUpdate() {
    if (!headerFrame) headerFrame = requestAnimationFrame(updateStickyHeader);
  }

  window.addEventListener("scroll", requestStickyHeaderUpdate, { passive: true });
  updateStickyHeader();
}

function revealVideo() {
  heroVideo.classList.add("is-playing");
}

if (heroVideo) {
  heroVideo.addEventListener("playing", revealVideo, { once: true });
  if (!heroVideo.paused && heroVideo.readyState >= 2) revealVideo();
}

function openMenu() {
  scrollPosition = window.scrollY;
  document.body.style.top = `-${scrollPosition}px`;
  document.body.classList.add("menu-open");
  menu.classList.add("is-open");
  menu.setAttribute("aria-hidden", "false");
  trigger.setAttribute("aria-expanded", "true");
}

function closeMenu({ restoreFocus = true } = {}) {
  menu.classList.remove("is-open");
  menu.setAttribute("aria-hidden", "true");
  trigger.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
  document.body.style.top = "";
  window.scrollTo(0, scrollPosition);
  if (restoreFocus) trigger.focus();
}

trigger.addEventListener("click", () => {
  if (trigger.getAttribute("aria-expanded") === "true") {
    closeMenu({ restoreFocus: false });
  } else {
    openMenu();
  }
});

document.addEventListener("keydown", (event) => {
  const isOpen = trigger.getAttribute("aria-expanded") === "true";
  if (!isOpen) return;

  if (event.key === "Escape") {
    closeMenu();
    return;
  }

  if (event.key === "Tab") {
    const focusable = [trigger, ...menuLinks];
    const first = focusable[0];
    const last = focusable.at(-1);

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    const willOpen = question.getAttribute("aria-expanded") !== "true";
    const answer = document.getElementById(question.getAttribute("aria-controls"));

    question.setAttribute("aria-expanded", String(willOpen));
    answer.setAttribute("aria-hidden", String(!willOpen));
    question.closest(".faq-item").classList.toggle("is-open", willOpen);
  });
});

const storyReveals = document.querySelectorAll(".story-reveal");

if (storyReveals.length) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -8%" },
  );

  storyReveals.forEach((element) => revealObserver.observe(element));
}
