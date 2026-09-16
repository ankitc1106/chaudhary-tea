<script lang="ts">
  import { urlForImage } from "$lib/sanity";
  import type { featureSection } from "$lib/types/pageType";
  import Icon from "@iconify/svelte";
  export let featData: featureSection;
</script>

<div
  class=" max-w-screen-2xl text-center mx-auto mt-8 h-[300px] max-md:hidden md:h-[450px] lg:h-[550px] xl:h-[630px] relative"
>
  <h1 class="font-serif text-4xl lg:text-6xl mb-10 text-[#FEB126]">
    Top features
  </h1>
  <div class="md:w-[80%] lg:w-[75%] flex mx-auto h-full justify-between">
    <div class="max-w-28 flex flex-col items-center justify-center h-full">
      <div class="h-24"></div>
      <Icon
        icon={featData.feature[0].icon.icon}
        class="text-5xl text-green-600 "
      />
      <h1>{featData.feature[0].title}</h1>
    </div>
    <div class="max-w-28 flex flex-col pr-28 items-center justify-start h-full">
      <div class="h-24"></div>
      <Icon
        icon={featData.feature[1].icon.icon}
        class="text-5xl text-green-500"
      />
      <h1>{featData.feature[1].title}</h1>
    </div>
    <div class="max-w-28 flex flex-col items-center justify-start h-full">
      <Icon
        icon={featData.feature[2].icon.icon}
        class="text-5xl text-green-600 "
      />
      <h1>{featData.feature[2].title}</h1>
    </div>
    <div class="max-w-28 flex flex-col pl-28 items-center justify-start h-full">
      <div class="h-24"></div>
      <Icon
        icon={featData.feature[3].icon.icon}
        class="text-5xl text-green-500 "
      />
      <h1>{featData.feature[3].title}</h1>
    </div>
    <div class="max-w-28 flex flex-col items-center justify-center h-full">
      <div class="h-24"></div>
      <Icon
        icon={featData.feature[4].icon.icon}
        class="text-5xl  text-green-600 "
      />
      <h1>{featData.feature[4].title}</h1>
    </div>
  </div>
  <div
    class="absolute max-w-[60%] flex justify-center mx-auto -z-40 -bottom-[35%] right-0 left-0"
  >
    <img
      src={urlForImage(featData.prodImage, "width", 300)}
      class="mx-auto absolute bottom-[35%] w-[27%]"
      alt=""
    />
    <div
      class="w-[80%] max-w-[600px] aspect-square mx-auto rounded-full bg-[#F28030]"
    ></div>
  </div>
</div>
