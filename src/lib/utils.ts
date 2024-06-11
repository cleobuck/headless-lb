import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import cookie from "cookie";
export function formatCategories(categories) {
  // Create a map to store categories by their ID for quick lookup

  const categoryMap = categories.reduce((map, category) => {
    map[category.id] = category;
    return map;
  }, {});

  // Function to recursively build category tree
  function buildCategoryTree(categoryId) {
    const category = categoryMap[categoryId];
    if (!category) return null;

    // Create a new object with only the necessary properties
    const formattedCategory = {
      id: category.id,
      name: category.name,
      slug: category.slug,
      children: [],
    };

    // Recursively build children
    const children = categories.filter((child) => child.parent === category.id);
    children.forEach((child) => {
      const formattedChild = buildCategoryTree(child.id);
      if (formattedChild) {
        formattedCategory.children.push(formattedChild);
      }
    });

    if (formattedCategory.children.length === 0) {
      delete formattedCategory.children;
    }

    return formattedCategory;
  }

  // Filter out top-level categories whose parent is 0
  const topLevelCategories = categories.filter(
    (category) => category.parent === 0
  );

  // Build the category tree for each top-level category
  const formattedCategories = topLevelCategories.map((category) =>
    buildCategoryTree(category.id)
  );

  return formattedCategories;
}

export const setLanguage = (lang) => {
  localStorage.setItem("lb-language", lang);
  document.cookie = `lb-language=${lang}; path=/`;
  window.location.reload();
};

export const getLanguage = (context) => {
  const cookies = cookie.parse(context.req.headers.cookie || "");

  const language = cookies["lb-language"] || "fr";

  return language;
};

function transformDate(inputDate, lang) {
  // Define month names in Dutch and French
  const months = {
    nl: [
      "januari",
      "februari",
      "maart",
      "april",
      "mei",
      "juni",
      "juli",
      "augustus",
      "september",
      "oktober",
      "november",
      "december",
    ],
    fr: [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre",
    ],
  };

  // Extract day, month, and year from the input date string
  const [day, monthName, year] = inputDate.split(" ");

  const monthNames = months[lang];

  // Determine the month index based on the detected language
  const monthIndex = (monthNames.indexOf(monthName) + 1)
    .toString()
    .padStart(2, "0");

  // Return the formatted date string in YYYY/MM/DD format
  return `${year}/${monthIndex}/${day.toString().padStart(2, "0")}`;
}

export const createArticleLink = (data, lang) => {
  const dateStr = data.date.trim();

  let title = data.title.toLowerCase();
  title = title
    // Replace accented characters with their non-accented equivalents
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    // Remove non-alphanumeric characters except spaces and hyphens
    .replace(/[^a-z0-9\s-]/g, "");
  title = title.replace(/\s+/g, "-"); // Replace spaces with hyphens

  // Construct the URL
  const url = `${lang === "nl" ? "/nl" : ""}/${transformDate(
    dateStr,
    lang
  )}/${title}/`;

  return url;
};

export const loadScript = (src: string) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.type = "text/javascript";
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

export function stripLanguagePrefix(url, prefix) {
  // Ensure the prefix starts with a slash
  if (!prefix.startsWith("/")) {
    prefix = "/" + prefix;
  }

  // Check if the URL starts with the prefix and remove it
  if (url.startsWith(prefix)) {
    return url.slice(prefix.length);
  }

  return url; // Return the original URL if the prefix doesn't match
}
