import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import {
  fetchBannerFlowScript,
  fetchCategories,
  fetchPost,
  fetchSimilarArticles,
} from "@/lib/api";
import cookie from "cookie";
import styling from "./article.module.less";
import { getLanguage } from "@/lib/utils";
export async function getServerSideProps(context) {
  const { article } = context.query;

  const { req } = context;

  if (!req) {
    return {
      props: {
        post: null,
        similarArticles: [],
        language: "fr",
        categories: [],
        bannerFlowScript: "",
      },
    };
  }

  const language = getLanguage(context);

  const bannerFlowScript = await fetchBannerFlowScript(language);

  const categories = await fetchCategories(language);

  // const posts = await fetchPosts(language);
  const posts = await fetchPost(article[article.length - 1]);

  const post = posts[0] || null;

  let similarArticles = null;

  if (post && post.categories) {
    similarArticles = await fetchSimilarArticles(
      post.categories[post.categories.length - 1],
      post.id,
      language
    );
  }
  return {
    props: {
      post,
      similarArticles,
      language,
      categories,
      bannerFlowScript: bannerFlowScript["script"].replace(/\\/g, ""),
    },
  };
}

export default function Article({
  post,
  language,
  categories,
  bannerFlowScript,
  similarArticles,
}) {
  return (
    <>
      <Header categories={categories} language={language} />
      {post && (
        <section className={styling.content}>
          <article>Post: {post.title.rendered}</article>
        </section>
      )}
      <Footer language={language} />;
    </>
  );
}
