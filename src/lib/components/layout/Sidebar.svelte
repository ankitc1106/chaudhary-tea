<script lang="ts">
  import Icon from "@iconify/svelte";
  import { isNavOpen } from "$lib/state";
  import { page } from "$app/stores";
  import { slugify } from "$lib/utils/slug";

  let brandlist = $page.data.brandList;
  let products: string[] = brandlist?.[0]?.products ?? [];

  let showProducts = false;

  function closeSidebar() {
    $isNavOpen = false;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Escape" && $isNavOpen) closeSidebar();
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div
  id="sidebar"
  role="dialog"
  aria-label="Site menu"
  aria-hidden={!$isNavOpen}
  class=" {$isNavOpen
    ? 'translate-x-0'
    : '-translate-x-full'} z-50 bg-cream transition-all duration-300 fixed left-0 top-0 h-screen p-8 overflow-y-auto"
>
  <div class="">
    <div class=" flex justify-end items-center">
      <button on:click={closeSidebar} aria-label="Close menu">
        <Icon
          icon="heroicons-solid:x"
          class="w-6 h-6 text-charcoal cursor-pointer"
        />
      </button>
    </div>

    <div class=" py-10 space-y-6">
      <div>
        <button
          on:click={() => (showProducts = !showProducts)}
          aria-expanded={showProducts}
          aria-controls="sidebar-products"
          class="rounded group border border-charcoal/10 hover:border-gold transition-colors duration-300 w-full px-5 py-3 flex items-center justify-between gap-10"
        >
          <div class="flex gap-3 items-center">
            <Icon
              icon="bx:bxs-grid-alt"
              class="w-5 h-5 text-gold-dark group-hover:text-gold transition-colors duration-300"
            />
            <h3 class="font-body text-charcoal">Our Products</h3>
          </div>
          <Icon
            icon="heroicons-solid:chevron-down"
            class="w-5 h-5 transition-transform duration-300 text-gold-dark {showProducts
              ? 'rotate-180'
              : ''}"
          />
        </button>

        {#if showProducts}
          <div id="sidebar-products" class="mt-2 space-y-1 pl-4">
            {#each products as title}
              <a
                href="/#{slugify(title)}"
                on:click={closeSidebar}
                class="block rounded px-4 py-2.5 text-sm font-body text-charcoal/70 hover:text-gold-dark transition-colors duration-300"
              >
                {title}
              </a>
            {/each}
          </div>
        {/if}
      </div>

      <div>
        <a
          href="/about-us"
          on:click={closeSidebar}
          class="rounded group border border-charcoal/10 hover:border-gold transition-colors duration-300 w-full px-5 py-3 flex items-center justify-between gap-10"
        >
          <div class="flex gap-3 items-center">
            <Icon
              icon="bx:bxs-info-circle"
              class="w-5 h-5 text-gold-dark group-hover:text-gold transition-colors duration-300"
            />
            <h3 class="font-body text-charcoal">About Us</h3>
          </div>
          <Icon
            icon="heroicons-solid:arrow-right"
            class="w-5 h-5 group-hover:translate-x-1 transition-all duration-300 text-gold-dark"
          />
        </a>
      </div>

      <div>
        <a
          href="/contact-us"
          on:click={closeSidebar}
          class="rounded group border border-charcoal/10 hover:border-gold transition-colors duration-300 w-full px-5 py-3 flex items-center justify-between gap-10"
        >
          <div class="flex gap-3 items-center">
            <Icon
              icon="bx:bxs-phone"
              class="w-5 h-5 text-gold-dark group-hover:text-gold transition-colors duration-300"
            />
            <h3 class="font-body text-charcoal">Contact Us</h3>
          </div>
          <Icon
            icon="heroicons-solid:arrow-right"
            class="w-5 h-5 group-hover:translate-x-1 transition-all duration-300 text-gold-dark"
          />
        </a>
      </div>
    </div>
  </div>
</div>
