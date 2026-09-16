export interface Seo {
  title: string;
  description: string;
}

export interface Icon {
  metadata: Metadata;
  _type: string;
  icon: string;
}

export interface Metadata {
  size: Size;
  vFlip: boolean;
  iconName: string;
  downloadUrl: string;
  palette: boolean;
  author: Author;
  hFlip: boolean;
  rotate: number;
  license: License;
  collectionId: string;
  flip: string;
  url: string;
  collectionName: string;
}

export interface Size {
  width: number;
  height: number;
}

export interface Author {
  name: string;
  url: string;
}

export interface License {
  name: string;
  url: string;
}

export interface BrandNav {
  logo: string;
  slug: { _type: string; current: string };
  brandName: string;
  navOrder: number;
}
