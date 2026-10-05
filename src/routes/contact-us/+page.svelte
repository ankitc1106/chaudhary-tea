<script lang="ts">
  import { page } from "$app/stores";
  import Icon from "@iconify/svelte";
  import type { ConfigType } from "$lib/types/configType";
  import type { contactType } from "$lib/types/contactType";
  import heroCover from "$lib/images/hero-cover.jpg";

  const config = $page.data.config as ConfigType;
  const contact = $page.data.contact as contactType;

  // Sanity's socialLinks only reliably has Instagram — the Facebook entry's
  // stored link ("http://gfa.cpo") is broken. This maps to proper brand
  // icons and the real Facebook URL as a local display override; Sanity
  // itself isn't touched.
  const socialIconMap: Record<string, { icon: string; label: string; href?: string }> = {
    facebook: { icon: "mdi:facebook", label: "Facebook", href: "https://www.facebook.com/charcha.tea.coffee" },
    instagram: { icon: "mdi:instagram", label: "Instagram" },
  };

  $: socials = (config.socialLinks ?? [])
    .map((s) => {
      const key = /insta/i.test(s.name) ? "instagram" : /face/i.test(s.name) ? "facebook" : null;
      if (!key) return null;
      const known = socialIconMap[key];
      return { label: known.label, icon: known.icon, link: known.href ?? s.link };
    })
    .filter((s): s is { label: string; icon: string; link: string } => !!s);

  const labelClass = "font-body text-xs uppercase tracking-widest2 text-gold-dark font-bold";
  const fieldLabelClass = "font-body text-xs uppercase tracking-widest2 text-cream/50 font-bold";
  const fieldClass =
    "block w-full bg-transparent border-b border-cream/20 text-cream py-2.5 focus:outline-none focus:border-gold transition-colors";
</script>

<svelte:head>
  <title>{contact.title} — Choudhary's Charcha</title>
  <meta
    name="description"
    content="Get in touch with Choudhary's Charcha for orders, bulk enquiries, or just a good conversation about chai."
  />
</svelte:head>

<section class="w-full overflow-x-clip bg-cream">
  <div class="relative h-[38vh] md:h-[48vh] w-full overflow-hidden bg-charcoal">
    <div
      style="background-image: url({heroCover})"
      class="absolute inset-0 bg-cover bg-[position:50%_30%]"
    ></div>
    <div class="absolute inset-0 bg-gradient-to-b from-charcoal/75 via-charcoal/55 to-charcoal"></div>
    <div class="relative h-full flex flex-col items-center justify-center text-center px-5 pt-14 md:pt-16">
      <span class="block {labelClass} mb-3">Let's Talk</span>
      <h1 class="font-hero font-medium text-cream text-4xl md:text-6xl">{contact.title}</h1>
      <p class="mt-4 text-sm md:text-lg text-cream/75 font-body max-w-md mx-auto">
        Got a question, a bulk order, or just want to talk chai? We're one message away.
      </p>
    </div>
  </div>

  <div class="relative bg-cream py-16 md:py-24 px-5 md:px-16 lg:px-24">
    <div class="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-start">
      <div class="divide-y divide-charcoal/10">
        <div class="pb-8">
          <div class={labelClass}>Call or Text</div>
          <a
            href="tel:{contact.phone}"
            class="mt-2 min-h-[44px] inline-flex items-center font-body font-medium text-xl md:text-2xl text-charcoal hover:text-gold-dark transition-colors focus-visible:outline-none focus-visible:text-gold-dark"
          >
            {contact.phone}
          </a>
        </div>

        <div class="py-8">
          <div class={labelClass}>Email Us</div>
          <a
            href="mailto:{contact.email}"
            class="mt-2 min-h-[44px] inline-flex items-center font-body font-medium text-xl md:text-2xl text-charcoal hover:text-gold-dark transition-colors break-all focus-visible:outline-none focus-visible:text-gold-dark"
          >
            {contact.email}
          </a>
        </div>

        <div class="py-8">
          <div class={labelClass}>Visit Us</div>
          <address class="mt-2 not-italic font-body text-base text-charcoal/75 leading-relaxed">
            {@html contact.address}
          </address>
        </div>

        {#if socials.length}
          <div class="pt-8">
            <div class={labelClass}>Follow Along</div>
            <ul class="mt-4 flex items-center gap-5">
              {#each socials as s}
                <li>
                  <a
                    href={s.link}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    class="flex items-center justify-center w-12 h-12 text-charcoal hover:text-gold-dark transition-colors focus-visible:outline-none focus-visible:text-gold-dark"
                  >
                    <Icon icon={s.icon} class="w-7 h-7" />
                  </a>
                </li>
              {/each}
            </ul>
          </div>
        {/if}
      </div>

      <form
        class="bg-charcoal border border-gold/15 p-8 md:p-10 space-y-6"
        action="https://formsubmit.co/{contact.email}"
        method="POST"
      >
        <h2 class="font-hero font-medium text-cream text-2xl md:text-3xl">Send a Message</h2>
        <input type="hidden" name="_captcha" value="false" />

        <div>
          <label class={fieldLabelClass} for="contact-name">Name</label>
          <input id="contact-name" class={fieldClass} type="text" name="name" />
        </div>

        <div>
          <label class={fieldLabelClass} for="contact-phone">Phone</label>
          <input id="contact-phone" class={fieldClass} type="tel" name="phone" />
        </div>

        <div>
          <label class={fieldLabelClass} for="contact-message">Message</label>
          <textarea id="contact-message" rows="4" class={fieldClass} name="message"></textarea>
        </div>

        <button
          class="w-full min-h-[44px] inline-flex items-center justify-center px-7 text-sm font-body font-medium text-gold border border-gold hover:bg-gold/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
        >
          Send message
        </button>
      </form>
    </div>
  </div>

  <div class="bg-charcoal px-5 md:px-16 lg:px-24 pb-16 md:pb-24">
    <div class="max-w-screen-xl mx-auto border-t border-gold/15 pt-10">
      <iframe title="map" class="h-[360px] md:h-[440px] w-full block" src={contact.mapUrl}></iframe>
    </div>
  </div>
</section>
