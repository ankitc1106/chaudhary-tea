<script lang="ts">
  import { onMount } from "svelte";
  import { isNavOpen } from "$lib/state";
  import Icon from "@iconify/svelte";
  import charchaLogo from "$lib/images/charcha-logo.png";

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

    <img src={charchaLogo} alt="Choudhary's Charcha" class="h-9 md:h-12 w-auto select-none" />

    <a
      href="/contact-us"
      class="flex items-center font-body font-bold text-[0.7rem] md:text-sm md:gap-2 gap-1 text-gold hover:text-gold-light transition-colors duration-300"
    >
      <span class="hidden sm:inline">Let's Talk</span>
      <Icon
        icon="material-symbols:contact-support"
        class="md:h-6 md:w-6 w-5 h-5 cursor-pointer"
      />
    </a>
  </div>
</nav>
