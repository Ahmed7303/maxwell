import { gsap } from "gsap";

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reducedMotion) {
  document.querySelectorAll("[data-hero-reveal]").forEach((el) => {
    const h = el as HTMLElement;
    h.style.opacity = "1";
    h.style.transform = "none";
  });
} else {
  gsap.to("[data-hero] [data-hero-reveal]", {
    opacity: 1,
    y: 0,
    duration: 0.55,
    stagger: 0.1,
    ease: "power2.out",
    delay: 0.15,
  });
}
