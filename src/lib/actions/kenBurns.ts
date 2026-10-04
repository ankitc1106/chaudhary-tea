// Slow, one-time scale on a background element — 100% -> ~106% over ~15s.
// Not scroll-linked; starts on mount and runs once (loop-free, settles at
// its end state). Respects prefers-reduced-motion by skipping the animation
// entirely and leaving the element at its natural scale.
export function kenBurns(node: HTMLElement, params: { duration?: number; scale?: number } = {}) {
  const duration = params.duration ?? 15000;
  const scale = params.scale ?? 1.06;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    return {};
  }

  node.style.transform = "scale(1)";
  node.style.transition = `transform ${duration}ms cubic-bezier(0.25, 0.1, 0.25, 1)`;
  node.style.willChange = "transform";

  const raf = requestAnimationFrame(() => {
    node.style.transform = `scale(${scale})`;
  });

  return {
    destroy() {
      cancelAnimationFrame(raf);
    },
  };
}
