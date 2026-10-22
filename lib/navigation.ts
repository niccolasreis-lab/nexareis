export function scrollBehavior(): ScrollBehavior {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}

export function scrollToSection(id: string): boolean {
  const element = document.getElementById(id);
  if (!element) return false;
  window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - 96, behavior: scrollBehavior() });
  return true;
}
