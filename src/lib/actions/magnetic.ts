export function magnetic(node: HTMLElement, strength: number = 0.35) {
  function handleMove(e: MouseEvent) {
    const rect = node.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    node.style.transform = `translate(${relX * strength}px, ${relY * strength}px)`;
  }

  function reset() {
    node.style.transform = "";
  }

  node.addEventListener("mousemove", handleMove);
  node.addEventListener("mouseleave", reset);

  return {
    destroy() {
      node.removeEventListener("mousemove", handleMove);
      node.removeEventListener("mouseleave", reset);
    },
  };
}
