<script lang="ts">
  import { reveal } from "$lib/actions/reveal";
  import { magnetic } from "$lib/actions/magnetic";

  export let defWidth: string = "w-[50%]";
</script>

<div class="max-w-3xl mx-auto flex flex-col items-center gap-4 md:gap-7">
  <div
    use:reveal={{ delay: 0 }}
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
