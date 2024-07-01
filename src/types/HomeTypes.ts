import { CategoryType } from "./CategoryTypes";
import { AdBannerType, ArticleType } from "./PostTypes";
import { langType } from "./generalTypes";

export type HomeTypes = {
  categories: CategoryType[];
  language: langType;
  featuredPosts: ArticleType[];
  mostRecentPosts: ArticleType[];
  mostPopularPosts: ArticleType[];
  advertisementBanner: AdBannerType[];
  facebookFeed: string;
};
