<script lang="ts">
  import { urlForImage } from "$lib/sanity";
  import type { featureSection } from "$lib/types/pageType";
  import Icon from "@iconify/svelte";
  import { reveal } from "$lib/actions/reveal";
  import { cursorGlow } from "$lib/actions/cursorGlow";
  export let featData: featureSection;
</script>

<div use:reveal use:cursorGlow class="bg-charcoal py-16 md:py-28 px-5 md:px-16 lg:px-24">
  <div class="max-w-screen-xl mx-auto">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 md:mb-20">
      <div>
        <span class="text-gold uppercase tracking-widest2 text-[0.6rem] md:text-xs font-rubik font-semibold">
          What Sets Us Apart
        </span>
        <h1 class="font-inria text-3xl md:text-5xl mt-2 text-cream">Crafted With Care</h1>
      </div>
      {#if featData.prodImage}
        <img
          src={urlForImage(featData.prodImage, "width", 200)}
          class="h-16 md:h-24 object-contain hidden md:block"
          alt=""
        />
      {/if}
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 md:gap-6">
      {#each featData.feature as f, i}
        <div
          use:reveal={{ delay: i * 80 }}
          class="group relative border-t border-gold/25 pt-5 space-y-4 px-1 pb-2 rounded-b-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-gold hover:bg-gradient-to-b hover:from-gold/[0.06] hover:to-transparent hover:shadow-[0_20px_40px_-20px_rgba(201,162,74,0.35)]"
        >
          <div class="flex items-center justify-between">
            <span class="font-inria text-gold/50 text-lg md:text-2xl transition-colors duration-300 group-hover:text-gold/80"
              >{(i + 1).toString().padStart(2, "0")}</span
            >
            <div
              class="flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full border border-gold/30 bg-gold/5 transition-all duration-300 group-hover:bg-gold group-hover:border-gold group-hover:scale-110"
            >
              <Icon
                icon={f.icon.icon}
                class="text-lg md:text-xl text-gold transition-colors duration-300 group-hover:text-charcoal"
              />
            </div>
          </div>
          <h1 class="text-sm md:text-base font-rubik text-cream/85">{f.title}</h1>
        </div>
      {/each}
    </div>
  </div>
</div>
