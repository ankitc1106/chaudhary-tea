<script lang="ts">
  import { reveal } from "$lib/actions/reveal";
  import { magnetic } from "$lib/actions/magnetic";

  export let defWidth: string = "w-[50%]";
  export let description: string;
</script>

<div class="max-w-3xl mx-auto flex flex-col items-center gap-4 md:gap-7">
  <span
    use:reveal={{ delay: 0 }}
    class="text-gold uppercase tracking-widest2 text-[0.55rem] md:text-sm font-rubik font-medium"
  >
    Est. Heritage &middot; 100% Authentic
  </span>

  <h1
    use:reveal={{ delay: 100 }}
    class="font-berk text-cream text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-tight"
  >
    Choudhary's
  </h1>

  <p
    use:reveal={{ delay: 200 }}
    class="text-xs sm:text-sm md:text-xl lg:text-2xl text-cream/85 font-light font-camby leading-relaxed max-w-xl"
  >
    {description}
  </p>

  <div
    use:reveal={{ delay: 300 }}
    class="flex flex-wrap items-center justify-center gap-3 md:gap-5 pt-2 md:pt-4"
  >
    <a
      use:magnetic={0.3}
      href="#products"
      class="inline-block bg-gold hover:bg-gold-light text-charcoal transition-all duration-200 ease-out px-5 md:px-8 py-2 md:py-3 rounded-full text-[0.6rem] md:text-sm font-rubik font-semibold uppercase tracking-wide"
    >
      Explore Our Range
    </a>
    <a
      use:magnetic={0.3}
      href="/contact-us"
      class="inline-block border border-gold/60 text-gold hover:bg-gold/10 transition-all duration-200 ease-out px-5 md:px-8 py-2 md:py-3 rounded-full text-[0.6rem] md:text-sm font-rubik font-medium uppercase tracking-wide"
    >
      Contact Us
    </a>
  </div>
</div>
