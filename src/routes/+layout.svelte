<script lang="ts">
  import "./styles.css";
  import "@fontsource/satisfy";
  import "@fontsource/cambay";
  import "@fontsource/inria-serif/700.css";
  import "@fontsource-variable/rubik";
  // Luxury redesign (Phase 1+)
  import "@fontsource-variable/fraunces";
  import "@fontsource-variable/instrument-sans";
  import "@fontsource/cormorant-garamond/500.css";
  import "@fontsource/cormorant-garamond/600.css";
  import "@splidejs/svelte-splide/css";
  import Footer from "$lib/components/layout/Footer.svelte";
  export let data;
  import Sidebar from "$lib/components/layout/Sidebar.svelte";
  import Icon from "@iconify/svelte";
</script>

<svelte:head>
  <link rel="icon" href={data.config.favicon} />

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Choudhary's Charcha" />
  <meta property="og:title" content="Choudhary's Charcha — Brew Conversations" />
  <meta
    property="og:description"
    content="Premium teas, spice blends, and coffee brewed for real conversations. From our Indian roots, we bring tradition, quality, and honest flavour to every cup."
  />
  <meta property="og:image" content="https://www.choudharys.in/og-image.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Choudhary's Charcha — Brew Conversations" />
  <meta
    name="twitter:description"
    content="Premium teas, spice blends, and coffee brewed for real conversations."
  />
  <meta name="twitter:image" content="https://www.choudharys.in/og-image.jpg" />
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
