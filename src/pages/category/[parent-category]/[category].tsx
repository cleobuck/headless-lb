import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import {
  fetchBannerFlowScript,
  fetchCategories,
  fetchCategoryAndPosts,
} from "@/lib/api";
import cookie from "cookie";
import styling from "./[category].module.less";
import { langType } from "@/types/generalTypes";
import { ArticleType, CategoryPostType } from "@/types/PostTypes";
import { GetServerSidePropsContext } from "next";
import { CategoryType, SubCategoryType } from "@/types/CategoryTypes";
import SocialNetworks from "@/components/social-networks/SocialNetworks";
import {
  beautifyDate,
  createArticleLink,
  processContent,
  timeStampToDate,
} from "@/lib/utils";
import Image from "next/image";

import DarkModeSwitch from "@/components/DarkModeSwitch/DarkModeSwitch";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import LoadMore from "@/components/LoadMore/LoadMore";
import Head from "next/head";
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cookies = cookie.parse(context.req.headers.cookie || "");

  const { category } = context.query;

  const language = (cookies["lb-language"] || "fr") as langType;

  // const posts = await fetchPosts(language);

  const categoryAndPosts = await fetchCategoryAndPosts(category, language);

  const categories = await fetchCategories(language);

  const bannerFlowScript = await fetchBannerFlowScript(language);

  const srcStartIndex = bannerFlowScript.script.indexOf('src="') + 5;
  const srcEndIndex = bannerFlowScript.script.indexOf('"', srcStartIndex);
  const script = bannerFlowScript.script.slice(srcStartIndex, srcEndIndex);

  return {
    props: {
      language,
      slug: category,
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

export default function CategoryPage({
  categories,
  language,
  categoryAndPosts,
  bannerFlowScript,
  slug,
}: {
  slug: string;
  categories: CategoryType[];
  language: langType;
  bannerFlowScript: string;
  categoryAndPosts: {
    category: SubCategoryType;
    posts: CategoryPostType[];
  };
}) {
  const router = useRouter();

  const currentUrl = `${process.env.BASE_URL}${router.asPath}`;

  const [posts, setPosts] = useState(categoryAndPosts.posts);

  console.log(categoryAndPosts);

  const [page, setPage] = useState(2);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (ref.current) {
      const script = document.createElement("script");
      script.src = bannerFlowScript;
      script.async = true;

      // Assuming 'myDiv' is the ID of the div where you want to append the script
      ref.current.appendChild(script);
    }
  }, []);

  return (
    <>
      <Head>
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <title>{categoryAndPosts.category.yoast_meta.wpseo_title}</title>

        <meta
          name="description"
          content={categoryAndPosts.category.yoast_meta.wpseo_desc}
        />

        <link
          rel="canonical"
          href={
            categoryAndPosts.category.yoast_meta.wpseo_canonical || currentUrl
          }
        />
      </Head>
      <Header categories={categories} language={language} />
      <DarkModeSwitch />
      <section className={styling.content}>
        <div className={styling.listAndAside}>
          <div>
            <h2> {categoryAndPosts.category.parent_category}</h2>

            <h3> {categoryAndPosts.category.name} </h3>

            {posts.map((post) => (
              <Article post={post} key={post.id} />
            ))}

            <LoadMore
              language={language}
              onClick={async () => {
                const morePosts = await fetchCategoryAndPosts(
                  slug,
                  language,
                  page
                );

                setPosts((posts) => [...posts, ...morePosts.posts]);
                setPage((page) => page + 1);
              }}
            />
          </div>
          <aside ref={ref} className={styling.ad}></aside>
        </div>

        <p className={styling.content} />
        <aside
          className={styling.description}
          dangerouslySetInnerHTML={{
            __html: processContent(categoryAndPosts.category.description!),
          }}
        />
      </section>
      <SocialNetworks language={language} />
      <Footer language={language} />;
    </>
  );
}

const Article = ({ post }: { post: CategoryPostType }) => {
  const router = useRouter();
  return (
    <article
      onClick={() => {
        router.push(post.link);
      }}
      className={styling.article}
    >
      <figure className={styling.figure}>
        <Image
          className={styling.image}
          src={post["featured_image"]}
          alt=""
          fill={true}
        />
      </figure>

      <div className={styling.meta}>
        <h4> {post.title} </h4>

        <p> {post.excerpt} </p>

        <time className={styling.date}> {post.date} </time>
      </div>
    </article>
  );
};
