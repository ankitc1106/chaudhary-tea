export function cursorGlow(node: HTMLElement) {
  function handleMove(e: MouseEvent) {
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    node.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  node.classList.add("cursor-glow");
  node.addEventListener("mousemove", handleMove);

  return {
    destroy() {
      node.removeEventListener("mousemove", handleMove);
    },
  };
}
