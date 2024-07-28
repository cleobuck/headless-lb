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
  search,
  fetchPageMetaData,
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

  const searchTerm = context.query.s || "";

  let searchResults = "";

  if (searchTerm) {
    searchResults = await search(searchTerm);
  }

  const categories = await fetchCategories(language);

  const featuredPosts = await fetchFeaturedPosts(language);

  const mostRecentPosts = await fetchMostRecentPosts(language);

  const mostPopularPosts = await fetchMostPopularPosts(language);

  const advertisementBanner = await fetchAdvertisementBanner(language);

  const facebookFeed = await fetchFacebookFeeds(language);

  const videos = await getYoutubePlaylist();

  const HeadData = await fetchPageMetaData(121);

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
      searchResults,
      head: HeadData.yoast_head_json,
    },
  };
}
