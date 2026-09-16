<script>
  import Icon from "@iconify/svelte";
  import { isNavOpen } from "$lib/state";
  import { page } from "$app/stores";
  import { urlForImage } from "$lib/sanity";

  let brandlist = $page.data.brandList;

  // let navList = brandlist.map((brand) => {
  //   return {
  //     logo: urlForImage(brand.logo, "width", 300),
  //     name: brand.brandName,
  //     link: brand.slug.current === "/" ? "/" : "/" + brand.slug.current,
  //     bg: "#bdd800",
  //   };
  // });

  // {@const link =
  //         brand.slug.current === "/" ? "/" : "/" + brand.slug.current}
  // console.log(brandlist);
</script>

<div
  id="sidebar"
  class=" {$isNavOpen
    ? 'translate-x-0'
    : '-translate-x-full'} z-50 bg-[#f2efec] transition-all duration-300 fixed left-0 top-0 h-screen p-8"
>
  <div class="">
    <div class=" flex justify-end items-center">
      <button on:click={() => ($isNavOpen = false)}>
        <Icon
          icon="heroicons-solid:x"
          class="w-6 h-6 text-black cursor-pointer"
        />
      </button>
    </div>

    <div class=" py-10 space-y-4">
      <div>
        <a
          href="/"
          on:click={() => ($isNavOpen = false)}
          class="rounded-lg w-full bg-[#bdd800] px-5 py-3 flex justify-center items-center"
        >
          <img
            src={urlForImage(brandlist[0].logo, "width", 300)}
            class="  object-contain w-[27%]"
            alt=""
          />
        </a>
      </div>
    </div>

    <div class=" py-10 space-y-6">
      <div>
        <a
          href="/contact-us"
          on:click={() => ($isNavOpen = false)}
          class="rounded-lg group hover:bg-shahi-orange transition-all duration-300 w-full bg-white px-5 py-3 flex items-center justify-between gap-10"
        >
          <div class=" flex gap-3 items-center">
            <div class=" group-hover:bg-white bg-shahi-orange rounded-full p-2">
              <Icon
                icon="bx:bxs-phone"
                class="w-7 h-7 group-hover:text-shahi-orange text-white"
              />
            </div>
            <h3 class="   group-hover:text-white font-rubik">Contact Us</h3>
          </div>
          <Icon
            icon="heroicons-solid:arrow-right"
            class="w-5 h-5 group-hover:translate-x-3 transition-all duration-300   text-shahi-orange group-hover:text-white"
          />
        </a>
      </div>
      <div>
        <a
          href="/about-us"
          on:click={() => ($isNavOpen = false)}
          class="rounded-lg group hover:bg-shahi-orange transition-all duration-300 w-full bg-white px-5 py-3 flex items-center justify-between gap-10"
        >
          <div class=" flex gap-3 items-center">
            <div class=" group-hover:bg-white bg-shahi-orange rounded-full p-2">
              <Icon
                icon="bx:bxs-info-circle"
                class="w-7 h-7 group-hover:text-shahi-orange text-white"
              />
            </div>
            <h3 class="   group-hover:text-white font-rubik">About Us</h3>
          </div>
          <Icon
            icon="heroicons-solid:arrow-right"
            class="w-5 h-5 group-hover:translate-x-3 transition-all duration-300   text-shahi-orange group-hover:text-white"
          />
        </a>
      </div>
    </div>
  </div>
</div>
