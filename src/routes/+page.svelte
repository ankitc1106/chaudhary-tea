<script lang="ts">
  import Topbar from "$lib/components/Topbar.svelte";
  import Hero from "$lib/components/Hero.svelte";

  import Header from "$lib/components/layout/Header.svelte";
  import Product from "$lib/components/Product.svelte";

  import type { PageType } from "$lib/types/pageType";
  import InfoSection from "$lib/components/InfoSection.svelte";
  import FeatureSection from "$lib/components/FeatureSection.svelte";
  import coffeeGiftPack from "$lib/images/coffee-gift-pack.png";
  import heroCover from "$lib/images/hero-cover.jpg";
  import { reveal } from "$lib/actions/reveal";
  import { magnetic } from "$lib/actions/magnetic";
  import { cursorGlow } from "$lib/actions/cursorGlow";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { slugify } from "$lib/utils/slug";
  export let data;

  let pageData: PageType = data.pageData;

  // TODO: move these into Sanity (productSection[].description) once CMS access is set up —
  // temporary local override so the improved copy shows immediately.
  const descriptionOverrides: Record<string, string> = {
    "Charcha Green Tea":
      "Somewhere between the first sip and the last, something shifts. Charcha Green Tea brings together whole, hand-picked leaves and a clean, antioxidant-rich brew that clears the mind as much as it soothes the body. No bitterness, no jitters — just a quiet moment that resets your whole day.",
    "Charcha Gold Tea":
      "This chai doesn't do small talk. Charcha Gold Tea is a bold, full-bodied CTC blend brewed to hold its ground — with milk, without milk, doesn't matter, it still shows up strong. Malty, rich, and just a little opinionated. The kind of cup that talks back.",
    "Charcha Elaichi Chai":
      "Some days need a pause button. Charcha Elaichi Chai is that pause — hand-crushed cardamom folded into premium tea leaves for a warm, fragrant brew that slows the room down. Not just chai — an invitation to sit a little longer and let the conversation breathe.",
    "Charcha Mix Masala":
      "Every kitchen has one recipe nobody's allowed to mess with — this is ours. Charcha Mix Masala is ground from hand-selected whole spices the old way, no shortcuts pretending to be shortcuts. One pinch and it tastes like a memory you didn't know you missed.",
  };

  const taglineOverrides: Record<string, string> = {
    "Charcha Green Tea": "The Daily Detoxify",
    "Charcha Gold Tea": "Bolne Wali Chai",
    "Charcha Elaichi Chai": "Cardamom & Calm Down",
    "Charcha Mix Masala": "Dadi Maa Ka Raaz",
  };

  const closingNoteOverrides: Record<string, string> = {
    "Charcha Green Tea": "Good conversations begin with good health",
  };

  const coffeeDescription =
    "For every conversation that needed one more cup. Charcha Arabica Coffee is a single-origin, medium roast made from 100% pure Arabica beans, freeze-dried to keep its aroma intact — no chicory, no watered-down excuses. Just honest coffee for people who talk business, gossip, or both.";
  const coffeeTagline = "Bean There, Talked That";

  $: displayProducts = pageData.productSection
    .filter((p) => !/coff/i.test(p.title))
    .map((p) => ({
      ...p,
      description: descriptionOverrides[p.title] ?? p.description,
      tagline: taglineOverrides[p.title],
      closingNote: closingNoteOverrides[p.title],
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

  const animatedCoffeePrice = tweened(0, { duration: 450, easing: cubicOut });
  $: if (coffeeVariants.length) animatedCoffeePrice.set(coffeeVariants[selectedCoffee].price);
</script>

<svelte:head>
  <title>{pageData.seo.title}</title>
  <meta name="description" content={pageData.seo.description} />
</svelte:head>

<section class="w-full overflow-x-clip bg-cream">
  <Topbar />
  <Header bg={heroCover} logo={pageData.logo}>
    <div
      use:reveal
      class="absolute left-[6%] md:left-[9%] top-[10%] md:top-[13%] text-left max-w-[220px] md:max-w-xs"
    >
      <span
        class="block font-rubik text-gold uppercase tracking-widest2 text-[0.55rem] md:text-xs font-semibold mb-1.5 md:mb-2"
      >
        Est. In Conversation
      </span>
      <h1 class="font-inria text-cream text-3xl md:text-5xl leading-tight">Choudhary's</h1>
      <h1 class="font-inria italic text-gold text-4xl md:text-6xl leading-tight -mt-1 md:-mt-2">
        Charcha
      </h1>
      <div class="w-12 md:w-16 h-[3px] bg-gold rounded-full mt-3 md:mt-4"></div>
    </div>
    <Hero />
  </Header>

  <div id="products">
    {#each displayProducts as product, i}
      <Product
        {product}
        id={slugify(product.title)}
        isReverse={i % 2 === 1}
        dark={i % 2 === 1}
        tagline={product.tagline}
        closingNote={product.closingNote}
      />
    {/each}
  </div>

  <div
    id={slugify(
      pageData.productSection.find((p) => /coff/i.test(p.title))?.title ?? "arabica-coffee"
    )}
    use:cursorGlow
    class="relative bg-cream py-16 md:py-28 px-5 md:px-16 lg:px-24 overflow-hidden border-t border-gold/10 scroll-mt-20 md:scroll-mt-24"
  >
    <div class="max-w-screen-2xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
      <div use:reveal class="order-2 md:order-1 relative group overflow-hidden rounded-3xl p-6 md:p-10">
        <div class="absolute -inset-4 border border-gold/30 rounded-3xl hidden md:block pointer-events-none z-10"></div>
        <div class="animate-float">
          <img
            src={coffeeGiftPack}
            alt="Choudhary's Charcha Arabica Coffee Gift Pack"
            class="relative w-full max-h-[440px] object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.45)] transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      </div>
      <div class="order-1 md:order-2 space-y-4 md:space-y-6 text-charcoal">
        <span use:reveal={{ delay: 0 }} class="text-gold-dark uppercase tracking-widest2 text-[0.6rem] md:text-xs font-rubik font-semibold">
          {coffeeTagline}
        </span>
        <h1 use:reveal={{ delay: 90 }} class="text-3xl md:text-5xl lg:text-6xl font-inria">
          Charcha Arabica Coffee
        </h1>
        <div use:reveal={{ delay: 180 }} class="w-12 md:w-20 h-[2px] bg-gold"></div>
        <p use:reveal={{ delay: 270 }} class="text-sm md:text-lg lg:text-xl text-charcoal/70 font-camby leading-relaxed max-w-lg">
          {coffeeDescription}
        </p>

        {#if coffeeVariants.length}
          <div use:reveal={{ delay: 360 }} class="flex flex-wrap items-center gap-3 md:gap-4">
            <div class="text-xl md:text-3xl font-inria font-medium text-charcoal tabular-nums">
              &#8377;{Math.round($animatedCoffeePrice)}
            </div>
            <span class="text-charcoal/50 text-xs md:text-base"
              >/ {coffeeVariants[selectedCoffee].gram} {coffeeVariants[selectedCoffee].unit}</span
            >
          </div>

          {#if coffeeVariants.length > 1}
            <div use:reveal={{ delay: 450 }} class="flex flex-wrap gap-2 md:gap-3">
              {#each coffeeVariants as v, i}
                <button
                  on:click={() => (selectedCoffee = i)}
                  class="px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[0.6rem] md:text-sm font-rubik border transition-all duration-300 {selectedCoffee ===
                  i
                    ? 'bg-gold border-gold text-charcoal'
                    : 'border-charcoal/20 text-charcoal/70 hover:border-gold-dark/60'}"
                >
                  {v.gram} {v.unit}
                </button>
              {/each}
            </div>
          {/if}
        {/if}

        <a
          use:magnetic={0.3}
          href="https://wa.me/{data.config?.whatsappNumber ?? ''}"
          target="_blank"
          rel="noreferrer"
          class="inline-block bg-gold hover:bg-gold-light text-charcoal transition-all duration-200 ease-out px-6 md:px-8 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-rubik font-semibold uppercase tracking-wide"
        >
          Enquire on WhatsApp
        </a>
      </div>
    </div>
  </div>

  <InfoSection infoDat={pageData.infoSection} />
  <FeatureSection featData={pageData.featureSection} />
</section>
