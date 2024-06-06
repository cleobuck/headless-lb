import axios from "axios";
import { formatCategories } from "./utils";

const _fetch = async (url, custom = false) => {
  const fullUrl = custom
    ? `https://news.ladbrokes.be/wp-json/custom/v1/${url}`
    : `https://news.ladbrokes.be/wp-json/wp/v2/${url}`;

  try {
    const response = await axios.get(fullUrl);

    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return undefined;
  }
};

export const fetchPosts = (lang) => {
  return _fetch(`posts?per_page=1&lang=${lang}`);
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
    `categories?_fields=id,name,parent&per_page=100&lang=${lang}`
  );

  return categories ? formatCategories(categories) : undefined;
};
