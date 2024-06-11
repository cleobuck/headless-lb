import { createArticleLink, getLanguage, setLanguage } from "./utils";
import {
  fetchAdvertisementBanner,
  fetchCategories,
  fetchFeaturedPosts,
  fetchMostPopularPosts,
  fetchMostRecentPosts,
} from "./api";

export default async function getServerSideProps(context) {
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
