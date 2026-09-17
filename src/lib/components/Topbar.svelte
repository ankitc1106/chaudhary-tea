<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { isNavOpen } from "$lib/state";
  import type { ConfigType } from "$lib/types/configType";
  import Icon from "@iconify/svelte";

  let config = $page.data.config as ConfigType;
  let scrolled = false;

  onMount(() => {
    const onScroll = () => (scrolled = window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  });
</script>

<nav
  class="fixed top-0 inset-x-0 z-40 transition-all duration-500 {scrolled
    ? 'bg-charcoal/95 backdrop-blur-sm border-b border-gold/15 py-2.5 md:py-3.5'
    : 'bg-transparent border-b border-transparent py-4 md:py-6'}"
>
  <div
    class="max-w-screen-2xl mx-auto px-4 md:px-10 flex items-center justify-between"
  >
    <button on:click={() => ($isNavOpen = true)} aria-label="Open menu">
      <Icon
        icon="heroicons-solid:menu-alt-2"
        class="md:h-6 md:w-6 w-5 h-5 text-gold cursor-pointer"
      />
    </button>

    <span
      class="font-inria text-cream text-base md:text-xl tracking-tight select-none"
    >
      Choudhary's <span class="text-gold">Charcha</span>
    </span>

    <a
      href="/contact-us"
      class="flex items-center text-[0.6rem] md:text-sm md:gap-2 gap-1 text-gold hover:text-gold-light transition-colors duration-300"
    >
      <span class="hidden sm:inline">Let's Talk</span>
      <Icon
        icon="material-symbols:contact-support"
        class="md:h-6 md:w-6 w-5 h-5 cursor-pointer"
      />
    </a>
  </div>
  {#if config.topBar}
    <div
      class="overflow-hidden transition-all duration-500 {scrolled
        ? 'max-h-0 opacity-0'
        : 'max-h-8 opacity-100 mt-2 md:mt-3'}"
    >
      <p
        class="text-center text-cream/70 tracking-widest2 uppercase text-[0.55rem] md:text-xs"
      >
        {config.topBar}
      </p>
    </div>
  {/if}
</nav>
