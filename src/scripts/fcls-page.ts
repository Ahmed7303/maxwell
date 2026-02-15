import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reducedMotion) {
  document.querySelectorAll('[data-fcls-reveal]').forEach((el) => {
    const h = el as HTMLElement;
    h.style.opacity = '1';
    h.style.transform = 'none';
  });
} else {
  /* ── Hero text — staggered reveal on load ── */
  gsap.to('[data-fcls-hero] [data-fcls-reveal]', {
    opacity: 1,
    y: 0,
    duration: 0.55,
    stagger: 0.1,
    ease: 'power2.out',
    delay: 0.15,
  });

  /* ── Specification cards ── */
  gsap.to('[data-fcls-specs] [data-fcls-reveal]', {
    scrollTrigger: {
      trigger: '[data-fcls-specs]',
      start: 'top 82%',
    },
    opacity: 1,
    y: 0,
    duration: 0.45,
    stagger: 0.08,
    ease: 'power2.out',
  });

  /* ── Application items ── */
  gsap.to('[data-fcls-apps] [data-fcls-reveal]', {
    scrollTrigger: {
      trigger: '[data-fcls-apps]',
      start: 'top 82%',
    },
    opacity: 1,
    x: 0,
    duration: 0.4,
    stagger: 0.07,
    ease: 'power2.out',
  });

  /* ── Packaging cards ── */
  gsap.to('[data-fcls-pack] [data-fcls-reveal]', {
    scrollTrigger: {
      trigger: '[data-fcls-pack]',
      start: 'top 82%',
    },
    opacity: 1,
    y: 0,
    duration: 0.45,
    stagger: 0.12,
    ease: 'power2.out',
  });
}
