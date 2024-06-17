import axios from "axios";
import { formatCategories } from "./utils";

const _fetch = async (url, custom = false, callback = undefined) => {
  const fullUrl = custom
    ? `https://news.ladbrokes.be/wp-json/custom/v1/${url}`
    : `https://news.ladbrokes.be/wp-json/wp/v2/${url}`;

  console.log(fullUrl);

  try {
    const response = await axios.get(fullUrl);

    if (callback) {
      return callback(response);
    }

    return response.data;
  } catch (error) {
    console.log("error fetching . ".fullUrl);
    // console.error("Error fetching posts:", error);
    return undefined;
  }
};

export const fetchPosts = (lang) => {
  return _fetch(`posts?per_page=1&lang=${lang}`, true);
};

export const fetchPost = (slug, lang) => {
  return _fetch(`post?slug=${slug}&lang=${lang}`, true);
};

export const fetchFeaturedPosts = (lang) => {
  return _fetch(`featured-posts?lang=${lang}`, true);
};

export const fetchMostRecentPosts = (lang) => {
  return _fetch(`most-recent-posts?lang=${lang}`, true);
};

export const fetchMostPopularPosts = (lang) => {
  return _fetch(`most-popular-posts?lang=${lang}`, true);
};

export const fetchCategories = async (lang) => {
  const categories = await _fetch(
    `categories?_fields=id,name,parent,slug&per_page=100&lang=${lang}`
  );

  return categories ? formatCategories(categories) : undefined;
};

export const fetchCategoryAndPosts = async (categorySlug, lang) => {
  return await _fetch(
    `posts-by-category-slug/${categorySlug}?lang=${lang}`,
    true
  );
};

export const fetchAdvertisementBanner = async (lang) => {
  return await _fetch(`advertisement-banner?lang=${lang}`, true);
};

export const fetchBannerFlowScript = async (lang) => {
  return await _fetch(`banner-scripts?lang=${lang}`, true);
};

export const fetchSimilarArticles = async (categories, currentPostId, lang) => {
  return await _fetch(
    `related-articles?categories=${categories}&current_post_id=${currentPostId}&lang=${lang}`,
    true
  );
};
