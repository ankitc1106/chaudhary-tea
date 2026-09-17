<script lang="ts">
  import { page } from "$app/stores";
  import Icon from "@iconify/svelte";
  import type { ConfigType } from "$lib/types/configType";
  import type { contactType } from "$lib/types/contactType";
  import { reveal } from "$lib/actions/reveal";
  import { magnetic } from "$lib/actions/magnetic";
  import { cursorGlow } from "$lib/actions/cursorGlow";
  import heroCover from "$lib/images/hero-cover.jpg";

  const config = $page.data.config as ConfigType;
  const contact = $page.data.contact as contactType;

  $: socials = (config.socialLinks ?? []).filter((s) => s.link);
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
      <div use:reveal>
        <span
          class="block text-gold uppercase tracking-widest2 text-[0.6rem] md:text-xs font-rubik font-semibold mb-3"
        >
          Let's Talk
        </span>
        <h1 class="font-inria text-cream text-4xl md:text-6xl">{contact.title}</h1>
        <p class="mt-4 text-sm md:text-lg text-cream/80 font-camby max-w-md mx-auto">
          Got a question, a bulk order, or just want to talk chai? We're one
          message away.
        </p>
      </div>
    </div>
  </div>

  <div use:cursorGlow class="relative bg-cream py-16 md:py-24 px-5 md:px-16 lg:px-24 overflow-hidden">
    <div class="max-w-screen-2xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-start">
      <div use:reveal class="space-y-8 md:space-y-10 text-charcoal">
        <div class="flex gap-4 items-start">
          <div class="flex items-center justify-center w-11 h-11 rounded-full border border-gold-dark/30 bg-gold/5 shrink-0">
            <Icon icon="solar:phone-bold" class="text-lg text-gold-dark" />
          </div>
          <div>
            <div class="text-[0.65rem] uppercase tracking-widest2 text-charcoal/50 font-rubik font-semibold mb-1">
              Call or Text
            </div>
            <a href="tel:{contact.phone}" class="text-lg md:text-xl font-inria hover:text-gold-dark transition-colors">
              {contact.phone}
            </a>
          </div>
        </div>

        <div class="flex gap-4 items-start">
          <div class="flex items-center justify-center w-11 h-11 rounded-full border border-gold-dark/30 bg-gold/5 shrink-0">
            <Icon icon="solar:letter-bold" class="text-lg text-gold-dark" />
          </div>
          <div>
            <div class="text-[0.65rem] uppercase tracking-widest2 text-charcoal/50 font-rubik font-semibold mb-1">
              Email Us
            </div>
            <a href="mailto:{contact.email}" class="text-lg md:text-xl font-inria hover:text-gold-dark transition-colors break-all">
              {contact.email}
            </a>
          </div>
        </div>

        <div class="flex gap-4 items-start">
          <div class="flex items-center justify-center w-11 h-11 rounded-full border border-gold-dark/30 bg-gold/5 shrink-0">
            <Icon icon="solar:map-point-bold" class="text-lg text-gold-dark" />
          </div>
          <div>
            <div class="text-[0.65rem] uppercase tracking-widest2 text-charcoal/50 font-rubik font-semibold mb-1">
              Visit Us
            </div>
            <address class="text-base not-italic font-camby leading-relaxed text-charcoal/80">
              {@html contact.address}
            </address>
          </div>
        </div>

        {#if socials.length}
          <div>
            <div class="text-[0.65rem] uppercase tracking-widest2 text-charcoal/50 font-rubik font-semibold mb-3">
              Follow Along
            </div>
            <ul class="flex gap-3">
              {#each socials as s}
                <li>
                  <a
                    use:magnetic={0.2}
                    href={s.link}
                    target="_blank"
                    rel="noreferrer"
                    class="flex items-center justify-center w-11 h-11 rounded-full border border-gold-dark/30 hover:bg-gold hover:border-gold transition-all duration-300 group"
                  >
                    <Icon icon={s.icon.icon} class="text-lg text-gold-dark group-hover:text-charcoal" />
                  </a>
                </li>
              {/each}
            </ul>
          </div>
        {/if}
      </div>

      <form
        use:reveal
        class="bg-charcoal rounded-3xl p-6 md:p-10 space-y-5 shadow-2xl"
        action="https://formsubmit.co/{contact.email}"
        method="POST"
      >
        <h1 class="font-inria text-cream text-2xl md:text-3xl">Send a Message</h1>
        <input type="hidden" name="_captcha" value="false" />
        <input
          class="block w-full bg-cream/[0.06] border border-cream/15 placeholder-cream/40 text-cream rounded-xl py-3 px-4 focus:outline-none focus:border-gold/60 transition-colors"
          type="text"
          name="name"
          placeholder="Name"
        />
        <input
          class="block w-full bg-cream/[0.06] border border-cream/15 placeholder-cream/40 text-cream rounded-xl py-3 px-4 focus:outline-none focus:border-gold/60 transition-colors"
          type="tel"
          name="phone"
          placeholder="Phone"
        />
        <textarea
          rows="4"
          class="block w-full bg-cream/[0.06] border border-cream/15 placeholder-cream/40 text-cream rounded-xl py-3 px-4 focus:outline-none focus:border-gold/60 transition-colors"
          placeholder="Message"
          name="message"
        ></textarea>
        <button
          use:magnetic={0.2}
          class="w-full bg-gold hover:bg-gold-light text-charcoal transition-all duration-200 ease-out py-3 rounded-xl text-sm font-rubik font-semibold uppercase tracking-wide"
        >
          Submit
        </button>
      </form>
    </div>
  </div>

  <div class="bg-charcoal px-5 md:px-16 lg:px-24 pb-16 md:pb-24">
    <div use:reveal class="max-w-screen-2xl mx-auto rounded-3xl overflow-hidden border border-gold/20">
      <iframe title="map" class="h-[400px] md:h-[480px] w-full block" src={contact.mapUrl}></iframe>
    </div>
  </div>
</section>
