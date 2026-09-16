<script lang="ts">
  import { urlForImage } from "$lib/sanity";

  // export let title: string;
  export let defWidth: string = "w-[50%]";
  export let logo: string;
  export let description: string;
</script>

<div
  class="w-full py-3 lg:py-28 items-center place-items-center lg:gap-40 flex justify-end"
>
  <div
    class="mt-3 w-[42%] md:w-[45%] md:mt-0 lg:mt-0 text-white space-y-2 md:space-y-7 flex-col flex"
  >
    <!-- <h1 class=" text-2xl md:text-5xl lg:text-7xl font-serif">{title}</h1> -->
    <div>
      <a href="/">
        <img
          src={urlForImage(logo, "width", 600)}
          alt="Sahi Tea"
          class=" {defWidth}"
        />
      </a>
    </div>
    <p
      class="text-[0.6rem] leading-[0.7rem] md:text-xl lg:text-2xl text-gray-100 font-light font-camby"
    >
      {description}
    </p>
  </div>
</div>
