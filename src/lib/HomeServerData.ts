import {
  beautifyDate,
  createArticleLink,
  getLanguage,
  timeStampToDate,
} from "./utils";
import {
  fetchAdvertisementBanner,
  fetchCategories,
  fetchFeaturedPosts,
  fetchMostPopularPosts,
  fetchMostRecentPosts,
  fetchFacebookFeeds,
  getYoutubePlaylist,
} from "./api";
import { GetServerSidePropsContext } from "next";
import { ArticleType } from "@/types/PostTypes";

export default async function getServerSideProps(
  context: GetServerSidePropsContext
) {
  const language = getLanguage(context);

  switch (true) {
    case context.resolvedUrl !== "/nl" && language === "nl": {
      return {
        redirect: {
          destination: `/nl`,
          permanent: false,
        },
      };
    }
    case context.resolvedUrl === "/nl" && language === "fr": {
      return {
        redirect: {
          destination: `/`,
          permanent: false,
        },
      };
    }
  }

  const categories = await fetchCategories(language);

  const featuredPosts = await fetchFeaturedPosts(language);

  const mostRecentPosts = await fetchMostRecentPosts(language);

  const mostPopularPosts = await fetchMostPopularPosts(language);

  const advertisementBanner = await fetchAdvertisementBanner(language);

  const facebookFeed = await fetchFacebookFeeds(language);

  const videos = await getYoutubePlaylist();

  return {
    props: {
      categories,
      language,
      featuredPosts: featuredPosts.map((post: ArticleType) => ({
        ...post,
        date: beautifyDate(timeStampToDate(post.date), language),
        link: createArticleLink(
          post.title,
          timeStampToDate(post.date),
          language
        ),
      })),
      mostRecentPosts: mostRecentPosts.map((post: ArticleType) => ({
        ...post,
        date: beautifyDate(timeStampToDate(post.date), language),
        link: createArticleLink(
          post.title,
          timeStampToDate(post.date),
          language
        ),
      })),
      mostPopularPosts: mostPopularPosts.map((post: ArticleType) => ({
        ...post,
        date: beautifyDate(timeStampToDate(post.date), language),
        link: createArticleLink(
          post.title,
          timeStampToDate(post.date),
          language
        ),
      })),
      advertisementBanner,
      facebookFeed,
      videos,
    },
  };
}
