import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import {
  fetchBannerFlowScript,
  fetchCategories,
  fetchPost,
  fetchSimilarArticles,
} from "@/lib/api";
import styling from "./article.module.less";
import { getLanguage } from "@/lib/utils";
export async function getServerSideProps(context) {
  const { article } = context.query;
  const language = getLanguage(context);
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

  const postResponse = await fetchPost(article[article.length - 1], language);

  if (postResponse?.switchSlugLanguage) {
    const segments = context.resolvedUrl.split("/");

    // Remove the last segment (current slug)
    segments.pop();

    if (segments[0] === "nl") {
      segments.shift();
    }
    // Append the translated slug to the URL
    segments.push(postResponse.translated_slug);

    return {
      redirect: {
        destination: `${language === "nl" ? "/nl" : ""}/${segments.join("/")}`,
        permanent: false,
      },
    };
  }

  const bannerFlowScript = await fetchBannerFlowScript(language);
  const categories = await fetchCategories(language);

  let similarArticles = null;
  const post = postResponse.post;

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
          <article>
            Post: {post.title} in {post.language}
          </article>
        </section>
      )}
      <Footer language={language} />;
    </>
  );
}
