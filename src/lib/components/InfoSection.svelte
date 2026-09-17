<script lang="ts">
  import { urlForImage } from "$lib/sanity";
  import type { infoSection } from "$lib/types/pageType";
  import { reveal } from "$lib/actions/reveal";
  import { magnetic } from "$lib/actions/magnetic";

  export let infoDat: infoSection;
</script>

<div
  use:reveal
  style="--bg-url: url( {urlForImage(infoDat.image, 'width', 1700)})"
  class="relative min-h-[45vh] md:h-[55vh] lg:h-[85vh] bg-cover bg-center bg-[image:var(--bg-url)]"
>
  <div class="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/60 to-charcoal/20"></div>
  <div class="relative h-full flex items-center px-5 md:px-16 lg:px-24 py-14 md:py-0">
    <div class="max-w-xl space-y-4 md:space-y-6">
      <span
        class="text-gold uppercase tracking-widest2 text-[0.6rem] md:text-xs font-rubik font-semibold"
      >
        Our Heritage
      </span>
      {#if infoDat.title}
        <h1 class="text-3xl md:text-5xl lg:text-6xl font-inria text-cream">
          {infoDat.title}
        </h1>
      {/if}
      <p
        class="text-sm md:text-lg lg:text-xl text-cream/80 font-camby leading-relaxed"
      >
        {infoDat.description}
      </p>

      <a
        use:magnetic={0.3}
        href="/about-us"
        class="inline-block w-max hover:bg-gold-light transition-all duration-200 ease-out bg-gold text-charcoal text-xs md:text-sm px-6 md:px-8 py-2.5 md:py-3 rounded-full font-rubik font-semibold uppercase tracking-wide"
        >About Us</a
      >
    </div>
  </div>
</div>
