// One-time clip-path wipe reveal for the Gold Tea / Coffee signature image.
// Unlike maskReveal (hero, fires on mount), this fires the first time the
// node scrolls into view, then stops — never retriggers.
//
// Uses a rAF poll against getBoundingClientRect rather than
// IntersectionObserver: IO's callback scheduling proved unreliable for this
// element (never fired in testing despite the node being well within the
// viewport), so visibility is checked directly every frame instead.
export function curtainReveal(
  node: HTMLElement,
  params: { duration?: number; threshold?: number } = {}
) {
  const duration = params.duration ?? 900;
  const threshold = params.threshold ?? 0.2;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    return {};
  }

  node.style.clipPath = "inset(0 100% 0 0)";
  node.style.transition = `clip-path ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`;

  let rafId: number;
  let revealed = false;

  function visibleRatio() {
    const rect = node.getBoundingClientRect();
    if (rect.height <= 0) return 0;
    const visible = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
    return Math.max(0, visible) / rect.height;
  }

  function check() {
    if (revealed) return;
    if (visibleRatio() >= threshold) {
      revealed = true;
      node.style.clipPath = "inset(0 0% 0 0)";
      return;
    }
    rafId = requestAnimationFrame(check);
  }
  rafId = requestAnimationFrame(check);

  return {
    destroy() {
      cancelAnimationFrame(rafId);
    },
  };
}
