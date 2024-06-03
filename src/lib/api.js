import axios from "axios";
import { formatCategories } from "./utils";

const _fetch = async (url) => {
  try {
    const response = await axios.get(
      `https://news.ladbrokes.be/wp-json/wp/v2/${url}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return undefined;
  }
};

export const fetchPosts = () => {
  return _fetch("posts?per_page=1");
};

export const fetchCategories = async () => {
  const categories = await _fetch(
    "categories?_fields=id,name,parent&per_page=100&lang=fr"
  );

  return categories ? formatCategories(categories) : undefined;
};

export const fetchFeaturedPosts = () => {};
