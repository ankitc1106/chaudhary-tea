<script lang="ts">
  import { page } from "$app/stores";
  import type { ConfigType } from "$lib/types/configType";
  import type { contactType } from "$lib/types/contactType";
  import charchaLogo from "$lib/images/charcha-logo-footer.png";

  const config = $page.data.config as ConfigType;
  const contact = $page.data.contact as contactType;

  $: instagramLink = (config.socialLinks ?? []).find((s) => /instagram/i.test(s.link))?.link;

  const explore = [
    { name: "Home", href: "/" },
    { name: "About Charcha", href: "/about-us" },
    { name: "All Products", href: "/#products" },
    { name: "Contact", href: "/contact-us" },
  ];

  const products = [
    { name: "Gold Tea", href: "/#charcha-gold-tea" },
    { name: "Arabica Coffee", href: "/#charcha-arabica-coffee" },
    { name: "Green Tea", href: "/#charcha-green-tea" },
    { name: "Elaichi Chai", href: "/#charcha-elaichi-chai" },
    { name: "Mix Masala", href: "/#charcha-mix-masala" },
  ];

  const linkClass =
    "min-h-[44px] inline-flex items-center font-body text-sm text-cream/65 hover:text-gold transition-colors duration-300 focus-visible:outline-none focus-visible:text-gold focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#241A16] rounded-sm";
  const labelClass = "font-body text-[0.65rem] uppercase tracking-widest2 text-gold-dark font-semibold";
</script>

<footer class="bg-[#241A16] border-t border-gold/10">
  <div class="max-w-screen-xl mx-auto px-5 md:px-10 lg:px-16 py-14 md:py-16">
    <div
      class="grid grid-cols-1 md:grid-cols-[1.1fr_1.6fr] md:grid-rows-[auto_auto] gap-10 md:gap-x-16 md:gap-y-10"
    >
      <div class="md:col-start-1 md:row-start-1">
        <img src={charchaLogo} alt="Choudhary's Charcha" class="h-16 md:h-20 w-auto" />
        <p class="mt-4 font-body text-sm md:text-base text-cream/65">Banaras ki Chai. Duniya ki Charcha.</p>
      </div>

      <nav aria-label="Footer" class="md:col-start-2 md:row-start-1 md:row-span-2">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10">
          <div>
            <p id="footer-explore" class={labelClass}>Explore</p>
            <ul aria-labelledby="footer-explore" class="mt-4 space-y-1">
              {#each explore as item}
                <li><a href={item.href} class={linkClass}>{item.name}</a></li>
              {/each}
            </ul>
          </div>

          <div>
            <p id="footer-products" class={labelClass}>Products</p>
            <ul aria-labelledby="footer-products" class="mt-4 space-y-1">
              {#each products as item}
                <li><a href={item.href} class={linkClass}>{item.name}</a></li>
              {/each}
            </ul>
          </div>

          <div>
            <p id="footer-connect" class={labelClass}>Connect</p>
            <ul aria-labelledby="footer-connect" class="mt-4 space-y-1">
              <li>
                <a
                  href="https://wa.me/{config.whatsappNumber}"
                  target="_blank"
                  rel="noreferrer"
                  class={linkClass}
                >
                  WhatsApp
                </a>
              </li>
              {#if instagramLink}
                <li>
                  <a href={instagramLink} target="_blank" rel="noreferrer" class={linkClass}>Instagram</a>
                </li>
              {/if}
              <li><a href="mailto:{contact.email}" class={linkClass}>Email</a></li>
              <li><a href="tel:{contact.phone}" class={linkClass}>Phone</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <div class="md:col-start-1 md:row-start-2">
        <address class="not-italic font-body text-xs md:text-sm text-cream/45 leading-relaxed">
          TEAFIZZ ENTERPRISES PVT. LTD.<br />
          PLOT NO. E-228/229,<br />
          AGROPARK, KARKHIYAON,<br />
          VARANASI - 221206
        </address>
      </div>
    </div>

    <div class="mt-12 md:mt-14 border-t border-gold/15"></div>

    <div
      class="pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-center font-body text-[0.7rem] text-cream/40"
    >
      <p>&copy; 2026 Choudharys Charcha. All rights reserved.</p>
      <p>TEAFIZZ ENTERPRISES PVT. LTD.</p>
    </div>
  </div>
</footer>
