import axios from "axios";
import { formatCategories } from "./utils";

const _fetch = async (url, custom = false, callback = undefined) => {
  const fullUrl = custom
    ? `${process.env.API_URL}/wp-json/custom/v1/${url}`
    : `${process.env.API_URL}/wp-json/wp/v2/${url}`;

  try {
    const response = await axios.get(fullUrl);

    if (callback) {
      return callback(response);
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return undefined;
  }
};

export const fetchPosts = (lang) => {
  return _fetch(`posts?per_page=1&lang=${lang}`, true);
};

export const fetchPost = (slug, lang) => {
  console.log(`post?slug=${slug}&lang=${lang}`);
  return _fetch(`post?slug=${slug}&lang=${lang}`, true);
};

export const fetchFeaturedPosts = (lang) => {
  return _fetch(`featured-posts?lang=${lang}`, true);
};

export const fetchMostRecentPosts = (lang, page = 1) => {
  return _fetch(`most-recent-posts?lang=${lang}&page=${page}`, true);
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

export const fetchCategoryAndPosts = async (categorySlug, lang, page = 1) => {
  return await _fetch(
    `posts-by-category-slug/${categorySlug}?lang=${lang}&page=${page}`,
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

export const fetchFacebookFeeds = async (lang) => {
  return await _fetch(`facebook-feed-content?lang=${lang}`, true);
};

export const searchArticles = async (searchPhrase) => {
  return await _fetch(`posts?search=${searchPhrase}`);
};

export const getYoutubePlaylist = async () => {
  return await _fetch(`youtube-playlist`, true);
};

export const fetchPageMetaData = async (id) => {
  return await _fetch(`pages/${id}`);
};

// export const getYoutubePlaylist = async () => {
//   const apiKey = "AIzaSyBwU5PjF4KWwS7eEyQ8CNHfaVIDq25Ni1M"; // Replace with your actual API key
//   const channelId = "UCtpikuBhVyc0sjiOmAsJE7Q"; // Replace with the ID of the YouTube channel
//   const maxResults = 20; // Number of videos to fetch

//   const excludedTerms = ["Shorts.", "Short."]; // List of terms to exclude

//   // Construct the excluded terms part of the query
//   const excludedQuery = excludedTerms.map((term) => `-${term}`).join(" ");

//   const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=${maxResults}&order=date&type=video&q=${excludedQuery}&key=${apiKey}`;

//   console.log(url);
//   try {
//     const response = await axios.get(url);

//     return response.data;
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     return undefined;
//   }
// };
