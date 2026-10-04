<script lang="ts">
  import { maskReveal } from "$lib/actions/maskReveal";

  // Kept for backward compatibility — /power and /shahi still pass this.
  export let defWidth: string = "w-[50%]";

  // Luxury redesign: generic by default. Homepage passes real copy;
  // /power and /shahi pass neither, so they render nothing — same as
  // their current (untouched) behaviour.
  export let title: string | undefined = undefined;
  export let titleSecondLine: string | undefined = undefined;
  export let subtitle: string | undefined = undefined;
</script>

{#if title}
  <div class="absolute left-[6%] md:left-[9%] top-[24%] md:top-[28%] max-w-[85%] md:max-w-lg text-left">
    <!-- Soft, localized light wash behind the headline only — not a
         full-frame overlay. Insurance for legibility, not a dark box. -->
    <div
      class="absolute -inset-x-6 -inset-y-8 md:-inset-x-10 md:-inset-y-12 -z-10"
      style="background: radial-gradient(ellipse 70% 65% at 30% 40%, rgba(247,241,228,0.38), transparent 70%);"
    ></div>

    <h1
      use:maskReveal={{ delay: 300 }}
      class="font-hero font-semibold text-charcoal text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.08]"
    >
      {title}
      {#if titleSecondLine}
        <span class="block text-[#B8791C]">{titleSecondLine}</span>
      {/if}
    </h1>

    <div use:maskReveal={{ delay: 650 }} class="w-10 h-px bg-gold mt-5 md:mt-6"></div>

    {#if subtitle}
      <p
        use:maskReveal={{ delay: 750 }}
        class="mt-3 md:mt-4 font-body text-charcoal/65 text-sm md:text-base"
      >
        {subtitle}
      </p>
    {/if}
  </div>
{/if}
