<script lang="ts">
  import "./styles.css";
  import "@fontsource/norican";
  import "@fontsource/cambay";
  import "@fontsource/inria-serif/700.css";
  import "@fontsource-variable/rubik";
  import "@splidejs/svelte-splide/css";
  import Footer from "$lib/components/layout/Footer.svelte";
  export let data;
  import Sidebar from "$lib/components/layout/Sidebar.svelte";
  import Icon from "@iconify/svelte";
</script>

<svelte:head>
  <link rel="icon" href={data.config.favicon} />
</svelte:head>

<main class="relative">
  <Sidebar />
  <slot />

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
