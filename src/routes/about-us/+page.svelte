<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { urlForImage } from "$lib/sanity";
  import { kenBurns } from "$lib/actions/kenBurns";
  import { maskReveal } from "$lib/actions/maskReveal";
  import { curtainReveal } from "$lib/actions/curtainReveal";
  import heroCover from "$lib/images/hero-cover.jpg";
  import founderPortrait from "$lib/images/founder-sanjay-kumar-choudhary.png";
  import kolkataEditorial from "$lib/images/kolkata-tea-tasting-editorial.png";
  import teaCentre1987 from "$lib/images/tea-centre-1987.jpeg";
  import teaCentreToday from "$lib/images/tea-centre-today.png";
  import goldTea500g from "$lib/images/gold-tea-500g.png";
  import coffee100g from "$lib/images/coffee-100g.png";
  import elaichi500g from "$lib/images/elaichi-500g.png";

  export let data;
  const pageData = data.pageData;

  // Charcha Today reuses the exact photography already live on the
  // homepage's product shelf for every product — sideImage isn't what's
  // actually shown there, so it isn't used here either.
  const productImageOverrides: Record<string, string> = {
    "Charcha Gold Tea": goldTea500g,
    "Charcha Arabica Coffee": coffee100g,
    "Charcha Elaichi Chai": elaichi500g,
    "Charcha Green Tea": urlForImage(
      "https://cdn.sanity.io/images/wyastv6s/production/d61cea74233b762d08d0263445490b281d4354ba-2500x2241.png",
      "width",
      700
    ),
    "Charcha Mix Masala": urlForImage(
      "https://cdn.sanity.io/images/wyastv6s/production/616307fb22f702fb383ab6a09931373304ac3bec-2511x1867.png",
      "width",
      700
    ),
  };

  $: todayProducts = (pageData?.productSection ?? []).map((p) => ({
    title: p.title,
    image: productImageOverrides[p.title] ?? urlForImage(p.sideImage, "width", 700),
  }));

  // One quiet fade/rise, fired once on first scroll-into-view. Same rAF-poll
  // approach used by curtainReveal/groupReveal elsewhere in this codebase —
  // IntersectionObserver proved unreliable here in earlier testing.
  function fadeReveal(node: HTMLElement, params: { delay?: number; y?: number; threshold?: number } = {}) {
    const delay = params.delay ?? 0;
    const y = params.y ?? 14;
    const threshold = params.threshold ?? 0.2;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return {};

    node.style.opacity = "0";
    node.style.transform = `translateY(${y}px)`;
    node.style.transition = `opacity 650ms ease-out ${delay}ms, transform 650ms ease-out ${delay}ms`;

    let rafId: number;
    let revealed = false;

    function visibleRatio() {
      const rect = node.getBoundingClientRect();
      if (rect.height <= 0) return 0;
      const visible = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
      return Math.max(0, visible) / rect.height;
    }

    function check() {
      if (revealed) return;
      if (visibleRatio() >= threshold) {
        revealed = true;
        node.style.opacity = "1";
        node.style.transform = "translateY(0)";
        return;
      }
      rafId = requestAnimationFrame(check);
    }
    rafId = requestAnimationFrame(check);

    return {
      destroy() {
        cancelAnimationFrame(rafId);
      },
    };
  }

  // The two "chapter marker" numerals (1987 / 2017) get one shared GSAP
  // treatment — the only GSAP on this page, kept to these two moments
  // deliberately rather than used throughout.
  let num1987El: HTMLElement;
  let num2017El: HTMLElement;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let ctx: any;

  onMount(async () => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const gsap = (await import("gsap")).default;
    const { ScrollTrigger } = await import("gsap/ScrollTrigger");
    gsap.registerPlugin(ScrollTrigger);

    ctx = gsap.context(() => {
      [num1987El, num2017El].filter(Boolean).forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.92, filter: "blur(6px)" },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" },
          }
        );
      });
    });
  });

  onDestroy(() => {
    ctx?.revert();
  });
</script>

<svelte:head>
  <title>Choudhary's Charcha — About Charcha</title>
  <meta
    name="description"
    content="The story of Choudhary's Charcha — Sanjay Kumar Choudhary's journey from learning the tea trade in Kolkata, to founding Tea Centre in Varanasi in 1987, to establishing Teafizz Enterprises Pvt. Ltd. in 2017."
  />
</svelte:head>

