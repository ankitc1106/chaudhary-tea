<script lang="ts">
  import { fade } from "svelte/transition";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import Icon from "@iconify/svelte";
  import type { productItem, variants } from "$lib/types/pageType";
  import { urlForImage } from "$lib/sanity";
  import { reveal } from "$lib/actions/reveal";
  import { magnetic } from "$lib/actions/magnetic";
  import { cursorGlow } from "$lib/actions/cursorGlow";

  let selected = 0;
  export let isReverse = false;
  export let product: productItem;
  export let dark = false;

  let varinatList: variants[] = product.variants;

  $: varinatList = varinatList.map((a) => {
    const weight = parseInt(a.gram as string);
    return {
      ...a,
      gram: (weight >= 1000 ? weight / 1000 : weight).toString(),
      unit: weight >= 1000 ? "kg" : "gm",
    };
  });

  const animatedPrice = tweened(varinatList[selected]?.price ?? 0, {
    duration: 450,
    easing: cubicOut,
  });

  $: animatedPrice.set(varinatList[selected].price);
</script>

<section
  use:cursorGlow
  class="relative flex flex-col md:flex-row {isReverse
    ? 'md:flex-row-reverse'
    : ''} min-h-[62vh] md:min-h-[80vh] {dark
    ? 'bg-charcoal'
    : 'bg-cream'}"
>
  <div use:reveal class="group relative w-full md:w-1/2 h-[42vh] md:h-auto overflow-hidden">
    <div class="absolute inset-0 animate-float">
      {#key varinatList[selected].image}
        <img
          in:fade={{ duration: 350 }}
          src={urlForImage(varinatList[selected].image, "width", 900)}
          alt={product.title}
          class="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-700 ease-out group-hover:scale-110"
        />
      {/key}
    </div>
    <div
      class="absolute inset-0 bg-gradient-to-t {dark
        ? 'from-charcoal/50'
        : 'from-cream/30'} to-transparent md:hidden"
    ></div>
  </div>

  <div
    class="w-full md:w-1/2 flex items-center justify-center px-6 md:px-14 lg:px-20 py-10 md:py-16"
  >
    <div class="max-w-md w-full space-y-4 md:space-y-6">
      <span
        use:reveal={{ delay: 0 }}
        class="block uppercase tracking-widest2 text-[0.55rem] md:text-xs font-rubik font-semibold {dark
          ? 'text-gold'
          : 'text-gold-dark'}"
      >
        Premium Blend
      </span>
      <h1
        use:reveal={{ delay: 90 }}
        class="text-3xl md:text-5xl lg:text-6xl font-inria font-medium {dark
          ? 'text-cream'
          : 'text-charcoal'}"
      >
        {product.title}
      </h1>
      <div use:reveal={{ delay: 180 }} class="w-12 md:w-16 h-[2px] bg-gold"></div>

      <p
        use:reveal={{ delay: 270 }}
        class="text-sm md:text-lg font-camby leading-relaxed {dark
          ? 'text-cream/70'
          : 'text-charcoal/70'}"
      >
        {product.description}
      </p>

      <div
        use:reveal={{ delay: 360 }}
        class="flex flex-wrap items-center gap-3 md:gap-4 pt-1 md:pt-2"
      >
        <div
          class="text-xl md:text-3xl font-inria font-medium tabular-nums {dark
            ? 'text-cream'
            : 'text-charcoal'}"
        >
          &#8377;{Math.round($animatedPrice)}
        </div>
        <span class="{dark ? 'text-cream/50' : 'text-charcoal/50'} text-xs md:text-base"
          >/ {varinatList[selected].gram} {varinatList[selected].unit}</span
        >
        {#if product.buyLink}
          <a
            use:magnetic={0.3}
            href={product.buyLink}
            target="_blank"
            class="ml-auto bg-gold hover:bg-gold-light text-charcoal transition-all duration-200 ease-out px-5 md:px-7 py-2 md:py-2.5 rounded-full text-[0.65rem] md:text-sm font-rubik font-semibold uppercase tracking-wide"
          >
            Buy Now
          </a>
        {/if}
      </div>

      {#if varinatList.length > 1}
        <div
          use:reveal={{ delay: 450 }}
          class="flex flex-wrap gap-2 md:gap-3 pt-1 md:pt-2"
        >
          {#each varinatList as a, i}
            <button
              on:click={() => (selected = i)}
              class="px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[0.6rem] md:text-sm font-rubik border transition-all duration-300 {selected ===
              i
                ? 'bg-gold border-gold text-charcoal'
                : dark
                  ? 'border-cream/25 text-cream/70 hover:border-gold/60'
                  : 'border-charcoal/20 text-charcoal/70 hover:border-gold-dark/60'}"
            >
              {a.gram}
              {a.unit}
            </button>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</section>
