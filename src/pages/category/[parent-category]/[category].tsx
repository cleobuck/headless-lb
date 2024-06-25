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
import { beautifyDate, createArticleLink, timeStampToDate } from "@/lib/utils";
import Image from "next/image";
import Script from "next/script";

import DarkModeSwitch from "@/components/DarkModeSwitch/DarkModeSwitch";
import { RefObject, useEffect, useRef } from "react";
import { Router, useRouter } from "next/router";
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
}: {
  categories: CategoryType[];
  language: langType;
  bannerFlowScript: string;
  categoryAndPosts: {
    category: SubCategoryType;
    posts: CategoryPostType[];
  };
}) {
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
      <Header categories={categories} language={language} />
      <DarkModeSwitch />
      <section className={styling.content}>
        <div className={styling.listAndAside}>
          <div>
            <h2> {categoryAndPosts.category.parent_category}</h2>

            <h3> {categoryAndPosts.category.name} </h3>

            {categoryAndPosts.posts.map((post) => (
              <Article post={post} key={post.id} />
            ))}
          </div>

          <aside id="banner-script" ref={ref}></aside>
        </div>

        <aside className={styling.description}>
          {categoryAndPosts.category.description}{" "}
        </aside>
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
