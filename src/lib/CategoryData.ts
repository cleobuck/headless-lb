import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import {
  fetchBannerFlowScript,
  fetchCategories,
  fetchCategoryAndPosts,
} from "@/lib/api";
import cookie from "cookie";
import { langType } from "@/types/generalTypes";
import { ArticleType } from "@/types/PostTypes";
import { GetServerSidePropsContext } from "next";

import { beautifyDate, createArticleLink, timeStampToDate } from "@/lib/utils";

export default async function getServerSideProps(
  context: GetServerSidePropsContext
) {
  const cookies = cookie.parse(context.req.headers.cookie || "");

  const { category, parentCategory } = context.query;

  const language = (cookies["lb-language"] || "fr") as langType;

  // const posts = await fetchPosts(language);

  const categories = await fetchCategories(language);

  const bannerFlowScript = await fetchBannerFlowScript(language);

  const srcStartIndex = bannerFlowScript.script.indexOf('src="') + 5;
  const srcEndIndex = bannerFlowScript.script.indexOf('"', srcStartIndex);
  const script = bannerFlowScript.script.slice(srcStartIndex, srcEndIndex);

  const categoryAndPosts = await await fetchCategoryAndPosts(
    category || parentCategory,
    language
  );

  if (categoryAndPosts?.switchSlugLanguage) {
    return {
      redirect: {
        destination: categoryAndPosts.alternate_url,
        permanent: false,
      },
    };
  }

  return {
    props: {
      language,
      slug: category || parentCategory,
      categories,
      categoryAndPosts: {
        ...categoryAndPosts,
        posts: categoryAndPosts.posts.map((post: ArticleType) => ({
          ...post,
          date: beautifyDate(timeStampToDate(post.date), language),
          link: createArticleLink(
            post.title,
            timeStampToDate(post.date),
            language
          ),
        })),
      },
      bannerFlowScript: script,
    },
  };
}
