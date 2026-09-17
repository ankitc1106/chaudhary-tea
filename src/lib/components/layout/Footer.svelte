<script lang="ts">
  import Icon from "@iconify/svelte";

  const Links = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about-us" },
    { name: "Contact", link: "/contact-us" },
  ];

  import type { ConfigType } from "$lib/types/configType";
  import { page } from "$app/stores";
  import type { contactType } from "$lib/types/contactType";
  import { urlForImage } from "$lib/sanity";

  const config = $page.data.config as ConfigType;
  const contact = $page.data.contact as contactType;
</script>

<footer class="bg-charcoal border-t border-gold/10">
  <div class="max-w-screen-lg mx-auto px-6 py-16 md:py-20 text-center">
    <img
      src={urlForImage(config.footer.logo, "width", 400)}
      class="h-12 md:h-16 mx-auto object-contain"
      alt="Choudhary's Charcha"
    />

    <p class="mt-6 max-w-xl mx-auto text-cream/60 font-camby text-sm md:text-base leading-relaxed">
      {config.footer.description}
    </p>

    <div class="w-16 h-[1px] bg-gold/40 mx-auto my-8"></div>

    <ul class="flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs md:text-sm font-rubik uppercase tracking-wide">
      {#each Links as l}
        <li>
          <a href={l.link} class="text-cream/70 hover:text-gold transition-colors duration-300">{l.name}</a>
        </li>
      {/each}
    </ul>

    <div class="mt-10 space-y-1.5 text-cream/60 text-sm md:text-base">
      <div>
        <a href="tel:{contact.phone}" class="hover:text-gold transition-colors duration-300">{contact.phone}</a>
        &middot;
        <a href="mailto:{contact.email}" class="hover:text-gold transition-colors duration-300">{contact.email}</a>
      </div>
      <address class="not-italic text-cream/40 text-xs md:text-sm">
        {@html contact.address}
      </address>
    </div>

    <ul class="mt-8 flex justify-center gap-6">
      {#each config.socialLinks as s}
        <li>
          <a href={s.link} rel="noreferrer" target="_blank">
            <Icon icon={s.icon.icon} class="w-6 h-6 text-cream/60 hover:text-gold transition-colors duration-300" />
          </a>
        </li>
      {/each}
    </ul>

    <p class="mt-14 text-xs text-cream/30">
      {config.footer.copyrigth}
      &middot;
      <a href="https://stacknyu.com" class="hover:text-gold transition-colors duration-300">Developed by Stacknyu.com</a>
    </p>
  </div>
</footer>
