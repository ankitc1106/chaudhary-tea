<script lang="ts">
  import { urlForImage } from "$lib/sanity";
  import leafPattern from "$lib/images/pattern.png";
  import { parallax } from "$lib/actions/parallax";

  export let bg: string | undefined = undefined;
  export let logo: string;
</script>

<div class="relative h-[55vh] md:h-[68vh] w-full overflow-hidden bg-charcoal">
  {#if bg}
    <div
      use:parallax={0.15}
      style="--bg-url: url({urlForImage(bg, 'width', 1920)})"
      class="absolute inset-0 bg-[length:70%_auto] bg-[position:50%_15%] bg-[image:var(--bg-url)] will-change-transform"
    ></div>
    <div
      class="absolute inset-0 bg-gradient-to-b from-charcoal/85 via-charcoal/55 to-charcoal"
    ></div>
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
