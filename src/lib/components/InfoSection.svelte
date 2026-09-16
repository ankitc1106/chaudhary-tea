<script lang="ts">
  import { urlForImage } from "$lib/sanity";
  import type { infoSection } from "$lib/types/pageType";

  export let infoDat: infoSection;
</script>

<div
  style="--bg-url: url( {urlForImage(infoDat.image, 'width', 1700)})"
  class=" h-[27vh] md:h-[40vh] lg:h-[80vh] bg-cover bg-bottom bg-[image:var(--bg-url)]"
>
  <!-- <div class=" backdrop-brightness-75 h-full flex items-center lg:p-5">
    <div class="mx-auto lg:max-w-[90%]">
      <div
        class="w-full md:py-6 lg:py-32 items-center place-items-center justify-between flex"
      >
        <div class="w-[50%]"></div>
        <div
          class=" w-[55%] md:w-[50%] lg:w-[40%] text-white h-full space-y-3 md:space-y-5 lg:space-y-7 flex-col justify-center flex"
        >
          <h1 class=" text-2xl md:text-5xl lg:text-7xl font-berk">
            {infoDat.title}
          </h1>
          <p
            class="text-xs/none w-[90%] md:w-full font-medium md:text-lg/tight lg:text-2xl text-gray-100 md:font-light font-camby"
          >
            {infoDat.description}
          </p>

          <a
            href="/about-us"
            class="text-gray-200 max-sm:hidden w-max hover:text-white hover:bg-green-600 transition-all duration-300 bg-black text-xs md:text-lg px-6 py-2 rounded-3xl font-rubik font-medium"
            >ABOUT US</a
          >
        </div>
      </div>
    </div>
  </div> -->
</div>
