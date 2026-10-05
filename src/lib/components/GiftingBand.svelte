<script lang="ts">
  import { onMount } from "svelte";

  let el: HTMLElement;

  // One quiet entrance for the whole section — opacity + small rise, no
  // per-item staggering. Deliberately calmer than Banaras Story: no GSAP,
  // no scroll-scrub, just a single restrained reveal.
  function subtleReveal(node: HTMLElement) {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return {};

    node.style.opacity = "0";
    node.style.transform = "translateY(12px)";
    node.style.transition = "opacity 500ms ease-out, transform 500ms ease-out";

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
      if (visibleRatio() >= 0.25) {
        revealed = true;
        node.style.opacity = "1";
        node.style.transform = "translateY(0)";
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

  const offerings = [
    {
      n: "01",
      title: "Gifting",
      copy: "Thoughtful tea and coffee gifts for celebrations, festivals, clients and special occasions.",
    },
    {
      n: "02",
      title: "Corporate",
      copy: "Premium tea and coffee solutions for offices, teams, clients and corporate requirements.",
    },
    {
      n: "03",
      title: "Hospitality & Bulk",
      copy: "Reliable tea, coffee and masala supply for hotels, cafés, restaurants and other hospitality partners.",
    },
  ];
</script>

<section
  id="gifting-trade"
  aria-label="Gifting and trade"
  class="relative px-5 md:px-10 lg:px-16 py-14 md:py-16"
  style="background: linear-gradient(to bottom, #EDE6D4 0%, #241A16 8%);"
>
  <div bind:this={el} use:subtleReveal class="max-w-screen-xl mx-auto">
    <div class="max-w-xl md:ml-[4%] lg:ml-[6%]">
      <h2 class="font-hero font-medium text-cream text-3xl md:text-5xl leading-[1.2]">
        Bring Charcha to the Table.
      </h2>
      <p class="mt-3 md:mt-4 font-body text-sm md:text-base text-cream/65 leading-relaxed">
        From thoughtful gifting to everyday hospitality, Charcha brings tea, coffee and masala to
        moments worth sharing.
      </p>
    </div>

    <div
      class="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 lg:gap-12 divide-y md:divide-y-0 md:divide-x divide-gold/20"
    >
      {#each offerings as o}
        <div class="pt-6 md:pt-0 md:px-6 lg:px-8 first:pt-0 md:first:pl-0 first:border-t-0">
          <span class="block font-body text-gold-dark text-xs tracking-widest2">{o.n}</span>
          <div class="w-8 h-px bg-gold mt-2 mb-4"></div>
          <h3 class="font-hero font-medium text-cream text-xl md:text-2xl leading-tight">
            {o.title}
          </h3>
          <p class="mt-3 font-body text-sm text-cream/60 leading-relaxed">{o.copy}</p>
        </div>
      {/each}
    </div>

    <div class="mt-8 md:mt-10 text-center">
      <a
        href="/contact-us"
        class="min-h-[44px] inline-flex items-center justify-center px-7 rounded text-sm font-body font-medium text-gold border border-gold hover:bg-gold/10 transition-colors"
      >
        Talk to Charcha
      </a>
    </div>
  </div>
</section>
