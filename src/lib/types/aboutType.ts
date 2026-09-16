import type { Seo } from "./commonTypes";
import { createClient } from "@sanity/client";

export interface aboutType {
  seo: Seo;
  title: string;
  description: any[];
  BrandImages: BrandImageItem[];
}

export interface BrandImageItem {
  image: string;
  name: string;
  tagline: string;
  link: string;
}
