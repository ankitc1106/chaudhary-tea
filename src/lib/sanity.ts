import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "wyastv6s",
  dataset: "production",
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: "2024-02-07", // use current date (YYYY-MM-DD) to target the latest API version
  // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
});

export const Urlbuilder = imageUrlBuilder(client);

type ImageManipulationType =
  | "width"
  | "height"
  | "none"
  | "crop"
  | "cropMini"
  | "cropHeight";

export function urlForImage(
  source: string,
  manipulationType: ImageManipulationType = "none",
  size: number = 800
) {
  let manipulationParam = "";

  switch (manipulationType) {
    case "width":
      manipulationParam = `?w=${size}`;
      break;
    case "height":
      manipulationParam = `?h=${size}`;
      break;
    case "crop":
      manipulationParam = `?h=800&w=550&fit=crop&crop=center&fit=max`;
      break;
    case "cropHeight":
      manipulationParam = `?h=300&w=1200&fit=crop&crop=center&fit=max`;
      break;
    case "cropMini":
      manipulationParam = `?h=180&w=110&fit=crop&crop=center&fit=max`;
      break;
    case "none":
    default:
      return source + "?auto=format";
  }

  return source + manipulationParam + "&auto=format";
}

export const returnPageQuery = (pageId: string) =>
  `*[_type == "page" && _id == "${pageId}"] {
    seo,
    "logo" : logo.asset -> url,
    heroSection{
      ...,
      "heroImage": heroImage.asset -> url
    },
    productSection[]{
      ...,
      "sideImage": sideImage.asset -> url,
      variants[]{
        ...,
        "image": image.asset -> url
      }
    },
    featureSection{
      ...,
      "prodImage": prodImage.asset -> url
    },
    infoSection{
      ...,
      "image": image.asset -> url
    },
    "productSectionImage": productSectionImage.asset -> url,
    brandName,
    "pattern": pattern.asset -> url,
    navOrder
    
  }`;
