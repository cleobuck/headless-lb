import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import {
  fetchBannerFlowScript,
  fetchCategories,
  fetchPost,
  fetchSimilarArticles,
} from "@/lib/api";
import styling from "./article.module.less";
import {
  beautifyDate,
  createArticleLink,
  getLanguage,
  timeStampToDate,
} from "@/lib/utils";
import { GetServerSidePropsContext } from "next";
import { ArticleType, FullPostType } from "@/types/PostTypes";
import { langType } from "@/types/generalTypes";
import { CategoryType } from "@/types/CategoryTypes";
import SocialNetworks from "@/components/social-networks/SocialNetworks";
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { article } = context.query;

  const articleSlugs = article as string[];
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

  const postResponse = await fetchPost(
    articleSlugs[articleSlugs.length - 1],
    language
  );

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
      post.categories.map((item: any) => item.cat_ID)[
        post.categories.length - 1
      ],
      post.id,
      language
    );
  }

  return {
    props: {
      post: {
        ...post,

        date: beautifyDate(timeStampToDate(post.date), language),

        link: createArticleLink(
          post.title,
          timeStampToDate(post.date),
          language
        ),
      },
      similarArticles: similarArticles.map((similarArticle: ArticleType) => ({
        ...similarArticle,
        link: createArticleLink(
          similarArticle.title,
          timeStampToDate(similarArticle.date),
          language
        ),
      })),
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
}: {
  post: FullPostType;
  language: langType;
  categories: CategoryType[];
  bannerFlowScript: string;
  similarArticles: ArticleType[];
}) {
  console.log(post);
  return (
    <>
      <Header categories={categories} language={language} />
      {post && (
        <section className={styling.content}>
          <article>Post: {post.title}</article>
        </section>
      )}
      {/* <ShareButtons url={`https://news.labrokes.be/${post.link}`} */}
      <SocialNetworks language={language} />
      <Footer language={language} />;
    </>
  );
}
