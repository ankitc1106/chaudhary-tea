<script lang="ts">
  import Icon from "@iconify/svelte";
  import { reveal } from "$lib/actions/reveal";
  import { magnetic } from "$lib/actions/magnetic";
  import { cursorGlow } from "$lib/actions/cursorGlow";
  import heroCover from "$lib/images/hero-cover.jpg";
  import heritageImage from "$lib/images/about-us-heritage.jpg";

  const values = [
    {
      icon: "solar:verified-check-bold",
      title: "Our Promise",
      text: "Every batch is sourced from trusted estates and checked for purity before it reaches your cup.",
    },
    {
      icon: "solar:compass-bold",
      title: "Our Vision",
      text: "To make honest, full-flavoured chai and spice part of every good conversation across India.",
    },
    {
      icon: "solar:users-group-rounded-bold",
      title: "Our Community",
      text: "From the farmers who grow the leaf to the families who brew it — everyone's part of the Charcha story.",
    },
    {
      icon: "solar:leaf-bold",
      title: "Our Impact",
      text: "Sustainable sourcing and fair practices, so every cup does a little good beyond the taste.",
    },
  ];
</script>

<svelte:head>
  <title>Our Heritage — Choudhary's Charcha</title>
  <meta
    name="description"
    content="Discover the story behind Choudhary's Charcha — a family tea tradition turned into teas, spice blends, and coffee, made for good conversations."
  />
</svelte:head>

<section class="w-full overflow-x-clip bg-cream">
  <div class="relative h-[38vh] md:h-[48vh] w-full overflow-hidden bg-charcoal">
    <div
      style="background-image: url({heroCover})"
      class="absolute inset-0 bg-cover bg-[position:50%_30%]"
    ></div>
    <div class="absolute inset-0 bg-gradient-to-b from-charcoal/75 via-charcoal/55 to-charcoal"></div>
    <div class="relative h-full flex flex-col items-center justify-center text-center px-5 pt-14 md:pt-16">
      <div use:reveal>
        <span
          class="block text-gold uppercase tracking-widest2 text-[0.6rem] md:text-xs font-rubik font-semibold mb-3"
        >
          Our Story
        </span>
        <h1 class="font-inria text-cream text-4xl md:text-6xl">Our Heritage</h1>
      </div>
    </div>
  </div>

  <div use:cursorGlow class="relative bg-cream py-16 md:py-28 px-5 md:px-16 lg:px-24 overflow-hidden">
    <div class="max-w-screen-2xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
      <div use:reveal class="order-2 md:order-1 space-y-4 md:space-y-6 text-charcoal">
        <span class="text-gold-dark uppercase tracking-widest2 text-[0.6rem] md:text-xs font-rubik font-semibold">
          It Started With One Cup
        </span>
        <h1 class="text-3xl md:text-5xl font-inria">A Charcha on Who We Are</h1>
        <div class="w-12 md:w-16 h-[2px] bg-gold"></div>
        <p class="text-sm md:text-lg text-charcoal/70 font-camby leading-relaxed max-w-lg">
          What began as a venture dedicated to honest chai has evolved into
          an artisanal collective. From day one, Choudhary's Charcha
          rejected artificial flavorings in favor of estate-picked leaves
          and freshly cracked botanicals.
        </p>
        <p class="text-sm md:text-lg text-charcoal/70 font-camby leading-relaxed max-w-lg">
          That obsession with foundational flavor led us into slow-roasted
          coffees and meticulously sourced whole garam masala. We don't mask
          ingredients; we let premium terroirs and hand-selected spices do
          the work.
        </p>
        <p class="text-sm md:text-lg text-charcoal/70 font-camby leading-relaxed max-w-lg">
          Every roast, blend, and whole spice we offer serves a single
          purpose: bringing depth to your table and substance to the
          conversations around it.
        </p>
      </div>
      <div use:reveal class="order-1 md:order-2 relative rounded-3xl overflow-hidden group">
        <img
          src={heritageImage}
          alt="Charcha — good conversations, one cup at a time"
          class="w-full h-[280px] md:h-[420px] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div class="absolute inset-0 ring-1 ring-inset ring-gold/20 rounded-3xl pointer-events-none"></div>
      </div>
    </div>
  </div>

  <div use:cursorGlow class="relative bg-charcoal py-16 md:py-24 px-5 md:px-16 text-center overflow-hidden">
    <div use:reveal class="max-w-3xl mx-auto space-y-5 md:space-y-6">
      <Icon icon="mdi:format-quote-open" class="text-gold/40 text-4xl md:text-5xl mx-auto" />
      <p class="font-berk text-cream text-2xl sm:text-3xl md:text-4xl leading-snug">
        Charcha is more than a name — it's an invitation to slow down, pour a
        cup, and talk a little longer.
      </p>
      <span class="block text-gold uppercase tracking-widest2 text-[0.6rem] md:text-xs font-rubik font-semibold">
        Brew Conversations
      </span>
    </div>
  </div>

  <div use:reveal use:cursorGlow class="bg-cream py-16 md:py-28 px-5 md:px-16 lg:px-24">
    <div class="max-w-screen-xl mx-auto">
      <div class="text-center mb-12 md:mb-16">
        <span class="text-gold-dark uppercase tracking-widest2 text-[0.6rem] md:text-xs font-rubik font-semibold">
          What We Stand For
        </span>
        <h1 class="font-inria text-3xl md:text-5xl mt-2 text-charcoal">Our Values</h1>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {#each values as v, i}
          <div
            use:reveal={{ delay: i * 90 }}
            class="group relative border-t border-gold/30 pt-5 space-y-4 px-1 pb-2 rounded-b-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-dark hover:bg-gradient-to-b hover:from-gold/[0.06] hover:to-transparent hover:shadow-[0_20px_40px_-20px_rgba(201,162,74,0.25)]"
          >
            <div
              class="flex items-center justify-center w-12 h-12 rounded-full border border-gold-dark/30 bg-gold/5 transition-all duration-300 group-hover:bg-gold group-hover:border-gold"
            >
              <Icon
                icon={v.icon}
                class="text-xl text-gold-dark transition-colors duration-300 group-hover:text-charcoal"
              />
            </div>
            <h3 class="font-inria text-lg md:text-xl text-charcoal">{v.title}</h3>
            <p class="text-sm text-charcoal/70 font-camby leading-relaxed">{v.text}</p>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <div use:cursorGlow class="relative bg-charcoal py-16 md:py-24 px-5 md:px-16 text-center overflow-hidden">
    <div use:reveal class="max-w-xl mx-auto space-y-5 md:space-y-6">
      <h1 class="font-inria text-cream text-3xl md:text-5xl">Good Chai Deserves Good Company</h1>
      <p class="text-sm md:text-lg text-cream/70 font-camby leading-relaxed">
        Explore our full range or reach out — we'd love to hear from you.
      </p>
      <div class="flex flex-wrap items-center justify-center gap-3 md:gap-5 pt-2">
        <a
          use:magnetic={0.3}
          href="/#products"
          class="inline-block bg-gold hover:bg-gold-light text-charcoal transition-all duration-200 ease-out px-6 md:px-8 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-rubik font-semibold uppercase tracking-wide"
        >
          Explore Our Range
        </a>
        <a
          use:magnetic={0.3}
          href="/contact-us"
          class="inline-block border border-gold/60 text-gold hover:bg-gold/10 transition-all duration-200 ease-out px-6 md:px-8 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-rubik font-medium uppercase tracking-wide"
        >
          Get in Touch
        </a>
      </div>
    </div>
  </div>
</section>
