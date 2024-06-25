export type SubCategoryType = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  parent_category?: string;
};

export type CategoryType = {
  id: number;
  name: string;
  slug: string;
  children?: SubCategoryType[];
};

export type ServerCategoryType = {
  id: number;
  name: string;
  slug: string;
  parent: number;
};
