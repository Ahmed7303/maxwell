import { gsap } from "gsap";

const header = document.querySelector<HTMLElement>("[data-header]");
if (header) {
  gsap.fromTo(
    header,
    { autoAlpha: 0, y: -8 },
    { autoAlpha: 1, y: 0, duration: 0.2, ease: "power1.out" }
  );
}

const desktopBreakpoint = window.matchMedia("(min-width: 768px)");
const dropdowns = Array.from(document.querySelectorAll<HTMLElement>("[data-dropdown]"));
let activeDropdown: HTMLElement | null = null;

const animateOpen = (menu: HTMLElement) => {
  gsap.killTweensOf(menu);
  menu.classList.remove("invisible");
  gsap.fromTo(
    menu,
    { opacity: 0, y: -4 },
    { opacity: 1, y: 0, duration: 0.18, ease: "power1.out" }
  );
};

const animateClose = (menu: HTMLElement) => {
  gsap.killTweensOf(menu);
  gsap.to(menu, {
    opacity: 0,
    y: -4,
    duration: 0.16,
    ease: "power1.out",
    onComplete: () => menu.classList.add("invisible"),
  });
};

const openDropdown = (dropdown: HTMLElement) => {
  const trigger = dropdown.querySelector<HTMLElement>("[data-dropdown-trigger]");
  const menu = dropdown.querySelector<HTMLElement>("[data-dropdown-menu]");
  if (!trigger || !menu) return;
  if (activeDropdown && activeDropdown !== dropdown) closeDropdown(activeDropdown);
  trigger.setAttribute("aria-expanded", "true");
  animateOpen(menu);
  activeDropdown = dropdown;
};

const closeDropdown = (dropdown: HTMLElement) => {
  const trigger = dropdown.querySelector<HTMLElement>("[data-dropdown-trigger]");
  const menu = dropdown.querySelector<HTMLElement>("[data-dropdown-menu]");
  if (!trigger || !menu) return;
  trigger.setAttribute("aria-expanded", "false");
  animateClose(menu);
  if (activeDropdown === dropdown) activeDropdown = null;
};

dropdowns.forEach((dropdown) => {
  const trigger = dropdown.querySelector<HTMLElement>("[data-dropdown-trigger]");
  const menu = dropdown.querySelector<HTMLElement>("[data-dropdown-menu]");
  if (!trigger || !menu) return;

  trigger.addEventListener("click", (event) => {
    event.stopPropagation();
    const expanded = trigger.getAttribute("aria-expanded") === "true";
    expanded ? closeDropdown(dropdown) : openDropdown(dropdown);
  });

  dropdown.addEventListener("mouseenter", () => {
    if (desktopBreakpoint.matches) openDropdown(dropdown);
  });

  dropdown.addEventListener("mouseleave", () => {
    if (desktopBreakpoint.matches) closeDropdown(dropdown);
  });

  dropdown.addEventListener("focusout", () => {
    setTimeout(() => {
      if (!dropdown.contains(document.activeElement)) closeDropdown(dropdown);
    }, 0);
  });
});

const mobileToggle = document.querySelector<HTMLElement>("[data-mobile-toggle]");
const mobileMenu = document.querySelector<HTMLElement>("[data-mobile-menu]");
const mobileIndustriesToggle = document.querySelector<HTMLElement>("[data-mobile-industries-toggle]");
const mobileIndustriesPanel = document.querySelector<HTMLElement>("[data-mobile-industries-panel]");
const mobileIndustriesIcon = document.querySelector<HTMLElement>("[data-mobile-industries-icon]");

const closeAllDesktopDropdowns = () => {
  dropdowns.forEach((dropdown) => closeDropdown(dropdown));
};

const closeMobileMenu = () => {
  if (!mobileToggle || !mobileMenu) return;
  mobileToggle.setAttribute("aria-expanded", "false");
  mobileMenu.classList.add("hidden");
};

mobileToggle?.addEventListener("click", () => {
  if (!mobileMenu) return;
  const isOpen = mobileToggle.getAttribute("aria-expanded") === "true";
  mobileToggle.setAttribute("aria-expanded", String(!isOpen));
  mobileMenu.classList.toggle("hidden", isOpen);
  if (!isOpen) closeAllDesktopDropdowns();
});

mobileIndustriesToggle?.addEventListener("click", () => {
  if (!mobileIndustriesPanel || !mobileIndustriesIcon) return;
  const isExpanded = mobileIndustriesToggle.getAttribute("aria-expanded") === "true";
  mobileIndustriesToggle.setAttribute("aria-expanded", String(!isExpanded));
  mobileIndustriesPanel.classList.toggle("hidden", isExpanded);
  mobileIndustriesIcon.classList.toggle("rotate-180", !isExpanded);
});

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Node)) return;
  if (!dropdowns.some((dropdown) => dropdown.contains(target))) closeAllDesktopDropdowns();
  if (mobileMenu && mobileToggle && !mobileMenu.contains(target) && !mobileToggle.contains(target)) {
    closeMobileMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  closeAllDesktopDropdowns();
  closeMobileMenu();
  mobileIndustriesToggle?.setAttribute("aria-expanded", "false");
  mobileIndustriesPanel?.classList.add("hidden");
  mobileIndustriesIcon?.classList.remove("rotate-180");
});

window.addEventListener("resize", () => {
  if (desktopBreakpoint.matches) {
    closeMobileMenu();
  } else {
    closeAllDesktopDropdowns();
  }
});
