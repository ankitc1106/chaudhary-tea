import { client, returnPageQuery } from "$lib/sanity";
import type { PageType } from "$lib/types/pageType";

export const load = async () => {
  const sahiPage: PageType[] = await client.fetch(returnPageQuery("sahi_tea"));
  return {
    pageData: sahiPage[0],
  };
};
