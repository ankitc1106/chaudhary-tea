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
</script>

<div
  id="sidebar"
  class=" {$isNavOpen
    ? 'translate-x-0'
    : '-translate-x-full'} z-50 bg-cream transition-all duration-300 fixed left-0 top-0 h-screen p-8 overflow-y-auto"
>
  <div class="">
    <div class=" flex justify-end items-center">
      <button on:click={closeSidebar}>
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
          class="rounded-xl group border border-gold-dark/20 hover:border-gold hover:bg-gold/5 transition-all duration-300 w-full bg-white px-5 py-3 flex items-center justify-between gap-10"
        >
          <div class=" flex gap-3 items-center">
            <div
              class="flex items-center justify-center w-10 h-10 rounded-full border border-gold-dark/30 bg-gold/5 group-hover:bg-gold group-hover:border-gold transition-all duration-300"
            >
              <Icon
                icon="bx:bxs-grid-alt"
                class="w-5 h-5 text-gold-dark group-hover:text-charcoal transition-colors duration-300"
              />
            </div>
            <h3 class="font-rubik text-charcoal">Our Products</h3>
          </div>
          <Icon
            icon="heroicons-solid:chevron-down"
            class="w-5 h-5 transition-transform duration-300 text-gold-dark {showProducts
              ? 'rotate-180'
              : ''}"
          />
        </button>

        {#if showProducts}
          <div class="mt-2 space-y-1 pl-4">
            {#each products as title}
              <a
                href="/#{slugify(title)}"
                on:click={closeSidebar}
                class="block rounded-lg px-4 py-2.5 text-sm font-rubik text-charcoal/80 hover:bg-gold/10 hover:text-gold-dark transition-all duration-300"
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
          class="rounded-xl group border border-gold-dark/20 hover:border-gold hover:bg-gold/5 transition-all duration-300 w-full bg-white px-5 py-3 flex items-center justify-between gap-10"
        >
          <div class=" flex gap-3 items-center">
            <div
              class="flex items-center justify-center w-10 h-10 rounded-full border border-gold-dark/30 bg-gold/5 group-hover:bg-gold group-hover:border-gold transition-all duration-300"
            >
              <Icon
                icon="bx:bxs-info-circle"
                class="w-5 h-5 text-gold-dark group-hover:text-charcoal transition-colors duration-300"
              />
            </div>
            <h3 class="font-rubik text-charcoal">About Us</h3>
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
          class="rounded-xl group border border-gold-dark/20 hover:border-gold hover:bg-gold/5 transition-all duration-300 w-full bg-white px-5 py-3 flex items-center justify-between gap-10"
        >
          <div class=" flex gap-3 items-center">
            <div
              class="flex items-center justify-center w-10 h-10 rounded-full border border-gold-dark/30 bg-gold/5 group-hover:bg-gold group-hover:border-gold transition-all duration-300"
            >
              <Icon
                icon="bx:bxs-phone"
                class="w-5 h-5 text-gold-dark group-hover:text-charcoal transition-colors duration-300"
              />
            </div>
            <h3 class="font-rubik text-charcoal">Contact Us</h3>
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
