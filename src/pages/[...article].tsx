import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import {
  fetchBannerFlowScript,
  fetchCategories,
  fetchPost,
  fetchSimilarArticles,
} from "@/lib/api";
import styling from "./article.module.less";
import { getLanguage, stripLanguagePrefix } from "@/lib/utils";
export async function getServerSideProps(context) {
  const { article } = context.query;
  const language = getLanguage(context);
  const { req } = context;

  switch (true) {
    case !context.resolvedUrl.startsWith("/nl") && language === "nl": {
      return {
        redirect: {
          destination: `/nl/${context.resolvedUrl}`,
          permanent: false,
        },
      };
    }
    case context.resolvedUrl.startsWith("/nl") && language === "fr": {
      return {
        redirect: {
          destination: stripLanguagePrefix(context.resolvedUrl, "/nl"),
          permanent: false,
        },
      };
    }
  }

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

  const bannerFlowScript = await fetchBannerFlowScript(language);

  const categories = await fetchCategories(language);

  // const posts = await fetchPosts(language);
  const posts = await fetchPost(article[article.length - 1], language);

  const post = posts[0] || null;

  console.log(post);

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
