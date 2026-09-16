<script lang="ts">
  import "./styles.css";
  import "@fontsource/berkshire-swash";
  import "@fontsource/cambay";
  import "@fontsource/inria-serif/700.css";
  import "@fontsource-variable/rubik";
  import "@splidejs/svelte-splide/css";
  import Footer from "$lib/components/layout/Footer.svelte";
  import { page } from "$app/stores";
  export let data;
  import type { BrandNav } from "$lib/types/commonTypes";
  import Sidebar from "$lib/components/layout/Sidebar.svelte";
  import { urlForImage } from "$lib/sanity";
  import Icon from "@iconify/svelte";
  let brandlist: BrandNav[] = data.brandList;
</script>

<svelte:head>
  <link rel="icon" href={data.config.favicon} />
</svelte:head>

<main class="relative">
  <Sidebar />
  <slot />

  <div
    class="fixed z-50 flex gap-3 items-center w-max justify-center mx-auto p-4 inset-x-0 bottom-14 bg-gray-800 rounded-3xl"
  >
    {#each brandlist as brand}
      {@const brandUrl =
        brand.slug.current != "/"
          ? `/${brand.slug.current.toString().trim()}`
          : "/"}
      <a
        href={brandUrl}
        class="px-2 py-1 rounded-2xl {$page.url.pathname === brandUrl ||
        $page.url.pathname === brandUrl + '/'
          ? 'bg-gray-500'
          : ' '}"
      >
        <img
          class="max-h-10"
          src={urlForImage(brand.logo, "width", 300)}
          alt=""
        />
      </a>
    {/each}
  </div>

  <Footer />

  <div>
    <a
      href="https://wa.me/{data.config.whatsappNumber}"
      target="_blank"
      rel="noreferrer"
      class="fixed bottom-3 right-3 md:bottom-8 md:right-8 p-1.5 md:p-2.5 bg-green-500 shadow-2xl drop-shadow-xl z-50 text-white rounded-full hover:scale-110 transition-all duration-300"
    >
      <Icon icon="mdi:whatsapp" class="w-8 h-8 text-white" />
    </a>
  </div>
</main>
