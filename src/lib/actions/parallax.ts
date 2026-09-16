export function parallax(node: HTMLElement, speed: number = 0.15) {
  function update() {
    const y = window.scrollY;
    node.style.transform = `translate3d(0, ${y * speed}px, 0) scale(1.2)`;
  }

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);

  return {
    destroy() {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    },
  };
}
