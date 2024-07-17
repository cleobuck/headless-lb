export type SubCategoryType = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  parent_category?: string;
  yoast_meta: SeoData;
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
  wpseo_keywordsynonyms: string;
  wpseo_title: string;
  wpseo_desc: string;
  wpseo_canonical: string;
  wpseo_focuskw: string;
  wpseo_linkdex: string;
  wpseo_content_score: string;
};
