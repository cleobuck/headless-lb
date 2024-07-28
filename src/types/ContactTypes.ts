import { CategoryType } from "./CategoryTypes";
import { langType } from "./generalTypes";

export type ContactPageTypes = {
  categories: CategoryType[];
  language: langType;
  authors: AuthorType[];
};

export type AuthorType = {
  avatar: string;
  email: string;
  name: string;
  url: string;
  bio: string;
  linkedIn: string;
};
