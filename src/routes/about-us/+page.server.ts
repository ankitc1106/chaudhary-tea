import { client, returnPageQuery } from "$lib/sanity";
import type { PageType } from "$lib/types/pageType";

export const load = async () => {
  const charchaPage: PageType[] = await client.fetch(returnPageQuery("charcha_tea"));
  return {
    pageData: charchaPage[0],
  };
};
