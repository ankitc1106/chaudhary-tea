<script lang="ts">
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import Icon from "@iconify/svelte";
  import { page } from "$app/stores";
  import type { productItem } from "$lib/types/pageType";
  import { urlForImage } from "$lib/sanity";
  import { orderTray } from "$lib/state";

  export let product: productItem;
  export let tagline: string | undefined = undefined;
  export let id: string | undefined = undefined;
  // Keyed by normalized "{gram}{unit}" — either a raw Sanity CDN URL (goes
  // through urlForImage for sizing) or a local Vite-imported asset path
  // (used as-is). Lets a specific variant show a different photo without
  // touching Sanity.
  export let variantImageOverrides: Record<string, string> = {};
  // When set, "Add to order" only shows for these "{gram}{unit}" variants.
  export let addToOrderVariants: string[] | undefined = undefined;
  // When set, "Order on WhatsApp" only shows for these "{gram}{unit}"
  // variants (e.g. small sample sizes not sold through either channel).
  export let orderOnWhatsAppVariants: string[] | undefined = undefined;
  // Keyed by normalized "{gram}{unit}" — a local MRP/selling-price override
  // for variants where the two now differ. Variants not listed here keep
  // the plain Sanity price, unchanged.
  export let priceOverrides: Record<string, { mrp: number; sp: number }> = {};

  let selected = 0;

  $: varinatList = product.variants.map((a) => {
    const weight = parseInt(a.gram as string);
    return {
      ...a,
      gram: (weight >= 1000 ? weight / 1000 : weight).toString(),
      unit: weight >= 1000 ? "kg" : "gm",
    };
  });

  $: selectedKey = `${varinatList[selected]?.gram}${varinatList[selected]?.unit}`;

  $: activeImageSrc = (() => {
    const override = variantImageOverrides[selectedKey];
    if (!override) return urlForImage(varinatList[selected]?.image, "width", 700);
    return override.startsWith("https://cdn.sanity.io") ? urlForImage(override, "width", 700) : override;
  })();

  $: canAddToOrder = !addToOrderVariants || addToOrderVariants.includes(selectedKey);
  $: canOrderOnWhatsApp = !orderOnWhatsAppVariants || orderOnWhatsAppVariants.includes(selectedKey);

  $: priceOverride = priceOverrides[selectedKey];
  $: displayPrice = priceOverride?.sp ?? varinatList[selected]?.price ?? 0;

  const animatedPrice = tweened(product.variants[0]?.price ?? 0, { duration: 350, easing: cubicOut });
  $: animatedPrice.set(displayPrice);

  $: waMessage = `Hi! I'd like to order ${product.title} (${varinatList[selected]?.gram}${varinatList[selected]?.unit}) — ₹${displayPrice}.`;
  $: waLink = `https://wa.me/${$page.data.config?.whatsappNumber ?? ""}?text=${encodeURIComponent(waMessage)}`;

  let justAdded = false;
  function handleAddToOrder() {
    orderTray.add({ productTitle: product.title, variantLabel: selectedKey, price: displayPrice });
    justAdded = true;
    setTimeout(() => (justAdded = false), 1400);
  }
</script>

<div {id} class="px-6 md:px-8 py-10 md:py-12 flex flex-col items-start space-y-4 scroll-mt-20 md:scroll-mt-24">
  <div class="w-full aspect-[4/3] overflow-hidden bg-charcoal/5 flex items-center justify-center p-6 md:p-8">
    {#key activeImageSrc}
      <img src={activeImageSrc} alt={product.title} class="max-w-full max-h-full object-contain" />
    {/key}
  </div>

  {#if tagline}
    <span class="block uppercase tracking-widest2 text-[0.65rem] md:text-xs font-rubik font-semibold text-gold-dark">
      {tagline}
    </span>
  {/if}

  <h3 class="font-hero font-medium text-charcoal text-3xl md:text-4xl leading-[1.15]">{product.title}</h3>

  <p class="font-body text-sm text-charcoal/65 leading-relaxed">{product.description}</p>

  <div>
    <div class="flex items-center gap-3">
      {#if priceOverride}
        <span class="text-sm font-body text-charcoal/40 tabular-nums line-through">
          &#8377;{priceOverride.mrp}
        </span>
      {/if}
      <div class="text-xl font-body font-medium text-charcoal tabular-nums">
        &#8377;{Math.round($animatedPrice)}
      </div>
      <span class="text-charcoal/50 text-xs">/ {varinatList[selected]?.gram} {varinatList[selected]?.unit}</span>
    </div>
    {#if priceOverride}
      <div class="mt-0.5 font-body text-[0.65rem] text-charcoal/45">(Inc. of all taxes)</div>
    {/if}
  </div>

  {#if varinatList.length > 1}
    <div class="flex flex-wrap gap-2">
      {#each varinatList as v, i}
        <button
          on:click={() => (selected = i)}
          class="min-h-[44px] px-3 py-1.5 text-xs font-body border transition-colors {selected === i
            ? 'border-gold text-gold'
            : 'border-charcoal/20 text-charcoal/60 hover:border-gold-dark/50'}"
        >
          {v.gram} {v.unit}
        </button>
      {/each}
    </div>
  {/if}

  <div class="flex flex-wrap items-center gap-4 pt-1">
    {#if canAddToOrder}
      <button
        on:click={handleAddToOrder}
        class="min-h-[44px] inline-flex items-center justify-center px-5 text-sm font-body font-medium text-gold-dark border border-gold-dark hover:bg-gold/10 transition-colors"
      >
        {justAdded ? "Added" : "Add to order"}
      </button>
    {/if}
    {#if canOrderOnWhatsApp}
      <a
        href={waLink}
        target="_blank"
        rel="noreferrer"
        class="min-h-[44px] inline-flex items-center gap-1.5 text-sm font-body text-charcoal/60 hover:text-charcoal transition-colors"
      >
        <Icon icon="mdi:whatsapp" class="text-base" />
        Order on WhatsApp
      </a>
    {/if}
  </div>
</div>