<section class="w-full overflow-x-clip bg-cream">
  <!-- 01 Hero -->
  <div class="relative h-screen w-full overflow-hidden bg-charcoal">
    <div use:kenBurns={{ duration: 16000, scale: 1.08 }} class="absolute inset-0">
      <img src={heroCover} alt="" class="w-full h-full object-cover" style="object-position: 50% 30%;" />
    </div>
    <div class="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/45 to-charcoal"></div>
    <div class="relative h-full flex flex-col items-center justify-center text-center px-5">
      <h1
        use:maskReveal
        class="font-hero font-medium text-cream text-4xl sm:text-5xl md:text-7xl leading-[1.15] max-w-4xl"
      >
        A Journey Worth Having a <span class="text-gold">Charcha About.</span>
      </h1>
      <p
        use:maskReveal={{ delay: 250 }}
        class="mt-6 font-hero text-lg md:text-2xl text-cream/80 leading-relaxed max-w-xl"
      >
        The story of Choudhary's Charcha begins with tea, experience and a journey that started decades ago.
      </p>
    </div>
    <div
      class="absolute inset-x-0 bottom-0 h-[14%] pointer-events-none"
      style="background: linear-gradient(to bottom, transparent 0%, #F7F1E4 100%);"
    ></div>
  </div>

  <!-- 02 Founder -->
  <div class="relative bg-cream px-5 md:px-16 lg:px-24 py-16 md:py-28">
    <div class="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
      <div class="relative order-1">
        <div use:curtainReveal={{ duration: 900 }} class="overflow-hidden bg-charcoal/5">
          <img
            src={founderPortrait}
            alt="Sanjay Kumar Choudhary, founder of Choudhary's Charcha"
            class="w-full h-[380px] md:h-[520px] object-cover object-top"
          />
        </div>
      </div>
      <div use:fadeReveal class="order-2 space-y-4 md:space-y-5 text-charcoal">
        <span class="block font-body text-[0.65rem] md:text-xs uppercase tracking-widest2 text-gold-dark font-bold">
          The Founder
        </span>
        <h2 class="font-hero font-medium text-3xl md:text-5xl leading-[1.15]">Before Charcha, there was tea.</h2>
        <div class="w-12 h-px bg-gold"></div>
        <p class="font-body text-base md:text-lg text-charcoal/75 leading-relaxed max-w-lg">
          At the heart of Choudhary's Charcha is Sanjay Kumar Choudhary, who began his journey in his early
          twenties.
        </p>
        <p class="font-body text-base md:text-lg text-charcoal/75 leading-relaxed max-w-lg">
          It was during these years that he began working in Kolkata with major tea blenders.
        </p>
      </div>
    </div>
  </div>

  <!-- 03 Kolkata — Learning Tea -->
  <div class="relative bg-[#241A16]">
    <div class="absolute inset-x-0 top-0 h-[8%] pointer-events-none" style="background: linear-gradient(to bottom, #F7F1E4 0%, transparent 100%);"></div>
    <div class="max-w-screen-2xl mx-auto px-5 md:px-10 lg:px-16 py-16 md:py-28">
      <div class="grid md:grid-cols-[1.5fr_1fr] gap-10 md:gap-16 items-center">
        <div class="order-2 md:order-1 relative">
          <div use:curtainReveal={{ duration: 1000 }} class="overflow-hidden">
            <img
              src={kolkataEditorial}
              alt=""
              class="w-full h-[320px] md:h-[460px] object-cover"
            />
          </div>
          <p class="mt-3 font-body italic text-xs text-cream/45 leading-relaxed">
            An editorial interpretation of the tea-tasting world of Kolkata.
          </p>
        </div>
        <div use:fadeReveal class="order-1 md:order-2 space-y-4 md:space-y-5 text-cream">
          <span class="block font-body text-[0.65rem] md:text-xs uppercase tracking-widest2 text-gold-dark font-bold">
            The Beginning
          </span>
          <h2 class="font-hero font-medium text-3xl md:text-5xl leading-[1.15]">Learning the craft of tea.</h2>
          <div class="w-12 h-px bg-gold"></div>
          <p class="font-body text-base md:text-lg text-cream/70 leading-relaxed max-w-md">
            It was in Kolkata, working with major tea blenders, that he learned the traits of tea tasting and built
            his contacts in the tea world.
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- 04 1987 — Tea Centre -->
  <div class="relative bg-[#241A16] px-5 md:px-16 lg:px-24 py-16 md:py-28">
    <div class="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
      <div use:fadeReveal class="order-2 md:order-1 space-y-4 md:space-y-5 text-cream">
        <p
          bind:this={num1987El}
          class="font-hero font-medium text-gold text-[5.5rem] sm:text-[7rem] md:text-[8.5rem] leading-none"
        >
          1987
        </p>
        <h2 class="font-hero font-medium text-3xl md:text-5xl leading-[1.15]">Tea Centre</h2>
        <p class="font-body text-base md:text-lg text-cream/70 leading-relaxed max-w-md">
          After his time in Kolkata, he came to Varanasi. In 1987, he started Tea Centre, which deals in bulk and
          retail CTC Tea.
        </p>
      </div>
      <div class="order-1 md:order-2">
        <div use:curtainReveal={{ duration: 1000 }} class="overflow-hidden border border-gold/20 bg-charcoal">
          <img
            src={teaCentre1987}
            alt="The original Tea Centre signboard in Varanasi"
            class="w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- 05 Tea Centre Today -->
  <div class="relative bg-cream px-5 md:px-16 lg:px-24 py-16 md:py-24">
    <div class="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
      <div use:fadeReveal class="space-y-4 md:space-y-5 text-charcoal">
        <h2 class="font-hero font-medium text-2xl md:text-4xl leading-[1.2]">A business that continues.</h2>
        <p class="font-body text-base md:text-lg text-charcoal/75 leading-relaxed max-w-md">
          Tea Centre is still one of the biggest wholesalers in Varanasi and is also the highest seller of Charcha
          Tea.
        </p>
      </div>
      <div use:fadeReveal={{ delay: 120 }}>
        <div class="overflow-hidden border border-gold-dark/20">
          <img
            src={teaCentreToday}
            alt="Tea Centre's storefront in Varanasi today"
            class="w-full h-[280px] md:h-[360px] object-cover"
            style="object-position: 50% 10%;"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- 06 2017 — Teafizz Enterprises -->
  <div class="relative bg-[#241A16] px-5 md:px-16 lg:px-24 py-16 md:py-28 text-center">
    <div use:fadeReveal class="max-w-2xl mx-auto space-y-4 md:space-y-5">
      <span class="block font-body text-[0.65rem] md:text-xs uppercase tracking-widest2 text-gold-dark font-bold">
        A New Chapter
      </span>
      <p
        bind:this={num2017El}
        class="font-hero font-medium text-gold text-[5.5rem] sm:text-[7rem] md:text-[8.5rem] leading-none"
      >
        2017
      </p>
      <h2 class="font-hero font-medium text-3xl md:text-5xl leading-[1.15] text-cream">
        Teafizz Enterprises Pvt. Ltd.
      </h2>
      <p class="font-body text-base md:text-lg text-cream/70 leading-relaxed max-w-md mx-auto">
        In 2017, he founded Teafizz Enterprises Pvt. Ltd., which holds the rights to Charcha.
      </p>
    </div>
  </div>

  <!-- 07 The Three Brands -->
  <div class="relative bg-cream px-5 md:px-16 lg:px-24 py-16 md:py-28">
    <div use:fadeReveal class="max-w-screen-xl mx-auto">
      <div class="text-center mb-12 md:mb-16">
        <h2 class="font-hero font-medium text-3xl md:text-5xl text-charcoal">The Teafizz House</h2>
        <p class="mt-4 font-body text-base md:text-lg text-charcoal/70 max-w-lg mx-auto">
          Teafizz also has two other brands: Power and Shahi.
        </p>
      </div>
      <div
        class="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gold/20 text-center"
      >
        <div class="py-6 sm:py-0 sm:px-6">
          <p class="font-hero font-medium text-gold text-2xl md:text-4xl">Charcha</p>
        </div>
        <div class="py-6 sm:py-0 sm:px-6">
          <p class="font-hero font-medium text-charcoal text-2xl md:text-4xl">Power</p>
        </div>
        <div class="py-6 sm:py-0 sm:px-6">
          <p class="font-hero font-medium text-charcoal text-2xl md:text-4xl">Shahi</p>
        </div>
      </div>
    </div>
  </div>

  <!-- 08 Charcha Today -->
  <div class="relative bg-[#241A16] px-5 md:px-16 lg:px-24 py-16 md:py-28">
    <div class="max-w-screen-xl mx-auto">
      <div use:fadeReveal class="text-center mb-12 md:mb-16">
        <h2 class="font-hero font-medium text-3xl md:text-5xl text-cream leading-[1.2] max-w-2xl mx-auto">
          A brand worth having a charcha about.
        </h2>
        <p class="mt-4 font-body text-base md:text-lg text-cream/70 max-w-xl mx-auto">
          He has made Charcha a brand worth having a charcha about.
        </p>
      </div>

      {#if todayProducts.length}
        <div use:fadeReveal={{ delay: 120 }} class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8">
          {#each todayProducts as p}
            <div class="text-center">
              <div class="aspect-square bg-cream/5 flex items-center justify-center p-4 md:p-6">
                <img src={p.image} alt={p.title} class="max-w-full max-h-full object-contain" />
              </div>
              <p class="mt-3 font-body text-xs md:text-sm text-cream/70">{p.title}</p>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>

  <!-- 09 Closing -->
  <div class="relative h-[70vh] md:h-[80vh] w-full overflow-hidden bg-charcoal">
    <div use:kenBurns={{ duration: 16000, scale: 1.06 }} class="absolute inset-0">
      <img src={heroCover} alt="" class="w-full h-full object-cover" style="object-position: 50% 45%;" />
    </div>
    <div class="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/60 to-charcoal"></div>
    <div class="relative h-full flex flex-col items-center justify-center text-center px-5">
      <h2 use:fadeReveal class="font-hero font-medium text-cream text-4xl md:text-6xl leading-[1.15]">
        Charcha Continues.
      </h2>
      <p use:fadeReveal={{ delay: 120 }} class="mt-4 font-body text-base md:text-lg text-cream/75">
        Banaras ki Chai. Duniya ki Charcha.
      </p>
      <a
        use:fadeReveal={{ delay: 240 }}
        href="/"
        class="mt-8 min-h-[44px] inline-flex items-center gap-2 font-body text-sm text-gold hover:text-gold-light transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal rounded-sm"
      >
        Explore Charcha
        <span aria-hidden="true">→</span>
      </a>
    </div>
  </div>
</section>
