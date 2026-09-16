<script lang="ts">
  import { page } from "$app/stores";
  import { isNavOpen } from "$lib/state";
  import type { ConfigType } from "$lib/types/configType";
  import Icon from "@iconify/svelte";

  let config = $page.data.config as ConfigType;
</script>

<div>
  <div
    class="relative text-center w-full justify-between px-3 md:px-10 md:text-base text-xs font-medium py-2 flex items-center gap-2 bg-shahi-orange font-rubik"
  >
    <button on:click={() => ($isNavOpen = true)}>
      <Icon
        icon="heroicons-solid:menu-alt-2"
        class="md:h-9 md:w-9 w-6 h-6 text-white cursor-pointer"
      />
    </button>
    <!-- <img src={config.footer.logo} alt="logo" class="h-6 inline-block" /> -->
    <div class="absolute inset-x-0">
      <span class="text-gray-200">{config.topBar ?? ""}</span>
    </div>

    <div>
      <a
        href="/contact-us"
        class="flex items-center text-[0.5rem] md:text-base md:gap-2 text-white"
      >
        Let's Talk
        <Icon
          icon="material-symbols:contact-support"
          class="md:h-9 md:w-9 w-6 h-6 text-gray-100 cursor-pointer"
        />
      </a>
    </div>
  </div>
</div>
