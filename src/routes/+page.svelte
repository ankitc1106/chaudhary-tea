<script lang="ts">
  import Topbar from "$lib/components/Topbar.svelte";
  import Hero from "$lib/components/Hero.svelte";

  import Header from "$lib/components/layout/Header.svelte";
  import Product from "$lib/components/Product.svelte";

  import type { PageType } from "$lib/types/pageType";
  import InfoSection from "$lib/components/InfoSection.svelte";
  import FeatureSection from "$lib/components/FeatureSection.svelte";
  import coffeeHero from "$lib/images/coffee-hero.jpg";
  import coffeeDuo from "$lib/images/coffee-duo.jpg";
  import charchaFamilyHero from "$lib/images/charcha-family-hero.jpg";
  import { reveal } from "$lib/actions/reveal";
  export let data;

  let pageData: PageType = data.pageData;

  // TODO: move these into Sanity (productSection[].description) once CMS access is set up —
  // temporary local override so the improved copy shows immediately.
  const descriptionOverrides: Record<string, string> = {
    "Green Tea":
      "Steeped in nature, brewed for balance. Charcha Green Tea is crafted from tender, hand-picked leaves that retain their natural antioxidants and a clean, grassy character. Light on the palate yet deeply refreshing — it's the quiet ritual your day deserves.",
    "Gold Tea":
      "Bold by nature, golden by name. Charcha Gold Tea is a robust CTC blend built for strength and depth — the kind of full-bodied cup that holds its own with milk, sugar, or nothing at all. Rich, malty, and unmistakably satisfying.",
    "Elaichi Tea":
      "The chai that started it all. Charcha Elaichi Chai blends premium tea leaves with the warm, natural fragrance of hand-crushed cardamom — a recipe passed down and perfected, turning every cup into an invitation to sit, talk, and stay a while longer.",
    "Charcha Mix Masala":
      "Generations of flavor, ground into every pinch. Charcha Mix Masala brings together hand-selected whole spices, roasted and blended the traditional way — no shortcuts, no fillers. Just the deep, authentic warmth that turns an everyday meal into a memory.",
  };

  $: displayProducts = pageData.productSection
    .filter((p) => !/coff/i.test(p.title))
    .map((p) => ({
      ...p,
      description: descriptionOverrides[p.title] ?? p.description,
    }));

  let selectedCoffee = 0;
  $: coffeeVariants = (
    pageData.productSection.find((p) => /coff/i.test(p.title))?.variants ?? []
  ).map((a) => {
    const weight = parseInt(a.gram as string);
    return {
      ...a,
      gram: (weight >= 1000 ? weight / 1000 : weight).toString(),
      unit: weight >= 1000 ? "kg" : "gm",
    };
  });
</script>

<svelte:head>
  <title>{pageData.seo.title}</title>
  <meta name="description" content={pageData.seo.description} />
</svelte:head>

<section class="w-full overflow-x-clip bg-cream">
  <Topbar />
  <Header bg={charchaFamilyHero} logo={pageData.logo}>
    <Hero description={pageData.heroSection.heroText} />
  </Header>

  <div id="products" class="pt-14 md:pt-20">
    {#each displayProducts as product, i}
      <Product {product} isReverse={i % 2 === 1} dark={i % 2 === 1} />
    {/each}
  </div>

  <div use:reveal class="relative bg-charcoal py-16 md:py-28 px-5 md:px-16 lg:px-24 overflow-hidden border-t border-gold/10">
    <div class="max-w-screen-2xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
      <div class="order-2 md:order-1 relative group overflow-hidden rounded-3xl">
        <div class="absolute -inset-4 border border-gold/30 rounded-3xl hidden md:block pointer-events-none z-10"></div>
        <img
          src={coffeeDuo}
          alt="Choudhary's Charcha Arabica Coffee"
          class="relative rounded-3xl w-full object-cover max-h-[520px] shadow-2xl transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div class="order-1 md:order-2 space-y-4 md:space-y-6 text-cream">
        <span class="text-gold uppercase tracking-widest2 text-[0.6rem] md:text-xs font-rubik font-semibold">
          Introducing
        </span>
        <h1 class="text-3xl md:text-5xl lg:text-6xl font-inria">
          Charcha Arabica Coffee
        </h1>
        <div class="w-12 md:w-20 h-[2px] bg-gold"></div>
        <p class="text-sm md:text-lg lg:text-xl text-cream/80 font-camby leading-relaxed max-w-lg">
          Awaken your senses, one cup at a time. Charcha Arabica Coffee is a
          single-origin, medium roast made from 100% pure Arabica beans &mdash;
          freeze-dried to preserve its rich taste and aroma. No chicory, no
          preservatives, no added sugar. Just honest coffee, the way it should
          be.
        </p>

        {#if coffeeVariants.length}
          <div class="flex flex-wrap items-center gap-3 md:gap-4">
            <div class="text-xl md:text-3xl font-inria font-medium text-cream">
              &#8377;{coffeeVariants[selectedCoffee].price}
            </div>
            <span class="text-cream/50 text-xs md:text-base"
              >/ {coffeeVariants[selectedCoffee].gram} {coffeeVariants[selectedCoffee].unit}</span
            >
          </div>

          {#if coffeeVariants.length > 1}
            <div class="flex flex-wrap gap-2 md:gap-3">
              {#each coffeeVariants as v, i}
                <button
                  on:click={() => (selectedCoffee = i)}
                  class="px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[0.6rem] md:text-sm font-rubik border transition-all duration-300 {selectedCoffee ===
                  i
                    ? 'bg-gold border-gold text-charcoal'
                    : 'border-cream/25 text-cream/70 hover:border-gold/60'}"
                >
                  {v.gram} {v.unit}
                </button>
              {/each}
            </div>
          {/if}
        {/if}

        <a
          href="https://wa.me/{data.config?.whatsappNumber ?? ''}"
          target="_blank"
          rel="noreferrer"
          class="inline-block bg-gold hover:bg-gold-light text-charcoal transition-all duration-300 px-6 md:px-8 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-rubik font-semibold uppercase tracking-wide"
        >
          Enquire on WhatsApp
        </a>
      </div>
    </div>
    <img
      src={coffeeHero}
      alt=""
      class="hidden lg:block absolute -right-24 top-1/2 -translate-y-1/2 w-[380px] opacity-20 pointer-events-none"
    />
  </div>

  <InfoSection infoDat={pageData.infoSection} />
  <FeatureSection featData={pageData.featureSection} />
</section>
