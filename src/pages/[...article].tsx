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
import { useState } from "react";
export async function getServerSideProps(context) {
  const cookies = cookie.parse(context.req.headers.cookie || "");

  const { article } = context.query;

  const language = cookies["lb-language"] || "fr";

  let post = undefined;
  let similarArticles = undefined;

  // const posts = await fetchPosts(language);
  await fetchPost(article[article.length - 1]).then(async (data) => {
    post = data[0];
    similarArticles = await fetchSimilarArticles(
      post.categories[post.categories.length - 1],
      post.id,
      language
    );
  });

  const bannerFlowScript = await fetchBannerFlowScript(language);

  const categories = await fetchCategories(language);

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
      <section className={styling.content}>
        <article>Post: {post.title.rendered}</article>
      </section>
      <Footer language={language} />;
    </>
  );
}
