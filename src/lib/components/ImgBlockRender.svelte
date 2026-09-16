<script lang="ts">
  import { Urlbuilder } from "$lib/sanity";
  import type { BlockComponentProps } from "@portabletext/svelte";
  export let portableText: BlockComponentProps;
</script>

<img
  class="rounded-md mx-auto"
  alt="chaudhary's tea"
  src={Urlbuilder.image(portableText.value).width(700).url()}
/>
