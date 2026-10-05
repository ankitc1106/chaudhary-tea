<script lang="ts">
  import type { productItem } from "$lib/types/pageType";
  import ShelfItem from "./ShelfItem.svelte";
  import { slugify } from "$lib/utils/slug";

  export let products: (productItem & { tagline?: string })[];
  // Per-product, per-variant image overrides keyed by product title, then
  // by normalized "{gram}{unit}" — see ShelfItem's variantImageOverrides.
  export let variantImageOverrides: Record<string, Record<string, string>> = {};
  // Per-product "Add to order" restriction, keyed by product title — see
  // ShelfItem's addToOrderVariants.
  export let addToOrderVariantsByProduct: Record<string, string[]> = {};
  // Per-product "Order on WhatsApp" restriction, keyed by product title —
  // see ShelfItem's orderOnWhatsAppVariants.
  export let orderOnWhatsAppVariantsByProduct: Record<string, string[]> = {};
  // Per-product, per-variant MRP/selling-price overrides keyed by product
  // title, then by normalized "{gram}{unit}" — see ShelfItem's
  // priceOverrides.
  export let priceOverridesByProduct: Record<string, Record<string, { mrp: number; sp: number }>> = {};
</script>

<section class="bg-[#EDE6D4] py-16 md:py-24 px-5 md:px-10 lg:px-16">
  <div
    class="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gold/20"
  >
    {#each products as product (product.title)}
      <ShelfItem
        {product}
        tagline={product.tagline}
        id={slugify(product.title)}
        variantImageOverrides={variantImageOverrides[product.title] ?? {}}
        addToOrderVariants={addToOrderVariantsByProduct[product.title]}
        orderOnWhatsAppVariants={orderOnWhatsAppVariantsByProduct[product.title]}
        priceOverrides={priceOverridesByProduct[product.title] ?? {}}
      />
    {/each}
  </div>
</section>
