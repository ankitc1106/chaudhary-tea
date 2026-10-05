<script lang="ts">
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { fade } from "svelte/transition";
  import Icon from "@iconify/svelte";
  import { page } from "$app/stores";
  import type { productItem, variants } from "$lib/types/pageType";
  import { urlForImage } from "$lib/sanity";
  import { curtainReveal } from "$lib/actions/curtainReveal";
  import { orderTray } from "$lib/state";

  export let product: productItem;
  export let tagline: string;
  export let closingNote: string | undefined = undefined;
  export let id: string | undefined = undefined;
  // Mirrors the layout for Coffee later — photo/content swap sides.
  export let reverse = false;
  // Confined to the photo only (subtle warmth), never a UI color.
  export let grade: "warm" | "neutral" = "warm";
  // Per-variant local photography, keyed by normalized "{gram}{unit}"
  // (e.g. "250gm", "500gm"). Falls back to the Sanity-sourced variant
  // image when a variant has no local override.
  export let variantImages: Record<string, string> = {};
  // Keyed by normalized "{gram}{unit}" — a local MRP/selling-price override
  // for variants where the two now differ. Variants not listed here keep
  // the plain Sanity price, unchanged.
  export let priceOverrides: Record<string, { mrp: number; sp: number }> = {};

  let selected = 0;

  let varinatList: variants[] = product.variants;
  $: varinatList = product.variants.map((a) => {
    const weight = parseInt(a.gram as string);
    return {
      ...a,
      gram: (weight >= 1000 ? weight / 1000 : weight).toString(),
      unit: weight >= 1000 ? "kg" : "gm",
    };
  });

  $: selectedKey = `${varinatList[selected]?.gram}${varinatList[selected]?.unit}`;
  $: priceOverride = priceOverrides[selectedKey];
  $: displayPrice = priceOverride?.sp ?? varinatList[selected]?.price ?? 0;

  const animatedPrice = tweened(varinatList[selected]?.price ?? 0, {
    duration: 450,
    easing: cubicOut,
  });
  $: animatedPrice.set(displayPrice);

  $: waMessage = `Hi! I'd like to order ${product.title} (${varinatList[selected].gram}${varinatList[selected].unit}) — ₹${displayPrice}.`;
  $: waLink = `https://wa.me/${$page.data.config?.whatsappNumber ?? ""}?text=${encodeURIComponent(waMessage)}`;

  $: activeImage =
    variantImages[`${varinatList[selected].gram}${varinatList[selected].unit}`] ??
    urlForImage(varinatList[selected].image, "width", 1400);

  // Single grouped reveal for the whole text column — not per-line.
  // Fires once on first scroll-into-view, ~150ms after the image's
  // curtainReveal begins. Local to this component: it's one orchestrated
  // moment for one section, not a shared utility. Uses the same rAF-poll
  // approach as curtainReveal rather than IntersectionObserver — see that
  // file for why.
  function groupReveal(node: HTMLElement) {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return {};

    node.style.opacity = "0";
    node.style.transform = "translateY(8px)";
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
      if (visibleRatio() >= 0.2) {
        revealed = true;
        setTimeout(() => {
          node.style.opacity = "1";
          node.style.transform = "translateY(0)";
        }, 150);
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

  let justAdded = false;
  function handleAddToOrder() {
    orderTray.add({ productTitle: product.title, variantLabel: selectedKey, price: displayPrice });
    justAdded = true;
    setTimeout(() => (justAdded = false), 1400);
  }
</script>

<section
  {id}
  class="relative flex flex-col md:flex-row {reverse
    ? 'md:flex-row-reverse'
    : ''} min-h-[auto] md:min-h-[120vh] bg-[#241A16] scroll-mt-20 md:scroll-mt-24"
>
  <div class="relative w-full md:w-[62%] h-[70vh] md:h-auto overflow-hidden bg-[#241A16]">
    <!-- Transparent-background pack photography: no crop/vignette trickery
         needed — object-contain lets the box (with its own baked-in contact
         shadow) sit directly on the espresso background. -->
    <div
      use:curtainReveal={{ duration: 900 }}
      class="absolute inset-0 flex items-center justify-center p-10 md:p-14"
    >
      {#key activeImage}
        <img
          in:fade={{ duration: 300 }}
          src={activeImage}
          alt={product.title}
          class="max-w-full max-h-full w-auto h-auto object-contain {grade === 'warm'
            ? 'filter saturate-[1.05] contrast-[1.03]'
            : ''}"
        />
      {/key}
    </div>
  </div>

  <div class="w-full md:w-[38%] flex items-center justify-center px-6 md:px-16 lg:px-20 py-12 md:py-0">
    <div use:groupReveal class="max-w-[440px] w-full space-y-4 md:space-y-5">
      <div>
        <span class="block uppercase tracking-widest2 text-[0.55rem] md:text-xs font-rubik font-semibold text-gold">{tagline}</span>
        <div class="w-8 h-px bg-gold mt-2"></div>
      </div>

      <h2 class="font-hero font-medium text-cream text-4xl md:text-[60px] leading-[1.1]">
        {product.title}
      </h2>

      <p class="font-body text-sm md:text-lg text-cream/70 leading-relaxed">
        {product.description}
      </p>

      {#if closingNote}
        <p class="font-body italic text-sm md:text-base text-gold">{closingNote}</p>
      {/if}

      <div class="pt-1">
        <div class="flex flex-wrap items-center gap-3 md:gap-4">
          {#if priceOverride}
            <span class="text-base md:text-xl font-body text-cream/40 tabular-nums line-through">
              &#8377;{priceOverride.mrp}
            </span>
          {/if}
          <div class="text-xl md:text-3xl font-body font-medium text-cream tabular-nums">
            &#8377;{Math.round($animatedPrice)}
          </div>
          <span class="text-cream/50 text-xs md:text-sm"
            >/ {varinatList[selected].gram} {varinatList[selected].unit}</span
          >
        </div>
        {#if priceOverride}
          <div class="mt-1 font-body text-[0.65rem] text-cream/40">(Inc. of all taxes)</div>
        {/if}
      </div>

      {#if varinatList.length > 1}
        <div class="flex flex-wrap gap-2">
          {#each varinatList as v, i}
            <button
              on:click={() => (selected = i)}
              class="min-h-[44px] px-4 py-2 rounded text-xs md:text-sm font-body border transition-colors {selected ===
              i
                ? 'border-gold text-gold'
                : 'border-cream/20 text-cream/70 hover:border-gold/50'}"
            >
              {v.gram} {v.unit}
            </button>
          {/each}
        </div>
      {/if}

      <div class="flex flex-wrap items-center gap-3 pt-1">
        <button
          on:click={handleAddToOrder}
          class="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-6 rounded text-sm font-body font-medium text-gold border border-gold hover:bg-gold/10 transition-colors"
        >
          {justAdded ? "Added" : "Add to order"}
        </button>
        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          class="min-h-[44px] inline-flex items-center gap-1.5 px-2 text-sm font-body text-cream/70 hover:text-cream transition-colors"
        >
          <Icon icon="mdi:whatsapp" class="text-base" />
          Order on WhatsApp
        </a>
      </div>
    </div>
  </div>
</section>
