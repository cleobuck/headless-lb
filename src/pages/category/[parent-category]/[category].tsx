import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import {
  fetchBannerFlowScript,
  fetchCategories,
  fetchCategoryAndPosts,
  fetchPost,
} from "@/lib/api";
import cookie from "cookie";
import styling from "./[category].module.less";
import { langType } from "@/types/generalTypes";
import { CategoryPostType } from "@/types/PostTypes";
import { GetServerSidePropsContext } from "next";
import { CategoryType } from "@/types/CategoryTypes";
import SocialNetworks from "@/components/social-networks/SocialNetworks";
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cookies = cookie.parse(context.req.headers.cookie || "");

  const { category } = context.query;

  const language = cookies["lb-language"] || "fr";

  // const posts = await fetchPosts(language);

  const categoryAndPosts = await fetchCategoryAndPosts(category, language);

  const categories = await fetchCategories(language);

  const bannerFlowScript = await fetchBannerFlowScript(language);

  return {
    props: {
      language,
      categories,
      categoryAndPosts,
      bannerFlowScript,
    },
  };
}

export default function Article({
  categories,
  language,
  categoryAndPosts,
  bannerFlowScript,
}: {
  categories: CategoryType[];
  language: langType;
  categoryAndPosts: {
    category: CategoryType;
    posts: CategoryPostType[];
  };
}) {
  return (
    <>
      <Header categories={categories} language={language} />
      <section className={styling.content}>lalalla</section>
      <SocialNetworks language={language} />
      <Footer language={language} />;
    </>
  );
}
