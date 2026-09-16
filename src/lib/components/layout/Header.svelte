<script lang="ts">
  import sahiHero from "$lib/images/sahiHero.png";
  import Icon from "@iconify/svelte";
  import Logo from "$lib/images/logo.svg";
  import ShahiTea from "$lib/images/shahi-tea.png";
  import { isNavOpen } from "$lib/state";
  import { page } from "$app/stores";
  import { urlForImage } from "$lib/sanity";

  export let bg: string;
  export let logo: string;

  let brandlist = $page.data.brandList;
</script>

<div
  style="--bg-url: url({urlForImage(bg, 'width', 1500)})"
  class="  lg:h-full max-md:bg-left bg-cover md:bg-bottom bg-[image:var(--bg-url)]"
>
  <div class=" backdrop-brightness-75 h-full p-2 lg:p-5">
    <div class="mx-auto max-w-[96%]">
      <header class="flex items-center py-2 md:py-8 justify-between">
        <!-- <button on:click={() => ($isNavOpen = true)}>
          <Icon
            icon="heroicons-solid:menu-alt-2"
            class="md:h-9 md:w-9 w-6 h-6 text-gray-400 cursor-pointer"
          />
        </button> -->
        <!-- <div>
          <a href="/">
            <img
              src={urlForImage(logo, "width", 400)}
              alt="Sahi Tea"
              class=" h-10 md:h-20"
            />
          </a>
        </div> -->
        <!-- <a
          href="/contact-us"
          class="bg-shahi-orange p-2 rounded-full w-6 h-6 md:w-9 md:h-9 flex items-center"
        >
          <Icon
            icon="material-symbols:contact-support"
            class=" text-xl  text-white cursor-pointer"
          />
        </a> -->
        <!-- <div>
          <a
            href="/contact-us"
            class=" px-3 md:px-5 text-white max-md:text-xs hover:scale-105 cursor-pointer duration-100 ease-linear transition py-2 font-rubik font-medium rounded-3xl bg-shahi-orange"
          >
            Lets Talk
          </a>
        </div> -->
      </header>
      <slot />
    </div>
  </div>
</div>
