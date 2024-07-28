export interface ArticleType {
  id: number;
  title: string;
  date: number;
  category: string;
  number?: number;
  featured_image: string;
  image_alt: string;
  slug: string;
  link: string;
  count?: number;
  excerpt?: string;
}

export interface AdBannerType {
  image: string;
  title: string;
  url: string;
}

export interface CategoryPostType {
  category: string;
  date: string;
  excerpt: string;
  featured_image: string;
  id: number;
  link: string;
  title: string;
}

export type FullPostType = {
  id: number;
  title: string;
  language: string;
  featured_image: string;
  author: string;
  date: Date;
  content: string;
  categories: string[];
  link: string;
  yoast_meta: PostYoastMetaType;
};

export type PostYoastMetaType = {
  title: string;
  description: string;
  canonical: string;
  translated_slug: string;
  opengraph: {
    title: string;
    description: string;
    url: string;
    image: string;
  };
  twitter: {
    title: string;
    description: string;
    image: string;
  };
};
