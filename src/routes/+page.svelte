<script lang="ts">
  import Topbar from "$lib/components/Topbar.svelte";
  import Hero from "$lib/components/Hero.svelte";

  import Header from "$lib/components/layout/Header.svelte";
  import ProductShelf from "$lib/components/ProductShelf.svelte";
  import SignatureProduct from "$lib/components/SignatureProduct.svelte";

  import type { PageType } from "$lib/types/pageType";
  import InfoSection from "$lib/components/InfoSection.svelte";
  import FeatureSection from "$lib/components/FeatureSection.svelte";
  import BanarasStory from "$lib/components/BanarasStory.svelte";
  import heroSunrise from "$lib/images/hero-sunrise.png";
  import banarasStoryImage from "$lib/images/banaras-story.png";
  import goldTea250g from "$lib/images/gold-tea-250g.png";
  import goldTea500g from "$lib/images/gold-tea-500g.png";
  import coffee50g from "$lib/images/coffee-50g.png";
  import coffee100g from "$lib/images/coffee-100g.png";
  import elaichi250g from "$lib/images/elaichi-250g.png";
  import elaichi500g from "$lib/images/elaichi-500g.png";
  import charchaFamily from "$lib/images/charcha-family.jpg";
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

  // Mix Masala's 100g and 1kg variants show each other's photo — a local
  // display-only swap, Sanity's own data is untouched.
  const shelfVariantImageOverrides: Record<string, Record<string, string>> = {
    "Charcha Mix Masala": {
      "100gm": "https://cdn.sanity.io/images/wyastv6s/production/082e80300179c9ea552dea512e89c9ae0fb1b3f2-2800x2000.png",
      "1kg": "https://cdn.sanity.io/images/wyastv6s/production/616307fb22f702fb383ab6a09931373304ac3bec-2511x1867.png",
    },
    "Charcha Elaichi Chai": {
      "250gm": elaichi250g,
      "500gm": elaichi500g,
    },
  };

  // Elaichi: only the 250g/500g packs are orderable at all — the smaller
  // sizes (12g/24g/100g) show neither CTA. Mix Masala: same treatment for
  // 20g/40g/100g — neither CTA, only 250g/500g/1kg are orderable.
  const shelfAddToOrderVariants: Record<string, string[]> = {
    "Charcha Elaichi Chai": ["250gm", "500gm"],
    "Charcha Mix Masala": ["250gm", "500gm", "1kg"],
  };
  const shelfOrderOnWhatsAppVariants: Record<string, string[]> = {
    "Charcha Elaichi Chai": ["250gm", "500gm"],
    "Charcha Mix Masala": ["250gm", "500gm", "1kg"],
  };

  const coffeeDescription =
    "For every conversation that needed one more cup. Charcha Arabica Coffee is a single-origin, medium roast made from 100% pure Arabica beans, freeze-dried to keep its aroma intact — no chicory, no watered-down excuses. Just honest coffee for people who talk business, gossip, or both.";
  const coffeeTagline = "Bean There, Talked That";

  $: displayProducts = pageData.productSection
    .filter((p) => !/coff/i.test(p.title) && !/gold/i.test(p.title))
    .map((p) => ({
      ...p,
      description: descriptionOverrides[p.title] ?? p.description,
      tagline: taglineOverrides[p.title],
      closingNote: closingNoteOverrides[p.title],
      // Elaichi no longer sells 1kg/3kg packs.
      variants:
        p.title === "Charcha Elaichi Chai"
          ? p.variants.filter((v) => parseInt(v.gram as string) < 1000)
          : p.variants,
    }));

  // Gold Tea is pulled out of the generic product loop and rendered as its
  // own signature moment (SignatureProduct) directly below the hero.
  $: goldTeaSource = pageData.productSection.find((p) => /gold/i.test(p.title));
  $: goldTeaProduct = goldTeaSource
    ? { ...goldTeaSource, description: descriptionOverrides[goldTeaSource.title] ?? goldTeaSource.description }
    : undefined;
  $: goldTeaTagline = goldTeaSource ? taglineOverrides[goldTeaSource.title] ?? "" : "";
  $: goldTeaClosingNote = goldTeaSource ? closingNoteOverrides[goldTeaSource.title] : undefined;

  // Coffee mirrors Gold Tea's signature treatment — pulled out of the
  // generic loop, rendered via SignatureProduct with reverse layout and a
  // neutral (non-ember) grade per the approved plan.
  $: coffeeSource = pageData.productSection.find((p) => /coff/i.test(p.title));
  $: coffeeProduct = coffeeSource ? { ...coffeeSource, description: coffeeDescription } : undefined;
</script>

<svelte:head>
  <title>{pageData.seo.title}</title>
  <meta name="description" content={pageData.seo.description} />
</svelte:head>

<section class="w-full overflow-x-clip bg-cream">
  <Topbar />
  <Header bg={heroSunrise} logo={pageData.logo} motion="kenBurns">
    <Hero title="Bolne Wali" titleSecondLine="Chai" subtitle="Banaras ki Chai. Duniya ki Charcha." />
  </Header>

  {#if goldTeaProduct}
    <SignatureProduct
      product={goldTeaProduct}
      tagline={goldTeaTagline}
      closingNote={goldTeaClosingNote}
      id={slugify(goldTeaProduct.title)}
      variantImages={{ "250gm": goldTea250g, "500gm": goldTea500g }}
    />
  {/if}

  {#if coffeeProduct}
    <SignatureProduct
      product={coffeeProduct}
      tagline={coffeeTagline}
      id={slugify(coffeeProduct.title)}
      reverse={true}
      grade="neutral"
      variantImages={{ "50gm": coffee50g, "100gm": coffee100g }}
    />
  {/if}

  <BanarasStory image={banarasStoryImage} />

  <div id="products">
    <ProductShelf
      products={displayProducts}
      variantImageOverrides={shelfVariantImageOverrides}
      addToOrderVariantsByProduct={shelfAddToOrderVariants}
      orderOnWhatsAppVariantsByProduct={shelfOrderOnWhatsAppVariants}
    />
  </div>

  <InfoSection infoDat={{ ...pageData.infoSection, title: "", image: charchaFamily }} />
  <FeatureSection featData={pageData.featureSection} />
</section>
