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
      defWidth="md:w-[50%] w-[60%]"
      description={pageData.heroSection.heroText}
    />
  </Header>

  {#each pageData.productSection as product, i}
    <Product {product} isReverse={i % 2 === 1} />
  {/each}

  <InfoSection infoDat={pageData.infoSection} />
  <FeatureSection featData={pageData.featureSection} />
</section>
