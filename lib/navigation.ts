export function scrollBehavior(): ScrollBehavior {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}

export function scrollToSection(id: string, options: { focus?: boolean; behavior?: ScrollBehavior } = {}): boolean {
  const element = document.getElementById(id);
  if (!element) return false;
  if (options.focus) {
    if (!element.hasAttribute('tabindex')) {
      element.setAttribute('tabindex', '-1');
      element.addEventListener('blur', () => element.removeAttribute('tabindex'), { once: true });
    }
    element.focus({ preventScroll: true });
  }
  // Layout offsets ignore the temporary translation used by page entrance animations.
  let top = 0;
  for (let node: HTMLElement | null = element; node; node = node.offsetParent as HTMLElement | null) top += node.offsetTop;
  window.scrollTo({ top: Math.max(0, top - 96), behavior: options.behavior ?? scrollBehavior() });
  return true;
}

