<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  export let image: string;

  let sectionEl: HTMLElement;
  let imgWrapEl: HTMLElement;
  let imgEl: HTMLElement;
  let headlineLine1: HTMLElement;
  let headlineLine2: HTMLElement;
  let supportEl: HTMLElement;
  let ctaEl: HTMLElement;

  let ctx: { revert: () => void } | undefined;

  onMount(async () => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return; // everything renders in its final state by default

    const gsap = (await import("gsap")).default;
    const { ScrollTrigger } = await import("gsap/ScrollTrigger");
    gsap.registerPlugin(ScrollTrigger);

    ctx = gsap.context(() => {
      // One-time entrance sequence: image wipes in, then headline (two
      // lines), support line, CTA — in that order, once, on first view.
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionEl, start: "top 75%", toggleActions: "play none none none" },
      });
      tl.fromTo(
        imgWrapEl,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: "power2.out" }
      )
        .fromTo(headlineLine1, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.6, ease: "power1.out" }, 0.3)
        .fromTo(headlineLine2, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.6, ease: "power1.out" }, 0.45)
        .fromTo(supportEl, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.45, ease: "power1.out" }, 0.75)
        .fromTo(ctaEl, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.45, ease: "power1.out" }, 1.0);

      // Separate, continuous, very subtle camera drift tied to the
      // section's own natural scroll-through (no pin).
      gsap.fromTo(
        imgEl,
        { scale: 1.0, xPercent: 0 },
        {
          scale: 1.04,
          xPercent: -1.5,
          ease: "none",
          scrollTrigger: { trigger: sectionEl, start: "top bottom", end: "bottom top", scrub: 1 },
        }
      );
    }, sectionEl);
  });

  onDestroy(() => {
    ctx?.revert();
  });
</script>

<section
  bind:this={sectionEl}
  aria-label="Closing invitation"
  class="relative h-[85vh] md:h-[90vh] lg:h-screen overflow-hidden bg-[#241A16]"
>
  <div bind:this={imgWrapEl} class="absolute inset-0">
    <img
      bind:this={imgEl}
      src={image}
      alt=""
      class="w-full h-full object-cover"
      style="object-position: center;"
    />
  </div>

  <!-- Subtle darkening on the right so cream/gold text stays legible over
       the photo's own negative space — not a full-frame overlay. -->
  <div
    class="absolute inset-0 pointer-events-none"
    style="background: linear-gradient(to right, transparent 40%, rgba(20,14,11,0.35) 65%, rgba(20,14,11,0.55) 100%);"
  ></div>

  <!-- Settles into the footer's espresso tone — taller on mobile where the
       text block sits at the bottom, shorter on desktop. -->
  <div
    class="absolute inset-x-0 bottom-0 h-[55%] md:h-[22%] pointer-events-none"
    style="background: linear-gradient(to bottom, transparent 0%, #241A16 100%);"
  ></div>

  <div
    class="relative h-full flex items-end md:items-center justify-center md:justify-end px-6 md:px-12 lg:px-20 pb-12 md:pb-0"
  >
    <div class="w-full md:w-[40%] text-center md:text-left">
      <h2 class="font-hero font-medium text-cream text-3xl md:text-4xl lg:text-5xl leading-[1.25]">
        <span bind:this={headlineLine1} class="block">There's Always More</span>
        <span bind:this={headlineLine2} class="block">to <span class="text-gold">Charcha.</span></span>
      </h2>
      <p bind:this={supportEl} class="mt-4 font-body text-sm md:text-base text-cream/65 leading-relaxed">
        Tea, coffee and masala — made for the moments we share.
      </p>
      <div class="mt-6">
        <a
          bind:this={ctaEl}
          href="/contact-us"
          class="min-h-[44px] inline-flex items-center justify-center px-7 rounded text-sm font-body font-medium text-gold border border-gold hover:bg-gold/10 transition-colors"
        >
          Talk to Charcha
        </a>
      </div>
    </div>
  </div>
</section>
