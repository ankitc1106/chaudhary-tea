import { client, returnPageQuery } from "$lib/sanity";
import type { PageType } from "$lib/types/pageType";

export const load = async () => {
  const powerPage: PageType[] = await client.fetch(
    returnPageQuery("power_tea")
  );
  return {
    pageData: powerPage[0],
  };
};
