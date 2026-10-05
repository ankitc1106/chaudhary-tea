<script lang="ts">
  import { fade } from "svelte/transition";
  import Icon from "@iconify/svelte";
  import { isNavOpen } from "$lib/state";
  import { page } from "$app/stores";
  import { slugify } from "$lib/utils/slug";
  import type { ConfigType } from "$lib/types/configType";
  import type { contactType } from "$lib/types/contactType";
  import charchaLogo from "$lib/images/charcha-logo-footer.png";

  let brandlist = $page.data.brandList;
  let products: string[] = brandlist?.[0]?.products ?? [];

  const config = $page.data.config as ConfigType;
  const contact = $page.data.contact as contactType;
  $: instagramLink = (config.socialLinks ?? []).find((s) => /instagram/i.test(s.link))?.link;

  let showProducts = false;

  function closeSidebar() {
    $isNavOpen = false;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Escape" && $isNavOpen) closeSidebar();
  }

  const navRowClass =
    "group w-full flex items-center justify-between gap-6 py-5 border-b border-gold/15 font-hero font-medium text-2xl md:text-3xl text-cream hover:text-gold transition-colors duration-300 focus-visible:outline-none focus-visible:text-gold";
  const subLinkClass =
    "min-h-[44px] flex items-center font-body text-sm text-cream/65 hover:text-gold transition-colors duration-300 focus-visible:outline-none focus-visible:text-gold";
  const labelClass = "font-body text-[0.65rem] uppercase tracking-widest2 text-gold-dark font-semibold";
</script>

<svelte:window on:keydown={handleKeydown} />

{#if $isNavOpen}
  <div
    class="fixed inset-0 z-40 bg-charcoal/60"
    on:click={closeSidebar}
    transition:fade={{ duration: 200 }}
    aria-hidden="true"
  ></div>
{/if}

<div
  id="sidebar"
  role="dialog"
  aria-label="Site menu"
  aria-hidden={!$isNavOpen}
  class="{$isNavOpen
    ? 'translate-x-0'
    : '-translate-x-full'} z-50 bg-charcoal border-r border-gold/15 transition-transform duration-300 fixed left-0 top-0 h-screen w-[85vw] sm:w-96 px-6 md:px-8 overflow-y-auto"
>
  <div class="flex items-center justify-between pt-6">
    <img src={charchaLogo} alt="Choudhary's Charcha" class="h-10 w-auto" />
    <button on:click={closeSidebar} aria-label="Close menu">
      <Icon icon="heroicons-solid:x" class="w-6 h-6 text-cream hover:text-gold transition-colors duration-300" />
    </button>
  </div>

  <nav aria-label="Site" class="mt-8 pb-10">
    <a href="/" on:click={closeSidebar} class={navRowClass}>Home</a>

    <div class="border-b border-gold/15">
      <button
        on:click={() => (showProducts = !showProducts)}
        aria-expanded={showProducts}
        aria-controls="sidebar-products"
        class="w-full flex items-center justify-between gap-6 py-5 font-hero font-medium text-2xl md:text-3xl text-cream hover:text-gold transition-colors duration-300 focus-visible:outline-none focus-visible:text-gold"
      >
        Our Products
        <Icon
          icon="heroicons-solid:chevron-down"
          class="w-5 h-5 shrink-0 text-gold-dark transition-transform duration-300 {showProducts ? 'rotate-180' : ''}"
        />
      </button>

      {#if showProducts}
        <ul id="sidebar-products" class="pb-5 space-y-1">
          {#each products as title}
            <li>
              <a href="/#{slugify(title)}" on:click={closeSidebar} class={subLinkClass}>{title}</a>
            </li>
          {/each}
        </ul>
      {/if}
    </div>

    <a href="/about-us" on:click={closeSidebar} class={navRowClass}>About Us</a>
    <a href="/contact-us" on:click={closeSidebar} class={navRowClass}>Contact</a>

    <div class="mt-8">
      <p class={labelClass}>Connect</p>
      <ul class="mt-4 space-y-1">
        <li>
          <a href="https://wa.me/{config.whatsappNumber}" target="_blank" rel="noreferrer" class={subLinkClass}>
            WhatsApp
          </a>
        </li>
        {#if instagramLink}
          <li>
            <a href={instagramLink} target="_blank" rel="noreferrer" class={subLinkClass}>Instagram</a>
          </li>
        {/if}
        <li><a href="mailto:{contact.email}" class={subLinkClass}>Email</a></li>
        <li><a href="tel:{contact.phone}" class={subLinkClass}>Phone</a></li>
      </ul>
    </div>
  </nav>
</div>
