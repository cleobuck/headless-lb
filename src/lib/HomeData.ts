import { createArticleLink } from "./utils";
import {
  fetchAdvertisementBanner,
  fetchCategories,
  fetchFeaturedPosts,
  fetchMostPopularPosts,
  fetchMostRecentPosts,
} from "../lib/api";

import cookie from "cookie";

export default async function getServerSideProps(context) {
  const cookies = cookie.parse(context.req.headers.cookie || "");

  const language = cookies["lb-language"] || "fr";

  const categories = await fetchCategories(language);

  const featuredPosts = await fetchFeaturedPosts(language);

  const mostRecentPosts = await fetchMostRecentPosts(language);

  const mostPopularPosts = await fetchMostPopularPosts(language);

  const advertisementBanner = await fetchAdvertisementBanner(language);

  return {
    props: {
      categories,
      language,
      featuredPosts: featuredPosts.map((post) => ({
        ...post,
        link: createArticleLink(post, language),
      })),
      mostRecentPosts: mostRecentPosts.map((post) => ({
        ...post,
        link: createArticleLink(post, language),
      })),
      mostPopularPosts: mostPopularPosts.map((post) => ({
        ...post,
        link: createArticleLink(post, language),
      })),
      advertisementBanner,
    },
  };
}
