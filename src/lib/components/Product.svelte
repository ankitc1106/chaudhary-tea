<script lang="ts">
  import Icon from "@iconify/svelte";
  import ShahiTea from "$lib/images/shahi-tea.png";
  import type { productItem, variants } from "$lib/types/pageType";
  import { urlForImage } from "$lib/sanity";

  let selected = 0;
  export let isReverse = false;
  export let product: productItem;
  export let isFirst = false;

  export let pattern: string;

  let varinatList: variants[] = product.variants;

  $: varinatList = varinatList.map((a) => {
    const weight = parseInt(a.gram as string);
    return {
      ...a,
      gram: (weight >= 1000 ? weight / 1000 : weight).toString(),
      unit: weight >= 1000 ? "kg" : "gm",
    };
  });
</script>

<div class="  grid grid-cols-2 lg:gap-24 max-w-screen-2xl mx-auto">
  <div
    class=" {isReverse ? 'order-last' : ''} flex justify-center items-center"
  >
    <div class=" space-y-3 md:space-y-6 lg:space-y-8 p-4 md:p-10 lg:p-20">
      <h1 class="text-2xl md:text-5xl lg:text-7xl font-serif font-medium">
        {product.title}
      </h1>

      <div class="flex flex-wrap items-start gap-2 md:gap-3">
        <div
          class="bg-[#303030] flex items-center rounded-3xl p-1 md:p-2 h-max"
        >
          <Icon
            icon="bx:rupee"
            class=" text-lg md:text-3xl lg:text-4xl text-green-500"
          />
        </div>
        <div class="text-black font-inria md:text-2xl">
          <h3 class=" text-lg md:text-4xl">
            Rs {varinatList[selected].price}
          </h3>
          <h2 class=" text-xs md:text-xl lg:text-2xl">
            {varinatList[selected].gram}
            {varinatList[selected].unit}
          </h2>
        </div>
        {#if product.buyLink}
          <a
            href={product.buyLink}
            target="_blank"
            class="bg-black lg:ml-8 h-auto my-auto rounded-2xl text-white lg:rounded-3xl px-2 py-1 md:ml-4 md:px-3 md:py-1 lg:px-4 lg:py-2 hover:bg-shahi-orange transition-all duration-300 ease-in-out lg:font-bold lg:tracking-wider"
          >
            <h3 class="text-xs md:text-xl lg:text-xl">Buy Now</h3>
          </a>
        {/if}
      </div>
      <p class="text-xs/none md:text-xl/tight lg:text-2xl font-camby">
        {product.description}
      </p>
    </div>
  </div>

  <div
    style="--bg-url: url({urlForImage(pattern)})"
    class="bg-[image:var(--bg-url)] flex items-center justify-center {isReverse
      ? ' rounded-r-[50px]  md:rounded-r-[100px]'
      : isFirst
        ? 'rounded-l-[50px] md:rounded-l-[100px]'
        : 'rounded-bl-[50px] md:rounded-bl-[100px]'}  2xl:rounded-[100px] 2xl:my-5 w-full"
  >
    <img
      src={urlForImage(varinatList[selected].image, "crop")}
      alt=""
      class="max-w-[84%] md:max-w-[90%] max-md:mx-auto lg:max-w-[65%]"
    />
  </div>
</div>

<div
  class="flex {isReverse
    ? ' flex-row-reverse'
    : ''}  items-center justify-between my-4 md:my-10 max-w-screen-2xl mx-auto gap-5 md:gap-7 lg:gap-12 no-scrollbar"
>
  <div class="">
    <div
      class=" bg-[#303030] p-3 md:p-3.5 lg:p-6 {isReverse
        ? 'rounded-l-3xl'
        : 'rounded-r-3xl'}  2xl:rounded-3xl"
    >
      <div class=" flex overflow-x-auto lg:gap-5 w-full">
        {#each varinatList as a, i}
          {@const weight = parseInt(a.gram)}
          <button
            class=" group {selected === i
              ? 'bg-shahi-orange'
              : ''} hover:bg-shahi-orange px-2 lg:px-5 py-3 rounded-lg min-w-[50px] md:min-w-[80px]"
            on:click={() => (selected = i)}
          >
            <img
              src={urlForImage(a.image, "cropMini")}
              class=" shrink-0 max-h-[90px] lg:max-h-[100px]"
              alt=""
            />

            {#if parseInt(a.gram) < 50 && a.unit === "gm"}
              <h5
                class=" text-center text-[0.55rem] md:text-xs lg:text-[1rem] lg:mt-1 text-gray-100 font-inria"
              >
                {a.price} Rs
              </h5>
            {:else}
              <h5
                class=" text-center text-white text-[0.55rem] md:text-xs lg:text-lg font-inria font-medium"
              >
                {a.gram}
                {a.unit}
              </h5>
            {/if}
          </button>
        {/each}
      </div>
    </div>
  </div>
  <!-- <div class=" max-md:hidden flex-1 h-[110px]"> -->

  <img
    src={urlForImage(product.sideImage, "cropHeight")}
    class=" {isReverse
      ? 'rounded-r-3xl'
      : 'rounded-l-3xl'} h-full max-h-[120px] md:max-h-[170px] lg:max-h-[200px] min-w-0 object-cover shrink-0 flex-auto lg:flex-1 2xl:rounded-3xl"
    alt=""
  />

  <!-- </div> -->
</div>
