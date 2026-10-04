<script lang="ts">
  import { urlForImage } from "$lib/sanity";
  import leafPattern from "$lib/images/pattern.png";
  import { parallax } from "$lib/actions/parallax";
  import { kenBurns } from "$lib/actions/kenBurns";

  export let bg: string | undefined = undefined;
  export let logo: string;
  // "parallax" (default) preserves existing behaviour for /power, /shahi,
  // and any other caller that doesn't opt in. "kenBurns" is the Phase 1
  // hero treatment: full-viewport height, slow one-time scale instead of
  // scroll-linked parallax.
  export let motion: "parallax" | "kenBurns" = "parallax";
</script>

<div
  class="relative w-full overflow-hidden bg-charcoal {motion === 'kenBurns'
    ? 'h-[100dvh]'
    : 'h-[55vh] md:h-[68vh]'}"
>
  {#if bg}
    {#if motion === "kenBurns"}
      <div
        use:kenBurns={{ duration: 15000, scale: 1.06 }}
        style="--bg-url: url({urlForImage(bg, 'width', 1920)})"
        class="absolute inset-0 bg-cover bg-[position:50%_35%] bg-[image:var(--bg-url)]"
      ></div>
      <!-- Light nav-legibility vignette up top, photo stays bright through
           the middle, then a cinematic fade in the final ~20% settles the
           sunrise into Gold Tea's warm espresso (#241A16) by the very last
           pixel — sunrise → warm earth → espresso, one continuous scene. -->
      <div
        class="absolute inset-0 pointer-events-none"
        style="background: linear-gradient(to bottom, rgba(36,26,22,0.18) 0%, rgba(36,26,22,0) 12%, rgba(36,26,22,0) 78%, rgba(36,26,22,0.55) 90%, #241A16 100%);"
      ></div>
    {:else}
      <div
        use:parallax={0.15}
        style="--bg-url: url({urlForImage(bg, 'width', 1920)})"
        class="absolute inset-0 bg-cover bg-[position:50%_25%] bg-[image:var(--bg-url)] will-change-transform"
      ></div>
      <div
        class="absolute inset-0 bg-gradient-to-b from-charcoal/85 via-charcoal/55 to-charcoal"
      ></div>
    {/if}
  {:else}
    <div
      class="absolute inset-0"
      style="background: radial-gradient(ellipse 90% 55% at 50% 12%, rgba(201,162,74,0.22), transparent 60%);"
    ></div>
    <div
      use:parallax={0.08}
      style="background-image: url({leafPattern}); background-size: 480px; background-repeat: repeat;"
      class="absolute inset-0 opacity-[0.14] mix-blend-overlay will-change-transform"
    ></div>
    <div
      class="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-charcoal/60 to-charcoal"
    ></div>
  {/if}

  <div
    class="relative h-full flex flex-col items-center justify-center text-center px-5 pt-24 md:pt-28"
  >
    <slot />
  </div>
</div>
