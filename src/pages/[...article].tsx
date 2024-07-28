import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

import "@wordpress/block-library/build-style/common.css";
import "@wordpress/block-library/build-style/style.css";
import "@wordpress/block-library/build-style/theme.css";
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
  replaceLastSlug,
  timeStampToDate,
} from "@/lib/utils";
import { GetServerSidePropsContext } from "next";
import { ArticleType, FullPostType } from "@/types/PostTypes";
import { langType } from "@/types/generalTypes";
import { CategoryType } from "@/types/CategoryTypes";
import SocialNetworks from "@/components/social-networks/SocialNetworks";
import DarkModeSwitch from "@/components/DarkModeSwitch/DarkModeSwitch";
import { useEffect, useRef } from "react";
import ShareButtons from "@/components/ShareButtons/ShareButtons";
import Image from "next/image";
import { useRouter } from "next/router";

import UserCircle from "@/assets/images/icons/regular/circle-user.svg";
import Calendar from "@/assets/images/icons/solid/calendar.svg";
import Head from "next/head";
import SimilarArticles from "@/components/similar-articles/SimilarArticles";

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

  const srcStartIndex = bannerFlowScript.script.indexOf('src="') + 5;
  const srcEndIndex = bannerFlowScript.script.indexOf('"', srcStartIndex);
  const script = bannerFlowScript.script.slice(srcStartIndex, srcEndIndex);

  const categories = await fetchCategories(language);

  let similarArticles = null;
  const post = postResponse.post;

  if (post && post.categories) {
    similarArticles = await fetchSimilarArticles(
      post.first_category_id,
      post.id,
      language
    );
  }

  return {
    props: {
      post: {
        ...post,

        timestamp: post.date,
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
      bannerFlowScript: script,
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
  const ref = useRef<HTMLElement>(null);

  const router = useRouter();

  console.log(post);

  const currentUrl = `${process.env.BASE_URL}${router.asPath}`;

  useEffect(() => {
    if (ref.current) {
      const script = document.createElement("script");
      script.src = bannerFlowScript;
      script.async = true;

      // Assuming 'myDiv' is the ID of the div where you want to append the script
      ref.current.appendChild(script);
    }
  }, [bannerFlowScript]);

  useEffect(() => {
    //@ts-ignore
    if (window.twttr) {
      //@ts-ignore
      window.twttr.widgets.load();
    } else {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.onload = () => {
        //@ts-ignore
        window.twttr.widgets.load();
      };
      document.body.appendChild(script);
    }
  }, [post.content]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="profile" href="https://gmpg.org/xfn/11" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <link rel="alternate" href={currentUrl} hrefLang={language} />
        <link
          rel="alternate"
          href={`${process.env.BASE_URL}${createArticleLink(
            post.yoast_meta.translated_slug,
            timeStampToDate(post.timestamp),
            language === "fr" ? "nl" : "fr"
          )}`}
          hrefLang={language === "fr" ? "nl" : "fr"}
        />
        <title> {post.yoast_meta.title}</title>
        <meta name="description" content={post.yoast_meta.description}></meta>
        <link rel="canonical" href={post.yoast_meta.canonical || currentUrl} />
        <meta
          property="og:locale"
          content={language === "fr" ? "fr_FR" : "nl_BE"}
        />
        <meta
          property="og:locale: alternate"
          content={language === "nl" ? "fr_FR" : "nl_BE"}
        />
        <meta property="og:type" content="article" />
      </Head>
      <Header categories={categories} language={language} />
      <div className={styling.darkModeSwitchContainer}>
        <DarkModeSwitch />
      </div>
      {post && (
        <div className={styling.columnSeparator}>
          <section className={styling.post}>
            <figure className={styling.figure}>
              <Image
                className={styling.image}
                src={post["featured_image"]}
                alt=""
                fill={true}
              />
            </figure>
            <article>
              <h1>{post.title}</h1>

              <nav aria-label="Breadcrumb" className={styling.breadcrumbs}>
                <ol>
                  {post.categories.map((_, index) => (
                    <BreadCrumb
                      categories={post.categories}
                      index={index}
                      key={index}
                    />
                  ))}

                  <li> {post.title}</li>
                </ol>
              </nav>

              <div className={styling.metaData}>
                <span>
                  {" "}
                  <UserCircle className={styling.metaIcons} /> {post.author}{" "}
                </span>
                <time className={styling.date}>
                  {" "}
                  <Calendar className={styling.metaIcons} />
                  {post.date}{" "}
                </time>
              </div>
              <div />

              <p
                className={styling.content}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <ShareButtons
                url={`https://news.labrokes.be/${post.link}`}
                title={post.title}
                image={post.featured_image}
              />
            </article>
          </section>
          <aside className={styling.ad} ref={ref}></aside>
        </div>
      )}
      <SimilarArticles similarArticles={similarArticles} language={language} />
      <SocialNetworks language={language} />
      <Footer language={language} />;
    </>
  );
}

const BreadCrumb = ({
  index,
  categories,
}: {
  index: number;
  categories: string[];
}) => {
  const router = useRouter();

  const createSlug = (categories: string[], index: number) => {
    const slicedCategories = categories.slice(0, index + 1); // Slice up to index (inclusive)
    const slug = slicedCategories.join("/"); // Join array elements with '/'

    return `/${slug}`; // Ensure slug starts with '/'
  };

  return (
    <li>
      <a
        href=""
        onClick={() =>
          router.push(`/category/${createSlug(categories, index)}`)
        }
      >
        {`${categories[index]} >`}
      </a>
    </li>
  );
};
