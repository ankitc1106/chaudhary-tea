<script lang="ts">
  import Icon from "@iconify/svelte";

  const Links = [
    { name: "About Us", link: "/about-us" },
    { name: "Contact", link: "/contact-us" },
  ];

  import type { ConfigType } from "$lib/types/configType";
  import { page } from "$app/stores";
  import type { BrandNav } from "$lib/types/commonTypes";
  import type { contactType } from "$lib/types/contactType";
  import { urlForImage } from "$lib/sanity";

  const config = $page.data.config as ConfigType;
  const brandsNav = $page.data.brandList as BrandNav[];
  const contact = $page.data.contact as contactType;
</script>

<footer class="bg-[#1F1F25]">
  <div
    class="mx-auto max-w-screen-xl space-y-8 px-4 py-10 pb-40 lg:space-y-8 lg:py-12 lg:pb-5 lg:px-8"
  >
    <div class="flex flex-wrap gap-9">
      <div class="lg:w-[29%]">
        <img
          src={urlForImage(config.footer.logo, "width", 400)}
          class="w-[49%] md:w-[80%]"
          alt="choudhary's Teafizz"
        />
        <p class="mt-4 md:mt-8 max-w-[90%] max-sm:text-sm text-white">
          {config.footer.description}
        </p>

        <ul class="mt-10 flex gap-6">
          {#each config.socialLinks as s}
            <li>
              <a href={s.link} rel="noreferrer" target="_blank">
                <Icon
                  icon={s.icon.icon}
                  class="w-7 h-7 text-white hover:text-shahi-orange"
                />
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <div class=" gap-5 lg:flex-1 flex flex-wrap justify-between">
        <div class="flex-1">
          <p class="text-xl font-medium mb-3 text-white">Our Brands</p>
          <div
            class="w-2/6 h-0.5 object-center bg-cover bg-center bg-[image:var(--image-url)]"
          ></div>

          <ul class="mt-6 space-y-4 text-sm">
            {#each brandsNav as p}
              {@const link =
                p.slug.current === "/" ? "/" : "/" + p.slug.current}
              <li class=" ">
                <a href={link} class="flex items-center gap-1">
                  <Icon
                    icon="icon-park-outline:right"
                    class="w-5 h-5 text-[#6E777D]"
                  />
                  <span class="text-white hover:text-orange-600 text-base">
                    Choudhary's {p.brandName}
                  </span>
                </a>
              </li>
            {/each}
          </ul>
        </div>
        <div class="flex-1">
          <p class="text-xl font-medium mb-3 text-white">Useful Links</p>
          <div
            class="w-2/6 h-0.5 object-center bg-cover bg-center bg-[image:var(--image-url)]"
          ></div>

          <ul class="mt-6 space-y-4 text-sm">
            {#each Links as l}
              <li>
                <a href={l.link} class="flex items-center gap-1">
                  <Icon
                    icon="icon-park-outline:right"
                    class="w-5 h-5 text-[#6E777D]"
                  />
                  <div class="text-white text-base">{l.name}</div>
                </a>
              </li>
            {/each}
          </ul>
        </div>

        <div class=" md:w-[40%]">
          <p class="text-xl font-medium mb-3 text-white">Contact us</p>

          <ul class="mt-6 space-y-4 text-sm">
            <li class="flex items-center gap-3">
              <Icon
                icon="solar:phone-calling-bold"
                class="w-8 h-8 text-shahi-orange"
              />
              <div>
                <a href="tel:{contact.phone}" class="text-white text-base"
                  >{contact.phone}</a
                >
                <div class="text-shahi-orange text-sm">Call us for Inquiry</div>
              </div>
            </li>
            <li class="flex items-center gap-3">
              <Icon icon="tabler:mail" class="w-8 h-8 text-shahi-orange" />
              <div>
                <a href="mailto:{contact.email}" class="text-white text-base"
                  >{contact.email}</a
                >
                <div class="text-shahi-orange text-sm">Email us for query</div>
              </div>
            </li>
            <li class="flex items-center gap-3">
              <Icon icon="uiw:map" class="w-8 h-8 shrink-0 text-shahi-orange" />
              <address>
                <a href="/contact-us" class="text-white text-base">
                  {@html contact.address}
                </a>
                <!-- <div class="text-shahi-orange text-sm">Goa, India</div> -->
              </address>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <p
      class="text-sm flex flex-wrap max-sm:justify-center gap-4 justify-between text-center text-gray-500"
    >
      {config.footer.copyrigth}

      <a
        href="https://stacknyu.com"
        class="text-gray-300 hover:text-shahi-orange"
        >Developed by Stacknyu.com</a
      >
    </p>
  </div>
</footer>
