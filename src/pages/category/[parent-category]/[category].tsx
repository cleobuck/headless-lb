import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { fetchCategories, fetchCategoryAndPosts, fetchPost } from "@/lib/api";
import cookie from "cookie";
import styling from "./[category].module.less";
export async function getServerSideProps(context) {
  const cookies = cookie.parse(context.req.headers.cookie || "");

  const { category } = context.query;

  const language = cookies["lb-language"] || "fr";

  // const posts = await fetchPosts(language);

  const categoryAndPosts = await fetchCategoryAndPosts(category, language);

  const categories = await fetchCategories(language);

  return {
    props: {
      language,
      categories,
      categoryAndPosts,
    },
  };
}

export default function Article({ categories, language, categoryAndPosts }) {
  return (
    <>
      <Header categories={categories} language={language} />
      <section className={styling.content}>lalalla</section>
      <Footer language={language} />;
    </>
  );
}
