import cookie from "cookie";
import { GetServerSidePropsContext } from "next";
import { langType } from "@/types/generalTypes";
import { ServerCategoryType, SubCategoryType } from "@/types/CategoryTypes";
export function formatCategories(categories: ServerCategoryType[]) {
  // Create a map to store categories by their ID for quick lookup

  const categoryMap = categories.reduce(
    (map: { [key: number]: ServerCategoryType }, category) => {
      map[category.id] = category;
      return map;
    },
    {}
  );

  // Function to recursively build category tree
  function buildCategoryTree(categoryId: number) {
    const category = categoryMap[categoryId];
    if (!category) return null;

    // Create a new object with only the necessary properties
    const formattedCategory = {
      id: category.id,
      name: category.name,
      slug: category.slug,
      children: [] as SubCategoryType[],
    };

    // Recursively build children
    const children = categories.filter((child) => child.parent === category.id);
    children.forEach((child) => {
      const formattedChild = buildCategoryTree(child.id);
      if (formattedChild) {
        formattedCategory.children.push(formattedChild);
      }
    });

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

export const setLanguage = (lang: langType) => {
  localStorage.setItem("lb-language", lang);
  document.cookie = `lb-language=${lang}; path=/`;
  window.location.reload();
};

export const getLanguage = (context: GetServerSidePropsContext) => {
  const cookies = cookie.parse(context.req.headers.cookie || "");

  const language = cookies["lb-language"] || "fr";

  return language as langType;
};

export const beautifyDate = (date: Date, lang: langType) => {
  const month = date.getMonth(); // Months are zero-indexed, so add 1
  const day = date.getDate();
  const year = date.getFullYear();

  const months: { [key in langType]: string[] } = {
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

  return `${day} ${months[lang][month]} ${year}`;
};

function transformDate(inputDate: Date, lang: langType) {
  const month = inputDate.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = inputDate.getDate();
  const year = inputDate.getFullYear();

  // Return the formatted date string in YYYY/MM/DD format
  return `${year}/${month.toString().padStart(2, "0")}/${day
    .toString()
    .padStart(2, "0")}`;
}

export const timeStampToDate = (timeStamp: number) =>
  new Date(timeStamp * 1000);

export const createArticleLink = (
  title: string,
  date: Date,
  lang: langType
) => {
  title = title
    .toLowerCase()
    // Replace accented characters with their non-accented equivalents
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    // Remove non-alphanumeric characters except spaces, hyphens, and slashes
    .replace(/[^a-z0-9\s/-]/g, "")
    // Replace spaces with hyphens
    .replace(/\s+/g, "-")
    // Replace slashes with hyphens
    .replace(/\//g, "-");

  // Construct the URL
  const url = `${lang === "nl" ? "/nl" : ""}/${transformDate(
    date,
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

import parse, { domToReact } from "html-react-parser";

/*
 * We use a regular expression (pattern) to match the specific URL you want to replace.
 * The (\d+) part captures the numeric ID after ?p=.
 * Then, we use the replacement string 'data-internal-link="true" href="/blog/$1"',
 * where $1 is a placeholder for the captured ID.
 */
export function fixInternalLinks(html_string: string) {
  const pattern = /href="https:\/\/yoursite.com\/\?p=(\d+)"/g;
  const replacement = 'data-internal-link="true" href="/blog/$1"';

  return html_string.replace(pattern, replacement);
}

export const processContent = (content: string) => {
  // Normalize line breaks
  const normalizedContent = content.replace(/\r\n|\r/g, "\n");

  // Split content by double line breaks
  const paragraphs: string[] = normalizedContent.split("\n\n");

  // Wrap each paragraph in <p> tags, ignoring empty paragraphs
  return paragraphs
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph)
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("");
};

export const getHeaderWidth = () => {
  const header = document.getElementById("header");

  return header?.scrollWidth;
};
