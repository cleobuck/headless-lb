import { CategoryPostType } from "./PostTypes";
import { langType } from "./generalTypes";

export type SubCategoryType = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  parent_category?: string;
  yoast_meta?: SeoData;
};

export type CategoryType = {
  id: number;
  name: string;
  slug: string;
  children?: SubCategoryType[];
  yoast_meta: SeoData;
};

export type ServerCategoryType = {
  id: number;
  name: string;
  slug: string;
  parent: number;
};

export type SeoData = {
  wpseo_keywordsynonyms: string[]; // Assuming this is an array of strings
  wpseo_title: string;
  wpseo_desc: string;
  wpseo_focuskw: string;
  wpseo_linkdex: string;
  wpseo_content_score: string;
  wpseo_opengraph_title: string;
  site_name: string;
  wpseo_opengraph_description: string;
  alternate_url: string;
  twitter_card: string;
  twitter_site: string;
  wpseo_canonical: string;
};

export type CategoryPageServerDataType = {
  language: langType;
  slug: string;
  categories: CategoryType[];
  categoryAndPosts: CategoryAndPostsType;
  bannerFlowScript: string;
};

type CategoryAndPostsType = {
  category: {
    id: string;
    name: string;
    description: string;
    parent_category: string;
    yoast_meta: SeoData;
  };
  posts: CategoryPostType[];
};
