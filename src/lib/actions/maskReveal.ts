// One-time clip-path "wipe up" reveal for headline text. Runs on mount,
// not on scroll — intended for above-the-fold content only (hero).
// Respects prefers-reduced-motion by rendering in its final state.
export function maskReveal(
  node: HTMLElement,
  params: { delay?: number; duration?: number } = {}
) {
  const delay = params.delay ?? 0;
  const duration = params.duration ?? 900;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    return {};
  }

  node.style.clipPath = "inset(0 0 100% 0)";
  node.style.opacity = "0";
  node.style.transition = `clip-path ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, opacity ${Math.min(
    duration,
    500
  )}ms ease-out ${delay}ms`;

  const raf = requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      node.style.clipPath = "inset(0 0 0% 0)";
      node.style.opacity = "1";
    });
  });

  return {
    destroy() {
      cancelAnimationFrame(raf);
    },
  };
}
