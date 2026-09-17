<script lang="ts">
  import type { featureSection } from "$lib/types/pageType";
  import Icon from "@iconify/svelte";
  import { reveal } from "$lib/actions/reveal";
  import { cursorGlow } from "$lib/actions/cursorGlow";
  export let featData: featureSection;

  const descriptions: Record<string, string> = {
    "Spice Variety": "From cardamom to whole garam masala, a range built for every mood.",
    "Cultural Heritage": "Recipes rooted in Indian tradition, brewed the way they always were.",
    "Refreshing Taste": "Clean, full-bodied flavour in every single cup.",
    "Health Benefits": "Antioxidant-rich blends that do more than just taste good.",
    "Authentic Experience": "No shortcuts, no fillers — just honest tea and spice.",
  };
</script>

<div use:reveal use:cursorGlow class="bg-charcoal py-16 md:py-28 px-5 md:px-16 lg:px-24">
  <div class="max-w-screen-xl mx-auto">
    <div class="text-center mb-12 md:mb-20">
      <span class="text-gold uppercase tracking-widest2 text-[0.6rem] md:text-xs font-rubik font-semibold">
        What Sets Us Apart
      </span>
      <h1 class="font-inria text-3xl md:text-5xl mt-2 text-cream">Crafted With Care</h1>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 md:gap-6">
      {#each featData.feature as f, i}
        <div
          use:reveal={{ delay: i * 80 }}
          class="group relative border-t border-gold/25 pt-6 space-y-3 px-1 pb-2 text-center rounded-b-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-gold hover:bg-gradient-to-b hover:from-gold/[0.06] hover:to-transparent hover:shadow-[0_20px_40px_-20px_rgba(201,162,74,0.35)]"
        >
          <span class="block font-inria text-gold/40 text-xs transition-colors duration-300 group-hover:text-gold/70"
            >{(i + 1).toString().padStart(2, "0")}</span
          >
          <div
            class="flex items-center justify-center mx-auto w-12 h-12 md:w-14 md:h-14 rounded-full border border-gold/30 bg-gold/5 transition-all duration-300 group-hover:bg-gold group-hover:border-gold group-hover:scale-110"
          >
            <Icon
              icon={f.icon.icon}
              class="text-xl md:text-2xl text-gold transition-colors duration-300 group-hover:text-charcoal"
            />
          </div>
          <h1 class="text-sm md:text-base font-rubik font-semibold text-cream/90">{f.title}</h1>
          {#if descriptions[f.title]}
            <p class="text-xs md:text-sm text-cream/60 font-camby leading-relaxed">
              {descriptions[f.title]}
            </p>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</div>
