<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  export let image: string;

  let sectionEl: HTMLElement;
  let stickyEl: HTMLElement;
  let imgEl: HTMLElement;
  let warmOverlayEl: HTMLElement;

  let scene1El: HTMLElement;
  let scene1Line1: HTMLElement;
  let scene1Line2: HTMLElement;
  let scene1Hairline: HTMLElement;

  let scene3El: HTMLElement;
  let scene3Line1: HTMLElement;
  let scene3Line2: HTMLElement;

  let scene5El: HTMLElement;
  let scene5Eyebrow: HTMLElement;
  let scene5Charcha: HTMLElement;
  let scene5Begins: HTMLElement;
  let scene5Hairline: HTMLElement;

  let hindiEl: HTMLElement;

  // Reduced-motion branch renders a different, simpler DOM (no pin, no
  // overlapping scene crossfades — a plain stacked reading order instead).
  // Default false for SSR; corrected synchronously on mount, well before
  // this below-the-fold section is ever in view.
  let reducedMotion = false;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mm: any;

  onMount(async () => {
    reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const gsap = (await import("gsap")).default;
    const { ScrollTrigger } = await import("gsap/ScrollTrigger");
    gsap.registerPlugin(ScrollTrigger);

    mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
        isTablet: "(min-width: 768px) and (max-width: 1023px)",
        isMobile: "(max-width: 767px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context: any) => {
        const conditions = context.conditions as Record<string, boolean>;
        const { isDesktop, isTablet, reduceMotion } = conditions;

        if (reduceMotion) {
          // No pin, no scrub, no blur, no large transforms — just a quiet
          // one-time fade/rise per block as it's scrolled to, in normal
          // reading order. Nothing here is hidden, only un-animated.
          const blocks = [scene1El, scene3El, scene5El, hindiEl].filter(Boolean);
          blocks.forEach((el) => {
            gsap.fromTo(
              el,
              { opacity: 0, y: 8 },
              {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: "power1.out",
                scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" },
              }
            );
          });
          return;
        }

        const endDistance = isDesktop ? "205%" : isTablet ? "172%" : "160%";
        const panRange = isDesktop ? -24 : isTablet ? -14 : -6;
        const scaleStart = isDesktop ? 1.04 : 1.03;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionEl,
            start: "top top",
            end: "+=" + endDistance,
            scrub: 1,
            pin: stickyEl,
            anticipatePin: 1,
          },
          defaults: { ease: "none" },
        });

        // One continuous camera move across nearly the whole sequence —
        // the image pan/scale and the text beats share this single
        // timeline so they read as one story, not separate effects.
        tl.fromTo(
          imgEl,
          { xPercent: 0, scale: scaleStart },
          { xPercent: panRange, scale: 1.01, duration: 9.5 },
          0
        );

        // Scene 1 — "Every ghat has a story." (Ganga / sunrise side)
        tl.fromTo(
          scene1Line1,
          { opacity: 0, y: 20, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" },
          0.2
        )
          .fromTo(
            scene1Line2,
            { opacity: 0, y: 20, filter: "blur(8px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" },
            0.45
          )
          .fromTo(scene1Hairline, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "power2.out" }, 0.8)
          // hold, then recede as Scene 3 approaches
          .to(scene1El, { opacity: 0, y: -16, filter: "blur(6px)", duration: 0.6, ease: "power1.in" }, 2.6);

        // Scene 3 — "Every cup starts a new one." (ghats / bridge)
        tl.fromTo(
          scene3Line1,
          { opacity: 0, y: 20, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" },
          2.9
        )
          .fromTo(
            scene3Line2,
            { opacity: 0, y: 20, filter: "blur(8px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" },
            3.15
          )
          // warm tonal shift as the camera nears the chai stall
          .fromTo(warmOverlayEl, { opacity: 0 }, { opacity: 0.22, duration: 1.2 }, 5.0)
          .to(scene3El, { opacity: 0, y: -16, filter: "blur(6px)", duration: 0.6, ease: "power1.in" }, 5.6);

        // Scene 5 — arrival: "This is where / Charcha / begins."
        tl.fromTo(
          scene5Eyebrow,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power1.out" },
          6.1
        )
          .fromTo(
            scene5Charcha,
            { opacity: 0, y: 20, filter: "blur(8px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "power2.out" },
            6.5
          )
          .fromTo(
            scene5Begins,
            { opacity: 0, y: 16, filter: "blur(6px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power2.out" },
            6.9
          )
          .fromTo(scene5Hairline, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "power2.out" }, 7.3);

        // Hindi motif — a discovered detail, not a headline
        tl.fromTo(hindiEl, { opacity: 0 }, { opacity: 0.55, duration: 0.8 }, 8.0);

        // Hold the arrival moment — "Charcha begins." and the Hindi line
        // stay on screen, untouched, for a stretch of scroll before the
        // pin releases, so the ending isn't rushed past.
        tl.to(hindiEl, { opacity: 0.55, duration: 2 }, 8.8);
      }
    );
  });

  onDestroy(() => {
    mm?.revert();
  });
</script>

<section
  bind:this={sectionEl}
  id="banaras-story"
  aria-label="Banaras story"
  class="relative bg-[#241A16]"
