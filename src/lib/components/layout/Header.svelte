<script lang="ts">
  import { urlForImage } from "$lib/sanity";
  import coffeeJar from "$lib/images/coffee-jar.jpg";
  import { parallax } from "$lib/actions/parallax";
  import { magnetic } from "$lib/actions/magnetic";

  export let bg: string;
  export let logo: string;

  const lineup = [
    {
      name: "Elaichi Tea",
      src: "https://cdn.sanity.io/images/wyastv6s/production/37ee65b82aa30decec1b87d40d08b33b11167d83-2511x1867.png?w=300&auto=format",
    },
    {
      name: "Gold Tea",
      src: "https://cdn.sanity.io/images/wyastv6s/production/3de34f7262286238f5e4e10df9604c58c43476f0-2500x2241.png?w=300&auto=format",
    },
    {
      name: "Green Tea",
      src: "https://cdn.sanity.io/images/wyastv6s/production/d61cea74233b762d08d0263445490b281d4354ba-2500x2241.png?w=300&auto=format",
    },
    {
      name: "Mix Masala",
      src: "https://cdn.sanity.io/images/wyastv6s/production/616307fb22f702fb383ab6a09931373304ac3bec-2511x1867.png?w=300&auto=format",
    },
    {
      name: "Arabica Coffee",
      src: coffeeJar,
    },
  ];
</script>

<div class="relative h-[92vh] md:h-screen w-full overflow-hidden">
  <div
    use:parallax={0.15}
    style="--bg-url: url({urlForImage(bg, 'width', 1920)})"
    class="absolute inset-0 bg-cover bg-center bg-[image:var(--bg-url)] will-change-transform"
  ></div>
  <div
    class="absolute inset-0 bg-gradient-to-b from-charcoal/85 via-charcoal/55 to-charcoal"
  ></div>

  <div
    class="relative h-full flex flex-col items-center justify-center text-center px-5 pt-24 md:pt-28"
  >
    <slot />
  </div>

  <div class="absolute -bottom-8 md:-bottom-12 inset-x-0 flex justify-center px-4 z-20">
    <div
      class="flex gap-4 md:gap-8 items-start bg-cream/95 backdrop-blur rounded-2xl md:rounded-[2rem] shadow-2xl px-5 md:px-12 py-4 md:py-7 overflow-x-auto no-scrollbar max-w-full"
    >
      {#each lineup as item}
        <div
          use:magnetic={0.15}
          class="flex flex-col items-center gap-1.5 md:gap-2 shrink-0 w-14 md:w-24 transition-transform duration-150 ease-out hover:scale-110 cursor-default"
        >
          <img
            src={item.src}
            alt={item.name}
            class="h-12 md:h-20 w-full object-contain drop-shadow-md"
          />
          <span
            class="text-[0.5rem] md:text-xs font-rubik font-medium text-charcoal/70 text-center leading-tight"
          >
            {item.name}
          </span>
        </div>
      {/each}
    </div>
  </div>
</div>
