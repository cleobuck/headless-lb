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
};