>
  {#if reducedMotion}
    <!-- Simplified, non-pinned reading order -->
    <div class="relative h-[70vh] md:h-[85vh] w-full overflow-hidden">
      <img src={image} alt="" class="w-full h-full object-cover" />
      <div
        class="absolute inset-x-0 top-0 h-[12%] pointer-events-none"
        style="background: linear-gradient(to bottom, #241A16 0%, transparent 100%);"
      ></div>
    </div>

    <div class="px-6 md:px-16 lg:px-24 py-14 md:py-20 space-y-12 md:space-y-16 max-w-2xl mx-auto text-center">
      <div bind:this={scene1El}>
        <p class="font-hero text-cream text-3xl md:text-4xl leading-[1.2]">Every ghat</p>
        <p class="font-hero text-cream text-3xl md:text-4xl leading-[1.2]">has a story.</p>
      </div>
      <div bind:this={scene3El}>
        <p class="font-hero text-cream text-3xl md:text-4xl leading-[1.2]">Every cup</p>
        <p class="font-hero text-cream text-3xl md:text-4xl leading-[1.2]">starts a new one.</p>
      </div>
      <div bind:this={scene5El}>
        <span class="block font-body text-[0.7rem] md:text-xs uppercase tracking-widest2 text-cream/60">
          This is where
        </span>
        <h2 class="font-hero text-cream text-4xl md:text-5xl mt-2">
          <span class="text-gold">Charcha</span>
        </h2>
        <p class="font-hero text-cream text-2xl md:text-3xl mt-1">begins.</p>
      </div>
      <p bind:this={hindiEl} class="font-body text-cream/55 text-sm md:text-base tracking-wide">
        चर्चा यहीं से शुरू होती है
      </p>
    </div>
  {:else}
    <div bind:this={stickyEl} class="relative h-screen w-full overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <img
          bind:this={imgEl}
          src={image}
          alt=""
          class="absolute inset-y-0 left-0 h-full w-[135%] max-w-none object-cover will-change-transform"
          style="transform-origin: left center;"
        />
      </div>

      <!-- Softens the seam where Coffee's espresso background meets this
           photo — the sunrise settles in rather than cutting hard, same
           technique used for the Hero → Gold Tea transition. -->
      <div
        class="absolute inset-x-0 top-0 h-[10%] pointer-events-none z-10"
        style="background: linear-gradient(to bottom, #241A16 0%, transparent 100%);"
      ></div>

      <!-- Warm tonal shift as the camera nears the chai stall — not a
           spotlight, just a very low-opacity tint on top of the photo. -->
      <div
        bind:this={warmOverlayEl}
        class="absolute inset-0 opacity-0 pointer-events-none"
        style="background: linear-gradient(to right, transparent 55%, rgba(201,162,74,0.18) 100%);"
      ></div>

      <!-- Softens the seam going into The Table — settles toward its
           paper-dim background rather than cutting hard. Sits low enough
           to stay clear of the text layers. -->
      <div
        class="absolute inset-x-0 bottom-0 h-[10%] pointer-events-none"
        style="background: linear-gradient(to top, #EDE6D4 0%, transparent 100%);"
      ></div>

      <!-- Scene 1 — Ganga / sunrise side -->
      <div
        bind:this={scene1El}
        class="absolute left-[6%] md:left-[9%] top-1/2 -translate-y-1/2 max-w-[80%] md:max-w-md text-left"
      >
        <div
          class="absolute -inset-x-8 -inset-y-10 -z-10"
          style="background: radial-gradient(ellipse 75% 70% at 30% 50%, rgba(20,18,16,0.4), transparent 70%);"
        ></div>
        <p bind:this={scene1Line1} class="font-hero font-medium text-cream text-4xl md:text-6xl leading-[1.15]">
          Every ghat
        </p>
        <p bind:this={scene1Line2} class="font-hero font-medium text-cream text-4xl md:text-6xl leading-[1.15]">
          has a story.
        </p>
        <div bind:this={scene1Hairline} class="w-16 h-px bg-gold mt-5 md:mt-6 origin-left"></div>
      </div>

      <!-- Scene 3 — ghats / bridge -->
      <div
        bind:this={scene3El}
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[85%] md:max-w-lg text-center"
      >
        <div
          class="absolute -inset-x-10 -inset-y-10 -z-10"
          style="background: radial-gradient(ellipse 80% 70% at 50% 50%, rgba(20,18,16,0.4), transparent 70%);"
        ></div>
        <p bind:this={scene3Line1} class="font-hero font-medium text-cream text-4xl md:text-6xl leading-[1.15]">
          Every cup
        </p>
        <p bind:this={scene3Line2} class="font-hero font-medium text-cream text-4xl md:text-6xl leading-[1.15]">
          starts a new one.
        </p>
      </div>

      <!-- Scene 5 — arrival, over the chai stall -->
      <div
        bind:this={scene5El}
        class="absolute right-[6%] md:right-[9%] top-1/2 -translate-y-1/2 max-w-[80%] md:max-w-md text-right"
      >
        <div
          class="absolute -inset-x-8 -inset-y-10 -z-10"
          style="background: radial-gradient(ellipse 75% 70% at 70% 50%, rgba(20,18,16,0.45), transparent 70%);"
        ></div>
        <span
          bind:this={scene5Eyebrow}
          class="block font-body text-[0.7rem] md:text-xs uppercase tracking-widest2 text-cream/70"
        >
          This is where
        </span>
        <h2 bind:this={scene5Charcha} class="font-hero font-medium text-cream text-5xl md:text-7xl mt-2">
          <span class="text-gold">Charcha</span>
        </h2>
        <p bind:this={scene5Begins} class="font-hero font-medium text-cream text-3xl md:text-5xl mt-1">
          begins.
        </p>
        <div bind:this={scene5Hairline} class="w-16 h-px bg-gold mt-5 md:mt-6 ml-auto origin-right"></div>
      </div>

      <!-- Hindi motif — a discovered detail, bottom-left -->
      <p
        bind:this={hindiEl}
        class="absolute bottom-[8%] left-[6%] md:left-[9%] opacity-0 font-body text-cream/55 text-sm md:text-base tracking-wide"
      >
        चर्चा यहीं से शुरू होती है
      </p>
    </div>
  {/if}
</section>
