<script lang="ts">
  import { page } from "$app/stores";
  import ImgBlockRender from "$lib/components/ImgBlockRender.svelte";
  import UtilHeader from "$lib/components/layout/UtilHeader.svelte";
  import { urlForImage } from "$lib/sanity";
  import type { ConfigType } from "$lib/types/configType";
  import type { contactType } from "$lib/types/contactType";

  import { PortableText } from "@portabletext/svelte";
  import { Splide, SplideSlide } from "@splidejs/svelte-splide";
  const config = $page.data.config as ConfigType;
  const contact = $page.data.contact as contactType;

  export let data;

  let pageData = data.pageData;
</script>

<UtilHeader logo={config.footer.logo} />

<svelte:head>
  <title>{pageData.seo.title}</title>
  <meta name="description" content={pageData.seo.description} />
</svelte:head>

<section class="px-10 max-w-7xl mx-auto text-black py-20">
  <div class="text-center">
    <h1 class="text-3xl font-serif font-semibold md:text-5xl">
      {pageData.title}
    </h1>
    <p class=" mt-5 text-center text-base font-light md:text-3xl">
      {contact.description}
    </p>
  </div>

  <Splide
    options={{
      arrows: false,
      pagination: false,
      type: "loop",
      speed: 2100,
      perPage: 3,
      breakpoints: {
        "640": {
          perPage: 1,
        },
        "768": {
          perPage: 2,
        },
        "1024": {
          perPage: 3,
        },
      },

      gap: "3rem",
      autoplay: true,
      interval: 4000,
      perMove: 1,
    }}
    class="w-full mt-10"
  >
    {#each pageData.BrandImages as item}
      <SplideSlide>
        <div
          class=" col-span-1 h-full relative overflow-hidden group rounded-2xl"
        >
          <div
            class=" z-20 opacity-0 transition duration-150 group-hover:opacity-100 absolute inset-0 bg-gradient-to-b from-transparent to-orange-900"
          ></div>
          <img
            class=" z-10 rounded-md object-cover h-full ease-in-out duration-500 group-hover:rotate-6 group-hover:scale-125"
            src={urlForImage(item.image, "width", 700)}
            alt=""
          />
          <div
            class="z-30 w-full text-center opacity-0 p-5 text-white transition duration-150 group-hover:opacity-100 absolute bottom-0"
          >
            <h1 class="  text-2xl font-bold">
              {item.name}
            </h1>
            <h2 class="  mt-1 text-xl">{item.tagline}</h2>
          </div>
        </div>
      </SplideSlide>
    {/each}
  </Splide>

  <!-- <div class=" mt-10 mx-auto grid lg:grid-cols-3 gap-10">
    {#each pageData.BrandImages as item}
      <a href="/">
        <div
          class=" col-span-1 h-full relative overflow-hidden group rounded-2xl"
        >
          <div
            class=" z-20 opacity-0 transition duration-150 group-hover:opacity-100 absolute inset-0 bg-gradient-to-b from-transparent to-orange-900"
          ></div>
          <img
            class=" z-10 rounded-md object-cover h-full ease-in-out duration-500 group-hover:rotate-6 group-hover:scale-125"
            src={urlForImage(item.image, "width", 700)}
            alt=""
          />
          <div
            class="z-30 w-full text-center opacity-0 p-5 text-white transition duration-150 group-hover:opacity-100 absolute bottom-0"
          >
            <h1 class="  text-2xl font-bold">
              {item.name}
            </h1>
            <h2 class="  mt-1 text-xl">{item.tagline}</h2>
          </div>
        </div>
      </a>
    {/each}
  </div> -->

  <article class="prose max-w-none lg:prose-xl mt-10">
    <PortableText
      components={{
        types: {
          image: ImgBlockRender,
        },
      }}
      value={pageData.description}
    />
  </article>
</section>
