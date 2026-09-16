<script lang="ts">
  import { page } from "$app/stores";
  import UtilHeader from "$lib/components/layout/UtilHeader.svelte";
  import { urlForImage } from "$lib/sanity";
  import type { ConfigType } from "$lib/types/configType";
  import type { contactType } from "$lib/types/contactType";
  import Icon from "@iconify/svelte";

  const config = $page.data.config as ConfigType;
  const contact = $page.data.contact as contactType;
</script>

<UtilHeader logo={config.footer.logo} />

<!-- url({urlForImage(contact.bgImage, 'width', 2000)}) -->

<main
  style="--bg-url : url({urlForImage(contact.bgImage, 'width', 2000)})"
  class="bg-cover md:bg-[image:var(--bg-url)]"
>
  <div
    class=" md:backdrop-brightness-50 h-full py-10 md:py-16 lg:py-20 md:space-y-16 space-y-8 lg:space-y-20"
  >
    <section class=" px-1 md:text-white text-center">
      <h1 class="text-3xl font-serif font-semibold md:text-5xl">
        {contact.title}
      </h1>
      <p
        class=" mt-5 w-[90%] mx-auto text-center text-xl font-light md:text-3xl"
      >
        {contact.description}
      </p>
    </section>
    <section
      class="mx-auto max-md:flex-col-reverse flex-wrap px-4 flex gap-12 md:gap-20 items-center max-w-7xl"
    >
      <div
        class=" lg:w-[40%] max-lg:flex flex-col md:text-white max-lg:items-center max-lg:text-center space-y-8 md:space-y-8 lg:space-y-12"
      >
        <div>
          <div class="text-lg mb-3 font-light md:text-white">TEXT US</div>
          <a href="tel:{contact.phone}" class="text-xl md:text-3xl font-medium">
            {contact.phone}
          </a>
        </div>
        <div>
          <div class="text-lg mb-3 font-light md:text-white">EMAIL US</div>
          <a
            href="mailto:{contact.email}"
            class="text-xl md:text-3xl font-medium"
          >
            {contact.email}
          </a>
        </div>

        <div class=" md:w-10/12">
          <div class="text-lg font-light mb-3 md:text-white">VISIT US</div>
          <address class="text-xl not-italic md:text-2xl font font-medium">
            {@html contact.address}
          </address>
        </div>
        <div>
          <div class="text-lg font-light md:text-white">SOCIAL LINKS</div>
          <ul class="mt-2 flex gap-6">
            {#each config.socialLinks as i}
              <li>
                <a href={i.link}>
                  <Icon icon={i.icon.icon} class="w-8 h-8 md:text-white" />
                </a>
              </li>
            {/each}
          </ul>
        </div>
      </div>
      <form
        class="bg-[#FBFBFB] w-[90%] flex-auto md:w-[40%] max-md:order-first h-fit space-y-5 md:space-y-8 p-4 md:p-8 rounded-3xl shadow-sm border"
        action="https://formsubmit.co/{contact.email}"
        method="POST"
      >
        <h1 class="text-3xl font-medium text-black">Get in Touch</h1>
        <input type="hidden" name="_captcha" value="false" />
        <input
          class="block w-full border placeholder-black text-xl border-[#E0E0E0] rounded-lg text-black py-3 px-4 leading-tight focus:outline-none focus:border-2 focus:border-gray-500"
          type="text"
          name="name"
          placeholder="Name"
        />
        <input
          class="block w-full border placeholder-black text-xl border-[#E0E0E0] rounded-lg text-black py-3 px-4 leading-tight focus:outline-none focus:border-2 focus:border-gray-500"
          type="tel"
          name="phone"
          placeholder="Phone"
        />
        <textarea
          rows="5"
          class="block w-full border placeholder-black text-xl border-[#E0E0E0] rounded-lg text-black py-3 px-4 leading-tight focus:outline-none focus:border-2 focus:border-gray-500"
          placeholder="Message"
          name="message"
        ></textarea>
        <button
          class="bg-black py-3 px-4 text-white rounded-lg text-xl w-full hover:bg-[#373434] transition-all"
          >Submit</button
        >
      </form>
    </section>
  </div>
</main>

<div class="w-full">
  <iframe title="map" class="h-[585px]" width="100%" src={contact.mapUrl}
  ></iframe>
</div>
