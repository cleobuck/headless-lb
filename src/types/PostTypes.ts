export interface ArticleType {
  id: number;
  title: string;
  date: number;
  category: string;
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
  ID: number;
  post_author: string;
  post_date: string;
  post_date_gmt: string;
  post_content: string;
  post_title: string;
  post_excerpt: string;
  post_status: string;
  comment_status: string;
  ping_status: string;
  post_password: string;
  post_name: string;
  to_ping: string;
  pinged: string;
  post_modified: string;
  post_modified_gmt: string;
  post_content_filtered: string;
  post_parent: number;
  guid: string;
  menu_order: number;
  post_type: string;
  post_mime_type: string;
  comment_count: string;
  filter: string;
}

export type FullPostType = {
  id: number;
  title: string;
};
