import type { Icon } from "./commonTypes";

export interface heroSection {
  heroImage: string;
  heroTitle: string;
  heroText: string;
}

export interface variants {
  price: number;
  gram: string;
  unit: string;
  image: string;
}

export interface productItem {
  title: string;
  buyLink: string;
  description: string;
  variants: variants[];
  sideImage: string;
}

export interface feature {
  title: string;
  icon: Icon;
}

export interface featureSection {
  prodImage: string;
  feature: feature[];
}

export interface infoSection {
  title: string;
  description: string;
  image: string;
}

export interface PageType {
  seo: {
    title: string;
    description: string;
  };
  logo: string;
  brandName: string;
  heroSection: heroSection;
  productSection: productItem[];
  pattern: string;
  infoSection: infoSection;
  navOrder: number;
  featureSection: featureSection;
}
