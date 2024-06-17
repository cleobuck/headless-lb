import { langType } from "@/types/generalTypes";

export interface FooterLinkType {
  href: string;
  text: string;
}

export interface FooterSection {
  title: string;
  links: FooterLinkType[];
}

export type FooterDataType = {
  [key in langType]: FooterSection[];
};
