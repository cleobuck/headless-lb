import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { fetchCategories, fetchPost } from "@/lib/api";
import cookie from "cookie";
import styling from "./[title].module.less";
export async function getServerSideProps(context) {
  const cookies = cookie.parse(context.req.headers.cookie || "");

  const { title } = context.query;

  const language = cookies["lb-language"] || "fr";

  // const posts = await fetchPosts(language);
  const post = await fetchPost(title);

  const categories = await fetchCategories(language);

  return {
    props: {
      post,
      language,
      categories,
    },
  };
}

export default function Article({ post, language, categories }) {
  return (
    <>
      <Header categories={categories} language={language} />
      <section className={styling.content}>
        <article>Post: {}</article>
      </section>
      <Footer language={language} />;
    </>
  );
}
