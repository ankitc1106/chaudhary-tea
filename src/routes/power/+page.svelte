<script lang="ts">
  import Topbar from "$lib/components/Topbar.svelte";
  import Hero from "$lib/components/Hero.svelte";

  import Header from "$lib/components/layout/Header.svelte";
  import Product from "$lib/components/Product.svelte";

  import type { PageType } from "$lib/types/pageType";
  import InfoSection from "$lib/components/InfoSection.svelte";
  import FeatureSection from "$lib/components/FeatureSection.svelte";

  export let data;

  let pageData: PageType = data.pageData;
</script>

<svelte:head>
  <title>{pageData.seo.title}</title>
  <meta name="description" content={pageData.seo.description} />
</svelte:head>

<section class="w-full overflow-x-clip">
  <Topbar />
  <Header bg={pageData.heroSection.heroImage} logo={pageData.logo}>
    <Hero
      logo={pageData.logo}
      defWidth="md:w-[50%] w-[80%]"
      description={pageData.heroSection.heroText}
    />
  </Header>

  {#each pageData.productSection as product, i}
    {#if i === 0}
      <Product {product} pattern={pageData.pattern} />
    {:else if i % 2 === 0}
      <Product {product} isFirst={true} pattern={pageData.pattern} />
    {:else}
      <Product {product} isReverse={true} pattern={pageData.pattern} />
    {/if}
  {/each}

  <InfoSection infoDat={pageData.infoSection} />
  <FeatureSection featData={pageData.featureSection} />
</section>
