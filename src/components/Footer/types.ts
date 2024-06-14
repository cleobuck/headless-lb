import { langType } from "@/types/generalTypes";

export interface FooterLink {
  href: string;
  text: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export type FooterDataType = {
  [key in langType]: FooterSection[];
};
