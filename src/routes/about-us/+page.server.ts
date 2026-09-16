import { client, returnPageQuery } from "$lib/sanity";
import type { aboutType } from "$lib/types/aboutType";

export const load = async () => {
  const aboutPage: aboutType[] = await client.fetch(`*[_type == "about"]{
    ...,
    BrandImages[] {
      link,
        name,
        tagline,
        "image": image.asset -> url
    }
  }
  `);
  return {
    pageData: aboutPage[0],
  };
};
