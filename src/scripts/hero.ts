import { gsap } from "gsap";

let initialized = false;

export function initHero(): void {
  if (initialized) return;

  const hero = document.querySelector<HTMLElement>("[data-hero]");
  if (!hero) return;
  initialized = true;

  const revealItems = hero.querySelectorAll<HTMLElement>("[data-hero-reveal]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) {
    gsap.set(revealItems, { autoAlpha: 1, y: 0 });
    return;
  }

  const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

  tl.fromTo(
    revealItems,
    { autoAlpha: 0, y: 10 },
    { autoAlpha: 1, y: 0, duration: 0.22, stagger: 0.07 }
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => initHero(), { once: true });
} else {
  initHero();
}
