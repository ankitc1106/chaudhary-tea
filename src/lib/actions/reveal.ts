export function reveal(node: HTMLElement, params: { delay?: number } = {}) {
  const delay = params.delay ?? 0;

  if (typeof IntersectionObserver === "undefined") {
    node.classList.add("reveal-visible");
    return {};
  }

  node.classList.add("reveal-init");

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setTimeout(() => node.classList.add("reveal-visible"), delay);
          observer.unobserve(node);
        }
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );

  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    },
  };
}
