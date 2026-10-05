<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import Icon from "@iconify/svelte";
  import { page } from "$app/stores";
  import { orderTray, isTrayOpen, orderTrayCount, orderTrayTotal } from "$lib/state";

  function closeTray() {
    $isTrayOpen = false;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Escape" && $isTrayOpen) closeTray();
  }

  function sendOnWhatsApp() {
    const whatsappNumber = $page.data.config?.whatsappNumber ?? "";
    const lines = $orderTray.map(
      (i) => `- ${i.productTitle} (${i.variantLabel}) x${i.qty} — ₹${i.price * i.qty}`
    );
    const message = `Hi! I'd like to order:\n${lines.join("\n")}\n\nTotal: ₹${$orderTrayTotal}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noreferrer");
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if $orderTrayCount > 0}
  <button
    on:click={() => ($isTrayOpen = !$isTrayOpen)}
    aria-expanded={$isTrayOpen}
    aria-controls="order-tray-panel"
    aria-label="Your order, {$orderTrayCount} item{$orderTrayCount === 1 ? '' : 's'}"
    class="fixed bottom-20 right-3 md:bottom-24 md:right-8 z-40 min-h-[44px] inline-flex items-center gap-2 px-4 bg-charcoal border border-gold/40 text-cream hover:border-gold transition-colors duration-300"
  >
    <Icon icon="mdi:shopping-outline" class="text-gold text-lg" />
    <span class="font-body text-sm tabular-nums">{$orderTrayCount}</span>
  </button>
{/if}

{#if $isTrayOpen}
  <div
    class="fixed inset-0 z-40 bg-charcoal/60 md:hidden"
    on:click={closeTray}
    transition:fade={{ duration: 200 }}
    aria-hidden="true"
  ></div>

  <div
    id="order-tray-panel"
    role="dialog"
    aria-label="Your order"
    transition:fly={{ y: 24, duration: 250 }}
    class="fixed z-50 bg-charcoal border border-gold/25 inset-x-0 bottom-0 md:inset-x-auto md:right-8 md:bottom-24 md:w-96 md:max-h-[70vh] flex flex-col"
  >
    <div class="flex items-center justify-between px-5 py-4 border-b border-gold/15 shrink-0">
      <h2 class="font-hero font-medium text-cream text-xl">Your Order</h2>
      <button on:click={closeTray} aria-label="Close order">
        <Icon icon="heroicons-solid:x" class="w-5 h-5 text-cream hover:text-gold transition-colors duration-300" />
      </button>
    </div>

    <div class="flex-1 overflow-y-auto divide-y divide-gold/10 px-5 max-h-[45vh] md:max-h-none">
      {#each $orderTray as item (item.productTitle + item.variantLabel)}
        <div class="py-4 flex items-start justify-between gap-3">
          <div>
            <p class="font-body text-sm text-cream">{item.productTitle}</p>
            <p class="font-body text-xs text-cream/50">{item.variantLabel} &middot; &#8377;{item.price} each</p>
            <div class="mt-2 flex items-center gap-2">
              <button
                on:click={() => orderTray.setQty(item.productTitle, item.variantLabel, item.qty - 1)}
                aria-label="Decrease quantity of {item.productTitle} ({item.variantLabel})"
                class="w-7 h-7 flex items-center justify-center border border-cream/20 text-cream/70 hover:border-gold hover:text-gold transition-colors duration-300"
              >
                &minus;
              </button>
              <span class="font-body text-sm text-cream w-5 text-center tabular-nums">{item.qty}</span>
              <button
                on:click={() => orderTray.setQty(item.productTitle, item.variantLabel, item.qty + 1)}
                aria-label="Increase quantity of {item.productTitle} ({item.variantLabel})"
                class="w-7 h-7 flex items-center justify-center border border-cream/20 text-cream/70 hover:border-gold hover:text-gold transition-colors duration-300"
              >
                +
              </button>
            </div>
          </div>
          <div class="flex flex-col items-end gap-2">
            <span class="font-body text-sm text-cream tabular-nums">&#8377;{item.price * item.qty}</span>
            <button
              on:click={() => orderTray.remove(item.productTitle, item.variantLabel)}
              aria-label="Remove {item.productTitle} ({item.variantLabel}) from order"
              class="text-cream/40 hover:text-gold transition-colors duration-300"
            >
              <Icon icon="mdi:trash-can-outline" class="w-4 h-4" />
            </button>
          </div>
        </div>
      {/each}
    </div>

    <div class="px-5 py-4 border-t border-gold/15 space-y-3 shrink-0">
      <div class="flex items-center justify-between">
        <span class="font-body text-sm text-cream/70">Total</span>
        <span class="font-body text-lg font-medium text-cream tabular-nums">&#8377;{$orderTrayTotal}</span>
      </div>
      <button
        on:click={sendOnWhatsApp}
        class="w-full min-h-[44px] inline-flex items-center justify-center gap-2 border border-gold text-gold hover:bg-gold/10 transition-colors duration-300 text-sm font-body font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
      >
        <Icon icon="mdi:whatsapp" class="text-base" />
        Send Order on WhatsApp
      </button>
    </div>
  </div>
{/if}
