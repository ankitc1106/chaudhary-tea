import type { Icon } from "./commonTypes";

export interface ConfigType {
  topBar: string;
  favicon: string;
  whatsappNumber: string;
  socialLinks: {
    name: string;
    link: string;
    icon: Icon;
  }[];
  footer: Footer;
}

export interface Footer {
  logo: string;
  description: string;
  copyrigth: string;
}
