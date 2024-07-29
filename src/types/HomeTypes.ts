import { VideoType } from "@/components/VideoPlaylist/Videotypes";
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
  head: HeadType;
  videos: VideoType[];
  eventsData: EventsDataType;
  searchResults: SearchResult[];
};

export interface HeadType {
  title: string;
  description: string;
  robots: {
    index: string;
    follow: string;
    "max-snippet": string;
    "max-image-preview": string;
    "max-video-preview": string;
  };
  canonical: string;
  og_locale: string;
  og_type: string;
  og_title: string;
  og_description: string;
  og_url: string;
  og_site_name: string;
  article_publisher: string;
  article_modified_time: string;
  og_image: {
    width: number;
    height: number;
    url: string;
    type: string;
  }[];
  twitter_card: string;
  twitter_site: string;
  schema: {
    "@context": string;
    "@graph": {
      "@type": string;
      "@id": string;
      url: string;
      name: string;
      isPartOf: {
        "@id": string;
      };
      primaryImageOfPage: {
        "@id": string;
      };
      image: {
        "@id": string;
      };
      thumbnailUrl: string;
      datePublished: string;
      dateModified: string;
      description: string;
      inLanguage: string;
      potentialAction: {
        "@type": string;
        target: string[];
      }[];
    }[];
  };
}

export type SearchResult = {
  title: string;
  date: number;
  featuredImage: string;
  featuredImageAlt: string;
  excerpt: string;
};

export type EventsDataType = {
  translations: {
    [key: string]: string;
  };
  events: EventType[];
};

export type EventType = {
  team_home: string;
  team_away: string;
  home_image: string;
  away_image: string;
  meetingDescription: string;
  headToHead: string;
  eventDescription: string;
  live: number;
  aliasUrl: string;
  eventDate: string;
};
