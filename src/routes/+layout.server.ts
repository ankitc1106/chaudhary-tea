import { client, returnPageQuery } from "$lib/sanity";
import type { BrandNav } from "$lib/types/commonTypes";
import type { ConfigType } from "$lib/types/configType";
import type { contactType } from "$lib/types/contactType";
import type { PageType } from "$lib/types/pageType";

const layoutLogoQuery = `*[_type == "page" && brandName == "Charcha"] {
    "logo" : logo.asset -> url,
slug ,
    brandName,
    navOrder,
    "products": productSection[].title
  } | order(navOrder asc)`;

const configQuery = `*[_type == "config"] {
  ...,
  "favicon" : favicon.asset ->url,
  footer {
    "logo" : logo.asset -> url,
    description,
      copyrigth
  }
}  
`;

const contactQuery = `*[_type == "contact"]{
  ...,
  "bgImage" : bgImage.asset -> url
}`;

export const load = async () => {
  const brandQuery: BrandNav[] = await client.fetch(layoutLogoQuery);
  const config: ConfigType[] = await client.fetch(configQuery);
  const contact: contactType[] = await client.fetch(contactQuery);
  return {
    brandList: brandQuery,
    config: config[0],
    contact: contact[0],
  };
};
